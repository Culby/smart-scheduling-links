# Appointment Type and Reasons - v0.1.0

* [**Table of Contents**](toc.md)
* [**Artifacts Summary**](artifacts.md)
* **Appointment Type and Reasons**

## ValueSet: Appointment Type and Reasons 

| | |
| :--- | :--- |
| *Official URL*:https://smart-scheduling-links.org/ValueSet/appointment-type-and-reasons-vs | *Version*:0.1.0 |
| Draft as of 2026-03-02 | *Computable Name*:AppointmentTypeAndReasonsVS |

 
A value set that combines the preferred and required codes from slot.appointmentType and NDH new patient extension, respectively 

 **References** 

* [SMART Slot](StructureDefinition-smart-slot.md)

### Logical Definition (CLD)

 

### Expansion

-------

 Explanation of the columns that may appear on this page: 

| | |
| :--- | :--- |
| Level | A few code lists that FHIR defines are hierarchical - each code is assigned a level. In this scheme, some codes are under other codes, and imply that the code they are under also applies |
| System | The source of the definition of the code (when the value set draws in codes defined elsewhere) |
| Code | The code (used as the code in the resource instance) |
| Display | The display (used in the*display*element of a[Coding](http://hl7.org/fhir/R4/datatypes.html#Coding)). If there is no display, implementers should not simply display the code, but map the concept into their application |
| Definition | An explanation of the meaning of the concept |
| Comments | Additional notes about how to use the code |



## Resource Content

```json
{
  "resourceType" : "ValueSet",
  "id" : "appointment-type-and-reasons-vs",
  "url" : "https://smart-scheduling-links.org/ValueSet/appointment-type-and-reasons-vs",
  "version" : "0.1.0",
  "name" : "AppointmentTypeAndReasonsVS",
  "title" : "Appointment Type and Reasons",
  "status" : "draft",
  "date" : "2026-03-02T18:28:46+00:00",
  "publisher" : "SMART Scheduling Links",
  "contact" : [{
    "name" : "SMART Scheduling Links",
    "telecom" : [{
      "system" : "url",
      "value" : "http://smart-scheduling-links.org/SMART-Scheduling-Links"
    }]
  }],
  "description" : "A value set that combines the preferred and required codes from slot.appointmentType and NDH new patient extension, respectively",
  "compose" : {
    "include" : [{
      "system" : "http://terminology.hl7.org/CodeSystem/accepting-patients"
    },
    {
      "system" : "http://terminology.hl7.org/CodeSystem/v2-0276"
    }]
  }
}

```
