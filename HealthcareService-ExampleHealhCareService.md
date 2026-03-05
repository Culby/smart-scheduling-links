# ExampleHealhCareService - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **ExampleHealhCareService**

## Example HealthcareService: ExampleHealhCareService

Profile: [Healthcare Service](StructureDefinition-smart-scheduling-healthcare-service.md)

**active**: true

**providedBy**: [ACME Health System](Organization-c3453010-d1ae-4180-937e-86cc11292693.md)

**category**: General Practice

**type**: Primary Care Visit

**specialty**: General practice

**location**: [OpenClinTech Primary Clinic](Location-44981b4a-8eae-48f7-bb7f-bf008bbe05af.md)

**name**: Primary Care Appointments - Online Booking

**comment**: Book your primary care appointment online. Appointments available with next available provider. For urgent needs, please call our office or visit urgent care.

**telecom**: ph: (555) 123-4567(Work), [appointments@acmehealth.org](mailto:appointments@acmehealth.org), [https://appointments.acmehealth.org](https://appointments.acmehealth.org)

**serviceProvisionCode**: Fees apply

**appointmentRequired**: true

> **availableTime****daysOfWeek**: Monday, Tuesday, Wednesday, Thursday, Friday**availableStartTime**: 08:00:00**availableEndTime**: 17:00:00

**availabilityExceptions**: Closed on major holidays. Online booking available 24/7 for future appointments.



## Resource Content

```json
{
  "resourceType" : "HealthcareService",
  "id" : "ExampleHealhCareService",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-healthcare-service"]
  },
  "active" : true,
  "providedBy" : {
    "reference" : "Organization/c3453010-d1ae-4180-937e-86cc11292693",
    "display" : "ACME Health System"
  },
  "category" : [{
    "coding" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/service-category",
      "code" : "17",
      "display" : "General Practice"
    }]
  }],
  "type" : [{
    "coding" : [{
      "system" : "http://snomed.info/sct",
      "code" : "308335008",
      "display" : "Patient encounter procedure"
    }],
    "text" : "Primary Care Visit"
  }],
  "specialty" : [{
    "coding" : [{
      "system" : "http://snomed.info/sct",
      "code" : "394814009",
      "display" : "General practice"
    }]
  }],
  "location" : [{
    "reference" : "Location/44981b4a-8eae-48f7-bb7f-bf008bbe05af",
    "display" : "OpenClinTech Primary Clinic"
  }],
  "name" : "Primary Care Appointments - Online Booking",
  "comment" : "Book your primary care appointment online. Appointments available with next available provider. For urgent needs, please call our office or visit urgent care.",
  "telecom" : [{
    "system" : "phone",
    "value" : "(555) 123-4567",
    "use" : "work"
  },
  {
    "system" : "email",
    "value" : "appointments@acmehealth.org",
    "use" : "work"
  },
  {
    "system" : "url",
    "value" : "https://appointments.acmehealth.org",
    "use" : "work"
  }],
  "serviceProvisionCode" : [{
    "coding" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/service-provision-conditions",
      "code" : "cost",
      "display" : "Fees apply"
    }]
  }],
  "appointmentRequired" : true,
  "availableTime" : [{
    "daysOfWeek" : ["mon", "tue", "wed", "thu", "fri"],
    "availableStartTime" : "08:00:00",
    "availableEndTime" : "17:00:00"
  }],
  "availabilityExceptions" : "Closed on major holidays. Online booking available 24/7 for future appointments."
}

```
