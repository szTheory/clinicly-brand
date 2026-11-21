# Clinicly brand

Version 0.3, November 12, 2026. This is the complete text of the brand book (`clinicly-brand-book.html`), page by page, for people and AI assistants. The same rules as structured data are in `brand.json`; colors, type and sizes in `tokens.json`; every file is explained in `assets/README.md`.

**Read this first.** Clinicly is a fictional brand, made to give FableBook demo screens a believable clinic app. The name is not cleared: other products already use the name Clinicly. Clinicly is a clinic app for phone and desktop. It helps a patient book an appointment in a few minutes and helps a clinic see its day at a glance. Light is the default theme and dark is a full theme. The logo is the symbol (a disc with one wedge pulled out) and the word with a set gap, with no shape behind it and no tagline. Cornflower is the accent for the one thing to do and the time you chose; it is never a status and never small text on a light ground. There are two status families, appointment (Scheduled, Completed, Canceled, Missed) and reminder (Scheduled, Sent, Not sent), each status a word and an icon with light and dark colors that back them up. The 15 contrast pairs have stable ids (body, descriptor, caption, application-copy, hero, link, focus, artwork, button-label, slot-selected, slot-border, field-border, error, error-banner, banner) in both themes. Arabic appears only as usage examples and every Arabic line is not reviewed by a native reader. This edition has no logo animation and no sound. Its application pages are drawn from a records file, handed over beside this folder in `records/clinicly/` with its check.

## Brand at a glance

Book a time that is really free.Clinicly is a clinic app for phone and desktop. It helps a patient book an appointment in a few minutes and helps a clinic see its day at a glance.

### Color

**Paper** #F7F6F2 **Navy Ink** #16202C **White** #FFFFFF **Fog** #ECEBE5 **Cornflower** #5373A9 **Cornflower Tint** #DDE6F3

### Type

Rubik for everything in English, and its own Arabic letters for Arabic examples.

### Voice

Calm and plain: Clinicly says what happened and what to do next, in the words a person would use.

### Three rules

1. The name is Clinicly: one word, capital C. Never CLINICLY or ClinicLy.
2. Cornflower is the accent for one thing to do and the time you chose. Never a status, never small text on a light ground.
3. The logo is the symbol and the word with a set gap. Never a shape behind it, and never a tagline in it.

Clinicly is a fictional brand, made to give FableBook demo screens a believable clinic app. The name is not cleared: other products already use the name Clinicly.

## Positioning and values

**Clinicly is a clinic app for phone and desktop. It helps a patient book an appointment in a few minutes and helps a clinic see its day at a glance.**

### The job

Help me find a time that is really free, book it, and trust that it is booked.

### What clinicly does for the person

**Times you can pick**

Every slot on screen is one you can book. A slot that has just been taken says so and offers other times.

**Calm about care**

No blame, no jokes about failures and no promises about outcomes. Words are plain and short.

**Private by default**

A screen a person cannot open names the screen, not the patient. Reminder text never repeats a visit note.

**Clear in any language and size**

The layout holds in English and Arabic, in light and dark, and at larger text sizes.

**Quiet about itself**

Cornflower marks the one thing to do and the time you chose. Nothing else on the screen shouts.

## The idea

**A slot of the day, pulled out for one person**

People open a clinic app to do two things: find a time that is really free and know it is booked. Clinicly shows both with one shape. The disc is the day. The wedge pulled out of it is a slot, taken for one person.

The wedge is Cornflower, the one accent, and the disc is the ink color. The same disc repeats as the dots over the two i’s in the word.

The word is Clinicly, set in Rubik Bold and outlined. The symbol and the word are two units with a set gap between them.

## Personas and jobs

### Who reads this book

**FableBook maintainers**

Build demo screens for the UI catalog and need exact values.

What color is a Missed appointment, what does a time that was just taken say, what does the logo look like at 16 px, and which icons flip in Arabic?

**Coding assistants and other LLM tools**

Turn this book into scenarios and screens.

Structured values, contrast pairs, real copy, and one name for each thing.

### Who uses clinicly, in their own words

J

**Jo Marsh, 34, patient**

Books on a lunch break, with one thumb, between a meeting and a sandwich.

“I only have a few minutes. Show me times I can actually pick.”

**Clinicly shows:** Big rounded time slots, one accent, and a Book appointment button with a label she can read at a glance.

S

**Sam Lindqvist, volunteer at the front door**

Checks who is expected, glancing from the entrance to a screen.

“I just need to know who is next.”

**Clinicly shows:** Names and times, strong and large, and nothing else: a read-only role sees no patient details.

L

**Layla Haddad, patient who reads Arabic**

Reads Arabic and uses a few English words for dates and the clinician’s name.

“Please do not mix up the order of the date.”

**Clinicly shows:** Right-to-left screens where Arabic, a Latin clinician name and a reference like APT-0042 each stay in the right order.

## Access roles and permission outcomes

**Four roles. What each can open, and what a denied screen says.**

| Role | Can | Cannot | When it cannot |
| --- | --- | --- | --- |
| **Front desk coordinator**Maribel Okafor | Open the day, patients and appointments; book, reschedule and cancel; see reminder status. | Open visit notes. | A screen that says visit notes are not available to this role, with no patient details on it. |
| **Clinician**Ana Reyes | Read the day; read and write the visit notes of her own patients. | Open another clinician’s notes. | A screen that names what cannot be opened and where to ask. |
| **Clinic manager**Priya Raman | Open everything the other roles can, including reminder status for the whole day. | Edit a visit note she did not write. | The note opens read-only, with the word Read-only beside it. |
| **Read-only**Sam Lindqvist | See names and times of today’s appointments. | Open a patient’s details. | A screen that says he does not have access and reveals nothing about the patient. |

A denied screen names what cannot be opened and where to ask. It never shows a patient’s name, a time or any detail from behind it. Every person and role here is fictional.

## Voice: the tone dial

**Calm and plain: Clinicly says what happened and what to do next, in the words a person would use.**

- A time that was just taken: 0 of 4 toward warm. “That time was just taken. Choose another time.”
- A note that did not save: 0 of 4 toward warm. “The note was not saved. Your text is still here. Try again.”
- A screen you cannot open: 0 of 4 toward warm. “You do not have access to patient details. Ask the clinic manager.”
- A reminder that did not send: 1 of 4 toward warm. “Reminder not sent. No phone number on file.”
- A booking confirmed: 2 of 4 toward warm. “Booked. Friday, Oct 30 at 9:30 AM EDT with Ana Reyes.”
- A welcome to the clinic: 3 of 4 toward warm. “Welcome to Harbor Street Clinic. Pick a time that suits you.”

The voice never changes; the tone shifts with where the words appear. Clinicly is plain when something goes wrong and a little warmer when someone has just booked. It never makes a joke about a failure, never promises a clinical outcome and never gives medical advice.

## Voice: this, not that

- Say: “That time was just taken. Choose another time.” Not: “Oops! Someone beat you to it.”
- Say: “The note was not saved. Your text is still here. Try again.” Not: “Error: save failed.”
- Say: “You do not have access to patient details. Ask the clinic manager.” Not: “Access denied for Jo Marsh.”
- Say: “Reminder not sent. No phone number on file.” Not: “Reminder failed.”
- Say: “Booked. Friday, Oct 30 at 9:30 AM EDT with Ana Reyes.” Not: “Your slot is locked in!”
- Say: “Your reminder says only the time, the clinic and how to change it.” Not: “Your reminder says how your knee is doing.”

### Write for the people reading

- **Start from the person.** Say what they were doing and what happened before any technical word.
- **Say what to do next.** Every message about a problem ends with a step: Try again, choose another time, ask the clinic manager.
- **Name the screen, not the patient.** A denied screen names what cannot be opened; it never shows who or what is behind it.
- **Write for larger text and for Arabic.** Short lines and plain words still read well 30% larger and when translated.

## How to write our name

**Clinicly**

Clinicly, one word with a capital C, in running text. In code, files and web addresses it is `clinicly`.

### The name is not cleared

The name is not cleared. It was checked on November 11, 2026 against the US, United Arab Emirates and Saudi Arabia app stores through a loose search, and against four web addresses by DNS only; three of the four addresses are held by others. No app of exactly this name appeared in the US store results, which is not proof of anything. Trademark registers, other regions and other languages were not searched. This is not proof of availability or of a legal conflict. Clinicly is kept because it is a fictional brand.

### Not like this

- ~~CLINICLY~~: except as a 12 px label in capitals
- ~~ClinicLy, Clinic.ly~~: one word, one capital
- ~~clinicly~~: in running text (code and addresses only)
- ~~Clinicly’s app, the Clinicly platform~~: Clinicly is the app; say Clinicly

### Describing it

Call it “a clinic app for phone and desktop”. Describe what it does in the user’s terms: appointments, patients, visit notes, reminders.

## Vocabulary

**The words Clinicly depends on.**

| Term | What it means here | Instead of |
| --- | --- | --- |
| **Patient** | The person receiving care. | ~~client~~, ~~customer~~, ~~member~~ |
| **Clinician** | The person providing care. One word, always. | ~~provider~~, ~~practitioner~~, ~~doctor~~ |
| **Appointment** | A scheduled booking. | ~~session~~, ~~reservation~~ |
| **Slot** | An available start time and length. | ~~window~~ |
| **Visit** | A care encounter that actually took place; not the booking. |  |
| **Visit note** | The text recorded for a visit. | ~~chart~~, ~~report~~ |
| **Reminder** | The message about an appointment. | ~~alert~~ |
| **Clinic** | The place that provides care. One word, always. | ~~practice~~, ~~facility~~ |

### The five actions, the same on every screen

The actions are Book appointment, Reschedule, Cancel appointment, Save note and Try again, used the same way on every screen. Appointment statuses are Scheduled, Completed, Canceled and Missed; reminder delivery is Scheduled, Sent and Not sent. In FableBook’s words, a scenario is one screen in one case and a case is what a user is going through: the happy path, empty, many, an error, long text. Clinicly’s own words are the ones above.

## Logo: on light, the default theme

**One color.** Navy Ink on Paper. The same drawing in a single color: Navy Ink on light and Mist on dark, in the files named mono and mono-dark. The notch the wedge leaves carries the idea, so nothing is redrawn.

**The gap, measured.** The symbol and the word are two units. The smallest horizontal distance between them, measured row by row from the ink of the symbol to the ink of the word, is 0.30 of the height of a capital letter. Do not widen it, close it or retype the word.

**The symbol alone.** For avatars and the corner of a screen where the name needs no repeating. Below 32 px tall, use the small master.

**Light is the default theme.** The logo has a version for each theme. On light the wedge is Cornflower; on dark it is Cornflower Light. Use the version made for the background; do not make one by inverting the other.

## Logo: on dark

**One color.** Mist on Night. The same drawing in a single color: Navy Ink on light and Mist on dark, in the files named mono and mono-dark. The notch the wedge leaves carries the idea, so nothing is redrawn.

**The gap, measured.** The symbol and the word are two units. The smallest horizontal distance between them, measured row by row from the ink of the symbol to the ink of the word, is 0.30 of the height of a capital letter. Do not widen it, close it or retype the word.

**The symbol alone.** For avatars and the corner of a screen where the name needs no repeating. Below 32 px tall, use the small master.

**The dark theme.** The logo has a version for each theme. On light the wedge is Cornflower; on dark it is Cornflower Light. Use the version made for the background; do not make one by inverting the other.

## Symbol, favicon, app tile and avatar

**Drawn for small sizes.**

### Small sizes: 32 and 16 px

### App tile and avatar

The app tile is a Cornflower square with the whole symbol in White; the dark tile is Night High with a Mist disc and a Cornflower Light wedge. The favicon is the small master, drawn as vector art, so it stays smooth on high-density screens; the PNG and ICO files at 16 and 32 px are renders of the same drawing.

The browser tab follows the theme: `favicon.svg` uses the light drawing on a light device and the dark drawing on a dark one. The `.ico` has the light drawing only, because an ICO cannot change with the theme.

## Clear space and minimum size

Keep clear space on every side of at least 8 px and never less than the height of a dot over an i in the lockup, measured from the outermost ink. Nothing enters it: no text, edge or other logo. The square is that distance.

### On screenshots and photographs

- Place the logo on a calm area at least as wide as the logo and its clear space.
- Use the light drawing on a light area and the dark drawing on a dark one. If neither reads well, move the logo.
- Do not put a shape or a shadow behind it to make it read.

### Minimum size

|   | Screen | Print |
| --- | --- | --- |
| **Full logo** | 16 px tall | Not specified |
| **Symbol** | 24 px tall; use the small master below 32 px | Not specified |
| **Favicon** | 16 px, hand-fitted | Not specified |

On screen the full logo is never smaller than 16 px tall, the symbol alone never smaller than 24 px (below that use the small master or the favicon) and a favicon never smaller than 16 px. Print sizes are not specified in this edition.

### What the symbol can be mistaken for

A disc with a wedge out of it is also what a pie graph looks like, and at 16 px the wedge is a small notch. What keeps it from reading as a graph: there is only ever one wedge, pulled out and rounded, never a set of slices, never labeled and never sized by a value. Do not place it beside data graphs.

## Logo: misuse

✕Don’t put a plate or a shape behind the logo.

✕Don’t widen or close the gap between the symbol and the word.

✕Don’t add a tagline or any text to the logo.

✕Don’t set the disc in Cornflower or the wedge in Navy Ink.

✕Don’t stretch or squeeze the logo.

✕Don’t recolor the logo to a status color.

✕Don’t outline the logo.

✕Don’t rotate the symbol, move the wedge or put it back in the disc.

## Color: light, the default

**Paper**

#F7F6F2 RGB 247 246 242

The page background. Light is the default theme.

About 46% of a light screen.

**Navy Ink**

#16202C RGB 22 32 44

Text and links, and the disc of the logo. The one near-black.

About 8% of a light screen.

**White**

#FFFFFF RGB 255 255 255

Cards, fields and time slots, and the label on the Book appointment button.

About 20% of a light screen.

**Fog**

#ECEBE5 RGB 236 235 229

Raised fills and the ground of the offline and reconnecting banner.

About 6% of a light screen.

**Cornflower**

#5373A9 RGB 83 115 169

The accent: the Book appointment button, the selected time, the focus ring and the wedge of the logo. White text sits on it.

About 8% of a light screen.

**Cornflower Tint**

#DDE6F3 RGB 221 230 243

The fill of the selected time slot.

About 3% of a light screen.

**Slate**

#4A5666 RGB 74 86 102

Secondary text and captions.

About 4% of a light screen.

**Border Strong**

#7B8595 RGB 123 133 149

The outline of fields and time slots, dark enough to see.

About 2% of a light screen.

**Error Red**

#C42B13 RGB 196 43 19

Error text a person can act on, always beside words and an icon.

About 1% of a light screen.

**Hairline**

#D6D5CD RGB 214 213 205

Dividers and card borders. Never the only boundary of a control.

About 2% of a light screen.

## Color: dark

**Night**

#0F1620 RGB 15 22 32

The page background in the dark theme, and the label on the dark Book appointment button.

About 46% of a dark screen.

**Mist**

#D0D8E4 RGB 208 216 228

Text and the disc of the logo; softer than white so a full screen of it does not glare.

About 8% of a dark screen.

**Night Raised**

#172131 RGB 23 33 49

Cards, fields and time slots.

About 20% of a dark screen.

**Night High**

#202D42 RGB 32 45 66

Raised fills and the ground of the offline and reconnecting banner.

About 6% of a dark screen.

**Cornflower Light**

#B1C5EE RGB 177 197 238

The accent on dark: the Book appointment button, the selected time, the focus ring and the wedge.

About 8% of a dark screen.

**Cornflower Night**

#22324D RGB 34 50 77

The fill of the selected time slot.

About 3% of a dark screen.

**Mist Gray**

#A0ACBE RGB 160 172 190

Secondary text and captions.

About 4% of a dark screen.

**Border Strong Dark**

#7E8CA3 RGB 126 140 163

The outline of fields and time slots.

About 2% of a dark screen.

**Error Light**

#EE9580 RGB 238 149 128

Error text on dark, always beside words and an icon.

About 1% of a dark screen.

**Night Line**

#33435C RGB 51 67 92

Dividers and card borders.

About 2% of a dark screen.

## Color: contrast pairs

| Role | Where it is used | Light | Dark | Minimum |
| --- | --- | --- | --- | --- |
| **Body text** | Reading text in this book and in documents. | Aa15.20:1 | Aa12.65:1 | 4.5:1 |
| **Secondary text** | Descriptions and metadata under a title. | Aa6.90:1 | Aa7.90:1 | 4.5:1 |
| **Caption** | Captions, times and time zones on a card. | Aa7.46:1 | Aa7.03:1 | 4.5:1 |
| **Text in the app** | Names and notes on a card, row or form. | Aa16.44:1 | Aa11.26:1 | 4.5:1 |
| **Headline, large** | A large headline, 24 px and up. Cornflower on Paper only just clears 3:1, so never small text. | Aa4.42:1 | Aa10.45:1 | 3:1 |
| **Link** | Links. Navy Ink on light, Mist on dark, underlined. | Aa16.44:1 | Aa11.26:1 | 4.5:1 |
| **Focus ring** | The 3 px ring on a focused control. Cornflower on light, Cornflower Light on dark. | 4.42:1 | 10.45:1 | 3:1 |
| **Logo and artwork** | The logo, read as a shape, not as text. | 4.42:1 | 10.45:1 | 3:1 |
| **Button label** | White on Cornflower; Night on Cornflower Light. Any text on the accent fill. | Aa4.78:1 | Aa10.45:1 | 4.5:1 |
| **Selected time** | Text on the selected time slot. | Aa13.06:1 | Aa8.96:1 | 4.5:1 |
| **Time slot outline** | The outline of a time slot that can be chosen. | 3.72:1 | 4.75:1 | 3:1 |
| **Field outline** | The outline of a form field. | 3.72:1 | 4.75:1 | 3:1 |
| **Error text** | A message a person can act on, beside an icon. | Aa5.67:1 | Aa7.12:1 | 4.5:1 |
| **Error on the banner** | Error text on the banner ground. | Aa4.74:1 | Aa6.10:1 | 4.5:1 |
| **Offline banner** | Text on the Offline and Reconnecting banners. | Aa13.76:1 | Aa9.65:1 | 4.5:1 |

### About these ratios

Ratios are WCAG 2.2 contrast, computed from the hex values. Text and labels need 4.5:1; a large headline, the focus ring, artwork and outlines need 3:1. A pair that passes here says nothing about a whole product built with it, or about whether a screen reads well. Hairline only divides; it is never the only boundary of a control.

### Never

- **Cornflower** as small text on Paper or White (4.42:1 on Paper)
- **Cornflower or Cornflower Light** as a status, a warning or an error
- **Hairline or Night Line** as the only boundary of a control
- **Error Red or Error Light** as anything but error text and the Not sent status, and never without words and an icon

## Tokens

**Neutral names, two themes, one role map.**

| Role | Light | Dark |
| --- | --- | --- |
| **background** | `color.paper` | `color.night` |
| **surface** | `color.white` | `color.night-raised` |
| **raised** | `color.fog` | `color.night-high` |
| **line** | `color.hairline` | `color.night-line` |
| **text** | `color.navy-ink` | `color.mist` |
| **muted** | `color.slate` | `color.mist-gray` |
| **accent** | `color.cornflower` | `color.cornflower-light` |
| **selected** | `color.cornflower-tint` | `color.cornflower-night` |
| **outline** | `color.border-strong` | `color.border-strong-dark` |
| **error** | `color.error-red` | `color.error-light` |
| **banner** | `color.fog` | `color.night-high` |
| **banner-text** | `color.navy-ink` | `color.mist` |
| **focus** | `color.cornflower` | `color.cornflower-light` |
| **on-accent** | `color.white` | `color.night` |

### What is in tokens.json

- **Color** 20Named colors for both themes
- **Status** 28Text and ground for each status word, light and dark
- **Spacing** 8The 4 px scale, control height and the hour height
- **Radius** 4Card, button, block and pill
- **Focus** 2Ring width and offset
- **Logo** 4Clear space and minimum sizes
- **Typography** 8Eight roles in Rubik and Rubik Arabic

The file follows the W3C design tokens format (color, dimension and typography types), with the light and dark role map under `clinicly.mode`. Names are neutral: map them to your own system. A status token never points at an accent, and no token is a UI component.

## Color: light, dark and direction

**Light first, dark complete, and the direction on its own.**

- Light is the default because patients book in daylight on a phone and staff read the day under room lighting. Paper is the page, White the cards.
- Dark is complete, not an inversion: its own lighter Cornflower, its own softer text (Mist, not white), its own error color and its own status colors, every pair checked.
- Color scheme and text direction change independently: any of the four combinations (light or dark, left-to-right or right-to-left) is a real screen. The booking card is the same in each; only the values and the reading order change.

### Try it

The switch is a demonstration in this book. In FableBook the same two settings are cases of one screen.

The same booking card, switched between light, dark, left to right and right to left. Arabic wording not reviewed by a native reader.

## Status: appointment

**Four appointment statuses. A word and an icon first.**

| Word | Light | Dark | Values, light then dark | Means |
| --- | --- | --- | --- | --- |
| **Scheduled** | #2C5A80 on #E4EDF5#5FA3EA on #1B2E44 | The appointment is booked and has not happened yet. |
| **Completed** | #2B2F33 on #E7E8EA#E2DFD6 on #2D2C2A | The appointment took place. |
| **Canceled** | #5B6168 on #EEEEEC#939BA8 on #23272D | The appointment was canceled. It stays in the record. Canceled is not an error. |
| **Missed** | #6B4A12 on #F8EAD2#EBC27A on #40301A | The patient did not come. Missed is not an error. |

A status is a word and an icon first; its color only backs them up. The two Scheduled words are told apart by a family label (Appointment or Reminder) and by different icons, a calendar and a bell, and the two are never drawn on one chip. Cornflower is never a status. There is no clinical severity scale: no red, amber and green triage. When a status is unknown, show the plain word Unknown in the muted text color with no icon, never a guessed status.

## Status: reminder

**Three reminder statuses, apart from the appointment’s.**

| Word | Light | Dark | Values, light then dark | Means |
| --- | --- | --- | --- | --- |
| **Scheduled** | #2F5F63 on #E1EEEE#5FCBC0 on #173836 | A reminder is queued to send. |
| **Sent** | #33404D on #E6EBF0#8BA0BE on #26334A | The reminder was sent to the patient. |
| **Not sent** | #C42B13 on #FBE3DE#EE9580 on #4A2420 | The reminder could not be sent, for example when there is no phone number. Shown with Try again. The only status in the error color. |

A status is a word and an icon first; its color only backs them up. The two Scheduled words are told apart by a family label (Appointment or Reminder) and by different icons, a calendar and a bell, and the two are never drawn on one chip. Cornflower is never a status. There is no clinical severity scale: no red, amber and green triage. When a status is unknown, show the plain word Unknown in the muted text color with no icon, never a guessed status.

## Type

Regular (400), SemiBold (600) and Bold (700). Bold for the logo word and large headlines; SemiBold for headings, names and labels; Regular for text and notes.

Everything in English: the logo word, headings, names, times, notes and labels.

A softly rounded sans that stays friendly without being childish, with figures of equal width (tabular numerals) for times and references. It draws a capital I and a lowercase l as the same bar, so identifiers keep a letter prefix and digits.

Regular (400) and SemiBold (600), as a subset of exactly the characters in this book’s examples.

Arabic in examples only: patient names, short labels, validation text and mixed-direction lines.

Rubik’s own Arabic letters are drawn by the type designer to match the Latin ones in weight, stroke ends and width, so an English clinician name inside an Arabic line does not look pasted in. The Arabic is set 93.3 percent as large so the two read at one size.

Arabic wording not reviewed by a native reader. Both are the same SIL Open Font License 1.1 family, Rubik, from Google Fonts. The license text is in the assets fonts folder.

## Type: sizes in use

- Display: Rubik 700, 40 px on 48 px, tracking -0.4 px; 52 px at the larger text setting. Use: Large headlines and the logo word. One line, two at most.
- Heading: Rubik 600, 22 px on 28 px, tracking 0; 29 px at the larger text setting. Use: Screen titles.
- Name: Rubik 600, 15 px on 20 px, tracking 0; 20 px at the larger text setting. Use: Patient and clinician names in lists and on appointment blocks.
- Body: Rubik 400, 15 px on 21 px, tracking 0; 20 px at the larger text setting. Use: Interface text and notes.
- Label: Rubik 600, 14 px on 20 px, tracking 0; 18 px at the larger text setting. Use: Button and field labels.
- Caption: Rubik 400, 13 px on 20 px, tracking 0; 17 px at the larger text setting. Use: Times, time zones and secondary text.
- Chip: Rubik 600, 12 px on 16 px, tracking 0; 16 px at the larger text setting. Use: Status words in chips.
- Arabic example: Rubik 400, 16 px on 28 px, tracking 0; 21 px at the larger text setting. Use: Arabic in examples, on a taller line.

The larger setting is 130% of each size, rounded. It is a default to confirm, listed on To review. Arabic wording not reviewed by a native reader.

## Type: Arabic in use

**The same screen, left to right and right to left.**

Arabic appears here only as usage examples. Clinicly has no Arabic type system, voice or localized pages, and every Arabic line in this book is a model’s wording, labeled as not reviewed by a native reader.

- The back chevron, the order of the slots and the button row mirror; the clinician’s Latin name, the time and the digits keep their own order.
- Names, labels, validation text and the date are the examples in the subset: 37 sample lines.
- Western digits (0123456789) are the default in both English and Arabic pictures. Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) appear once, as a labeled example beside Western digits.

## Type: Arabic details

**What a right-to-left line has to get right.**

## Type: Arabic mirroring and the font

**What flips, what stays, and the font behind it.**

Source for the mirroring rules and the digit note: Apple Human Interface Guidelines, Right to left, https://developer.apple.com/design/human-interface-guidelines/right-to-left (page data read November 11, 2026: flip icons that show forward or backward motion and progress controls; do not flip clocks, check marks, logos or the digits of a number; Arabic text may use Western or Eastern Arabic numerals). Material Design’s bidirectionality page needs script to render and was not read. This is a reading of a guide, not a native reviewer.

### The font

Rubik’s own Arabic letters are drawn by the type designer to match the Latin ones in weight, stroke ends and width, so an English clinician name inside an Arabic line does not look pasted in. The Arabic is set 93.3 percent as large so the two read at one size.

Both are the same SIL Open Font License 1.1 family, Rubik, from Google Fonts. The license text is in the assets fonts folder.

### The subset

Exactly the 55 distinct characters of the 37 sample lines, in two weights: **31,104 bytes** of a 65,536-byte budget. Latin is **58,364 bytes** of 61,440.

### When a character is missing

If a character is missing from the subset, Chrome falls back to the system’s Arabic face (on macOS, for example, Geeza Pro or Al Bayan). That fallback was not tested on Windows or Android. The page shows a labeled system fallback instead of growing the subset; the full Rubik variable file ships in the handoff for other Arabic sample text.

## Graphic elements

**One shape in the app: the booked block.**

The block is the brand’s only graphic device. It is a rounded rectangle with a 8 px corner radius when it is an appointment on the day view. A block holds a name, a time and a status word, and its left edge carries the status color.

- **An appointment.** A White or Night Raised block with a Hairline border and a 4 px status-colored left edge. The selected appointment has a 2 px Cornflower border.
- **A time slot.** A pill (999 px radius) with a Border Strong outline. The selected slot is filled with Cornflower Tint.

The block never repeats as a pattern, never fills a background, and never frames anything but an appointment or a slot. A block is not a UI component: its states, sizes and variants belong to the app.

## Imagery: the day is the picture

**The day is the picture.**

Edition 1 has no brand photography. Clinicly’s pictures are the screens themselves: real names, real times and the real status words, drawn flat. People appear as a name and an initial on a neutral ground, never on Cornflower or a status color.

The pictures in this book are illustrations drawn from Clinicly’s real labels and structure. They show the layout this book recommends, not screenshots of a product, and every name and time is invented.

### Never

Clinicly is about real people and a real time. Medical clip art says any health product and can read as a promise about care, and a Cornflower or red avatar ground makes a person look like a button or an error.

## Spacing and shape

**One spacing scale, four radii, one focus ring.**

- One spacing scale in 4 px steps: 4, 8, 12, 16, 24, 32 px. Every gap and padding in the screens is one of these; the book’s own pages are checked against the scale.
- Controls are 44 px tall: a button, a field and a time slot. That is also the least size of a tap target.
- Radii: 16 px for cards and panels, 12 px for buttons and fields, 8 px for appointment blocks, and a full pill for time slots and status chips.
- The keyboard focus ring is 3 px wide and 2 px away from the control, Cornflower on light and Cornflower Light on dark, at least 3:1 against what it sits on.
- One hour in the day view is 128 px tall; an appointment block is sized from its start and its length against that.

## Appointments: the day on a desktop

**The day with no appointments**case-day-emptyLight, left to right, English, desktop 1024 by 768, text 100%, online

**One appointment**case-day-oneLight, left to right, English, desktop 1024 by 768, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**A busy day**case-day-busyLight, left to right, English, desktop 1024 by 768, text 100%, onlineArabic wording not reviewed by a native reader

**Overlapping appointments**case-day-overlapLight, left to right, English, desktop 1024 by 768, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**Long clinician and patient names**case-day-long-namesLight, left to right, English, desktop 1024 by 768, text 100%, online

**Missing optional details**case-day-missing-detailsLight, left to right, English, desktop 1024 by 768, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**The day is loading**case-day-loadingLight, left to right, English, desktop 1024 by 768, text 100%, online

**The day could not load**case-day-unavailableLight, left to right, English, desktop 1024 by 768, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**Data that is a little old**case-day-staleLight, left to right, English, desktop 1024 by 768, text 100%, onlineArabic wording not reviewed by a native reader

**The date changes**case-day-date-changeLight, left to right, English, desktop 1024 by 768, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**An appointment that crosses midnight**case-day-midnightLight, left to right, English, desktop 1024 by 768, text 100%, online

**A repeated local time**case-day-repeated-hourLight, left to right, English, desktop 1024 by 768, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a desktop

**The day on a desktop**case-viewport-desktopLight, left to right, English, desktop 1024 by 768, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Appointments: the day on a phone

**A clinic in another time zone**case-day-time-zonesLight, left to right, English, phone 390 by 844, text 100%, online

**The day on a phone**case-viewport-phoneLight, left to right, English, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**Offline**case-offlineLight, left to right, English, phone 390 by 844, text 100%, offlineArabic wording not reviewed by a native reader

**Reconnecting**case-reconnectingLight, left to right, English, phone 390 by 844, text 100%, reconnectingArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**Step 1: choose a clinician**case-book-clinicianLight, left to right, English, phone 390 by 844, text 100%, online

**Step 2: choose a date**case-book-dateLight, left to right, English, phone 390 by 844, text 100%, online

**Step 3: many open times**case-book-slots-manyLight, left to right, English, phone 390 by 844, text 100%, online

**Step 3: one open time**case-book-slots-oneLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**Step 3: no open times**case-book-slots-noneLight, left to right, English, phone 390 by 844, text 100%, online

**Step 4: review**case-book-reviewLight, left to right, English, phone 390 by 844, text 100%, online

**A field with an error**case-book-validationLight, left to right, English, phone 390 by 844, text 100%, online, keyboard

**Booking in progress**case-book-submittingLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**Booking failed, input kept**case-book-failureLight, left to right, English, phone 390 by 844, text 100%, online

**The selected time was just taken**case-book-slot-lostLight, left to right, English, phone 390 by 844, text 100%, online

**Step 4: review, a new time**case-book-review-reselectedLight, left to right, English, phone 390 by 844, text 100%, online

**Booking in progress, new time**case-book-submitting-reselectedLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**Booked**case-book-confirmedLight, left to right, English, phone 390 by 844, text 100%, online

**Booked at the first try**case-book-confirmed-firstLight, left to right, English, phone 390 by 844, text 100%, online

**Step 4: review, first try**case-book-review-firstLight, left to right, English, phone 390 by 844, text 100%, online

**Booking in progress, first try**case-book-submitting-firstLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**Step 3: the time is selected**case-book-slots-firstLight, left to right, English, phone 390 by 844, text 100%, online

**Step 3: picking another time**case-book-slots-reselectLight, left to right, English, phone 390 by 844, text 100%, online

**Step 3: the time is selected, then lost**case-book-slots-lost-firstLight, left to right, English, phone 390 by 844, text 100%, online

**Booking in progress, then lost**case-book-submitting-lostLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Book appointment: every case

**A repeated local time in the slots**case-book-dst-repeatedLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patients: every case

**No patients yet**case-patients-emptyLight, left to right, English, phone 390 by 844, text 100%, online

**One patient**case-patients-oneLight, left to right, English, phone 390 by 844, text 100%, online

**Many patients**case-patients-manyLight, left to right, English, phone 390 by 844, text 100%, online

**A search with no results**case-patients-no-resultsLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patients: every case

**Two patients with the same name**case-patients-duplicatesLight, left to right, English, phone 390 by 844, text 100%, online

**Long names**case-patients-long-namesLight, left to right, English, phone 390 by 844, text 100%, online

**No picture, only initials**case-patients-no-avatarLight, left to right, English, phone 390 by 844, text 100%, online

**Patients are loading**case-patients-loadingLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patients: every case

**Patients could not load**case-patients-unavailableLight, left to right, English, phone 390 by 844, text 100%, online

**No access to patients**case-patients-deniedLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patient details and visit notes: every case

**A patient with no visits**case-patient-no-visitsLight, left to right, English, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**One visit**case-patient-one-visitLight, left to right, English, phone 390 by 844, text 100%, online

**Many visits**case-patient-many-visitsLight, left to right, English, phone 390 by 844, text 100%, online

**Optional details are missing**case-patient-missing-infoLight, left to right, English, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patient details and visit notes: every case

**A long visit note**case-patient-long-noteLight, left to right, English, phone 390 by 844, text 100%, online

**A note opened read-only**case-patient-read-onlyLight, left to right, English, phone 390 by 844, text 100%, online

**Unsaved changes**case-patient-unsavedLight, left to right, English, phone 390 by 844, text 100%, online

**Saving**case-patient-savingLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Patient details and visit notes: every case

**The note did not save**case-patient-save-failedLight, left to right, English, phone 390 by 844, text 100%, online

**Saved**case-patient-savedLight, left to right, English, phone 390 by 844, text 100%, online

**Visit notes are not available**case-patient-deniedLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Reminders: every case

**No reminders**case-reminders-noneLight, left to right, English, phone 390 by 844, text 100%, online

**One reminder**case-reminders-oneLight, left to right, English, phone 390 by 844, text 100%, online

**Many reminders**case-reminders-manyLight, left to right, English, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**No contact method**case-reminders-no-contactLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Reminders: every case

**Reminders are loading**case-reminders-loadingLight, left to right, English, phone 390 by 844, text 100%, online

**Sending failed**case-reminders-send-failedLight, left to right, English, phone 390 by 844, text 100%, online

**Trying again**case-reminders-retry-sendingLight, left to right, English, phone 390 by 844, text 100%, online

**Sent after trying again**case-reminders-retry-sentLight, left to right, English, phone 390 by 844, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Color scheme and direction: the same card four ways

**The booking card in light, left to right**case-combo-light-ltrLight, left to right, English, phone 390 by 844, text 100%, online

**The booking card in dark, left to right**case-combo-dark-ltrDark, left to right, English, phone 390 by 844, text 100%, online

**The booking card in light, right to left**case-combo-light-rtlLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**The booking card in dark, right to left**case-combo-dark-rtlDark, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible. Color scheme and reading direction change independently: these four are the same booking card with only those two settings changed.

## Across screens: focus, text size, motion and connection

**Visible keyboard focus**case-focus-keyboardLight, left to right, English, phone 390 by 844, text 100%, online, keyboard

**Focus moves to the first error**case-focus-errorLight, left to right, English, phone 390 by 844, text 100%, online, keyboard

**Text at 200 percent**case-text-200Light, left to right, English, phone 390 by 844, text 200%, online

**Reflow at 320 px**case-reflow-320Light, left to right, English, phone 320 by 640, text 100%, online

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Across screens: focus, text size, motion and connection

**Reduced motion**case-reduced-motionLight, left to right, English, phone 390 by 844, text 100%, online, reduced motion

**The save is announced**case-announce-saveLight, left to right, English, phone 390 by 844, text 100%, online, keyboard

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible.

## Arabic: application examples

**Appointments in Arabic**case-ar-appointmentsLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**The slot step in Arabic**case-ar-slotsLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**Arabic-Indic digits, once**case-ar-digits-indicLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**A field error in Arabic**case-ar-validationLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible. Arabic wording not reviewed by a native reader. Arabic here is a usage example, not a localized product.

## Arabic: application examples

**A time that was just taken, in Arabic**case-ar-slot-lostLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**A note that did not save, in Arabic**case-ar-save-failedLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

**A reminder in Arabic**case-ar-reminderLight, right to left, Arabic, phone 390 by 844, text 100%, onlineArabic wording not reviewed by a native reader

Each picture is drawn from the case named under it in the records file; its settings are listed there too. These are illustrations drawn from records, not evidence that any product is accessible. Arabic wording not reviewed by a native reader. Arabic here is a usage example, not a localized product.

## User flows

**Booking an appointment**

`flow-book-success` Jo Marsh, 34, patient. "Help me find a time that is really free, book it, and trust that it is booked."

| Step | Action | Case on screen | What the person sees | Values on the screen, then right after |
| --- | --- | --- | --- | --- |
| 1 | Choose Ana Reyes | `case-book-clinician` | The date step opens with Ana Reyes chosen. | step: 1then clinicianId: cn-01; step: 2 |
| 2 | Choose Thursday, Nov 12 | `case-book-date` | The open times for that day appear. | step: 2; date: 2026-11-12then step: 3 |
| 3 | Choose 9:30 AM | `case-book-slots-first` | The time is marked and the review opens. | step: 3; selectedSlotId: sl-1112-0930then step: 4; selectedSlotId: sl-1112-0930 |
| 4 | Press Book appointment | `case-book-review-first` | The button says Booking while the request is sent. | step: 4; bookingRef: APT-0060; submit: idlethen submit: submitting |
| 5 | Wait | `case-book-submitting-first` | The answer comes back and the appointment is booked. | submit: submitting; bookingRef: APT-0060then submit: succeeded; step: confirmed; appointmentStatus: Scheduled |
| 6 | Read the confirmation | `case-book-confirmed-first` | The appointment APT-0060 is Scheduled for 9:30 AM. | step: confirmed; appointmentStatus: Scheduled; bookingRef: APT-0060 |

A flow is an ordered list of steps. Every step names the case on screen when the person acts, the exact action label, what the person sees as a result, the values on that screen and the values right after the action, which the next step's screen shows. FableBook maps each flow to a Journey and each case to a Scenario and keeps these ids.

## User flows

**A visit note that did not save**

`flow-note-save-retry` Ana Reyes, clinician. "Let me write the visit note without losing a word."

| Step | Action | Case on screen | What the person sees | Values on the screen, then right after |
| --- | --- | --- | --- | --- |
| 1 | Type in the note | `case-patient-unsaved` | The note says Unsaved changes. | noteSave: unsavedthen noteSave: unsaved |
| 2 | Press Save note | `case-patient-unsaved` | The note says Saving and keeps the text. | noteSave: unsavedthen noteSave: saving |
| 3 | Wait | `case-patient-saving` | The save fails: the page says the note was not saved, keeps the text and offers Try again. | noteSave: savingthen noteSave: failed |
| 4 | Press Try again | `case-patient-save-failed` | The note says Saving again with the same text. | noteSave: failedthen noteSave: saving |
| 5 | Wait | `case-patient-saving` | The note says Note saved and the live region announces it. | noteSave: savingthen noteSave: saved; announce: Note saved. |
| 6 | Read the note | `case-patient-saved` | The note stays saved with the same text. | noteSave: saved; announce: Note saved. |

The note keeps its text through the failure and the retry; only the save status moves.

## User flows

**The time was taken before confirming**

`flow-book-slot-lost` Jo Marsh, 34, patient. "Help me find a time that is really free, book it, and trust that it is booked."

| Step | Action | Case on screen | What the person sees | Values on the screen, then right after |
| --- | --- | --- | --- | --- |
| 1 | Choose 9:30 AM | `case-book-slots-lost-first` | The time is marked and the review opens. | step: 3; selectedSlotId: sl-1112-0930; bookingRef: APT-0061then step: 4; selectedSlotId: sl-1112-0930 |
| 2 | Press Book appointment | `case-book-review` | The button says Booking while the request for 9:30 AM is sent. | step: 4; selectedSlotId: sl-1112-0930; bookingRef: APT-0061; submit: idlethen submit: submitting |
| 3 | Wait | `case-book-submitting-lost` | The answer comes back: that time was just taken. | submit: submitting; bookingRef: APT-0061then submit: failed; step: 3; selectedSlotId: none; takenSlotId: sl-1112-0930 |
| 4 | Read the notice | `case-book-slot-lost` | The page says that time was just taken, shows 9:30 AM as taken and keeps the other details. | step: 3; selectedSlotId: none; takenSlotId: sl-1112-0930; bookingRef: APT-0061; submit: failed |
| 5 | Choose 10:00 AM | `case-book-slots-reselect` | The new time is marked and the review opens. | selectedSlotId: sl-1112-1000; bookingRef: APT-0061then step: 4; selectedSlotId: sl-1112-1000 |
| 6 | Press Book appointment | `case-book-review-reselected` | The button says Booking while the request for 10:00 AM is sent. The reference is the same. | step: 4; selectedSlotId: sl-1112-1000; bookingRef: APT-0061; submit: idlethen submit: submitting |
| 7 | Wait | `case-book-submitting-reselected` | The answer comes back and the appointment is booked. | submit: submitting; bookingRef: APT-0061then submit: succeeded; step: confirmed; appointmentStatus: Scheduled |
| 8 | Read the confirmation | `case-book-confirmed` | APT-0061 is Scheduled for 10:00 AM. | step: confirmed; appointmentStatus: Scheduled; bookingRef: APT-0061 |

The reference APT-0061 stays the same from the first review to the confirmation, so the person is never given a second booking.

## User flows

**A reminder that did not go out**

`flow-reminder-retry` Priya Raman, clinic manager. "Tell me which reminders did not go out."

| Step | Action | Case on screen | What the person sees | Values on the screen, then right after |
| --- | --- | --- | --- | --- |
| 1 | Read the list | `case-reminders-send-failed` | The reminder says Not sent and offers Try again. | reminderStatus: rm-0044 Not sent |
| 2 | Press Try again | `case-reminders-send-failed` | The reminder shows Scheduled while it is queued. | reminderStatus: rm-0044 Not sentthen reminderStatus: rm-0044 Scheduled |
| 3 | Wait | `case-reminders-retry-sending` | The reminder says Sent. | reminderStatus: rm-0044 Scheduledthen reminderStatus: rm-0044 Sent |
| 4 | Read the list | `case-reminders-retry-sent` | The list shows the reminder as Sent. | reminderStatus: rm-0044 Sent |

A reminder moves from Not sent to Scheduled to Sent; it never moves back.

## Records

**One file, every picture.**

Every illustration in this book is drawn from a case in `clinicly-records.json`. A case names its screen, who is looking, their persona and job, the records it shows, the language and reading direction, the color scheme, the exact viewport and the simulation settings; what changes during a flow sits in its own values.

- Ids are stable and are never reused or renumbered. The ids from the direction round keep their meaning.
- Times are fixed, written with an offset and checked against the clinic's named time zone. The sample today is Friday, 2026-10-30, 09:35.
- A missing value is absent or null, never an empty string; the screen says so in words.
- Names, addresses and numbers are invented; contact addresses use example.test.

### What is in it

| clinics | 2 |
| --- | --- |
| clinicians | 4 |
| patients | 14 |
| appointments | 20 |
| slots | 15 |
| visits | 12 |
| visitNotes | 5 |
| reminders | 5 |
| personas | 6 |
| jobs | 6 |
| cases | 84 |
| flows | 4 |

### Check it

The records and their check are handed over beside this folder, not inside it. Run these from the hand-over folder that holds `records/` and `clinicly-brand/`.

node records/clinicly/check-records.mjs node records/clinicly/check-records.mjs --book clinicly-brand/clinicly-brand-book.html node records/clinicly/check-records.mjs --self-test clinicly-brand/clinicly-brand-book.html

The check proves references resolve, times and offsets agree, overlaps are declared, flows move only through allowed changes, denied screens show nothing about a patient, and every illustration matches its case. It does not prove that any product is accessible or correct.

## Requirements

**What FableBook can check once these screens are built.**

| Requirement | What to check | Where it is drawn |
| --- | --- | --- |
| **Status is never color alone** | Every status shows its word and its icon; the color only backs them up. | case-day-busy, case-reminders-many |
| **Keyboard** | Every control is reachable and works from the keyboard; arrow keys move between times and Enter picks one; the focus ring is at least 2 px and at least 3:1 against what is behind it. | case-focus-keyboard |
| **Errors** | Focus moves to the first field with an error; the error is joined to its field and says what to do; nothing typed is lost. | case-focus-error, case-book-validation, case-book-failure |
| **Announcements** | A save outcome is announced politely (Note saved.) and shown in words; a failure is announced as an urgent message. | case-announce-save, case-patient-save-failed |
| **Denied screens** | A denied screen says what cannot be opened and shows no patient details. | case-patient-denied, case-patients-denied |
| **Text size and reflow** | At 200 percent text and at 320 px wide nothing is cut off and nothing scrolls sideways. | case-text-200, case-reflow-320 |
| **Reduced motion** | With reduced motion on, progress is a still word and the confirmation does not slide. | case-reduced-motion |

These are requirements to verify in a built product. The pictures in this book are illustrations; they verify none of them and are not accessibility evidence.

## Requirements

**Requirements, continued.**

| Requirement | What to check | Where it is drawn |
| --- | --- | --- |
| **Offline and reconnecting** | The last copy stays readable and a line says what will happen to changes. | case-offline, case-reconnecting |
| **Time zones and the repeated hour** | A time names its zone wherever it could be read two ways; the repeated local time on a clock change shows both zones; a time past midnight shows its date. | case-day-time-zones, case-day-repeated-hour, case-day-midnight, case-book-dst-repeated |
| **Right to left** | The page direction is set, back and next chevrons and progress mirror, clocks and check marks do not, and a reference such as APT-0042 stays in order. | case-ar-appointments, case-ar-slots, case-combo-light-rtl |
| **Same name, different person** | Two patients with one display name are told apart by their identifiers. | case-patients-duplicates |
| **One booking through recovery** | The reference stays the same when a time is lost and another is chosen. | flow-book-slot-lost |
| **Reminders leave notes out** | Reminder text never contains visit-note wording. | the records check |
| **Contrast** | Text and labels in both schemes meet the pairs on the contrast page. | the contrast pairs page |

These are requirements to verify in a built product. The pictures in this book are illustrations; they verify none of them and are not accessibility evidence.

## Considered and not needed

**Print**

Clinicly lives on screens. This edition gives no print sizes and no print colors.

**A mascot**

A clinic app is trusted for being clear. A character would compete with the person booking.

**Sound**

Reminder sounds belong to the phone. Edition 1 defines none.

**Motion and logo animation**

The logo is a static symbol and word, and the screens need no signature motion. A motion version can be added later.

**Brand photography**

The day is the picture; people appear as a name and an initial.

**Billing and amounts**

Clinicly does not show prices or invoices in this edition.

## To review

**Choices made in this edition that are easy to change**

1. **Light is the default theme.** The brief asks for light as the default with a complete dark theme, because patients book in daylight and staff read the day under room lighting.
2. **The accent was darkened after a first read.** The first Cornflower gave a 4.16:1 label on the Book appointment button while being declared at 3:1, so the check passed and the reading was right. The accent is now darker, the label is White, and the pair is declared at 4.5:1.
3. **The symbol is a disc with a wedge pulled out.** A rounded block inset in the disc was tried after the first read and dropped: it looked like a toggle or a phone screen, a stock app-icon device. The wedge keeps its own shape, with softened corners.
4. **The asset license is a default.** The logo and book files carry the same terms as the earlier books, labeled as a default until confirmed.
5. **No photography in edition 1.** People appear as a name and an initial on a neutral ground.
6. **The larger text sizes are defaults.** The larger setting is 130% of each size, rounded; the hierarchy is kept, not tested with people at that size.
7. **Clear space and minimum sizes are untested with people.** The numbers come from the logo drawings and a model’s read of size sheets; no person has looked at the logo at 16 px.
8. **The Arabic wording is not reviewed.** Every Arabic line is a model’s wording and is labeled as such. The right-to-left layouts follow Apple’s Right to left guidance, read from its page data, and were not checked with a native reader or on a device.
9. **The Arabic font has one fallback plan.** Rubik Arabic is embedded as a subset of the examples; anything else uses the full variable file in the handoff or a labeled system fallback.
10. **The colors and type are deliberately ordinary.** The owner read them as generic and accepted that for a clinic demo brand. They are chosen to look like a clinic product, not to be distinctive.
11. **The name is not cleared.** Other products use the name Clinicly. It is kept because the brand is fictional.
12. **The proportions of color are estimates.** The percentages on the color pages are estimates of a typical screen, not measurements.
13. **Persona names and roles are invented.** Every person, role and clinic in this book is fictional.
14. **The application pages are examples, not a user interface specification.** The Appointments, Booking, Patients, Visit notes and Reminders pictures are generic drawings of the identity in use, made from the records file. The product decides the real screens. The records file and its check are handed over beside this folder, not inside it.

**Not checked:** Name and trademark clearance were not searched beyond a few app stores and web addresses. Logo legibility was checked on size sheets by a model, not with people. Contrast is computed for the pairs listed here, not for a whole product. The Arabic examples were read by a model, not a native reader. The color scheme and direction switch was exercised in Chrome only. Nothing was run on a real device or in Safari. Print color was not specified.

## Brand assets: which file to use

| You need | Use (in assets/) |
| --- | --- |
| Logo on a light background | `logo/clinicly-lockup-light.svg` `logo/clinicly-symbol-light.svg` `logo/clinicly-symbol-small-light.svg` `logo/clinicly-lockup-light-2048.png` |
| Logo on a dark background | `logo/clinicly-lockup-dark.svg` `logo/clinicly-symbol-dark.svg` `logo/clinicly-symbol-small-dark.svg` `logo/clinicly-lockup-dark-2048.png` |
| One color: single-color jobs | `logo/clinicly-lockup-mono.svg` `logo/clinicly-lockup-mono-dark.svg` `logo/clinicly-symbol-mono.svg` `logo/clinicly-symbol-mono-dark.svg` |
| Favicon | `icon/favicon.svg` `icon/favicon.ico` `icon/favicon-32-light.png` `icon/favicon-16-light.png` `icon/favicon-32-dark.png` `icon/favicon-16-dark.png` |
| App tile and avatar | `icon/clinicly-app-tile-light.svg` `icon/clinicly-app-tile-dark.svg` `icon/clinicly-app-tile-light-1024.png` `icon/clinicly-avatar-light.svg` `icon/clinicly-avatar-dark.svg` `icon/clinicly-avatar-light-512.png` |
| Fonts | `fonts/web/fonts.css` `fonts/variable/Rubik[wght].ttf` `fonts/OFL-Rubik.txt` |

## Contact, approval and legal

**Who to ask, and what is ours.**

### Contact and approval

- Clinicly is fictional and has no owner or approver. Questions about this book go to the FableBook maintainers, through the project’s issue tracker.
- Approval: none is needed to use these files in FableBook demo screens, under the rules in this book.

### Use by others

- FableBook screens, documentation and examples may show the logo unchanged to stand for Clinicly.
- Do not use the logo to suggest that Clinicly, a fictional brand, endorses or certifies a real product or clinic.
- Do not alter the logo, or build a new logo from the symbol.

### Legal

- Clinicly is a fictional brand, made to give FableBook demo screens a believable clinic app.
- The name is not cleared: other products already use the name Clinicly.
- Fonts are SIL Open Font License 1.1; the license text is in the assets fonts folder.
- The logo and this book are released under the same terms as the earlier books in this series, a default to confirm.
