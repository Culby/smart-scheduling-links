# SMART Location - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **SMART Location**

## Resource Profile: SMART Location 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-location | *Version*:0.1.0 |
| Draft as of 2026-02-21 | *Computable Name*:SMARTLocation |

 
This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases 

**Usages:**

* Examples for this Profile: [OpenClinTech Primary Clinic](Location-ExampleSMARTLocation-PrimaryClinic.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-location)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-location.csv), [Excel](StructureDefinition-smart-location.xlsx), [Schematron](StructureDefinition-smart-location.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-location",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-location",
  "version" : "0.1.0",
  "name" : "SMARTLocation",
  "title" : "SMART Location",
  "status" : "draft",
  "date" : "2026-02-21T08:56:44+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "This profile sets minimum expectations for the Location resource to enable SMART Schedule Links use cases",
  "fhirVersion" : "4.0.1",
  "mapping" : [{
    "identity" : "rim",
    "uri" : "http://hl7.org/v3",
    "name" : "RIM Mapping"
  },
  {
    "identity" : "w5",
    "uri" : "http://hl7.org/fhir/fivews",
    "name" : "FiveWs Pattern Mapping"
  }],
  "kind" : "resource",
  "abstract" : false,
  "type" : "Location",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/Location",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "Location",
      "path" : "Location"
    },
    {
      "id" : "Location.identifier",
      "path" : "Location.identifier",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.name",
      "path" : "Location.name",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.description",
      "path" : "Location.description",
      "mustSupport" : true
    },
    {
      "id" : "Location.telecom",
      "path" : "Location.telecom",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.telecom.system",
      "path" : "Location.telecom.system",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.telecom.value",
      "path" : "Location.telecom.value",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.address",
      "path" : "Location.address",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.address.line",
      "path" : "Location.address.line",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.address.city",
      "path" : "Location.address.city",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.address.district",
      "path" : "Location.address.district",
      "mustSupport" : true
    },
    {
      "id" : "Location.address.state",
      "path" : "Location.address.state",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.address.postalCode",
      "path" : "Location.address.postalCode",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Location.position",
      "path" : "Location.position",
      "mustSupport" : true
    },
    {
      "id" : "Location.position.longitude",
      "path" : "Location.position.longitude",
      "mustSupport" : true
    },
    {
      "id" : "Location.position.latitude",
      "path" : "Location.position.latitude",
      "mustSupport" : true
    }]
  }
}

```
