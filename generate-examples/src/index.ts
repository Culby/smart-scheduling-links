/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import fs from 'fs';
import _ from 'lodash';

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
const practitioners: Resource[] = [
  {
    resourceType: 'Practitioner',
    id: 'dr-smith',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567890' }
    ],
    active: true,
    name: [{ family: 'Smith', given: ['John', 'Robert'], prefix: ['Dr.'] }],
    gender: 'male',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2010-01-01' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  },
  {
    resourceType: 'Practitioner',
    id: 'dr-johnson',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567891' }
    ],
    active: true,
    name: [{ family: 'Johnson', given: ['Sarah', 'Marie'], prefix: ['Dr.'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2012-03-15' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] },
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'es', display: 'Spanish' }] }
    ]
  },
  {
    resourceType: 'Practitioner',
    id: 'dr-williams',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567892' }
    ],
    active: true,
    name: [{ family: 'Williams', given: ['Michael', 'David'], prefix: ['Dr.'] }],
    gender: 'male',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2008-07-01' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  },
  {
    resourceType: 'Practitioner',
    id: 'nurse-brown',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567893' }
    ],
    active: true,
    name: [{ family: 'Brown', given: ['Jennifer', 'Lynn'], prefix: ['RN'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '224571006', display: 'Registered nurse' }] },
      period: { start: '2015-09-01' },
      issuer: { reference: 'Organization/state-nursing-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  },
  {
    resourceType: 'Practitioner',
    id: 'dr-davis',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567894' }
    ],
    active: true,
    name: [{ family: 'Davis', given: ['Emily', 'Grace'], prefix: ['Dr.'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2014-11-01' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] },
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'fr', display: 'French' }] }
    ]
  },
  {
    resourceType: 'Practitioner',
    id: 'pa-miller',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567895' }
    ],
    active: true,
    name: [{ family: 'Miller', given: ['Christopher', 'James'], prefix: ['PA'] }],
    gender: 'male',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '223366009', display: 'Physician assistant' }] },
      period: { start: '2017-06-01' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  },
  {
    resourceType: 'Practitioner',
    id: 'dr-wilson',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567896' }
    ],
    active: true,
    name: [{ family: 'Wilson', given: ['Amanda', 'Rose'], prefix: ['Dr.'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2011-08-15' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] },
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'pt', display: 'Portuguese' }] }
    ]
  },
  {
    resourceType: 'Practitioner',
    id: 'nurse-moore',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567897' }
    ],
    active: true,
    name: [{ family: 'Moore', given: ['Robert', 'Thomas'], prefix: ['RN'] }],
    gender: 'male',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '224571006', display: 'Registered nurse' }] },
      period: { start: '2016-03-01' },
      issuer: { reference: 'Organization/state-nursing-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  },
  {
    resourceType: 'Practitioner',
    id: 'dr-taylor',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567898' }
    ],
    active: true,
    name: [{ family: 'Taylor', given: ['Jessica', 'Ann'], prefix: ['Dr.'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '309343006', display: 'Physician' }] },
      period: { start: '2013-12-01' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] },
      { coding: [{ system: 'urn:ietf:bcp:47', code: 'zh', display: 'Chinese' }] }
    ]
  },
  {
    resourceType: 'Practitioner',
    id: 'pa-anderson',
    identifier: [
      { system: 'http://hl7.org/fhir/sid/us-npi', value: '1234567899' }
    ],
    active: true,
    name: [{ family: 'Anderson', given: ['Lisa', 'Marie'], prefix: ['PA'] }],
    gender: 'female',
    qualification: [{
      code: { coding: [{ system: 'http://snomed.info/sct', code: '223366009', display: 'Physician assistant' }] },
      period: { start: '2018-01-15' },
      issuer: { reference: 'Organization/state-medical-board' }
    }],
    communication: [{ coding: [{ system: 'urn:ietf:bcp:47', code: 'en', display: 'English' }] }]
  }
];

// PractitionerRole resources that reference the base practitioners
const practitionerRoles: Resource[] = [
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-001' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-smith',
      display: 'Dr. John Robert Smith'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '419772000', display: 'Family practice' }]
    }],
    location: [{
      reference: 'Location/10',
      display: 'SMART Primary Care Boston'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4567' },
      { system: 'email', value: 'dr.smith@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '09:00:00',
      availableEndTime: '17:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-002' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-johnson',
      display: 'Dr. Sarah Marie Johnson'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '394582007', display: 'Dermatology' }]
    }],
    location: [{
      reference: 'Location/11',
      display: 'SMART Primary Care Worcester'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4568' },
      { system: 'email', value: 'dr.johnson@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '08:00:00',
      availableEndTime: '16:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-003' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-williams',
      display: 'Dr. Michael David Williams'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '394586005', display: 'Gynecology' }]
    }],
    location: [{
      reference: 'Location/12',
      display: 'SMART Primary Care Cambridge'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4569' },
      { system: 'email', value: 'dr.williams@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '10:00:00',
      availableEndTime: '18:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-004' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/nurse-brown',
      display: 'RN Jennifer Lynn Brown'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '224535009', display: 'Registered nurse' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '408443003', display: 'General medical practice' }]
    }],
    location: [{
      reference: 'Location/13',
      display: 'SMART Primary Care Brockton'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4570' },
      { system: 'email', value: 'nurse.brown@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '07:00:00',
      availableEndTime: '15:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-005' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-davis',
      display: 'Dr. Emily Grace Davis'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '419772000', display: 'Family practice' }]
    }],
    location: [{
      reference: 'Location/14',
      display: 'SMART Primary Care Lynn'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4571' },
      { system: 'email', value: 'dr.davis@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '09:00:00',
      availableEndTime: '17:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-006' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/pa-miller',
      display: 'PA Christopher James Miller'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '449161006', display: 'Physician assistant' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '408443003', display: 'General medical practice' }]
    }],
    location: [{
      reference: 'Location/15',
      display: 'SMART Primary Care Pittsfield'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4572' },
      { system: 'email', value: 'pa.miller@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '08:30:00',
      availableEndTime: '16:30:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-007' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-wilson',
      display: 'Dr. Amanda Rose Wilson'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '394582007', display: 'Dermatology' }]
    }],
    location: [{
      reference: 'Location/16',
      display: 'SMART Primary Care Newton'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4573' },
      { system: 'email', value: 'dr.wilson@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '09:30:00',
      availableEndTime: '17:30:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-008' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/nurse-moore',
      display: 'RN Robert Thomas Moore'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '224535009', display: 'Registered nurse' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '408443003', display: 'General medical practice' }]
    }],
    location: [{
      reference: 'Location/17',
      display: 'SMART Primary Care Somerville'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4574' },
      { system: 'email', value: 'nurse.moore@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '06:00:00',
      availableEndTime: '14:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-009' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/dr-taylor',
      display: 'Dr. Jessica Ann Taylor'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '158965000', display: 'Medical practitioner' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '394586005', display: 'Gynecology' }]
    }],
    location: [{
      reference: 'Location/18',
      display: 'SMART Primary Care Medford'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4575' },
      { system: 'email', value: 'dr.taylor@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '08:00:00',
      availableEndTime: '16:00:00'
    }]
  },
  {
    resourceType: 'PractitionerRole',
    id: resourceId(),
    identifier: [
      { system: 'https://smartmedicine.example.com/practitioner-role-directory', value: 'ROLE-010' }
    ],
    active: true,
    period: { start: '2020-01-01' },
    practitioner: {
      reference: 'Practitioner/pa-anderson',
      display: 'PA Lisa Marie Anderson'
    },
    organization: {
      reference: 'Organization/smart-medicine',
      display: 'SMART Medicine'
    },
    code: [{
      coding: [{ system: 'http://snomed.info/sct', code: '449161006', display: 'Physician assistant' }]
    }],
    specialty: [{
      coding: [{ system: 'http://snomed.info/sct', code: '408443003', display: 'General medical practice' }]
    }],
    location: [{
      reference: 'Location/19',
      display: 'SMART Primary Care Waltham'
    }],
    telecom: [
      { system: 'phone', value: '555-123-4576' },
      { system: 'email', value: 'pa.anderson@smartmedicine.example.com' }
    ],
    availableTime: [{
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
      availableStartTime: '07:30:00',
      availableEndTime: '15:30:00'
    }]
  }
];

const locations: Resource[] = [
  // Urgent Care Locations (0-9)
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Springfield',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/00' }
    ],
    address: {
      line: ['123 Ash St'],
      city: 'Springfield',
      state: 'MA',
      postalCode: '01101',
      district: 'Hampden'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-SPR-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Lowell',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/01' }
    ],
    address: {
      line: ['123 Peach St'],
      city: 'Lowell',
      state: 'MA',
      postalCode: '01851',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-LOW-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care New Bedford',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/02' }
    ],
    address: {
      line: ['123 Cyprus St'],
      city: 'New Bedford',
      state: 'MA',
      postalCode: '02740',
      district: 'Bristol'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-NEW-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Quincy',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/03' }
    ],
    address: {
      line: ['123 Cranberry St'],
      city: 'Quincy',
      state: 'MA',
      postalCode: '02269',
      district: 'Norfolk'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-QUI-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Fall River',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/04' }
    ],
    address: {
      line: ['123 South Main St'],
      city: 'Fall River',
      state: 'MA',
      postalCode: '02721',
      district: 'Bristol'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-FAL-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Lawrence',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/05' }
    ],
    address: {
      line: ['123 Essex St'],
      city: 'Lawrence',
      state: 'MA',
      postalCode: '01840',
      district: 'Essex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-LAW-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Haverhill',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/06' }
    ],
    address: {
      line: ['123 Washington St'],
      city: 'Haverhill',
      state: 'MA',
      postalCode: '01830',
      district: 'Essex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-HAV-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Malden',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/07' }
    ],
    address: {
      line: ['123 Pleasant St'],
      city: 'Malden',
      state: 'MA',
      postalCode: '02148',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-MAL-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Taunton',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/08' }
    ],
    address: {
      line: ['123 Weir St'],
      city: 'Taunton',
      state: 'MA',
      postalCode: '02780',
      district: 'Bristol'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-TAU-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Urgent Care Chicopee',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/09' }
    ],
    address: {
      line: ['123 Front St'],
      city: 'Chicopee',
      state: 'MA',
      postalCode: '01013',
      district: 'Hampden'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-CHI-001' }
    ]
  },
  // Primary Care Locations (10-19)
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Boston',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/10' }
    ],
    address: {
      line: ['123 Summer St'],
      city: 'Boston',
      state: 'MA',
      postalCode: '02114',
      district: 'Suffolk'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-BOS-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Worcester',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/11' }
    ],
    address: {
      line: ['123 West St'],
      city: 'Worcester',
      state: 'MA',
      postalCode: '01602',
      district: 'Worcester'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-WOR-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Cambridge',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/12' }
    ],
    address: {
      line: ['123 Arrow St'],
      city: 'Cambridge',
      state: 'MA',
      postalCode: '02139',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-CAM-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Brockton',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/13' }
    ],
    address: {
      line: ['123 Oak St'],
      city: 'Brockton',
      state: 'MA',
      postalCode: '02301',
      district: 'Suffolk'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-BRO-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Lynn',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/14' }
    ],
    address: {
      line: ['123 Cherry St'],
      city: 'Lynn',
      state: 'MA',
      postalCode: '01901',
      district: 'Essex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-LYN-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Pittsfield',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/15' }
    ],
    address: {
      line: ['123 Elm St'],
      city: 'Pittsfield',
      state: 'MA',
      postalCode: '01201',
      district: 'Berkshire'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-PIT-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Newton',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/16' }
    ],
    address: {
      line: ['123 Washington St'],
      city: 'Newton',
      state: 'MA',
      postalCode: '02458',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-NEW-002' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Somerville',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/17' }
    ],
    address: {
      line: ['123 Highland Ave'],
      city: 'Somerville',
      state: 'MA',
      postalCode: '02143',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-SOM-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Medford',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/18' }
    ],
    address: {
      line: ['123 Main St'],
      city: 'Medford',
      state: 'MA',
      postalCode: '02155',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-MED-001' }
    ]
  },
  {
    resourceType: 'Location',
    id: resourceId(),
    name: 'SMART Primary Care Waltham',
    telecom: [
      { system: 'phone', value: '000-000-0000' },
      { system: 'url', value: 'https://smartmedicine.example.com/location/19' }
    ],
    address: {
      line: ['123 Moody St'],
      city: 'Waltham',
      state: 'MA',
      postalCode: '02453',
      district: 'Middlesex'
    },
    identifier: [
      { system: 'https://smartmedicine.example.com/facility-directory', value: 'FAC-WAL-001' }
    ]
  }
];

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
