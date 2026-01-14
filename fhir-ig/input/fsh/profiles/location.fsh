Profile: SMARTLocation
Parent: Location
Id: smart-location
Title: "SMART Location"
Description: """
This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases
"""

// Align with US Core 6.1.0 
// https://hl7.org/fhir/us/core/STU6.1/StructureDefinition-us-core-location.html
* name 1..1 MS // only required field
* status MS
* telecom MS
* address MS
  * line MS
  * city MS
  * state MS
  * postalCode MS
  * district MS
* managingOrganization MS

// Align with SMART Schedule
// https://github.com/smart-on-fhir/smart-scheduling-links/blob/master/specification.md
// https://github.com/Culby/smart-scheduling-links/blob/master/specification.md
* identifier 1..* MS

* telecom 1..* MS
* telecom.system 1..1 MS
* telecom.value 1..1 MS

* address 1..1 MS
  * line 1..* MS
  * city 1..1 MS
  * state 1..1 MS
  * postalCode 1..1 MS
  * district MS
* description MS
* position MS
  * latitude MS
  * longitude MS
