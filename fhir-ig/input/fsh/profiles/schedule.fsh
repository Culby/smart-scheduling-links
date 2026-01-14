Profile: SmartSchedule
Parent: Schedule
Id: smart-schedule
Title: "SMART Schedule"
Description: "This profile sets the minimum expectations for a Schedule Resource."

// Required by base R4 Schedule
//* actor 1..* // for notes purposes; commented out so it doesn't impact diff

// No US Core profile for Schedule in 6.1.0
// https://hl7.org/fhir/us/core/STU6.1/

// Align with SMART Schedule Link
// https://github.com/smart-on-fhir/smart-scheduling-links/blob/master/specification.md#schedule-file
// https://github.com/Culby/smart-scheduling-links/blob/master/specification.md#schedule-file
// actor references location (like the original), but also the PractitionerRole
* actor MS
  * reference MS // original
  * display MS // from proposed
* serviceType 1..* MS // from both

// TODO: Chat with team about some simple value set binding
//* serviceType from CommonServiceTypesVS (preferred) 