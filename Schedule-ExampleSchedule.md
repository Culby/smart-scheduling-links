# Example Schedule - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Example Schedule**

## Example Schedule: Example Schedule

Profile: [Schedule](StructureDefinition-smart-scheduling-schedule.md)

**org/StructureDefinition/specialty**: [SNOMED CT: 394802001](http://snomed.info/id/394802001) (General medicine)

**serviceType**: General Practice

**actor**: 

* [Berkshire Family Medicine - Pittsfield](Location-44981b4a-8eae-48f7-bb7f-bf008bbe05af.md)
* [Dr. John Robert Smith](PractitionerRole-ad23d8f2-b88e-48af-ae96-e36f5a5fbd43.md)



## Resource Content

```json
{
  "resourceType" : "Schedule",
  "id" : "ExampleSchedule",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-schedule"]
  },
  "extension" : [{
    "url" : "http://fhir-registry.smarthealthit.org/StructureDefinition/specialty",
    "valueCoding" : {
      "system" : "http://snomed.info/sct",
      "code" : "394802001",
      "display" : "General medicine"
    }
  }],
  "serviceType" : [{
    "coding" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/service-type",
      "code" : "124",
      "display" : "General Practice"
    }]
  }],
  "actor" : [{
    "reference" : "Location/44981b4a-8eae-48f7-bb7f-bf008bbe05af",
    "display" : "Berkshire Family Medicine - Pittsfield"
  },
  {
    "reference" : "PractitionerRole/ad23d8f2-b88e-48af-ae96-e36f5a5fbd43",
    "display" : "Dr. John Robert Smith"
  }]
}

```
