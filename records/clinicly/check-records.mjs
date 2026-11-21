// Validates clinicly-records.json: stable ids and patterns, every reference resolves, the reserved direction-round ids keep their meaning,
// times parse and their offsets match the named time zone, appointments that overlap say so, visits and notes and reminders come in a
// sensible order, reminder text never repeats visit-note text, access roles and permission outcomes are complete, denied screens reveal no
// patient details, every case's changing values agree with its records, flows are ordered and move only through allowed changes while one
// appointment, note or reminder stays identifiable, and illustration text is plain (no avoid words, no empty strings, no private data, no
// Arabic outside the embedded subset). With --book <html> it also checks the book's illustrations against the cases.
// Node built-ins only.
// usage: node check-records.mjs [records.json]                 validate the file
//        node check-records.mjs --book <book.html> [records.json]   also check the illustrations in a built book
//        node check-records.mjs --self-test                    plant defects and prove each is caught
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const HERE = new URL('./', import.meta.url), SPIKE = new URL('../', import.meta.url);
const DEFAULT = fileURLToPath(new URL('clinicly-records.json', HERE));
const SUBSET = new Set([...JSON.parse(readFileSync(new URL('lettering/fonts.json', SPIKE), 'utf8')).sampleText.characters]);
const ARABIC_SAMPLES = (() => { const m = new Map(), l = readFileSync(new URL('lettering/samples-ar.txt', SPIKE), 'utf8').split('\n'); for (let i = 0; i < l.length; i++) if (/^#[a-z]/.test(l[i]) && l[i + 1] !== undefined) m.set(l[i].slice(1), l[i + 1]); return m; })();
const MOCK = JSON.parse(readFileSync(new URL('direction/mock.json', SPIKE), 'utf8'));
const AR = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

const PATTERN = {
  clinics: /^cl-\d{2}$/, clinicians: /^cn-\d{2}$/, patients: /^pt-\d{4}$/, appointments: /^apt-\d{4}$/, slots: /^sl-\d{4}-\d{4}(-[a-z]{3})?$/, visits: /^v-\d{4}$/, visitNotes: /^vn-\d{4}$/,
  reminders: /^rm-\d{4}$/, roles: /^r-\d{2}$/, staff: /^st-\d{2}$/, jobs: /^job-[a-z]+$/, personas: /^ps-\d{2}$/, cases: /^case-[a-z0-9]+(-[a-z0-9]+)*$/, flows: /^flow-[a-z0-9]+(-[a-z0-9]+)*$/,
};
const APPT_STATUS = new Set(['Scheduled', 'Completed', 'Canceled', 'Missed']);
const REMINDER_STATUS = new Set(['Scheduled', 'Sent', 'Not sent']);
const BUTTONS = new Set(['Book appointment', 'Reschedule', 'Cancel appointment', 'Save note', 'Try again']);
const SURFACES = new Set(['day', 'book', 'patients', 'patient', 'reminders']);
const SCREEN_OF = { day: 'day', book: 'book', patients: 'patients', patient: 'patient-details', reminders: 'reminders' };
const OUTCOMES = new Set(['allowed', 'read-only', 'denied']);
const REQUIRED_CASES = [
  'case-day-empty', 'case-day-one', 'case-day-busy', 'case-day-overlap', 'case-day-long-names', 'case-day-missing-details', 'case-day-loading', 'case-day-unavailable', 'case-day-stale', 'case-day-date-change', 'case-day-time-zones', 'case-day-midnight', 'case-day-repeated-hour',
  'case-book-clinician', 'case-book-date', 'case-book-slots-many', 'case-book-slots-one', 'case-book-slots-none', 'case-book-review', 'case-book-validation', 'case-book-submitting', 'case-book-failure', 'case-book-slot-lost', 'case-book-confirmed', 'case-book-dst-repeated',
  'case-patients-empty', 'case-patients-one', 'case-patients-many', 'case-patients-no-results', 'case-patients-duplicates', 'case-patients-long-names', 'case-patients-no-avatar', 'case-patients-loading', 'case-patients-unavailable', 'case-patients-denied',
  'case-patient-no-visits', 'case-patient-one-visit', 'case-patient-many-visits', 'case-patient-missing-info', 'case-patient-long-note', 'case-patient-read-only', 'case-patient-unsaved', 'case-patient-saving', 'case-patient-save-failed', 'case-patient-saved', 'case-patient-denied',
  'case-reminders-none', 'case-reminders-one', 'case-reminders-many', 'case-reminders-no-contact', 'case-reminders-loading', 'case-reminders-send-failed',
  'case-combo-light-ltr', 'case-combo-dark-ltr', 'case-combo-light-rtl', 'case-combo-dark-rtl', 'case-focus-keyboard', 'case-focus-error', 'case-viewport-phone', 'case-viewport-desktop', 'case-text-200', 'case-reflow-320', 'case-reduced-motion', 'case-offline', 'case-reconnecting', 'case-announce-save',
  'case-ar-appointments', 'case-ar-slots', 'case-ar-validation', 'case-ar-slot-lost', 'case-ar-save-failed', 'case-ar-reminder',
];
const REQUIRED_FLOWS = ['flow-book-success', 'flow-book-slot-lost', 'flow-note-save-retry'];
// Allowed moves of a changing value from one flow step to the next.
const MOVES = {
  noteSave: { unsaved: ['saving'], saving: ['failed', 'saved'], failed: ['saving'], saved: [], none: ['unsaved'] },
  submit: { idle: ['submitting'], submitting: ['succeeded', 'failed'], failed: ['idle', 'submitting'], succeeded: [] },
  reminder: { 'Not sent': ['Scheduled'], Scheduled: ['Sent', 'Not sent'], Sent: [] },
};
const AVOID = /\b(clients?|customers?|members?|providers?|practitioners?|doctors?|sessions?|reservations?|windows?|charts?|alerts?)\b/i;
const BRITISH = /\b(colour|behaviour|organis\w+|cancelled|centre|favourite|licence|programme|catalogue|recognis\w+)\b/i;
const ADVICE = /\b(should take|prescrib\w+|diagnos\w+|dosage|take \d+ ?mg|stop taking)\b/i;

// ---- time helpers (platform Intl only) ----
const ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-])(\d{2}):(\d{2})$/;
const parse = (s) => (typeof s === 'string' && ISO.test(s) && !Number.isNaN(Date.parse(s)) ? Date.parse(s) : null);
const offsetOf = (ms, zone) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: zone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
};
const offsetMinutes = (s) => { const m = ISO.exec(s); return (m[7] === '-' ? -1 : 1) * (+m[8] * 60 + +m[9]); };
const localDate = (s) => s.slice(0, 10);
const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function validate(r) {
  const f = [], by = {};
  const err = (m) => f.push(m);
  for (const k of Object.keys(PATTERN)) {
    by[k] = new Map();
    for (const x of r[k] ?? []) {
      if (!PATTERN[k].test(x.id ?? '')) err(`${k}: id "${x.id}" does not match its pattern`);
      if (by[k].has(x.id)) err(`${k}: duplicate id ${x.id}`);
      by[k].set(x.id, x);
    }
  }
  const has = (k, id, where) => { if (!by[k].has(id)) { err(`${where}: unknown ${k} id ${id}`); return null; } return by[k].get(id); };
  const zoneOf = (clinicId) => by.clinics.get(clinicId)?.timeZone;

  // Reserved ids from the direction round keep their meaning.
  const reserved = (k, list, fields) => { for (const m of list) { const x = by[k].get(m.id); if (!x) { err(`reserved ${k} id ${m.id} is missing`); continue; } for (const [a, b] of fields) if (!deepEq(x[a], m[b ?? a])) err(`reserved ${k} id ${m.id} changed its ${a}`); } };
  reserved('clinics', [MOCK.clinic], [['name'], ['timeZone']]);
  reserved('clinicians', MOCK.clinicians, [['name']]);
  reserved('patients', MOCK.patients, [['name']]);
  reserved('appointments', MOCK.appointments, [['start'], ['durationMinutes'], ['status'], ['patientId', 'patient'], ['clinicianId', 'clinician']]);
  reserved('reminders', MOCK.reminders, [['appointmentId', 'appointment'], ['channel']]);
  reserved('slots', MOCK.slots, [['start'], ['clinicianId', 'clinician']]);

  for (const id of REQUIRED_CASES) if (!by.cases.has(id)) err(`required case ${id} is missing`);
  for (const id of REQUIRED_FLOWS) if (!by.flows.has(id)) err(`required flow ${id} is missing`);

  // People and places.
  for (const c of r.clinicians ?? []) has('clinics', c.clinicId, c.id);
  for (const p of r.patients ?? []) {
    if (!p.name || !p.initials) err(`${p.id}: name and initials are required`);
    if (p.avatar !== null && p.avatar !== undefined) err(`${p.id}: avatar must be null or absent`);
    if (!/^CLY-\d{6}$/.test(p.identifier ?? '')) err(`${p.id}: identifier must be CLY- and six digits`);
    if (p.email !== undefined && !/^[a-z.]+@example\.test$/.test(p.email)) err(`${p.id}: email must be on example.test`);
    if (p.phone !== undefined && !/^555-01\d{2}$/.test(p.phone)) err(`${p.id}: phone must be 555-01xx`);
  }
  const names = new Map();
  for (const p of r.patients ?? []) { const a = names.get(p.name) ?? []; a.push(p); names.set(p.name, a); }
  for (const [n, a] of names) if (a.length > 1 && new Set(a.map((p) => p.identifier)).size !== a.length) err(`patients named ${n} share an identifier`);

  // Appointments: time zone offsets, overlaps, references.
  const apptSpan = (a) => { const t = parse(a.start); return t === null ? null : [t, t + a.durationMinutes * 60000]; };
  for (const a of r.appointments ?? []) {
    const pt = has('patients', a.patientId, a.id), cn = has('clinicians', a.clinicianId, a.id), cl = has('clinics', a.clinicId, a.id);
    if (cn && cl && cn.clinicId !== a.clinicId) err(`${a.id}: clinician ${a.clinicianId} works at ${cn.clinicId}, not ${a.clinicId}`);
    if (a.ref !== a.id.toUpperCase()) err(`${a.id}: ref ${a.ref} is not the id in capitals`);
    if (!APPT_STATUS.has(a.status)) err(`${a.id}: status "${a.status}" is not one of the four appointment statuses`);
    if (!Number.isInteger(a.durationMinutes) || a.durationMinutes <= 0) err(`${a.id}: durationMinutes ${a.durationMinutes}`);
    const t = parse(a.start);
    if (t === null) err(`${a.id}: start "${a.start}" does not parse`);
    else if (cl && offsetOf(t, cl.timeZone) !== offsetMinutes(a.start)) err(`${a.id}: offset in ${a.start} is not the offset of ${cl.timeZone} on that date`);
    if (a.overlapsId) has('appointments', a.overlapsId, a.id);
    void pt;
  }
  const appts = r.appointments ?? [];
  for (let i = 0; i < appts.length; i++) for (let j = i + 1; j < appts.length; j++) {
    const a = appts[i], b = appts[j], sa = apptSpan(a), sb = apptSpan(b);
    if (!sa || !sb || a.clinicianId !== b.clinicianId || a.status === 'Canceled' || b.status === 'Canceled') continue;
    if (sa[0] < sb[1] && sb[0] < sa[1] && a.overlapsId !== b.id && b.overlapsId !== a.id) err(`${a.id} and ${b.id} overlap for ${a.clinicianId} and neither says so`);
  }
  for (const s of r.slots ?? []) {
    const cn = has('clinicians', s.clinicianId, s.id); const cl = has('clinics', s.clinicId, s.id); const t = parse(s.start);
    if (t === null) err(`${s.id}: start "${s.start}" does not parse`); else if (cl && offsetOf(t, cl.timeZone) !== offsetMinutes(s.start)) err(`${s.id}: offset in ${s.start} is not the offset of ${cl.timeZone}`);
    if (!['open', 'taken'].includes(s.availability)) err(`${s.id}: availability "${s.availability}"`);
    if (cn && cl && cn.clinicId !== s.clinicId) err(`${s.id}: clinician and clinic disagree`);
    const m = /^sl-(\d{2})(\d{2})-(\d{2})(\d{2})/.exec(s.id);
    if (m && t !== null && (s.start.slice(5, 7) !== m[1] || s.start.slice(8, 10) !== m[2] || s.start.slice(11, 13) !== m[3] || s.start.slice(14, 16) !== m[4])) err(`${s.id}: the id does not match the local start ${s.start}`);
  }
  for (const a of appts) if (a.bookedFromSlotId) { const s = has('slots', a.bookedFromSlotId, a.id); if (s && s.start !== a.start) err(`${a.id}: starts ${a.start} but its slot ${s.id} starts ${s.start}`); }

  // Visits, notes, reminders.
  const nowMs = parse(`${r.display?.sampleToday?.date}T${r.display?.sampleToday?.time}:00${r.display?.sampleToday?.utcOffset}`);
  if (nowMs === null) err('display.sampleToday does not make a time');
  for (const v of r.visits ?? []) {
    has('patients', v.patientId, v.id); has('clinicians', v.clinicianId, v.id);
    const t = parse(v.occurredAt);
    if (t === null) err(`${v.id}: occurredAt does not parse`); else if (nowMs !== null && t > nowMs) err(`${v.id}: a visit that actually occurred cannot be after the sample time`);
    if (v.appointmentId) { const a = has('appointments', v.appointmentId, v.id); if (a) { if (a.status !== 'Completed') err(`${v.id}: its appointment ${a.id} is ${a.status}, not Completed`); if (a.patientId !== v.patientId) err(`${v.id}: patient differs from ${a.id}`); if (a.clinicianId !== v.clinicianId) err(`${v.id}: clinician differs from ${a.id}`); } }
  }
  for (const a of appts) if (a.status === 'Completed' && !(r.visits ?? []).some((v) => v.appointmentId === a.id) ) err(`${a.id}: Completed with no visit`);
  const notes = r.visitNotes ?? [], noteText = notes.map((n) => n.text);
  for (const n of notes) {
    const v = has('visits', n.visitId, n.id); has('clinicians', n.authorId, n.id);
    if (!n.text) err(`${n.id}: empty text`);
    if (ADVICE.test(n.text ?? '')) err(`${n.id}: reads as medical advice`);
    const w = parse(n.writtenAt); if (w === null) err(`${n.id}: writtenAt does not parse`); else if (v && parse(v.occurredAt) !== null && w < parse(v.occurredAt)) err(`${n.id}: written before its visit`);
  }
  const shingles = (t, k = 4) => { const w = t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean), out = new Set(); for (let i = 0; i + k <= w.length; i++) out.add(w.slice(i, i + k).join(' ')); return out; };
  const noteShingles = new Set(noteText.flatMap((t) => [...shingles(t)]));
  for (const m of r.reminders ?? []) {
    const a = has('appointments', m.appointmentId, m.id); const pt = a && by.patients.get(a.patientId);
    if (!REMINDER_STATUS.has(m.status)) err(`${m.id}: status "${m.status}" is not one of the three reminder statuses`);
    if (!['sms', 'email'].includes(m.channel)) err(`${m.id}: channel ${m.channel}`);
    if (m.status === 'Sent') { const t = parse(m.sentAt); if (t === null) err(`${m.id}: Sent needs sentAt`); else if (nowMs !== null && t > nowMs) err(`${m.id}: sentAt is after the sample time`); }
    if (m.status === 'Scheduled') { const t = parse(m.scheduledFor); if (t === null) err(`${m.id}: Scheduled needs scheduledFor`); else if (nowMs !== null && t < nowMs) err(`${m.id}: Scheduled for a time before the sample time`); else if (a && parse(a.start) !== null && t > parse(a.start)) err(`${m.id}: scheduled after the appointment starts`); }
    if (m.status === 'Not sent' && !['no-contact', 'send-failed'].includes(m.reason)) err(`${m.id}: Not sent needs a reason`);
    if (m.to === null && m.reason !== 'no-contact') err(`${m.id}: no contact value without the no-contact reason`);
    if (m.to !== null && pt) { const want = m.channel === 'sms' ? pt.phone : pt.email; if (want !== m.to) err(`${m.id}: goes to ${m.to}, not the patient's ${m.channel === 'sms' ? 'phone' : 'email'}`); }
    if (m.to === null && pt && (m.channel === 'sms' ? pt.phone : pt.email) !== undefined) err(`${m.id}: says no contact but the patient has one`);
    if (!m.text) err(`${m.id}: empty reminder text`);
    for (const sh of shingles(m.text ?? '')) if (noteShingles.has(sh)) { err(`${m.id}: reminder text repeats visit-note wording ("${sh}")`); break; }
  }

  // Roles and permissions.
  for (const s of r.staff ?? []) { has('roles', s.roleId, s.id); if (s.clinicianId) has('clinicians', s.clinicianId, s.id); }
  for (const ro of r.roles ?? []) has('staff', ro.staffId, ro.id);
  const SCREENS = ['day', 'patients', 'patient-details', 'book', 'reminders', 'visit-notes'];
  for (const ro of r.roles ?? []) for (const sc of SCREENS) {
    const p = (r.permissions ?? []).filter((x) => x.roleId === ro.id && x.screen === sc);
    if (p.length !== 1) err(`role ${ro.id} has ${p.length} permission outcomes for ${sc}, not one`);
  }
  for (const p of r.permissions ?? []) {
    has('roles', p.roleId, 'permission'); if (!OUTCOMES.has(p.outcome)) err(`permission ${p.roleId}/${p.screen}: outcome "${p.outcome}"`);
    if (p.outcome === 'denied' && !p.says) err(`permission ${p.roleId}/${p.screen}: a denied outcome needs the sentence the screen says`);
    if (p.outcome !== 'denied' && p.says) err(`permission ${p.roleId}/${p.screen}: only a denied outcome has a sentence`);
  }
  const perm = (staffId, screen) => { const s = by.staff.get(staffId); return (r.permissions ?? []).find((p) => p.roleId === s?.roleId && p.screen === screen)?.outcome; };
  for (const p of r.personas ?? []) { has('jobs', p.jobId, p.id); if (p.patientId) has('patients', p.patientId, p.id); if (p.staffId) has('staff', p.staffId, p.id); }

  // Cases.
  const copyKeys = new Set(Object.keys(r.copy ?? {}));
  const usedCopy = new Set();
  for (const c of r.cases ?? []) {
    const w = c.id;
    if (!SURFACES.has(c.surface)) err(`${w}: surface ${c.surface}`);
    if (!c.title || !c.description) err(`${w}: title and description are required`);
    has('personas', c.personaId, w);
    if (c.actor?.kind === 'patient') has('patients', c.actor.id, w); else if (c.actor?.kind === 'staff') has('staff', c.actor.id, w); else err(`${w}: actor kind ${c.actor?.kind}`);
    const rec = c.records ?? {};
    has('clinics', rec.clinicId, w);
    for (const [k, coll] of [['clinicianIds', 'clinicians'], ['patientIds', 'patients'], ['appointmentIds', 'appointments'], ['slotIds', 'slots'], ['visitIds', 'visits'], ['noteIds', 'visitNotes'], ['reminderIds', 'reminders']]) for (const x of rec[k] ?? []) has(coll, x, `${w}.records.${k}`);
    if (!['en', 'ar'].includes(c.language)) err(`${w}: language ${c.language}`);
    if (!['ltr', 'rtl'].includes(c.direction)) err(`${w}: direction ${c.direction}`);
    if (c.language === 'ar' && c.direction !== 'rtl') err(`${w}: Arabic must be right to left`);
    if (c.language === 'en' && c.direction !== 'ltr') err(`${w}: English must be left to right`);
    if (!['light', 'dark'].includes(c.scheme)) err(`${w}: scheme ${c.scheme}`);
    const vp = c.viewport ?? {};
    if (!(Number.isInteger(vp.width) && vp.width >= 320 && Number.isInteger(vp.height) && vp.height > 0 && [1, 2].includes(vp.textZoom) && ['phone', 'desktop'].includes(vp.name))) err(`${w}: viewport needs a name, integer width and height and a text zoom of 1 or 2`);
    if (vp.name === 'phone' && vp.width > 600) err(`${w}: a phone viewport is at most 600 px wide`);
    if (vp.name === 'desktop' && vp.width < 800) err(`${w}: a desktop viewport is at least 800 px wide`);
    const sim = c.simulation ?? {};
    if (!['online', 'offline', 'reconnecting'].includes(sim.network) || typeof sim.loading !== 'boolean' || typeof sim.reducedMotion !== 'boolean' || typeof sim.keyboard !== 'boolean') err(`${w}: simulation needs network, loading, reducedMotion and keyboard`);
    if (!(c.illustration?.scale > 0 && c.illustration.scale <= 1 && c.illustration.height > 0)) err(`${w}: illustration needs a scale up to 1 and a height`);
    for (const k of c.copy ?? []) { usedCopy.add(k); if (!copyKeys.has(k)) err(`${w}: unknown copy key ${k}`); else if (r.copy[k]?.arabic && c.language !== 'ar') err(`${w}: Arabic copy ${k} in a ${c.language} case`); }
    const ch = c.changing ?? {};
    const apptsOf = (rec.appointmentIds ?? []).map((id) => by.appointments.get(id)).filter(Boolean);
    const slotsOf = (rec.slotIds ?? []).map((id) => by.slots.get(id)).filter(Boolean);
    if (c.surface === 'day') {
      if (!['loaded', 'empty', 'loading', 'unavailable', 'stale'].includes(ch.listState)) err(`${w}: listState ${ch.listState}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(ch.date ?? '')) err(`${w}: date ${ch.date}`);
      if (ch.clinicianId && !(rec.clinicianIds ?? []).includes(ch.clinicianId)) err(`${w}: clinician ${ch.clinicianId} is not in the case's records`);
      for (const a of apptsOf) { if (localDate(a.start) !== ch.date) err(`${w}: ${a.id} starts on ${localDate(a.start)}, not ${ch.date}`); if (a.clinicianId !== ch.clinicianId) err(`${w}: ${a.id} belongs to ${a.clinicianId}, not ${ch.clinicianId}`); if (a.clinicId !== rec.clinicId) err(`${w}: ${a.id} is at ${a.clinicId}, not ${rec.clinicId}`); }
      if (ch.listState === 'empty' && apptsOf.length) err(`${w}: an empty day lists appointments`);
      if (ch.listState === 'loaded' && !apptsOf.length) err(`${w}: a loaded day lists none`);
      if (ch.viewerTimeZone && ch.viewerTimeZone === zoneOf(rec.clinicId)) err(`${w}: the viewer's time zone must differ from the clinic's for this case`);
      if (ch.listState === 'loading' && !sim.loading) err(`${w}: a loading day needs simulation.loading`);
    }
    if (c.surface === 'book') {
      if (![1, 2, 3, 4, 'confirmed'].includes(ch.step)) err(`${w}: step ${ch.step}`);
      if (!['idle', 'submitting', 'failed', 'succeeded'].includes(ch.submit)) err(`${w}: submit ${ch.submit}`);
      for (const k of ['selectedSlotId', 'takenSlotId']) if (ch[k]) { if (!(rec.slotIds ?? []).includes(ch[k])) err(`${w}: ${k} ${ch[k]} is not in the case's slots`); }
      if (ch.selectedSlotId && ch.selectedSlotId === ch.takenSlotId) err(`${w}: the selected slot is also the taken slot`);
      for (const s of slotsOf) { if (ch.clinicianId && s.clinicianId !== ch.clinicianId) err(`${w}: ${s.id} belongs to ${s.clinicianId}`); if (ch.date && localDate(s.start) !== ch.date) err(`${w}: ${s.id} is on ${localDate(s.start)}, not ${ch.date}`); }
      if (ch.step === 'confirmed') {
        if (ch.appointmentStatus !== 'Scheduled' || ch.submit !== 'succeeded') err(`${w}: a booked case needs Scheduled and succeeded`);
        const a = apptsOf.find((x) => x.ref === ch.bookingRef); if (!a) err(`${w}: no appointment in the case has the reference ${ch.bookingRef}`); else if (a.bookedFromSlotId !== ch.selectedSlotId) err(`${w}: ${a.id} was booked from ${a.bookedFromSlotId}, not ${ch.selectedSlotId}`);
      } else if (ch.appointmentStatus !== null) err(`${w}: an appointment status before the booking is confirmed`);
      if (ch.step === 4 && !ch.selectedSlotId) err(`${w}: the review needs a selected slot`);
      if (ch.submit === 'submitting' && ch.step !== 4) err(`${w}: submitting belongs to the review step`);
      if (ch.fieldErrors?.length && !ch.focus) err(`${w}: a field error needs a focused element`);
      if (ch.focus && ch.focus.startsWith('slot:') && !(rec.slotIds ?? []).includes(ch.focus.slice(5))) err(`${w}: focus names a slot not in the case`);
      if (ch.bookingRef) { const a = by.appointments.get(ch.bookingRef.toLowerCase()); if (!a) err(`${w}: booking reference ${ch.bookingRef} is not an appointment id`); }
      if (ch.phoneDraft === '') err(`${w}: phoneDraft is an empty string; use null or leave it out`);
    }
    if (c.surface === 'patients') {
      if (!['loaded', 'empty', 'loading', 'unavailable', 'no-results', 'denied'].includes(ch.listState)) err(`${w}: listState ${ch.listState}`);
      if (ch.listState === 'denied' && (rec.patientIds ?? []).length) err(`${w}: a denied screen reveals patients`);
      if ((ch.listState === 'loaded') && !(rec.patientIds ?? []).length) err(`${w}: a loaded list with no patients`);
      if (['empty', 'no-results', 'loading', 'unavailable'].includes(ch.listState) && (rec.patientIds ?? []).length) err(`${w}: a ${ch.listState} list shows patients`);
    }
    if (c.surface === 'patient' || c.surface === 'patients') {
      const screen = ch.screen ?? (ch.openNoteId || (rec.noteIds ?? []).length ? 'patient-details' : SCREEN_OF[c.surface]);
      if (c.actor?.kind === 'staff') {
        const out = perm(c.actor.id, c.surface === 'patients' ? 'patients' : (ch.screen === 'visit-notes' ? 'visit-notes' : 'patient-details'));
        if (out === 'denied' && ch.permission !== 'denied') err(`${w}: the actor's role is denied here but the case shows access`);
        if (out !== 'denied' && ch.permission === 'denied') err(`${w}: the case shows a denial the actor's role does not have`);
        if (ch.openNoteId) { const no = perm(c.actor.id, 'visit-notes'); if (no === 'read-only' && ch.permission !== 'read-only') err(`${w}: a read-only role must open the note read-only`); if (no === 'allowed' && ch.permission === 'read-only') err(`${w}: this role may write the note`); if (no === 'denied') err(`${w}: this role may not open visit notes`); }
      }
      void screen;
    }
    if (c.surface === 'patient') {
      if (!['allowed', 'read-only', 'denied'].includes(ch.permission)) err(`${w}: permission ${ch.permission}`);
      if (ch.permission === 'denied' && ((rec.patientIds ?? []).length || (rec.visitIds ?? []).length || (rec.noteIds ?? []).length || ch.patientId)) err(`${w}: a denied screen reveals patient details`);
      if (ch.permission === 'read-only' && ch.noteSave !== 'none') err(`${w}: a read-only note cannot be saved`);
      if (['unsaved', 'saving', 'failed', 'saved'].includes(ch.noteSave) && !(ch.noteDraft ?? ch.openNoteId)) err(`${w}: ${ch.noteSave} needs the text`);
      if (['unsaved', 'saving', 'failed'].includes(ch.noteSave) && !ch.noteDraft) err(`${w}: the text typed must be kept while ${ch.noteSave}`);
      if (ch.noteSave === 'saved' && !ch.announce) err(`${w}: a saved note is announced`);
      if (ch.openNoteId) { const n = has('visitNotes', ch.openNoteId, w); if (n && !(rec.noteIds ?? []).includes(n.id)) err(`${w}: the open note is not in the case's records`); }
      if (ch.patientId) has('patients', ch.patientId, w);
      for (const id of rec.visitIds ?? []) { const v = by.visits.get(id); if (v && ch.patientId && v.patientId !== ch.patientId) err(`${w}: ${id} belongs to ${v.patientId}`); }
    }
    if (c.surface === 'reminders') {
      if (!['loaded', 'empty', 'loading', 'unavailable'].includes(ch.listState)) err(`${w}: listState ${ch.listState}`);
      for (const [id, st] of Object.entries(ch.reminderStatus ?? {})) { if (!(rec.reminderIds ?? []).includes(id)) err(`${w}: reminderStatus names ${id}, not in the case`); if (!REMINDER_STATUS.has(st)) err(`${w}: reminderStatus ${st}`); }
      if (ch.listState === 'empty' && (rec.reminderIds ?? []).length) err(`${w}: an empty list shows reminders`);
    }
  }

  // Flows.
  for (const fl of r.flows ?? []) {
    const w = fl.id; has('personas', fl.personaId, w);
    if (fl.appointmentId) has('appointments', fl.appointmentId, w); if (fl.visitNoteId) has('visitNotes', fl.visitNoteId, w); if (fl.reminderId) has('reminders', fl.reminderId, w); if (fl.patientId) has('patients', fl.patientId, w);
    if (!(fl.steps ?? []).length) err(`${w}: no steps`);
    let ref = null, prev = null;
    (fl.steps ?? []).forEach((s, i) => {
      if (s.order !== i + 1) err(`${w}: step ${i + 1} has order ${s.order}`);
      const c = has('cases', s.caseId, `${w} step ${s.order}`);
      const a = s.action ?? {};
      if (!['press', 'choose', 'type', 'wait', 'read'].includes(a.kind)) err(`${w} step ${s.order}: action kind ${a.kind}`);
      if (a.kind === 'press' && !BUTTONS.has(a.label)) err(`${w} step ${s.order}: "${a.label}" is not an exact action label`);
      if (['choose', 'type', 'read'].includes(a.kind) && !a.label) err(`${w} step ${s.order}: the action needs a label`);
      if (!s.expected) err(`${w} step ${s.order}: no expected outcome`);
      // outcome: the values right after the action. The next step's screen must show them; the last step has none.
      if (typeof s.outcome !== 'object' || s.outcome === null || Array.isArray(s.outcome)) err(`${w} step ${s.order}: outcome is required (an empty object when nothing changes)`);
      else {
        const nextCase = fl.steps[i + 1] ? by.cases.get(fl.steps[i + 1].caseId) : null;
        if (!fl.steps[i + 1] && Object.keys(s.outcome).length) err(`${w} step ${s.order}: the last step has an outcome, so the flow is not finished`);
        if (nextCase) for (const [k, v] of Object.entries(s.outcome)) if (!deepEq(nextCase.changing?.[k], v)) err(`${w} step ${s.order}: the outcome says ${k} is ${JSON.stringify(v)} but the next screen (${nextCase.id}) has ${JSON.stringify(nextCase.changing?.[k])}`);
      }
      if (c) {
        for (const [k, v] of Object.entries(s.changing ?? {})) if (!deepEq(c.changing?.[k], v)) err(`${w} step ${s.order}: ${k} is ${JSON.stringify(v)} in the flow but ${JSON.stringify(c.changing?.[k])} in ${c.id}`);
        const br = c.changing?.bookingRef ?? null;
        if (br) { if (ref && ref !== br) err(`${w} step ${s.order}: the booking reference changes from ${ref} to ${br}`); ref = br; } else if (ref && c.surface === 'book') err(`${w} step ${s.order}: the booking reference ${ref} is lost`);
        if (fl.bookingRef && br && br !== fl.bookingRef) err(`${w} step ${s.order}: reference ${br} is not the flow's ${fl.bookingRef}`);
        if (c.personaId !== fl.personaId && c.actor?.id !== undefined && by.personas.get(fl.personaId) && (by.personas.get(fl.personaId).patientId ?? by.personas.get(fl.personaId).staffId) !== c.actor.id) err(`${w} step ${s.order}: the case's actor is not the flow's persona`);
        if (prev) {
          for (const [k, table] of [['noteSave', MOVES.noteSave], ['submit', MOVES.submit]]) { const a0 = prev.changing?.[k], a1 = c.changing?.[k]; if (a0 !== undefined && a1 !== undefined && a0 !== a1 && !(table[a0] ?? []).includes(a1)) err(`${w} step ${s.order}: ${k} moves from ${a0} to ${a1}, which is not allowed`); }
          const r0 = prev.changing?.reminderStatus, r1 = c.changing?.reminderStatus;
          if (r0 && r1) for (const id of Object.keys(r1)) if (r0[id] !== undefined && r0[id] !== r1[id] && !(MOVES.reminder[r0[id]] ?? []).includes(r1[id])) err(`${w} step ${s.order}: ${id} moves from ${r0[id]} to ${r1[id]}, which is not allowed`);
          if (prev.changing?.noteDraft && c.changing?.noteDraft !== undefined && c.changing.noteDraft !== null && prev.changing.noteDraft !== c.changing.noteDraft && c.changing.noteSave !== 'unsaved') err(`${w} step ${s.order}: the note text changed between steps`);
        }
        prev = c;
      }
    });
  }
  const fl = (id) => by.flows.get(id);
  if (fl('flow-book-slot-lost') && !fl('flow-book-slot-lost').steps.some((s) => by.cases.get(s.caseId)?.changing?.takenSlotId)) err('flow-book-slot-lost never shows a taken slot');
  if (fl('flow-book-slot-lost')) { const sel = fl('flow-book-slot-lost').steps.map((s) => by.cases.get(s.caseId)?.changing?.selectedSlotId).filter(Boolean); if (new Set(sel).size < 2) err('flow-book-slot-lost never selects a second slot'); }
  if (fl('flow-note-save-retry')) { const seq = fl('flow-note-save-retry').steps.map((s) => by.cases.get(s.caseId)?.changing?.noteSave); const i = seq.indexOf('failed'); if (i < 0 || !seq.slice(i + 1).includes('saved')) err('flow-note-save-retry must fail and then save'); }
  if (fl('flow-book-success') && by.cases.get(fl('flow-book-success').steps.at(-1)?.caseId)?.changing?.step !== 'confirmed') err('flow-book-success must end confirmed');

  // Illustration text and privacy, over the strings the pictures can show.
  const strings = []; const walk = (x, path) => { if (typeof x === 'string') strings.push([path, x]); else if (Array.isArray(x)) x.forEach((y, i) => walk(y, `${path}[${i}]`)); else if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) walk(v, `${path}.${k}`); };
  walk(r, '');
  for (const [p, s] of strings) {
    if (s === '') err(`${p}: an empty string; a missing value is absent or null`);
    if (/\b(undefined|NaN)\b/.test(s)) err(`${p}: "undefined" or "NaN" in text`);
    if (/·/.test(s)) err(`${p}: a middle dot`);
  }
  const copyText = Object.entries(r.copy ?? {}).filter(([, v]) => typeof v === 'string');
  const shown = [...copyText.map(([k, v]) => [`copy.${k}`, v]), ...(r.cases ?? []).flatMap((c) => [[`${c.id}.title`, c.title], [`${c.id}.description`, c.description]]), ...(r.flows ?? []).flatMap((x) => [[`${x.id}.title`, x.title], ...x.steps.flatMap((s) => [[`${x.id} step ${s.order} expected`, s.expected], [`${x.id} step ${s.order} action`, s.action?.label ?? '']])]), ...(r.permissions ?? []).filter((p) => p.says).map((p) => [`permission ${p.roleId}/${p.screen}`, p.says]), ...(r.reminders ?? []).map((m) => [`${m.id}.text`, m.text ?? '']), ...(r.visitNotes ?? []).map((n) => [`${n.id}.text`, n.text ?? '']), ...(r.jobs ?? []).map((j) => [`${j.id}.words`, j.words])];
  for (const [p, s] of shown) {
    if (AVOID.test(s)) err(`${p}: uses a word Clinicly does not use (${s.match(AVOID)[0]})`);
    if (BRITISH.test(s)) err(`${p}: British spelling (${s.match(BRITISH)[0]})`);
    if (/\bstate\b/i.test(s)) err(`${p}: "state" as a word on a screen`);
  }
  const text = JSON.stringify(r);
  if (/https?:|www\./i.test(text)) err('a URL appears in the file');
  if (/\/(Users|home)\//.test(text)) err('a home path appears in the file');
  for (const [p, s] of strings) for (const m of s.match(/[^\s"]*@[^\s"]*/g) ?? []) if (!/@example\.test$/.test(m)) err(`${p}: an address that is not on example.test (${m})`);
  for (const [k, v] of Object.entries(r.copy ?? {})) if (v && typeof v === 'object') { if (!ARABIC_SAMPLES.has(v.arabic)) err(`copy.${k}: unknown Arabic sample line ${v.arabic}`); if (Object.keys(v).length !== 1) err(`copy.${k}: Arabic copy names a sample line and carries no text of its own`); }
  const outside = [...new Set([...text].filter((c) => AR.test(c) && !SUBSET.has(c)))];
  if (outside.length) err(`Arabic characters outside the embedded subset: ${outside.join('')}`);
  for (const p of r.patients ?? []) if (AR.test(p.name) && p.language !== 'ar') err(`${p.id}: an Arabic name with language ${p.language}`);
  for (const k of copyKeys) if (!usedCopy.has(k)) err(`copy.${k} is not used by any case`);
  const counts = Object.fromEntries(Object.keys(PATTERN).map((k) => [k, (r[k] ?? []).length]));
  return { failures: f, counts, copyStrings: copyKeys.size, arabicDistinct: new Set([...text].filter((c) => AR.test(c))).size };
}

// ---- illustrations in a built book ----
// A figure carries data-case, data-scheme, data-dir, data-lang, data-viewport (name WIDTHxHEIGHT), data-zoom, data-network and data-scale; each must equal the case.
export function checkBook(r, html) {
  const f = [], by = new Map((r.cases ?? []).map((c) => [c.id, c]));
  const figs = [...html.matchAll(/<figure\b[^>]*\bdata-case="([^"]*)"([^>]*)>([\s\S]*?)<\/figure>/g)];
  const seen = new Set();
  for (const [, id, rest, inner] of figs) {
    const c = by.get(id); const attrs = Object.fromEntries([...(rest + ' ').matchAll(/data-([a-z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
    if (!c) { f.push(`an illustration names the case ${id}, which is not in the records`); continue; }
    seen.add(id);
    const want = { scheme: c.scheme, dir: c.direction, lang: c.language, viewport: `${c.viewport.name} ${c.viewport.width}x${c.viewport.height}`, zoom: String(c.viewport.textZoom), network: c.simulation.network, scale: String(c.illustration.scale) };
    for (const [k, v] of Object.entries(want)) if (attrs[k] !== v) f.push(`${id}: the illustration says ${k}="${attrs[k]}" but the case says "${v}"`);
    const flat = inner.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&rsquo;|&#8217;/g, '’').replace(/\s+/g, ' ');
    for (const k of c.copy ?? []) { const v = r.copy[k]; if (typeof v === 'string' && !flat.includes(v)) f.push(`${id}: the illustration does not show its text "${v}"`); if (v?.arabic && !flat.includes(ARABIC_SAMPLES.get(v.arabic))) f.push(`${id}: the illustration does not show the Arabic line ${v.arabic}`); }
    for (const sentence of [r.permissions?.find((p) => p.outcome === 'denied' && c.changing?.permission === 'denied' && p.roleId === by2(r, c.actor)?.roleId && (c.surface === 'patients' ? p.screen === 'patients' : p.screen === (c.changing?.screen ?? 'patient-details')))?.says].filter(Boolean)) if (!flat.includes(sentence)) f.push(`${id}: the denied screen does not say "${sentence}"`);
    for (const id2 of c.records?.patientIds ?? []) { const p = r.patients.find((x) => x.id === id2); if (c.changing?.permission === 'denied' && flat.includes(p.name)) f.push(`${id}: a denied screen shows the name ${p.name}`); }
    if (c.changing?.permission === 'denied') for (const p of r.patients) if (flat.includes(p.name)) f.push(`${id}: a denied screen shows the patient name ${p.name}`);
    if (AVOID.test(flat.replace(/Arabic wording not reviewed by a native reader/g, ''))) f.push(`${id}: the illustration uses a word Clinicly does not use (${flat.match(AVOID)[0]})`);
  }
  for (const id of by.keys()) if (!seen.has(id)) f.push(`the case ${id} has no illustration in the book`);
  return { failures: f, illustrations: figs.length, cases: by.size };
}
const by2 = (r, actor) => (actor?.kind === 'staff' ? r.staff.find((s) => s.id === actor.id) : null);

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
const args = process.argv.slice(2);
if (isMain && args.includes('--self-test')) {
  const base = JSON.parse(readFileSync(DEFAULT, 'utf8')), bookArg = args.find((a) => a.endsWith('.html'));
  const clone = () => JSON.parse(JSON.stringify(base));
  const idx = (k, id) => base[k].findIndex((x) => x.id === id);
  const plants = [
    ['duplicate id', (r) => { r.patients[1].id = r.patients[0].id; }, /duplicate id pt-0001/],
    ['an id that breaks its pattern', (r) => { r.appointments[0].id = 'apt-38'; }, /does not match its pattern/],
    ['a dangling patientId', (r) => { r.appointments[idx('appointments', 'apt-0045')].patientId = 'pt-9999'; }, /unknown patients id pt-9999/],
    ['a reserved appointment time changed', (r) => { r.appointments[idx('appointments', 'apt-0042')].start = '2026-10-30T11:15:00-04:00'; }, /reserved appointments id apt-0042 changed its start/],
    ['a reserved slot removed', (r) => { r.slots = r.slots.filter((s) => s.id !== 'sl-1112-1030'); }, /reserved slots id sl-1112-1030 is missing/],
    ['an offset that is not the clinic zone', (r) => { r.appointments[idx('appointments', 'apt-0048')].start = '2026-10-31T09:00:00-05:00'; }, /apt-0048: offset .* not the offset of America\/New_York/],
    ['two overlapping appointments that do not say so', (r) => { r.appointments[idx('appointments', 'apt-0041')].start = '2026-10-30T10:15:00-04:00'; delete r.appointments[idx('appointments', 'apt-0041')].overlapsId; r.appointments[idx('appointments', 'apt-0040')].durationMinutes = 45; delete r.appointments[idx('appointments', 'apt-0040')].overlapsId; r.appointments[idx('appointments', 'apt-0042')].start = '2026-10-30T10:30:00-04:00'; }, /overlap for cn-01 and neither says so/],
    ['a visit note written before its visit', (r) => { r.visitNotes[0].writtenAt = '2026-09-18T08:00:00-04:00'; }, /written before its visit/],
    ['a reminder that repeats visit-note wording', (r) => { r.reminders[0].text += ' Routine check. No concerns raised.'; }, /repeats visit-note wording/],
    ['a Not sent reminder with no reason', (r) => { delete r.reminders[idx('reminders', 'rm-0044')].reason; }, /Not sent needs a reason/],
    ['a role with a missing permission outcome', (r) => { r.permissions = r.permissions.filter((p) => !(p.roleId === 'r-01' && p.screen === 'visit-notes')); }, /role r-01 has 0 permission outcomes for visit-notes/],
    ['a denied screen that reveals a patient', (r) => { r.cases[idx('cases', 'case-patient-denied')].records.patientIds = ['pt-0001']; }, /a denied screen reveals patient details/],
    ['a list that is denied and still shows patients', (r) => { r.cases[idx('cases', 'case-patients-denied')].records.patientIds = ['pt-0001']; }, /a denied screen reveals patients/],
    ['a selected slot that is not in the case', (r) => { r.cases[idx('cases', 'case-book-slots-many')].changing.selectedSlotId = 'sl-1113-1000'; }, /selectedSlotId sl-1113-1000 is not in the case's slots/],
    ['a booked case whose appointment starts at another time', (r) => { r.appointments[idx('appointments', 'apt-0061')].bookedFromSlotId = 'sl-1112-0930'; }, /was booked from sl-1112-0930, not sl-1112-1000|starts 2026-11-12T10:00:00-05:00 but its slot/],
    ['Arabic text with a left-to-right direction', (r) => { r.cases[idx('cases', 'case-ar-slots')].direction = 'ltr'; }, /Arabic must be right to left/],
    ['a flow step out of order', (r) => { r.flows[0].steps[2].order = 5; }, /flow-book-success: step 3 has order 5/],
    ['a flow step that disagrees with its case', (r) => { r.flows[0].steps[2].changing.selectedSlotId = 'sl-1112-1000'; }, /selectedSlotId is "sl-1112-1000" in the flow/],
    ['a flow that moves from saved back to failed', (r) => { const f = r.flows.find((x) => x.id === 'flow-note-save-retry'); f.steps.push({ order: 7, caseId: 'case-patient-save-failed', action: { kind: 'press', label: 'Save note' }, expected: 'The note did not save.', changing: { noteSave: 'failed' }, outcome: {} }); }, /noteSave moves from saved to failed/],
    ['a booking reference that changes mid flow', (r) => { r.cases[idx('cases', 'case-book-review-reselected')].changing.bookingRef = 'APT-0060'; r.flows[1].steps[5].changing.bookingRef = 'APT-0060'; }, /the booking reference changes from APT-0061 to APT-0060/],
    ['an outcome that says complete while the next screen is still sending', (r) => { r.flows[0].steps[3].outcome.submit = 'succeeded'; }, /flow-book-success step 4: the outcome says submit is "succeeded" but the next screen \(case-book-submitting-first\) has "submitting"/],
    ['an outcome that says idle while the next screen is sending', (r) => { r.flows[1].steps[1].outcome.submit = 'idle'; }, /flow-book-slot-lost step 2: the outcome says submit is "idle"/],
    ['a step with no outcome', (r) => { delete r.flows[0].steps[0].outcome; }, /outcome is required/],
    ['a last step that still has an outcome', (r) => { r.flows[0].steps[5].outcome = { submit: 'idle' }; }, /the last step has an outcome/],
    ['an action that is not an exact label', (r) => { r.flows[0].steps[3].action.label = 'Book now'; }, /"Book now" is not an exact action label/],
    ['a word Clinicly does not use in a screen text', (r) => { r.copy['day-empty'] = 'No sessions today.'; }, /uses a word Clinicly does not use \(sessions\)/],
    ['an empty string standing for a missing value', (r) => { r.patients[idx('patients', 'pt-0004')].email = ''; }, /an empty string; a missing value is absent or null/],
    ['an email outside example.test', (r) => { r.patients[0].email = 'jo.marsh@example.com'; }, /email must be on example.test/],
    ['an Arabic character outside the embedded subset', (r) => { r.copy['day-empty'] += ' \u06A4'; }, /Arabic characters outside the embedded subset/],
    ['a "state" word in a screen text', (r) => { r.copy['confirmed'] = 'The state of your appointment is booked.'; }, /"state" as a word on a screen/],
    ['a middle dot', (r) => { r.copy['no-phone'] = 'No phone · number'; }, /a middle dot/],
    ['an unused copy string', (r) => { r.copy['orphan'] = 'Nothing uses this.'; }, /copy.orphan is not used by any case/],
  ];
  let ok = 0, n = 0;
  const clean = validate(base); n++;
  if (clean.failures.length) console.log(`MISS  the clean copy failed: ${clean.failures.slice(0, 4).join('; ')}`); else { ok++; console.log('ok    the clean copy passes'); }
  for (const [name, plant, want] of plants) {
    n++; const r = clone(); plant(r);
    const res = validate(r), hit = res.failures.some((x) => want.test(x));
    console.log(`${hit ? 'ok  ' : 'MISS'}  ${name}${hit ? '' : ` (got: ${res.failures.slice(0, 2).join('; ') || 'nothing'})`}`);
    if (hit) ok++;
  }
  if (bookArg) {
    const html = readFileSync(bookArg, 'utf8');
    const bookPlants = [
      ['an illustration of an unknown case', (h) => h.replace('data-case="case-day-one"', 'data-case="case-day-none"'), /names the case case-day-none/],
      ['an illustration whose scheme differs from its case', (h) => h.replace(/(data-case="case-day-busy"[^>]*?)data-scheme="light"/, '$1data-scheme="dark"'), /case-day-busy: the illustration says scheme="dark"/],
      ['an illustration whose viewport differs from its case', (h) => h.replace(/(data-case="case-offline"[^>]*?)data-viewport="phone 390x844"/, '$1data-viewport="phone 360x800"'), /case-offline: the illustration says viewport/],
      ['an illustration whose text was changed', (h) => h.replace('That time was just taken. Pick another time.', 'That time went away.'), /does not show its text "That time was just taken/],
      ['a case with no illustration', (h) => h.replaceAll('data-case="case-reflow-320"', 'data-case="case-reflow-x"'), /the case case-reflow-320 has no illustration/],
      ['a denied screen that shows a patient name', (h) => h.replace(/(data-case="case-patients-denied"[^>]*>)/, '$1<span>Jo Marsh</span>'), /a denied screen shows the patient name Jo Marsh/],
    ];
    const clean2 = checkBook(base, html); n++;
    if (clean2.failures.length) console.log(`MISS  the clean book failed: ${clean2.failures.slice(0, 4).join('; ')}`); else { ok++; console.log('ok    the clean book passes'); }
    for (const [name, plant, want] of bookPlants) {
      n++; const h = plant(html), res = checkBook(base, h), hit = h !== html && res.failures.some((x) => want.test(x));
      console.log(`${hit ? 'ok  ' : 'MISS'}  ${name}${hit ? '' : ` (got: ${res.failures.slice(0, 2).join('; ') || 'nothing'})`}`);
      if (hit) ok++;
    }
  }
  console.log(`${ok}/${n} behaved`);
  process.exit(ok === n ? 0 : 1);
}
if (isMain) {
  const file = args.find((a) => !a.startsWith('--') && a.endsWith('.json')) ?? DEFAULT;
  const r = JSON.parse(readFileSync(file, 'utf8'));
  const res = validate(r);
  const bi = args.indexOf('--book'); let book = null;
  if (bi >= 0) book = checkBook(r, readFileSync(args[bi + 1], 'utf8'));
  const failures = [...res.failures, ...(book?.failures ?? [])];
  if (failures.length) { console.error(failures.map((x) => `FAIL ${x}`).join('\n')); process.exit(1); }
  console.log(JSON.stringify({ ok: true, counts: res.counts, copyStrings: res.copyStrings, arabicCharactersDistinct: res.arabicDistinct, ...(book ? { illustrations: book.illustrations, casesIllustrated: book.cases } : {}) }));
}
