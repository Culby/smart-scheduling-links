Profile: SMARTLocation
Parent: Location
Id: smart-location
Title: "SMART Location"
Description: """
This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases
"""

// Align with US Core 6.1.0 
// https://hl7.org/fhir/us/core/STU6.1/StructureDefinition-us-core-location.html
// * name 1..1 MS // only required field. Name is also required in smart scheduling
// * status MS
// * telecom MS
// * address MS
//   * line MS
//   * city MS
//   * state MS
//   * postalCode MS
//   * district MS
// * managingOrganization MS

// Align with SMART Schedule
// https://github.com/smart-on-fhir/smart-scheduling-links/blob/master/specification.md
// https://github.com/Culby/smart-scheduling-links/blob/master/specification.md
* identifier 1..* MS

* name 1..1 MS
* telecom 1..* MS
  * system 1..1 MS
  * value 1..1 MS

* address 0..1 MS // loosen restriction to allow for virtual-only locations
  * line 1..* MS
  * city 1..1 MS
  * state 1..1 MS
  * postalCode 1..1 MS
  * district MS
* description MS
* position MS
  * latitude MS
  * longitude MS

// model the virtual locations with physical type & r5 virtual service
* physicalType MS // it may be ideal to add a slice here to make it easy for folks to visually see it
* extension contains $xver-loc-virtualService named virtualService 0..*
* extension[virtualService] ^short = "Virtual service connection details (R5 element carried via xver extension)"
* extension[virtualService] ^definition = "Carries the R5 Location.virtualService element (VirtualServiceDetail) for round-tripping from/to R5."

Instance: ExampleSMARTLocation-PrimaryClinic
InstanceOf: SMARTLocation
Title: "Example SMART Location - Primary Clinic"
Description: "Example Location instance conforming to the SMARTLocation profile."
Usage: #example

* identifier[0].system = "https://www.openclintech.com/ids/locations"
* identifier[0].value = "loc-001"

* name = "OpenClinTech Primary Clinic"
* status = #active

* telecom[0].system = #phone
* telecom[0].value = "+1-813-555-0100"
* telecom[0].use = #work

* telecom[1].system = #email
* telecom[1].value = "contact@openclintech.com"
* telecom[1].use = #work

* address.line[0] = "123 Main St"
* address.city = "Tampa"
* address.state = "FL"
* address.postalCode = "33602"
* address.district = "Hillsborough"

* description = "Primary outpatient clinic offering general services."

* position.latitude = 27.9506
* position.longitude = -82.4572
