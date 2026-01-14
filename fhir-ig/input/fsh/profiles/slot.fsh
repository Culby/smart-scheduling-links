Profile: SmartSlot
Parent: Slot
Id: smart-slot 
Title: "SMART Slot"
Description: "This profile sets minimum expectations for a Slot Resource."

// Note that there is no US Core 6.1.0 Slot profile
// https://hl7.org/fhir/us/core/STU6.1/

// Already required by base Slot resource
// schedule 1..1
// status 1..1
// start 1..1
// end 1..1

// spec has an extension, but I don't think it needs one because we can use serviceType
// extension

// Per 1/13/25 discussions, seems like we are suggesting to constrain on serviceType
* serviceType 1..* MS
