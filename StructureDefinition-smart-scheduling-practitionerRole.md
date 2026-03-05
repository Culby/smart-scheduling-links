# PractitionerRole - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **PractitionerRole**

## Resource Profile: PractitionerRole 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-practitionerRole | *Version*:0.1.0 |
| Draft as of 2026-03-05 | *Computable Name*:SmartSchedulingPractitionerRole |

 
The PractitionerRole resource represents the specific roles that practitioners perform at organizations where appointments are available 

**Usages:**

* Examples for this Profile: [PractitionerRole/ad23d8f2-b88e-48af-ae96-e36f5a5fbd43](PractitionerRole-ad23d8f2-b88e-48af-ae96-e36f5a5fbd43.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-scheduling-practitionerRole)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-scheduling-practitionerRole.csv), [Excel](StructureDefinition-smart-scheduling-practitionerRole.xlsx), [Schematron](StructureDefinition-smart-scheduling-practitionerRole.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-scheduling-practitionerRole",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-practitionerRole",
  "version" : "0.1.0",
  "name" : "SmartSchedulingPractitionerRole",
  "title" : "PractitionerRole",
  "status" : "draft",
  "date" : "2026-03-05T20:47:10+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "The PractitionerRole resource represents the specific roles that practitioners perform at organizations where appointments are available",
  "fhirVersion" : "4.0.1",
  "mapping" : [{
    "identity" : "v2",
    "uri" : "http://hl7.org/v2",
    "name" : "HL7 v2 Mapping"
  },
  {
    "identity" : "rim",
    "uri" : "http://hl7.org/v3",
    "name" : "RIM Mapping"
  },
  {
    "identity" : "servd",
    "uri" : "http://www.omg.org/spec/ServD/1.0/",
    "name" : "ServD"
  },
  {
    "identity" : "w5",
    "uri" : "http://hl7.org/fhir/fivews",
    "name" : "FiveWs Pattern Mapping"
  }],
  "kind" : "resource",
  "abstract" : false,
  "type" : "PractitionerRole",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/PractitionerRole",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "PractitionerRole",
      "path" : "PractitionerRole"
    },
    {
      "id" : "PractitionerRole.id",
      "path" : "PractitionerRole.id",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.identifier",
      "path" : "PractitionerRole.identifier",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.active",
      "path" : "PractitionerRole.active",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.period",
      "path" : "PractitionerRole.period",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.period.start",
      "path" : "PractitionerRole.period.start",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.period.end",
      "path" : "PractitionerRole.period.end",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.practitioner",
      "path" : "PractitionerRole.practitioner",
      "type" : [{
        "code" : "Reference",
        "targetProfile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-practitioner"]
      }],
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.organization",
      "path" : "PractitionerRole.organization",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.code",
      "path" : "PractitionerRole.code",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.specialty",
      "path" : "PractitionerRole.specialty",
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.location",
      "path" : "PractitionerRole.location",
      "type" : [{
        "code" : "Reference",
        "targetProfile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-location"]
      }],
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.healthcareService",
      "path" : "PractitionerRole.healthcareService",
      "type" : [{
        "code" : "Reference",
        "targetProfile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-healthcare-service"]
      }],
      "mustSupport" : true
    },
    {
      "id" : "PractitionerRole.telecom",
      "path" : "PractitionerRole.telecom",
      "mustSupport" : true
    }]
  }
}

```
