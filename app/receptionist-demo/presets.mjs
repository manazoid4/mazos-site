/**
 * "Try it as your business": a visitor types their business name and picks a
 * trade, and the demo answers as them straight away. £0, nothing stored, no
 * scraping. Presets hold only service names and urgent words, never prices,
 * hours or areas: the receptionist then says it won't guess and takes a
 * message, which is the honest behaviour for details we don't have.
 */
import { cleanConfig, safeText } from './engine.mjs';

/** @typedef {{ id: string, label: string, services: string[], urgent: string[] }} Preset */

/** @type {Preset[]} */
export const PRESETS = [
  { id: 'garage', label: 'Garage', services: ['MOT', 'Service', 'Tyres', 'Brakes', 'Diagnostics'], urgent: ['broken down', 'breakdown', 'stuck', 'accident'] },
  { id: 'plumbing', label: 'Plumbing and heating', services: ['Boiler service', 'Boiler repair', 'Leaks', 'Radiators', 'Bathrooms'], urgent: ['leak', 'leaking', 'no heating', 'no hot water', 'flooding', 'burst'] },
  { id: 'roofer', label: 'Roofer', services: ['Roof repairs', 'New roofs', 'Flat roofs', 'Guttering', 'Chimney repairs'], urgent: ['roof leak', 'leak', 'leaking', 'storm damage', 'tiles off', 'water coming in'] },
  { id: 'electrician', label: 'Electrician', services: ['Rewiring', 'Fuse box', 'Sockets', 'Lighting', 'EV charger', 'Safety check'], urgent: ['no power', 'power cut', 'sparking', 'tripping'] },
  { id: 'salon', label: 'Hair, beauty or barber', services: ['Haircut', 'Colour', 'Blow dry', 'Nails', 'Brows', 'Beard trim'], urgent: ['reaction', 'allergic', 'swelling', 'swollen', 'burning', 'burnt'] },
  { id: 'clinic', label: 'Clinic or therapist', services: ['Appointment', 'Assessment', 'Massage', 'Physio', 'Follow-up'], urgent: ['severe pain', 'swelling'] },
  { id: 'dental', label: 'Dental practice', services: ['Check-up', 'Hygienist', 'Filling', 'Whitening', 'Emergency appointment'], urgent: ['toothache', 'swelling', 'broken tooth', 'knocked out'] },
  { id: 'cleaning', label: 'Cleaning', services: ['Regular clean', 'Deep clean', 'End of tenancy', 'Office cleaning', 'Carpet cleaning'], urgent: ['flood', 'spill'] },
  { id: 'builder', label: 'Builder or handyman', services: ['Extensions', 'Repairs', 'Roofing', 'Plastering', 'Kitchens'], urgent: ['roof leak', 'collapsed', 'storm damage', 'water coming in'] },
  { id: 'other', label: 'Something else', services: [], urgent: [] },
];

/**
 * Builds a demo config from what a visitor typed. Returns null when the name
 * is empty or refused (web addresses, long digit runs), so the form can say so
 * instead of quietly showing the example garage.
 * @param {string} name
 * @param {string} presetId
 * @param {string} [hours]
 */
export function presetConfig(name, presetId, hours = '') {
  const typed = safeText(name, 40);
  if (!typed) return null;
  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[PRESETS.length - 1];
  const config = cleanConfig({
    name: typed,
    hours,
    services: preset.services.map((service) => ({ name: service })),
    urgent: preset.urgent,
  });
  // cleanConfig falls back to the example garage when it refuses the name.
  return config.name === typed ? config : null;
}
