# Booking Phone - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Booking Phone**

## Extension: Booking Phone 

| | |
| :--- | :--- |
| *Official URL*:http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone | *Version*:0.1.0 |
| Active as of 2026-02-21 | *Computable Name*:BookingPhone |

A phone number the user can call to book this slot.

**Context of Use**

**Usage info**

**Usages:**

* Use this Extension: [SMART Slot](StructureDefinition-smart-slot.md)
* Examples for this Extension: [Slot/slot-123](Slot-slot-123.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/booking-phone)

### Formal Views of Extension Content

 [Description of Profiles, Differentials, Snapshots, and how the XML and JSON presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-booking-phone.csv), [Excel](StructureDefinition-booking-phone.xlsx), [Schematron](StructureDefinition-booking-phone.sch) 

#### Constraints



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "booking-phone",
  "url" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone",
  "version" : "0.1.0",
  "name" : "BookingPhone",
  "title" : "Booking Phone",
  "status" : "active",
  "date" : "2026-02-21T08:56:44+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "A phone number the user can call to book this slot.",
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
      "short" : "Booking Phone",
      "definition" : "A phone number the user can call to book this slot."
    },
    {
      "id" : "Extension.extension",
      "path" : "Extension.extension",
      "max" : "0"
    },
    {
      "id" : "Extension.url",
      "path" : "Extension.url",
      "fixedUri" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone"
    },
    {
      "id" : "Extension.value[x]",
      "path" : "Extension.value[x]",
      "min" : 1,
      "type" : [{
        "code" : "string"
      }]
    }]
  }
}

```
