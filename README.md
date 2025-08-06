# 2025 Proposed Update

This is currently a work-in-progress initiative to update the SMART Scheduling Links to be more generally applicable to FHIR scheduling, benefitting from the learnings from the COVID-19 vaccine era, and generalizing beyond mass vaccine scheduling.

# SMART Scheduling Links
*What if booking clinical appointments looked more like booking airline tickets?*

* See [specification.md](specification.md) for API requirements and details
* See [publisher-advertising.md](publisher-advertising.md) for information on publicising bulk publisher endpoints.
* Chat with us at [#smart/scheduling-links on chat.fhir.org](https://chat.fhir.org/#narrow/stream/281612-smart.2Fscheduling-links)

|Status|
|---|
|Draft proposal for discussion|


## Lightweight, scalable appointment booking API

"SMART Scheduling Links" is a standards-based specification enabling patients to:

1. **find appointment slots** using an appointment booking tool of their choice, searching by geography, specialty, health system, etc
2. **follow a deep link** into the provider's booking portal, to book a specific slot
3. **complete a booking**, e.g., by providing details, answering questions, or submitting referral documentation

We are parsimonious in our use of standards, so that:

* step 1 is standardized with **FHIR Slot Discovery**; then 
* step 2 is standardized with **HTTPS deep-linking conventions**; meanwhile
* step 3 **requires no standardization**, enabling flexible and provider-specific rules to govern the completion of the booking process.
(To be clear, many standards can facilitate step 3, but they're out of scope for SMART Scheduling Links.)

## Roles and responsibilities

This specification defines four functional roles:

* **Slot Discovery Client**: the booking tool of a patient's choice. This system discovers appointment slots on a patient's behalf, and helps the patient choose the best slots to book (e.g., by evaluating trade-offs of travel distance or wait time).

* **Slot Publisher**: the API service offered by a healthcare provider, advertising available slots. A publisher should have an authoritative perspective on slot availability via direct access to the source of truth. Critically, advertising a slot should be low-risk, since the mere fact that a slot is advertised does *not* guarantee that any given patient will be allowed to book the slot; instead, sophisticated rules can be implemented by the...

* **Provider Booking Portal**: the UI service offered by a healthcare provider, enabling a user to book a selected slot. A booking portal should have the authority to directly book into the source of truth. This is the place where provider-specific rules can be implemented, e.g. to ensure that patients booking a specialty appointment are appropriate candidates for that specialist's care. (In many implementations, this UI will be housed within a general-purpose provider-hosted patient portal.)

*  **Slot Aggregator**: an API service offered by third parties, aggregating data from multiple _Slot Publishers_ or from other healthcare provider APIs. _Slot Aggregators_ otherwise act in a similar capacity to _Slot Publishers_ but are not themselves authoritative sources.

## UX Limitations

Examining the SMART Scheduling Links workflow described above, there are some potential user-experience challenges:

* After the hand-off from a Slot Discovery Client into a healthcare provider's system, the user might have to sign
into the healthcare provider's system, or create a new account; and might have to answer all sorts of
provider-specific questions in order to complete a booking.  

* Appointment slot data might become stale, so that by the time a patient signs into the provider's system, the slot is already taken.
   
* Once an appointment booking is completed, the Slot Discovery Client might not have an easy way to learn about
the details of the booking (e.g., was it successful; what is the specific location and timing).

To gain traction and allign with existing efforts we seek to start with SMART scheduling tooling.  This will allow for a methodology for patients to view available appoitnments across EHRs.  Future versions of this IG will seek to build a end-to-end experience where booking is done via API and will maintain client APP experiences.  SMART Scheduling Links provides a more loosely-coupled user experience. But we have strong evidence that this is a viable UX trade-off, because it works just like a very familiar and highly successful booking system.  

## Analogy: airline booking

Cross-industry standards analogies can sometimes be misleading -- but to build up an intuition, it's worth comparing the SMART Scheduling Links workflow with the consumer airline booking experience. Briefly: the Slot Discovery Client plays the same role as a travel booking tool like KAYAK or Hipmunk. These systems help their users search for relevant options across multiple service providers, and help users evaluate trade-offs among these options. Once the user makes a selection, a deep link takes them to a service provider to complete the workflow. The Provider Booking Portal plays the same role as an airline like United or Delta. These systems manage user accounts and enable a booking-completion workflow. They also serve as gatekeepers, e.g. to collect data about a user's background as well as identifiers such as a Known Traveler Number or redress number. They can "call off" the workflow at any point (e.g., if a user is unable to provide the required information, or if a previously-available slot has been booked by another user).

## Calendy Like control
Another useful exemplar is calendy or a similar booking service.  These tools allow users to remove the friction of the back and forth emailing to book an appoitment.  The end user exposes their calendary when and how they want while controling their calander they are able to publish their different types of appointments to a user via a simple scheduling tool that uses a simple url and booking expereince.  This tools saves the calender owner and end user the task of endless emails back and worth to make an appoitment.  

This pattern works well in airline booking, and could dramatically reduce the difficulty of healthcare appointment booking.
