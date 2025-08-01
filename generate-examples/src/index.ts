/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import fs from 'fs';
import _ from 'lodash';
import staticData from './static-data.json';

const BASE_URL = 'https://raw.githubusercontent.com/smart-on-fhir/smart-scheduling-links/master/examples/';

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
    // When using PractitionerRole, only reference the role (location is within the role)
    baseSchedule.actor.push({
      reference: `PractitionerRole/${practitionerRole.id}`,
    });
  } else {
    // For urgent care (no practitioner role), reference the location directly
    baseSchedule.actor.push({
      reference: `Location/${location.id}`,
    });
  }

  if (isPrimaryCare && practitionerRole) {

    const specialties = [
      { code: '419772000', display: 'General medicine' },
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
        }
      }
    ];
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

const locations: Resource[] = staticData.locationTemplates.map((location) => ({
  ...location,
  id: resourceId(), // Generate dynamic ID
}));

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(new Date(date).setMinutes(date.getMinutes() + minutes));
};

const createResources = () => {
  // Start 60 days from now
  const startDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days after start
  const currentDate = new Date(startDate);

  const schedules = locations.map((location, index) => {
    const practitionerRole = index >= 10 ? practitionerRoles[index - 10] : undefined;
    return schedule(location, index, practitionerRole);
  });
  
  let slots: Resource[] = [];

  while (currentDate <= endDate) {
    const clinicOpenTime = addMinutes(currentDate, 8 * 60);
    const slotsForSchedules = schedules.flatMap((schedule, scheduleIndex) => {
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
    slots = [...slots, ...slotsForSchedules];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const manifest = {
    transactionTime: new Date().toISOString(),
    request: `${BASE_URL}$bulk-publish`,
    output: [
      {
        type: 'Location',
        url: `${BASE_URL}locations.ndjson`,
      },
      {
        type: 'Schedule',
        url: `${BASE_URL}schedules.ndjson`,
      },
      {
        type: 'PractitionerRole',
        url: `${BASE_URL}practitionerroles.ndjson`,
      },
    ],
    error: [],
  };
  
  return {
    manifest,
    locations,
    practitioners,
    practitionerRoles,
    slots,
    schedules,
  };
};

async function generate(options: { outdir: string }) {
  const resources = createResources();
  const fileLocation = `locations.ndjson`;
  const fileSchedule = `schedules.ndjson`;
  const filePractitionerRoles = `practitionerroles.ndjson`;
  const fileSlot = (i: string) => `slots-${i}.ndjson`;
  const fileManifest = `$bulk-publish`;

  fs.writeFileSync(`${options.outdir}/${fileLocation}`, resources.locations.map((s) => JSON.stringify(s)).join('\n'));
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
      url: `${BASE_URL}${fileSlot(week)}`,
      extension: {
        state: ['MA'],
      },
    })),
  ];

  fs.writeFileSync(`${options.outdir}/${fileManifest}`, JSON.stringify(resources.manifest, null, 2));
}

const program = new Command();
program.option('-o, --outdir <outdir>', 'output directory');
program.parse(process.argv);

interface Options {
  outdir: string;
}

const options = program.opts() as Options;
console.log('Opts', options);

if (options.outdir) {
  generate(options);
}
