// Fetches live positions for the callsigns in track.json and writes live.json.
// Runs on GitHub's servers, where the aircraft trackers are reachable (phone browsers are blocked from them).
// Exit code 0 = at least one plane seen now (keep polling), 3 = none seen.
import fs from 'node:fs';
const out = process.argv[2] || 'live.json';
const { callsigns } = JSON.parse(fs.readFileSync(new URL('../track.json', import.meta.url)));
const FEEDS = [['adsb.lol', 'https://api.adsb.lol/v2/callsign/'], ['airplanes.live', 'https://api.airplanes.live/v2/callsign/'], ['adsb.fi', 'https://opendata.adsb.fi/api/v2/callsign/']];
let prev = {}; try { prev = JSON.parse(fs.readFileSync(out, 'utf8')); } catch {}
const flights = {}, now = Date.now(); let source = null, reached = false, seenNow = 0;
for (const [k, v] of Object.entries(prev.flights || {})) if (now - v.t < 20 * 3600000) flights[k] = v;   // keep the last sighting
for (const cs of callsigns) {
  for (const [name, base] of FEEDS) {
    try {
      const r = await fetch(base + cs, { headers: { 'user-agent': 'flightpath-family-tracker (github.com/joshmott89-sys/flightpath)' }, signal: AbortSignal.timeout(12000) });
      if (!r.ok) continue;
      const j = await r.json(); reached = true; source = name;
      const x = (j.ac || j.aircraft || []).find(a => a && a.lat != null && a.lon != null && String(a.flight || '').trim().toUpperCase() === cs);
      if (x) { seenNow++; flights[cs] = { t: now, lat: x.lat, lon: x.lon, alt_baro: x.alt_baro, alt_geom: x.alt_geom ?? null, gs: x.gs ?? 0, track: x.track ?? null }; }
      break;
    } catch {}
  }
  await new Promise(r => setTimeout(r, 1100));
}
fs.writeFileSync(out, JSON.stringify({ updated: now, reached, source, tracked: callsigns, flights }));
console.log(`reached=${reached} source=${source} seenNow=${seenNow} stored=${Object.keys(flights).join(',') || '-'}`);
process.exit(seenNow ? 0 : 3);
