# From the brand books to FableBook: a mapping guide

This guide covers three fictional brand folders made to give FableBook demo screens a believable app: **Logistify** (freight software, version 1.0), **Chatly** (a messaging app, version 0.3) and **Clinicly** (a clinic app, version 0.3). It says what each file is, how the records map onto FableBook's Scenarios and Journeys, where the books and FableBook's older design documents disagree, and what may be reused. Nothing here was imported into FableBook, and nothing in this guide has been checked against FableBook's own code: FableBook decides what each record becomes.

## 1. What this is and what it is not

These are brand books, not a specification of FableBook's user interface. They are a starting point.

- **Binding:** the names and ids in the records, the status words, the color values and their declared contrast pairs, the type choices, the voice rules, and the logo files. These are the identity; keep them unless you have a reason and write the reason down.
- **Not binding:** how the example screens look. The application pictures in the books (a dispatch board, a day view, a booking flow, a driver screen) were drawn to show the identity in use and to give the records something to be checked against. They are decent and they are generic. A fresh design pass is welcome and expected: take the layouts, density and component choices as far forward as FableBook's own judgment and a design-polish pass (the impeccable skill is one way to do it) can take them, as long as the identity and the records hold.
- **Do not copy the pictures' markup or styles.** They are illustrations; nothing in them is a component library.

The books are also honest about what they have not been through: no real device, no product accessibility testing, no native review of the Arabic wording in Clinicly, and no trademark clearance of any of the three names. Each book's "To review" and "Not checked" sections list these.

## 2. What is in a delivered folder

Each folder is named `<brand>-brand` and has the same layout.

| File | What it is |
|---|---|
| `<brand>-brand-book.html` and `.pdf` | The book. The HTML is one file that embeds its fonts, styles and images. |
| `<brand>-one-page.html` and `.pdf` | A one-page summary, also self-contained. |
| `BRAND.md` | The whole text of the book, page by page, for people and assistants. |
| `brand.json` | The book's rules as structured data: colors with roles, type, voice, status words, files and rights. |
| `tokens.json` | Values in a neutral, design-token-style format: colors in a light and a dark theme, spacing, radii, type. |
| `assets/` | Logos, icons, fonts with their licenses, and per brand: social card, sound, motion, photographs or records. `assets/index.html` previews them and `assets/README.md` says which file to use. |

Records live in different places. Chatly's are inside its folder, in `assets/records/` (the JSON and a README). Clinicly's and Logistify's are handed over beside the folders, in this package's `records/` folder, each with its validator: `records/clinicly/` and `records/logistify/`. Logistify's and Chatly's folders were delivered earlier and are not repeated; this package adds Clinicly's folder, the records, this guide and the asset inventory.

## 3. Records: cases are Scenarios, flows are Journeys

The FableBook brief says each case maps to a Scenario and each flow to a Journey, with the original ids kept. These files follow that.

| Book | Records file | Cases | Flows | Shape |
|---|---|---|---|---|
| Chatly | `assets/records/chatly-records.json` | 27 | 2 | The first version of the shape: people, conversations, messages; cases carry themes and widths; flow steps carry a sentence. |
| Clinicly | `records/clinicly/clinicly-records.json` | 84 | 4 | The newest and fullest shape; every picture in the book is drawn from a case. |
| Logistify | `records/logistify/logistify-records.json` | 35 | 4 | Clinicly's case and flow shape. Its pictures were drawn before the file existed, so the file records what they show. |

**How a case maps to a Scenario.** Keep the id. Map the rest like this (Clinicly and Logistify; Chatly's older fields are listed in its README):

| Case field | Becomes |
|---|---|
| `id` | The source id. Keep it as `sourceId` (or `sourceKey` where a source has a key rather than an id) beside `brand`; FableBook compiles its own Scenario id from them. See "Source ids and compiled ids" below. |
| `surface`, `title`, `description` | Where it happens and how it is named. |
| `actor`, `personaId` | Who is acting; the persona and its job are in the records. |
| `records` | The fixtures the Scenario loads, by id: patients, appointments, slots (Clinicly); shipments, stops, pallets (Logistify). |
| `language`, `direction`, `scheme`, `viewport`, `simulation` | The rendering and environment settings: language, text direction, light or dark, exact size and text zoom, network, loading, reduced motion, keyboard, and the fixed time and zone. |
| `changing` | The values that differ from the base fixtures in this case (selected slot, list state, current stop). |
| `copy` | Keys into the file's `copy` collection: the exact illustration text. |
| `illustration` | A reference picture, never the truth. Clinicly: scale and height of the drawing. Logistify: the book page and the label of the picture. A Logistify case with `notDrawn` has no picture yet. |

**How a flow maps to a Journey.** Keep the id as the source id. Clinicly's and Logistify's steps have the same five parts:

| Step field | Meaning |
|---|---|
| `caseId` | The case on screen when the person acts. This is the Scenario the step runs in. |
| `action` | What the person does: a `kind` (press, choose, type, read or wait) and the exact `label` on screen. |
| `expected` | What the person sees as a result, in words. |
| `changing` | The values on that screen, before the action. |
| `outcome` | The values right after the action. The next step's screen shows them, and the validator checks that it does. The last step has none. |

A choice or typed text is already part of the screen it was made on: the chosen time is marked on the screen where it was chosen, so that step's `changing` already holds it and its `outcome` names the next screen's values. A step that only reads has an empty `outcome`.

A flow that starts from a state the base records do not hold says so in `startOverride`: the values that replace the base records, the events that have not happened yet (`ignoreEvents`) and a note. Logistify's two flows that begin at stop 7 use it, because the base records hold the failed outcome of that stop (LGX-0417-DE Failed at 14:20) and these flows start before it, with the shipment In transit. Load the base fixtures, apply `startOverride`, then run the steps. A validator rule requires the override whenever the first step's status differs from the base records.

Flows that branch say so: in Logistify, `flow-driver-delivers-stop` and `flow-driver-reports-failed-stop` share their first case and end in different statuses. Chatly's two flows are the older shape: each step carries one sentence (`shows`) and no structured action or outcome. Upgrade them as you import; the original ids stay.

**Source ids and compiled ids.** The ids in these files are source ids: stable names inside one book, never reused or renumbered. They are not FableBook's compiled ids. FableBook compiles its own Story and Scenario ids under its own rules (the ADR 0008 id rules in its repository, which this guide does not restate and which were not read here); keep those rules and derive a compiled id from the source. Record where each came from as provenance: `brand` (`logistify`, `chatly` or `clinicly`) plus `sourceId` (a case or flow id) or `sourceKey` (a source that has a key rather than an id). A compiled id is never a source id with a prefix pasted on; it comes from FableBook's rules.

**Id collisions.** The three books do not share a namespace. Flow ids do not collide. Three case ids do, between Chatly and Clinicly: `case-offline`, `case-reconnecting` and `case-text-200`. Keep them namespaced: the pair `brand` plus `sourceId` is what tells `chatly` and `clinicly` `case-offline` apart, and each compiled id must be derived from both. Do not look a case up by `sourceId` alone.

**What was checked, and by what.**
- Chatly's validator checks ids, references, time order, delivery words and the Japanese subset. Its build check confirms that every id a picture carries is in the file and that the picture text matches the record.
- Clinicly's validator checks the same kinds of things (references, ordering, time zones, permissions, illustration text) and `--book` checks each illustration against its case.
- Logistify's validator (`check-records.mjs`) checks ids, references, times against Central European Time, statuses against events, route and pallet counts, illustration text, case fields, flow order, branches and step outcomes, start overrides, retired difference ids and shared names; with `--book` it checks that every copy string, window, weight and shipment id in the delivered book's text is in the records. Each validator has a `--self-test` that plants defects and shows they are caught. Run them as `node records/clinicly/check-records.mjs` and `node records/logistify/check-records.mjs`, with `--book <path to that book's HTML>` to check the pictures and `--self-test` to see the planted defects caught. They use Node built-ins only, and Clinicly's reads the small `records/lettering/` and `records/direction/` inputs beside it.
- None of this proves that a FableBook Scenario renders like a picture, or that any product is accessible. The pictures are illustrations. Checking them against records proves the illustration text and ids agree with the file, nothing more.

**Pictures that disagree with the records (Logistify).** Logistify's pictures were drawn by hand, and three details disagree with the records: a Dijon shipment drawn with a Lyon lane (`diff-01`), a signature by M. Keller where the records name M. Dupont (`diff-03`), and "window exceeded" shown at 14:20 inside a window that runs to 16:00 (`diff-05`). They are listed in `pictureDifferences`, each anchored to text that is really on its page. The book was not changed. When a picture and the records disagree, **the records are the data**.

Two earlier entries were not disagreements and were retired (`retiredDifferences` keeps their ids and the reasons): the board window and the delivery window are different fields (`window` and `deliveryWindow`), and "2 of 6" on a pallet label is pallet 2 of a 6-pallet shipment, which is consistent with 3 pallets handed over at the stop.

**Driver and recipient are separate people.** M. Keller the driver (`drv-01`) and M. Keller the recipient (`rcp-02`) share a display name only. `sharedNames` declares the pair with both ids, and the validator fails if another name is shared without being declared. Never use a display name as a key.

## 4. Tokens: the root `tokens.json` and the older `identity.json` path

FableBook's earlier design documents assume the identity tokens live at `brandbook/tokens/identity.json`. None of the three folders has a `brandbook/` directory, and none has that file. The tokens are at the root of each folder as `tokens.json`. The folders were not reorganized to imitate the old path.

Treat `<brand>-brand/tokens.json` as the identity tokens file. If FableBook's loader still expects the old path, change the path in the loader, or copy the file to that name when importing; do not move the books. A `$description` at the top says what the file holds.

| Book | Token groups (count of tokens) |
|---|---|
| Logistify | color 66, font 3, typography 6, dimension 19, motion 9 |
| Chatly | color 16, spacing 9, radius 5, focus 2, logo 4, typography 8 |
| Clinicly | color 20, status 28, spacing 8, radius 4, focus 2, logo 4, typography 8 |

The groups differ between books, so a loader should read what is there by group and type, not assume a fixed list. Color values carry the color space, components and a hex string. The books say plainly that no export schema is specified on FableBook's side, so a project maps the names to its own tokens. Contrast pairs are named by stable id in each book, in light and dark; they prove the stated text and background pairs, not a product.

## 5. The older showcase brief and the delivered identities

An earlier showcase brief described identities that were not the ones delivered. Treat the delivered books as the handoff.

| Brand | The older brief said | The delivered identity is |
|---|---|---|
| Chatly | Dark first, violet and coral. | Light first. Chalk `#F6F7F0` ground, Ink `#1D1B16`, the accent Pear `#B7F652` as a fill with Ink on top, Deep Pear `#578500` where Pear is too pale to see, Parkinsans and Figtree. Dark is complete and designed, not an inversion. |
| Clinicly | Blue-green calm. | Light first. Paper `#F7F6F2` ground, Navy Ink `#16202C`, the accent Cornflower `#5373A9` with a White label, Rubik for English and Arabic. Dark is complete. |

For Clinicly the older "blue-green calm" could not be kept: it sat too close to earlier accents in this series (0.056 to 0.075 apart where the floor was 0.10), so the delivered accent is a cornflower blue. Logistify's identity (Archivo and Red Hat Mono, Steel for links and focus, one orange unit as the logo's mark) matches its book and needed no reconciling. The brief's other planned brands, Finanza and Shopadelic, are not in these folders.

## 6. Standalone files: what "copy the HTML alone" means

The line "copying the HTML alone keeps its look" is true for some files and not for others. Measured by listing every resource reference (`src`, stylesheet links, `url()`) that is not a `data:` address in each HTML file:

| File | Resource references to other files | Standalone |
|---|---|---|
| `<brand>-brand-book.html` (all three) | 0 | Yes: fonts, styles and images are embedded. |
| `<brand>-one-page.html` (all three) | 0 | Yes. |
| `assets/index.html` (all three) | 27 to 46 | No: it previews the sibling `fonts/`, `logo/`, `icon/` and other files and shows broken images without them. |

The PDFs are single files. A downloaded book HTML keeps its look anywhere; the asset index needs its folder. Links in a book that name files in the folder are navigation or downloads, not resources, and are not counted.

## 7. Stylesheets and the hover-panel check

Colors and typeface names in a book open a small hover panel with a swatch, name, hex and a "click to copy" line; on touch a tap opens it. The panel's short class names (`tn`, `td`, `tv`, `th`, `tip`, `cn`, `fn`) could collide with an application's styles, so the books carry a check that no page markup uses them for anything else.

- **Clinicly** scopes its stylesheet: of 548 selectors, 503 sit under `.cly-book` or a `cly-` class name, 45 are the engine's panel and document rules, and none are other bare selectors. Its check fails the build if a bare selector appears.
- **Logistify and Chatly** were written earlier and are not scoped: 818 of Logistify's 861 selectors and 552 of Chatly's 599 are bare (element selectors such as `h1`, short classes such as `.mk`).

So do not paste a book's CSS or markup into an application. Open the book as a page, put it in a frame, or take values from `tokens.json`. Reserving short class names across an application would be fragile; the answer here is scoping the book, and the two older books have not been rescoped.

## 8. Assets and reuse terms

`mapping/asset-inventory.json` lists every file of the three folders, 209 files in all, with its size, sha256, kind and reuse terms, and the two records files handed over beside their folders. The hashes are of the folders as handed over; PDFs and anything carrying a build date change between builds, so regenerate the inventory from the folder you actually received (`node inventory.mjs`, arguments in its header).

Reuse terms are what each book says about itself. Nothing is invented.

| Kind of file | Terms |
|---|---|
| Fonts (Archivo, Red Hat Mono, Parkinsans, Figtree, M PLUS 2, DM Mono, Rubik) | SIL Open Font License 1.1. The license text ships in each `assets/fonts`. Keep it with any redistributed font. |
| Photographs (Logistify only, 6 files) | Free licenses from Wikimedia Commons, per file: CC BY 2.0 for four files and CC BY 4.0 for one, which need credit to the author and a link to the license; one file is public domain; the author, source and source sha256 are in `assets/imagery/README.md` and the inventory. These are examples of the brief, not a stock library. |
| Sound (Logistify only, 8 files) | Synthesized from damped modes and noise; no recording or third-party sample is used. The brand's own terms apply. |
| Logos, icons, tokens, book, one-page, records, brand data | **Not decided.** Logistify says it is not decided whether the assets are open for reuse beyond the demonstration. Chatly and Clinicly say the same terms as the earlier books, a default to confirm. They are made for FableBook's demo catalog; redistribution outside it is not granted by these files. |

All three names are fictional and none is cleared: Logistify has a real "Logistify" product and a US trademark record, and other products and apps use the names Chatly and Clinicly. Use the logos only inside the demo. Do not use them to suggest that a real company, clinic or product endorses or certifies anything.
