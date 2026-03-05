# Artifacts Summary - v0.1.0

* [**Table of Contents**](toc.md)
* **Artifacts Summary**

## Artifacts Summary

This page provides a list of the FHIR artifacts defined as part of this implementation guide.

### Structures: Resource Profiles 

These define constraints on FHIR resources for systems conforming to this implementation guide.

| | |
| :--- | :--- |
| [Healthcare Service](StructureDefinition-smart-scheduling-healthcare-service.md) | This profile sets minimum expections for a HealthcareService resource |
| [Location](StructureDefinition-smart-scheduling-location.md) | This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases |
| [Practitioner](StructureDefinition-smart-scheduling-practitioner.md) | This profile sets minimum expections for a Practitioner resource |
| [PractitionerRole](StructureDefinition-smart-scheduling-practitionerRole.md) | The PractitionerRole resource represents the specific roles that practitioners perform at organizations where appointments are available |
| [Schedule](StructureDefinition-smart-scheduling-schedule.md) | This profile sets the minimum expectations for a Schedule Resource. |
| [Slot](StructureDefinition-smart-scheduling-slot.md) | This profile sets minimum expectations for a Slot Resource. |

### Structures: Extension Definitions 

These define constraints on FHIR data types for systems conforming to this implementation guide.

| | |
| :--- | :--- |
| [Booking Deep Link](StructureDefinition-booking-deep-link.md) | A deep link into the Provider Booking Portal where the user can begin booking this slot. |
| [Booking Phone](StructureDefinition-booking-phone.md) | A phone number the user can call to book this slot. |

### Terminology: Value Sets 

These define sets of codes used by systems conforming to this implementation guide.

| | |
| :--- | :--- |
| [Appointment Type and Reasons](ValueSet-appointment-type-and-reasons-vs.md) | A value set that combines the preferred and required codes from slot.appointmentType and NDH new patient extension, respectively |

### Example: Example Instances 

These are example instances that show what data produced and consumed by systems conforming with this implementation guide might look like.

| | |
| :--- | :--- |
| [Example Location](Location-44981b4a-8eae-48f7-bb7f-bf008bbe05af.md) | Example Location instance conforming to the SMARTLocation profile. |
| [Example Practitioner](Practitioner-fd3c7a99-bb59-4fef-9f79-88d1f7275ca6.md) | Example Location instance conforming to the SMARTLocation profile. |
| [Example PractitionerRole](PractitionerRole-ad23d8f2-b88e-48af-ae96-e36f5a5fbd43.md) |  |
| [Example Schedule](Schedule-ExampleSchedule.md) |  |
| [Example Slot](Slot-ExampleSlot.md) | Example slot that has the booking extensions |
| [ExampleHealhCareService](HealthcareService-ExampleHealhCareService.md) |  |
| [Organization example](Organization-c3453010-d1ae-4180-937e-86cc11292693.md) | Example of the Organization resource |

