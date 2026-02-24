/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import fs from 'fs';
import _ from 'lodash';
import staticData from './static-data.json';

const DEFAULT_BASE_URL = 'https://raw.githubusercontent.com/smart-on-fhir/smart-scheduling-links/master/examples/';

const COARSE_GRAINED_SLOTS = true;

const VISIT_MINUTES = 20;

const OPENING_TIME = 'T14:00:00.000Z';
const CLOSING_TIME = 'T23:00:00.000Z';


let _resourceId = 0;
const resourceId = () => '' + _resourceId++;

let _bookingId = 1000000;
const bookingId = () => '' + _bookingId++;

const openingTime = (date: string): string => {
  return new Date(date.slice(0, 10) + OPENING_TIME).toISOString();
};

const closingTime = (date: string): string => {
  return new Date(date.slice(0, 10) + CLOSING_TIME).toISOString();
};

const getWeek = function (d: Date) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

const slot = (start: string, end: string, schedule: Resource, useCoarseGrained = COARSE_GRAINED_SLOTS) => ({
  resourceType: 'Slot',
  id: resourceId(),
  schedule: {
    reference: `Schedule/${schedule.id}`,
  },
  status: 'free',
  start: useCoarseGrained ? openingTime(start) : start,
  end: useCoarseGrained ? closingTime(end) : end,

  extension: [
    {
      url: 'http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link',
      valueUrl: `https://ehr-portal.example.org/bookings?slot=${bookingId()}`,
    },
    {
      url: 'http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone',
      valueString: `000-000-0000`,
    },
  ],
});

const schedule = (location: Resource, locationIndex: number, practitionerRole?: Resource) => {
  const isPrimaryCare = locationIndex >= 10;  // First 10 locations (0-9) are urgent care, next 10 (10-19) are primary care
  
  const baseSchedule: any = {
    resourceType: 'Schedule',
    id: resourceId(),
    serviceType: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/service-type',
            code: isPrimaryCare ? '124' : '556',
            display: isPrimaryCare ? 'General Practice' : 'Walk-in',
          },
        ],
      },
    ],
    actor: [],
  };

  if (isPrimaryCare && practitionerRole) {
    // For primary care, reference both the PractitionerRole and the Location referenced by the role
    baseSchedule.actor.push({
      reference: `PractitionerRole/${practitionerRole.id}`,
      display: practitionerRole.practitioner?.display ?? undefined,
    });

    const practitionerRoleLocationRef: string | undefined = practitionerRole.location?.[0]?.reference;
    const practitionerRoleLocationDisplay: string | undefined = practitionerRole.location?.[0]?.display ?? undefined;

    baseSchedule.actor.push({
      reference: practitionerRoleLocationRef ?? `Location/${location.id}`,
      display: practitionerRoleLocationDisplay ?? location.name,
    });
  } else {
    // For urgent care (no practitioner role), reference the location directly
    baseSchedule.actor.push({
      reference: `Location/${location.id}`,
      display: location.name,
    });
  }

  if (isPrimaryCare && practitionerRole) {
    // Prefer specialty from PractitionerRole if available; fall back to legacy rotation
    const roleSpecialty = practitionerRole.specialty?.[0]?.coding?.[0];
    if (roleSpecialty) {
      baseSchedule.extension = [
        {
          url: 'http://fhir-registry.smarthealthit.org/StructureDefinition/specialty',
          valueCoding: roleSpecialty,
        },
      ];
    } else {
      const specialties = [
        { code: '419772000', display: 'Family practice' },
        { code: '394582007', display: 'Dermatology' },
        { code: '394586005', display: 'Gynecology' },
      ];
      const specialtyIndex = locationIndex % 3;
      baseSchedule.extension = [
        {
          url: 'http://fhir-registry.smarthealthit.org/StructureDefinition/specialty',
          valueCoding: {
            system: 'http://snomed.info/sct',
            code: specialties[specialtyIndex].code,
            display: specialties[specialtyIndex].display,
          },
        },
      ];
    }
  }

  return baseSchedule;
};

interface Resource {
  resourceType: string;
  id: string;
  [key: string]: any;
}

// Base Practitioner resources (referenced by PractitionerRoles)
const practitioners: Resource[] = staticData.practitioners;

// PractitionerRole resources that reference the base practitioners
const practitionerRoles: Resource[] = staticData.practitionerRoles.map((role, index) => ({
  ...role,
  id: resourceId(), // Generate dynamic ID
}));

const locations: Resource[] = staticData.locationTemplates.map((location, index) => ({
  ...location,
  // Align Location IDs with template index so PractitionerRole.location references (e.g., Location/10..19) resolve correctly
  id: String(index),
}));

// Device resources from static data
const devices: Resource[] = staticData.devices.map((device) => ({
  ...device,
}));

// Create a schedule for a Device + Location pair
const deviceSchedule = (device: Resource, location: Resource): Resource => {
  // Map device type to appropriate service type
  const deviceTypeCode = device.type?.coding?.[0]?.code;
  let serviceType = { code: '363', display: 'Diagnostic Radiology/Imaging' };
  
  // Customize service type based on device
  if (deviceTypeCode === '77477000') { // CT Scanner
    serviceType = { code: '363', display: 'CT Scan' };
  } else if (deviceTypeCode === '113091000') { // MRI
    serviceType = { code: '363', display: 'MRI Scan' };
  } else if (deviceTypeCode === '44056008') { // X-Ray
    serviceType = { code: '363', display: 'X-Ray' };
  } else if (deviceTypeCode === '45172009') { // Ultrasound
    serviceType = { code: '363', display: 'Ultrasound' };
  } else if (deviceTypeCode === '71651007') { // Mammography
    serviceType = { code: '363', display: 'Mammography' };
  }

  const deviceName = device.deviceName?.find((n: any) => n.type === 'user-friendly-name')?.name 
    ?? device.deviceName?.[0]?.name 
    ?? 'Medical Device';

  return {
    resourceType: 'Schedule',
    id: resourceId(),
    serviceType: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/service-type',
            code: serviceType.code,
            display: serviceType.display,
          },
        ],
      },
    ],
    actor: [
      {
        reference: `Device/${device.id}`,
        display: deviceName,
      },
      {
        reference: `Location/${location.id}`,
        display: location.name,
      },
    ],
  };
};

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(new Date(date).setMinutes(date.getMinutes() + minutes));
};

const createResources = (startDays: number, durationDays: number, baseUrl: string) => {
  const startDate = new Date(Date.now() + startDays * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const currentDate = new Date(startDate);

  // Location-based schedules (urgent care and primary care with practitioners)
  const locationSchedules = locations.map((location, index) => {
    const practitionerRole = index >= 10 ? practitionerRoles[index - 10] : undefined;
    return schedule(location, index, practitionerRole);
  });

  // Device-based schedules (each device paired with its location)
  const deviceSchedules = devices.map((device) => {
    // Extract location ID from device.location reference (e.g., "Location/10" -> "10")
    const locationRef = device.location?.reference as string | undefined;
    const locationId = locationRef?.replace('Location/', '');
    const deviceLocation = locations.find((l) => l.id === locationId) ?? locations[10]; // fallback to first primary care
    return deviceSchedule(device, deviceLocation);
  });

  // Combined schedules
  const schedules = [...locationSchedules, ...deviceSchedules];
  
  let slots: Resource[] = [];

  while (currentDate <= endDate) {
    const clinicOpenTime = addMinutes(currentDate, 8 * 60);
    
    // Generate slots for location-based schedules
    const slotsForLocationSchedules = locationSchedules.flatMap((schedule, scheduleIndex) => {
      const ret: Resource[] = [];
      const isPrimaryCare = scheduleIndex >= 10; // Primary care schedules have PractitionerRole actors
      
      if (isPrimaryCare) {
        // For primary care: create individual appointment slots with 15 and 30 minute durations
        // Start at a clean time (8:00 AM) for the current date
        const cleanStartDate = new Date(currentDate);
        cleanStartDate.setHours(8, 0, 0, 0); // Set to 8:00:00.000 AM
        
        const appointmentDurations = [15, 30]; // Mix of 15 and 30 minute appointments
        const workingHours = 9; // 9 hours of operation (8 AM to 5 PM)
        const totalMinutes = workingHours * 60;
        
        let currentMinute = 0;
        let appointmentIndex = 0;
        
        while (currentMinute < totalMinutes) {
          // Alternate between 15 and 30 minute appointments, with some variation
          const durationIndex = appointmentIndex % 3 === 0 ? 1 : 0; // Every 3rd appointment is 30 min, others are 15 min
          const duration = appointmentDurations[durationIndex];
          
          const startTime = addMinutes(cleanStartDate, currentMinute);
          const endTime = addMinutes(startTime, duration);
          
          ret.push(slot(startTime.toISOString(), endTime.toISOString(), schedule, false)); // Use fine-grained slots for primary care
          
          currentMinute += duration;
          appointmentIndex++;
        }
      } else {
        // For urgent care: keep the existing coarse-grained approach
        for (let i = 0; i < 30; i++) {
          const startTime = addMinutes(clinicOpenTime, i * VISIT_MINUTES);
          const endTime = addMinutes(startTime, VISIT_MINUTES);
          ret.push(slot(startTime.toISOString(), endTime.toISOString(), schedule, true)); // Use coarse-grained slots for urgent care
          if (COARSE_GRAINED_SLOTS) break;
        }
      }
      
      return ret;
    });

    // Generate slots for device-based schedules
    // Devices have fixed appointment durations based on procedure type
    const slotsForDeviceSchedules = deviceSchedules.flatMap((schedule, deviceIndex) => {
      const ret: Resource[] = [];
      const device = devices[deviceIndex];
      const deviceTypeCode = device.type?.coding?.[0]?.code;
      
      // Set appointment duration based on device type
      let appointmentDuration = 30; // default
      if (deviceTypeCode === '77477000') appointmentDuration = 45; // CT Scanner - 45 min
      else if (deviceTypeCode === '113091000') appointmentDuration = 60; // MRI - 60 min
      else if (deviceTypeCode === '44056008') appointmentDuration = 15; // X-Ray - 15 min
      else if (deviceTypeCode === '45172009') appointmentDuration = 30; // Ultrasound - 30 min
      else if (deviceTypeCode === '71651007') appointmentDuration = 30; // Mammography - 30 min
      
      // Device schedules: 8 AM to 5 PM with fixed-duration slots
      const cleanStartDate = new Date(currentDate);
      cleanStartDate.setHours(8, 0, 0, 0);
      
      const workingHours = 9;
      const totalMinutes = workingHours * 60;
      
      let currentMinute = 0;
      while (currentMinute + appointmentDuration <= totalMinutes) {
        const startTime = addMinutes(cleanStartDate, currentMinute);
        const endTime = addMinutes(startTime, appointmentDuration);
        
        ret.push(slot(startTime.toISOString(), endTime.toISOString(), schedule, false));
        
        currentMinute += appointmentDuration;
      }
      
      return ret;
    });

    slots = [...slots, ...slotsForLocationSchedules, ...slotsForDeviceSchedules];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const manifest = {
    operationDefinition: 'http://hl7.org/fhir/uv/bulkdata/OperationDefinition/bulk-publish|1.0.0',
    transactionTime: new Date().toISOString(),
    requiresAccessToken: false,
    outputFormat: 'application/fhir+ndjson',
    request: `${baseUrl}$bulk-publish`,
    output: [
      {
        type: 'Location',
        url: `${baseUrl}locations.ndjson`,
      },
      {
        type: 'Device',
        url: `${baseUrl}devices.ndjson`,
      },
      {
        type: 'Schedule',
        url: `${baseUrl}schedules.ndjson`,
      },
      {
        type: 'PractitionerRole',
        url: `${baseUrl}practitionerroles.ndjson`,
      },
    ],
    error: [],
  };
  
  return {
    manifest,
    locations,
    devices,
    practitioners,
    practitionerRoles,
    slots,
    schedules,
  };
};

async function generate(options: { outdir: string; startDays: number; durationDays: number; baseUrl: string }) {
  const baseUrl = options.baseUrl;
  const resources = createResources(options.startDays, options.durationDays, baseUrl);
  const fileLocation = `locations.ndjson`;
  const fileDevice = `devices.ndjson`;
  const fileSchedule = `schedules.ndjson`;
  const filePractitionerRoles = `practitionerroles.ndjson`;
  const fileSlot = (i: string) => `slots-${i}.ndjson`;
  const fileManifest = `$bulk-publish`;

  fs.writeFileSync(`${options.outdir}/${fileLocation}`, resources.locations.map((s) => JSON.stringify(s)).join('\n'));
  fs.writeFileSync(`${options.outdir}/${fileDevice}`, resources.devices.map((s) => JSON.stringify(s)).join('\n'));
  fs.writeFileSync(`${options.outdir}/${fileSchedule}`, resources.schedules.map((s) => JSON.stringify(s)).join('\n'));
  fs.writeFileSync(`${options.outdir}/${filePractitionerRoles}`, resources.practitionerRoles.map((s) => JSON.stringify(s)).join('\n'));

  const slotsSplitMap = _.chain((resources.slots as unknown) as { start: string }[])
    .groupBy((s) => s.start.slice(0, 4) + '-W' + String(getWeek(new Date(s.start))).padStart(2, '0'))
    .value();

  Object.entries(slotsSplitMap).forEach(([week, slots]) => {
    fs.writeFileSync(`${options.outdir}/${fileSlot(week)}`, slots.map((s) => JSON.stringify(s)).join('\n'));
  });

  resources.manifest.output = [
    ...resources.manifest.output,
    ...Object.entries(slotsSplitMap).map(([week]) => ({
      type: 'Slot',
      url: `${baseUrl}${fileSlot(week)}`,
      extension: {
        state: ['MA'],
      },
    })),
  ];

  fs.writeFileSync(`${options.outdir}/${fileManifest}`, JSON.stringify(resources.manifest, null, 2));
}

const program = new Command();
program.option('-o, --outdir <outdir>', 'output directory');
program.option('-s, --start-days <days>', 'number of days from now to start generating slots', '60');
program.option('-d, --duration-days <days>', 'number of days of slots to generate', '30');
program.option('-b, --base-url <url>', 'base URL for manifest resource links', DEFAULT_BASE_URL);
program.parse(process.argv);

interface Options {
  outdir: string;
  startDays: number;
  durationDays: number;
  baseUrl: string;
}

const opts = program.opts();
const options: Options = {
  outdir: opts.outdir,
  startDays: parseInt(opts.startDays, 10),
  durationDays: parseInt(opts.durationDays, 10),
  baseUrl: opts.baseUrl,
};
console.log('Opts', options);

if (options.outdir) {
  generate(options);
}
