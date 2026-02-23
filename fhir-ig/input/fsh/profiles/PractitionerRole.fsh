Profile: SmartPractitionerRole
Parent: PractitionerRole
Id: smart-practitionerRole
Title: "SmartPractitionerRole"
Description: "The PractitionerRole resource represents the specific roles that practitioners perform at organizations where appointments are available"
* id 1..1 MS 
* identifier 0..* MS 
* active 0..1 MS 
* period 0..1 MS 
* practitioner 0..1 MS
* practitioner only Reference(SmartPractitioner) 
* organization 0..1 MS
* organization only Reference(Organization)
* code 0..* MS 
* specialty 0..* MS 
* location 0..* MS 
* location only Reference(SMARTLocation)
