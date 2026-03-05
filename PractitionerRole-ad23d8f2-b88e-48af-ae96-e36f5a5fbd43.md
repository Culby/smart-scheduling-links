# Example PractitionerRole - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Example PractitionerRole**

## Example PractitionerRole: Example PractitionerRole

Profile: [PractitionerRole](StructureDefinition-smart-scheduling-practitionerRole.md)

**identifier**: `https://healthsystem.example.com/practitioner-role-directory`/ROLE-12345, [United States National Provider Identifier](http://terminology.hl7.org/6.5.0/NamingSystem-npi.html)/1234567890

**active**: true

**period**: 2020-01-01 --> (ongoing)

**practitioner**: [Dr. John Robert Smith](Practitioner-fd3c7a99-bb59-4fef-9f79-88d1f7275ca6.md)

**organization**: [Berkshire Family Medicine](Organization-c3453010-d1ae-4180-937e-86cc11292693.md)

**code**: Physician

**specialty**: General medicine

**location**: [OpenClinTech Primary Clinic](Location-44981b4a-8eae-48f7-bb7f-bf008bbe05af.md)

**telecom**: ph: 413-555-0123, [appointments@berkshirefamilymedicine.example.com](mailto:appointments@berkshirefamilymedicine.example.com)



## Resource Content

```json
{
  "resourceType" : "PractitionerRole",
  "id" : "ad23d8f2-b88e-48af-ae96-e36f5a5fbd43",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-practitionerRole"]
  },
  "identifier" : [{
    "system" : "https://healthsystem.example.com/practitioner-role-directory",
    "value" : "ROLE-12345"
  },
  {
    "system" : "http://hl7.org/fhir/sid/us-npi",
    "value" : "1234567890"
  }],
  "active" : true,
  "period" : {
    "start" : "2020-01-01"
  },
  "practitioner" : {
    "reference" : "Practitioner/fd3c7a99-bb59-4fef-9f79-88d1f7275ca6",
    "display" : "Dr. John Robert Smith"
  },
  "organization" : {
    "reference" : "Organization/c3453010-d1ae-4180-937e-86cc11292693",
    "display" : "Berkshire Family Medicine"
  },
  "code" : [{
    "coding" : [{
      "system" : "http://snomed.info/sct",
      "code" : "309343006",
      "display" : "Physician"
    }]
  }],
  "specialty" : [{
    "coding" : [{
      "system" : "http://snomed.info/sct",
      "code" : "394802001",
      "display" : "General medicine"
    }]
  }],
  "location" : [{
    "reference" : "Location/44981b4a-8eae-48f7-bb7f-bf008bbe05af",
    "display" : "OpenClinTech Primary Clinic"
  }],
  "telecom" : [{
    "system" : "phone",
    "value" : "413-555-0123"
  },
  {
    "system" : "email",
    "value" : "appointments@berkshirefamilymedicine.example.com"
  }]
}

```
