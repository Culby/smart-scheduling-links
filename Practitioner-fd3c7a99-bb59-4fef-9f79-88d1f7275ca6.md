# Example Practitioner - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Example Practitioner**

## Example Practitioner: Example Practitioner

Profile: [Practitioner](StructureDefinition-smart-scheduling-practitioner.md)

**identifier**: [United States National Provider Identifier](http://terminology.hl7.org/6.5.0/NamingSystem-npi.html)/npi-8373s (use: usual, )

**active**: true

**name**: John Mark(Nickname), Mark 

**telecom**: [+1-93-736-544](tel:+1-93-736-544), [johnmark@user.com](mailto:johnmark@user.com)

**address**: Seattle Washington 98106 (work)



## Resource Content

```json
{
  "resourceType" : "Practitioner",
  "id" : "fd3c7a99-bb59-4fef-9f79-88d1f7275ca6",
  "meta" : {
    "profile" : ["https://smart-scheduling-links.org/StructureDefinition/smart-scheduling-practitioner"]
  },
  "identifier" : [{
    "use" : "usual",
    "system" : "http://hl7.org/fhir/sid/us-npi",
    "value" : "npi-8373s"
  }],
  "active" : true,
  "name" : [{
    "use" : "nickname",
    "text" : "John Mark",
    "family" : "John"
  },
  {
    "given" : ["Mark"],
    "prefix" : ["Dr."]
  }],
  "telecom" : [{
    "system" : "phone",
    "value" : "+1-93-736-544",
    "use" : "mobile"
  },
  {
    "system" : "email",
    "value" : "johnmark@user.com",
    "use" : "work"
  }],
  "address" : [{
    "use" : "work",
    "type" : "physical",
    "city" : "Seattle",
    "state" : "Washington",
    "postalCode" : "98106"
  }]
}

```
