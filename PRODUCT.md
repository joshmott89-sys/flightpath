# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Family watchers (Josh and relatives):** follow a family member's long-haul trip from home on their phones.
- **Dad (80, Perth → Bali):** not confident with technology or communication. Travelling alone to meet Josh's brother (flying Melbourne → Bali). In Bali his phone will have no internet, roaming, calls or texts.
- **Strangers helping Dad:** airport staff, drivers or hotel staff Dad shows his phone to. They may speak Indonesian rather than English.

## Product Purpose
FlightPath lets family see where a traveller is during a trip. For the Bali trip it also has to get Dad and his son together at Bali (DPS) airport and help Dad if they get separated, without relying on Dad's phone having a connection.

## Operating Context
- The tracker (index.html) is a live-journey view family members open during flights.
- Dad's card (card.html) is a separate page Dad opens from a home-screen icon. It has to work fully offline once it has been opened in Australia.
- Meetup plan: Dad stops at an agreed landmark at DPS arrivals and waits there until his son finds him.
- Backup location: Google Find Hub's offline Bluetooth network, plus an optional tracker tag. These are outside the app.

## Capabilities and Constraints
- Static single-file HTML on GitHub Pages; the repo is **public**.
- Personal details (names, phone numbers, photo, hotel, meeting point) must never be committed. They are entered on the device and stored only on that phone (localStorage).
- Offline support comes from a small service worker; the card loads nothing from external sites.
- Dad's card has two sides: reminders for Dad, and a help side in English and Indonesian to show other people.
- Built and maintained from an Android phone.
- Open: flight numbers and times for both travellers have not been provided yet.

## Evidence on Hand
- No real flight data, photos or contact details are in the repo. Never fabricate them; use clearly labelled placeholders or empty states.

## Product Principles
1. Works with no signal: every critical thing on Dad's card is readable offline.
2. One glance, one action: Dad should never need to navigate or read small print.
3. Strangers can help: the help side speaks to them directly in their language.
4. Private by default: nothing personal lives in the public code.

## Accessibility & Inclusion
Primary user is 80 with likely reduced eyesight and dexterity. Use very large type, high contrast, large touch targets, and plain words. Avoid gestures, hidden menus and text that changes on a timer.
