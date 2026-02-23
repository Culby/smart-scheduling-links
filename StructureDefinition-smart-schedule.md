# SMART Schedule - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **SMART Schedule**

## Resource Profile: SMART Schedule 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-schedule | *Version*:0.1.0 |
| Draft as of 2026-02-23 | *Computable Name*:SmartSchedule |

 
This profile sets the minimum expectations for a Schedule Resource. 

**Usages:**

* This Profile is not used by any profiles in this Implementation Guide

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-schedule)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-schedule.csv), [Excel](StructureDefinition-smart-schedule.xlsx), [Schematron](StructureDefinition-smart-schedule.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-schedule",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-schedule",
  "version" : "0.1.0",
  "name" : "SmartSchedule",
  "title" : "SMART Schedule",
  "status" : "draft",
  "date" : "2026-02-23T16:41:40+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "This profile sets the minimum expectations for a Schedule Resource.",
  "fhirVersion" : "4.0.1",
  "mapping" : [{
    "identity" : "rim",
    "uri" : "http://hl7.org/v3",
    "name" : "RIM Mapping"
  },
  {
    "identity" : "ical",
    "uri" : "http://ietf.org/rfc/2445",
    "name" : "iCalendar"
  },
  {
    "identity" : "w5",
    "uri" : "http://hl7.org/fhir/fivews",
    "name" : "FiveWs Pattern Mapping"
  }],
  "kind" : "resource",
  "abstract" : false,
  "type" : "Schedule",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/Schedule",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "Schedule",
      "path" : "Schedule"
    },
    {
      "id" : "Schedule.serviceType",
      "path" : "Schedule.serviceType",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Schedule.actor",
      "path" : "Schedule.actor",
      "mustSupport" : true
    },
    {
      "id" : "Schedule.actor.reference",
      "path" : "Schedule.actor.reference",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Schedule.actor.display",
      "path" : "Schedule.actor.display",
      "mustSupport" : true
    }]
  }
}

```
