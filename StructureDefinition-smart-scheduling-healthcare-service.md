# Healthcare Service - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Healthcare Service**

## Resource Profile: Healthcare Service 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-healthcare-service | *Version*:0.1.0 |
| Draft as of 2026-03-05 | *Computable Name*:SmartSchedulingHealthcareService |

 
This profile sets minimum expections for a HealthcareService resource 

**Usages:**

* Refer to this Profile: [PractitionerRole](StructureDefinition-smart-scheduling-practitionerRole.md)
* Examples for this Profile: [Primary Care Appointments - Online Booking](HealthcareService-ExampleHealhCareService.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-scheduling-healthcare-service)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-scheduling-healthcare-service.csv), [Excel](StructureDefinition-smart-scheduling-healthcare-service.xlsx), [Schematron](StructureDefinition-smart-scheduling-healthcare-service.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-scheduling-healthcare-service",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-healthcare-service",
  "version" : "0.1.0",
  "name" : "SmartSchedulingHealthcareService",
  "title" : "Healthcare Service",
  "status" : "draft",
  "date" : "2026-03-05T20:47:10+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "This profile sets minimum expections for a HealthcareService resource",
  "fhirVersion" : "4.0.1",
  "mapping" : [{
    "identity" : "rim",
    "uri" : "http://hl7.org/v3",
    "name" : "RIM Mapping"
  },
  {
    "identity" : "w5",
    "uri" : "http://hl7.org/fhir/fivews",
    "name" : "FiveWs Pattern Mapping"
  }],
  "kind" : "resource",
  "abstract" : false,
  "type" : "HealthcareService",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/HealthcareService",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "HealthcareService",
      "path" : "HealthcareService"
    },
    {
      "id" : "HealthcareService.id",
      "path" : "HealthcareService.id",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.active",
      "path" : "HealthcareService.active",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.providedBy",
      "path" : "HealthcareService.providedBy",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.category",
      "path" : "HealthcareService.category",
      "max" : "1",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.type",
      "path" : "HealthcareService.type",
      "min" : 1,
      "max" : "1",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.specialty",
      "path" : "HealthcareService.specialty",
      "min" : 1,
      "max" : "1",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.location",
      "path" : "HealthcareService.location",
      "min" : 1,
      "max" : "1",
      "type" : [{
        "code" : "Reference",
        "targetProfile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-location"]
      }],
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.name",
      "path" : "HealthcareService.name",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.comment",
      "path" : "HealthcareService.comment",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.telecom",
      "path" : "HealthcareService.telecom",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.serviceProvisionCode",
      "path" : "HealthcareService.serviceProvisionCode",
      "max" : "1",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.appointmentRequired",
      "path" : "HealthcareService.appointmentRequired",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.availableTime",
      "path" : "HealthcareService.availableTime",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.availableTime.daysOfWeek",
      "path" : "HealthcareService.availableTime.daysOfWeek",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.availableTime.allDay",
      "path" : "HealthcareService.availableTime.allDay",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.availableTime.availableStartTime",
      "path" : "HealthcareService.availableTime.availableStartTime",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.availableTime.availableEndTime",
      "path" : "HealthcareService.availableTime.availableEndTime",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.notAvailable",
      "path" : "HealthcareService.notAvailable",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.notAvailable.description",
      "path" : "HealthcareService.notAvailable.description",
      "mustSupport" : true
    },
    {
      "id" : "HealthcareService.notAvailable.during",
      "path" : "HealthcareService.notAvailable.during",
      "mustSupport" : true
    }]
  }
}

```
