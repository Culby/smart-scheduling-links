# SMART Practitioner - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **SMART Practitioner**

## Resource Profile: SMART Practitioner 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/StructureDefinition/smart-practitioner | *Version*:0.1.0 |
| Draft as of 2026-02-23 | *Computable Name*:SmartPractitioner |

 
This profile sets minimum expections for a Practitioner resource 

**Usages:**

* Refer to this Profile: [SmartPractitionerRole](StructureDefinition-smart-practitionerRole.md)
* Examples for this Profile: [Practitioner/fd3c7a99-bb59-4fef-9f79-88d1f7275ca6](Practitioner-fd3c7a99-bb59-4fef-9f79-88d1f7275ca6.md)

You can also check for [usages in the FHIR IG Statistics](https://packages2.fhir.org/xig/fhir.ig|current/StructureDefinition/smart-practitioner)

### Formal Views of Profile Content

 [Description of Profiles, Differentials, Snapshots and how the different presentations work](http://build.fhir.org/ig/FHIR/ig-guidance/readingIgs.html#structure-definitions). 

 

Other representations of profile: [CSV](StructureDefinition-smart-practitioner.csv), [Excel](StructureDefinition-smart-practitioner.xlsx), [Schematron](StructureDefinition-smart-practitioner.sch) 



## Resource Content

```json
{
  "resourceType" : "StructureDefinition",
  "id" : "smart-practitioner",
  "url" : "https://smart-scheduling-links.org/StructureDefinition/smart-practitioner",
  "version" : "0.1.0",
  "name" : "SmartPractitioner",
  "title" : "SMART Practitioner",
  "status" : "draft",
  "date" : "2026-02-23T18:21:29+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "This profile sets minimum expections for a Practitioner resource",
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
  "type" : "Practitioner",
  "baseDefinition" : "http://hl7.org/fhir/StructureDefinition/Practitioner",
  "derivation" : "constraint",
  "differential" : {
    "element" : [{
      "id" : "Practitioner",
      "path" : "Practitioner"
    },
    {
      "id" : "Practitioner.id",
      "path" : "Practitioner.id",
      "min" : 1,
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.identifier",
      "path" : "Practitioner.identifier",
      "min" : 1,
      "max" : "1",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.identifier.use",
      "path" : "Practitioner.identifier.use",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.identifier.system",
      "path" : "Practitioner.identifier.system",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.identifier.value",
      "path" : "Practitioner.identifier.value",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.active",
      "path" : "Practitioner.active",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name",
      "path" : "Practitioner.name",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.use",
      "path" : "Practitioner.name.use",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.text",
      "path" : "Practitioner.name.text",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.family",
      "path" : "Practitioner.name.family",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.given",
      "path" : "Practitioner.name.given",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.prefix",
      "path" : "Practitioner.name.prefix",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.suffix",
      "path" : "Practitioner.name.suffix",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.name.period",
      "path" : "Practitioner.name.period",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom",
      "path" : "Practitioner.telecom",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom.system",
      "path" : "Practitioner.telecom.system",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom.value",
      "path" : "Practitioner.telecom.value",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom.use",
      "path" : "Practitioner.telecom.use",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom.rank",
      "path" : "Practitioner.telecom.rank",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.telecom.period",
      "path" : "Practitioner.telecom.period",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address",
      "path" : "Practitioner.address",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.use",
      "path" : "Practitioner.address.use",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.type",
      "path" : "Practitioner.address.type",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.text",
      "path" : "Practitioner.address.text",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.line",
      "path" : "Practitioner.address.line",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.city",
      "path" : "Practitioner.address.city",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.district",
      "path" : "Practitioner.address.district",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.state",
      "path" : "Practitioner.address.state",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.postalCode",
      "path" : "Practitioner.address.postalCode",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.country",
      "path" : "Practitioner.address.country",
      "mustSupport" : true
    },
    {
      "id" : "Practitioner.address.period",
      "path" : "Practitioner.address.period",
      "mustSupport" : true
    }]
  }
}

```
