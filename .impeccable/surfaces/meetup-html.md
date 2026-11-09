---
version: 1
slug: "meetup-html"
primary_target: "meetup.html"
related_targets: []
---

# Surface: Family meetup view (meetup.html)

Scope: page Josh and his brother use to follow Dad's PER→DPS flight and the brother's MEL→DPS flight, and to coordinate the meetup at Bali airport. Mode: Operate.
Audience: Josh (at home in Perth) and his brother (travelling, then in Bali with data).
Task: know at a glance where each flight is, who lands first, where Dad waits, and what to do when things go off plan.
Constraints: flight details entered on device and shared by link; nothing personal in the public repo; positions are estimated from the schedule unless opened in Flightradar24.

## Direction contract
FORM: user-steered hybrid of status-first + map (seed:e477bff5f403b858; roll ran degraded)
THESIS: one plain-English status sentence plus a map of both planes converging on Bali. It refuses the old single-flight dashboard grid of altitude and speed filler.
OWN-WORLD: incumbent FlightPath world: #0b0f19 ground, translucent navy cards, system sans, sky #38bdf8 for Dad, lavender #c4b5fd for the brother, amber only for warnings.
STORY: read the sentence, glance at the map, act with Find Dad, Track live or Show my location.
FIRST VIEWPORT: status sentence card, then a map with two arcs PER→DPS and MEL→DPS, plane markers and the meeting point.
SIGNATURE: the two routes drawn in each traveller's colour converge on one meeting-point marker; after landing the map flips to an airport-scale view with You and the meeting point.
RISK: estimated positions read as live; label "estimated from schedule" plainly.
