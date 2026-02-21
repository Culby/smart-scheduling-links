# Artifacts Summary - v0.1.0

* [**Table of Contents**](toc.md)
* **Artifacts Summary**

## Artifacts Summary

This page provides a list of the FHIR artifacts defined as part of this implementation guide.

### Structures: Resource Profiles 

These define constraints on FHIR resources for systems conforming to this implementation guide.

| | |
| :--- | :--- |
| [SMART Location](StructureDefinition-smart-location.md) | This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases |
| [SMART Schedule](StructureDefinition-smart-schedule.md) | This profile sets the minimum expectations for a Schedule Resource. |
| [SMART Slot](StructureDefinition-smart-slot.md) | This profile sets minimum expectations for a Slot Resource. |

### Structures: Extension Definitions 

These define constraints on FHIR data types for systems conforming to this implementation guide.

| | |
| :--- | :--- |
| [Booking Deep Link](StructureDefinition-booking-deep-link.md) | A deep link into the Provider Booking Portal where the user can begin booking this slot. |
| [Booking Phone](StructureDefinition-booking-phone.md) | A phone number the user can call to book this slot. |

### Example: Example Instances 

These are example instances that show what data produced and consumed by systems conforming with this implementation guide might look like.

| | |
| :--- | :--- |
| [Example SMART Location - Primary Clinic](Location-ExampleSMARTLocation-PrimaryClinic.md) | Example Location instance conforming to the SMARTLocation profile. |
| [slot-123](Slot-slot-123.md) | Example slot that has the booking extensions |

