# Example Slot - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Example Slot**

## Example Slot: Example Slot

Profile: [Slot](StructureDefinition-smart-scheduling-slot.md)

**Booking Deep Link**: [https://booking.healthsystem.org/slot/123](https://booking.healthsystem.org/slot/123)

**Booking Phone**: +1-555-123-4567

**schedule**: [Schedule: extension = General medicine (SNOMED CT#394802001); serviceType = General Practice](Schedule-ExampleSchedule.md)

**status**: Free

**start**: 2026-03-21 10:45:00-0400

**end**: 2026-03-21 11:15:00-0400



## Resource Content

```json
{
  "resourceType" : "Slot",
  "id" : "ExampleSlot",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-slot"]
  },
  "extension" : [{
    "url" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-deep-link",
    "valueUrl" : "https://booking.healthsystem.org/slot/123"
  },
  {
    "url" : "http://fhir-registry.smarthealthit.org/StructureDefinition/booking-phone",
    "valueString" : "+1-555-123-4567"
  }],
  "schedule" : {
    "reference" : "Schedule/ExampleSchedule"
  },
  "status" : "free",
  "start" : "2026-03-21T10:45:00-04:00",
  "end" : "2026-03-21T11:15:00-04:00"
}

```
