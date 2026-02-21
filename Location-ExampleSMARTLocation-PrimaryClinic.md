# Example SMART Location - Primary Clinic - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Example SMART Location - Primary Clinic**

## Example Location: Example SMART Location - Primary Clinic

Profile: [SMART Location](StructureDefinition-smart-location.md)

**identifier**: `https://www.openclintech.com/ids/locations`/loc-001

**status**: Active

**name**: OpenClinTech Primary Clinic

**description**: Primary outpatient clinic offering general services.

**telecom**: [+1-813-555-0100](tel:+1-813-555-0100), [contact@openclintech.com](mailto:contact@openclintech.com)

**address**: 123 Main St Tampa FL 33602 

### Positions

| | | |
| :--- | :--- | :--- |
| - | **Longitude** | **Latitude** |
| * | -82.4572 | 27.9506 |



## Resource Content

```json
{
  "resourceType" : "Location",
  "id" : "ExampleSMARTLocation-PrimaryClinic",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-location"]
  },
  "identifier" : [{
    "system" : "https://www.openclintech.com/ids/locations",
    "value" : "loc-001"
  }],
  "status" : "active",
  "name" : "OpenClinTech Primary Clinic",
  "description" : "Primary outpatient clinic offering general services.",
  "telecom" : [{
    "system" : "phone",
    "value" : "+1-813-555-0100",
    "use" : "work"
  },
  {
    "system" : "email",
    "value" : "contact@openclintech.com",
    "use" : "work"
  }],
  "address" : {
    "line" : ["123 Main St"],
    "city" : "Tampa",
    "district" : "Hillsborough",
    "state" : "FL",
    "postalCode" : "33602"
  },
  "position" : {
    "longitude" : -82.4572,
    "latitude" : 27.9506
  }
}

```
