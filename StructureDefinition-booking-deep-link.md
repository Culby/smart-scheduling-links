# Booking Deep Link - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Booking Deep Link**

## Extension: Booking Deep Link 

| | |
| :--- | :--- |
| *Official URL*:http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link | *Version*:0.1.0 |
| Active as of 2026-02-23 | *Computable Name*:BookingDeepLink |

A deep link into the Provider Booking Portal where the user can begin booking this slot.

**Context of Use**

**Usage info**

**Usages:**

* Use this Extension: [SMART Slot](StructureDefinition-smart-slot.md)
* Examples for this Extension: [Slot/slot-123](Slot-slot-123.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/booking-deep-link)

### Formal Views of Extension Content

 [Description of Profiles, Differentials, Snapshots, and how the XML and JSON presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-booking-deep-link.csv), [Excel](StructureDefinition-booking-deep-link.xlsx), [Schematron](StructureDefinition-booking-deep-link.sch) 

#### Constraints



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "booking-deep-link",
  "url" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link",
  "version" : "0.1.0",
  "name" : "BookingDeepLink",
  "title" : "Booking Deep Link",
  "status" : "active",
  "date" : "2026-02-23T16:41:40+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "A deep link into the Provider Booking Portal where the user can begin booking this slot.",
  "fhirVersion" : "4.0.1",
  "mapping" : [{
    "identity" : "rim",
    "uri" : "http://hl7.org/v3",
    "name" : "RIM Mapping"
  }],
  "kind" : "complex-type",
  "abstract" : false,
  "context" : [{
    "type" : "element",
    "expression" : "Slot"
  }],
  "type" : "Extension",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/Extension",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "Extension",
      "path" : "Extension",
      "short" : "Booking Deep Link",
      "definition" : "A deep link into the Provider Booking Portal where the user can begin booking this slot."
    },
    {
      "id" : "Extension.extension",
      "path" : "Extension.extension",
      "max" : "0"
    },
    {
      "id" : "Extension.url",
      "path" : "Extension.url",
      "fixedUri" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link"
    },
    {
      "id" : "Extension.value[x]",
      "path" : "Extension.value[x]",
      "min" : 1,
      "type" : [{
        "code" : "url"
      }]
    }]
  }
}

```
