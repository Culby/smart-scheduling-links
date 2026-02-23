# SMART Slot - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **SMART Slot**

## Resource Profile: SMART Slot 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-slot | *Version*:0.1.0 |
| Draft as of 2026-02-23 | *Computable Name*:SmartSlot |

 
This profile sets minimum expectations for a Slot Resource. 

**Usages:**

* This Profile is not used by any profiles in this Implementation Guide

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-slot)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-slot.csv), [Excel](StructureDefinition-smart-slot.xlsx), [Schematron](StructureDefinition-smart-slot.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-slot",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-slot",
  "version" : "0.1.0",
  "name" : "SmartSlot",
  "title" : "SMART Slot",
  "status" : "draft",
  "date" : "2026-02-23T18:21:29+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "This profile sets minimum expectations for a Slot Resource.",
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
  "type" : "Slot",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/Slot",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "Slot",
      "path" : "Slot"
    },
    {
      "id" : "Slot.extension",
      "path" : "Slot.extension",
      "slicing" : {
        "discriminator" : [{
          "type" : "value",
          "path" : "url"
        }],
        "ordered" : false,
        "rules" : "open"
      }
    },
    {
      "id" : "Slot.extension:bookingDeepLink",
      "path" : "Slot.extension",
      "sliceName" : "bookingDeepLink",
      "min" : 0,
      "max" : "1",
      "type" : [{
        "code" : "Extension",
        "profile" : ["http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link"]
      }]
    },
    {
      "id" : "Slot.extension:bookingPhone",
      "path" : "Slot.extension",
      "sliceName" : "bookingPhone",
      "min" : 0,
      "max" : "1",
      "type" : [{
        "code" : "Extension",
        "profile" : ["http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone"]
      }]
    }]
  }
}

```
