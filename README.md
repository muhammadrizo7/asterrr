# Aster — Junior Space Program

Aster is a buildless, original browser game for a NASA Space Apps challenge. It has two acts:

- **Act 1 · Getting there:** a 2D rocket simulator with real physics, a vehicle builder and 9 missions.
- **Mission Control:** run a space agency from 1957. Answer science questions with missions, build ground stations and satellites, research new technology, take contracts, handle emergencies and replay real historical missions for medals. Finish the agency objectives to unlock Act 2.
- **Act 2 · Staying alive:** a Moon outpost where kids aged 7–12 manage power, life support and radiation shielding for 14 days. The game uses real NASA open data.

## Run it (no Node.js needed)

You do **not** need to install Node.js or anything else. Just use a web browser (Chrome, Edge, Firefox, Safari or a school Chromebook).

1. Unzip `aster.zip`.
2. Double-click **`Aster.html`**. That's it.

`Aster.html` is the whole game in one file. You can copy it to a USB stick, email it, or put it on any website, and it works offline.

`dist/index.html` is the same game split into separate files (easier to read and edit). It also works by double-click.

To put Aster online, upload `Aster.html` (or the whole `dist/` folder) to any static web host, such as GitHub Pages or Netlify.

Fonts fall back to system fonts offline. The Earth texture is bundled. Only the Outpost’s “This month's real Sun” button needs internet.

### Optional, for developers only

- After editing anything in `dist/`, rebuild the one-file game: `powershell -ExecutionPolicy Bypass -File build.ps1` (Windows, no Node.js needed).
- `powershell -ExecutionPolicy Bypass -File serve.ps1` serves `dist/` at http://127.0.0.1:4173 without Node.js.
- With Node.js: `npm start` (or `node server.cjs`) serves `dist/`; `npm test` runs the physics checks (including ascent heating, delta-v and a Moon landing and lift-off).

## Files

| File | What it does |
|---|---|
| `dist/index.html` | Page layout for all screens |
| `dist/style.css` | All styles |
| `dist/physics.js` | Flight model (SI units) |
| `dist/part-art.js` | Rocket part artwork |
| `dist/app.js` | Flight deck, vehicle assembly and missions |
| `dist/agency.js` | Mission Control: run a space agency (science goals, mission design, stations, satellites, research, contracts, events, archive, risk predictor) |
| `dist/motion.js` | Moving scenery: background stars, Mission Control live map, Moon base scene |
| `dist/landing.js` | Touchdown animation for the Moon, Mars and asteroids (flight deck and Mission Control) |
| `dist/outpost.js` | Act 2 Outpost, crew health journal, debrief, NASA data page, tap-to-explain terms. Embedded NASA data is at the top of this file. |
| `dist/assets/earth.jpg` | NASA Blue Marble Earth texture |
| `dist/assets/earth.js` | The same Earth texture as a script, so `dist/index.html` works when opened by double-click |
| `build.ps1`, `serve.ps1` | Rebuild `Aster.html` from `dist/`, and serve the game locally (Windows PowerShell, no Node.js) |
| `server.cjs`, `test.cjs`, `package.json` | Optional developer tools (need Node.js) |

## Play: Act 1, flight deck

- Space: ignite, separate the lowest remaining stage, then deploy the recovery chute. After the rocket is lost, Space restarts the flight.
- A / D: rotational torque. SAS damps angular velocity; turn it off to experience free rotation.
- W / S or the throttle slider: throttle. P: pause.
- Mouse wheel or pinch: continuous zoom from the vehicle to the solar system. Drag to pan; the crosshair button restores rocket tracking.
- Tap Apoapsis, Periapsis, Dynamic pressure or Liftoff TWR for a plain-language explanation.
- After a failed flight, Mission Control shows a one-line hint about what went wrong.
- Science missions that need special equipment use a loaner rocket, so your saved blueprint is never replaced. “Hello, neighbour” also lends you a Moon rocket if yours is too small.
- Vehicle assembly shows **Rocket power (Δv)** and what the rocket can reach. Earth orbit needs about 9.5 km/s and the Moon about 12.5 km/s.
- **Practice flights** (Space program page) each have 4 steps with ticks and a live guide in the mission panel:
  - *Practice atmospheric entry*: point the heat shield forward, survive the heat, open the parachute below 5 km and 250 m/s, touch down below 12 m/s.
  - *Practice orbital flight*: zoom out, raise apoapsis to 500 km, circularise at apoapsis above 450 km, then lower periapsis below 80 km and fly the entry steps home.
  - *Practice Moon landing*: point retrograde, brake when your speed is above the safe speed for your height, slow below 10 m/s near the ground (the guide suggests a throttle %), touch down below 18 m/s.
- Autopilot buttons (next to SAS): **PRO** points the rocket the way it is moving, **RETRO** points it the other way (and straight up when you are nearly stopped, for landings), **AUTO** flies to a 200 km Earth orbit. Press A or D to take over at any time.
- Going to the Moon: the mission panel guides you step by step, with buttons for each step. Reach orbit, point prograde and burn when the Moon is about 110° ahead; the engine stops by itself at 395,000 km apoapsis. A predicted path shows your closest approach. **🤖 Aim at the Moon** makes small correction burns on the way, and **🤖 Fly 50 km above the Moon** fine-tunes the pass when you arrive (the prediction is exact there). These use real fuel.
- Landing on the Moon: point retrograde, burn to slow down, and touch down below 18 m/s with landing legs. Dust flies, a flag appears and a touchdown animation plays. You can lift off again if you have fuel. Try **Practice Moon landing** on the Space program page.

## Play: Mission Control

- A **Next step** card always shows the most useful thing to do, with a button that opens the right tab.
- The Archive has 16 missions, from Sputnik 1 (1957) to Europa Clipper (still flying) and Artemis IV (planned). Results compare your mission with the real one: science, reliability, travel time and cost. The real science and reliability scores are game estimates.
- Landers, rovers, sample-return and crewed missions play a touchdown animation when they reach the Moon, Mars or an asteroid.
- Relay satellites can go to the Moon and Mars, and after the Outer-planet relays research, to Jupiter and Saturn.
- The **Mission Director** offers contracts that fit what your agency is missing, and says why. It is a rule-based generator, not a chatbot.
- **Signals:** a two-player radio link. Pick where your partner's base is (Earth, the Moon or Mars). Radio delay, noise, dishes and relays all matter, and you can share 10 science as a gift. First Contact puzzles are generated fresh for every game.

## Play: Act 2, Outpost

- The Outpost tab unlocks after the Moon mission “Hello, neighbour”. A “Play outpost now” button lets anyone (and judges) jump straight in.
- Each day, pick 2 of 4–5 cards. Every card costs something. Low power today means fewer cards tomorrow.
- Days 8–14 are lunar night: solar panels make zero power. A warning appears from day 5.
- 1–2 real solar events from NASA DONKI hit on random days, with one day of warning. Charging the storm shelter lowers the dose; storms also block “Send data home”.
- After each day, your crew’s dose is shown next to a real ISS reading from NASA RadLab.
- Real NASA OSDR studies unlock in the crew health journal as things happen.
- At the end, a debrief shows a day-by-day timeline, a score and a “Try a different strategy” button.
- Progress is saved in this browser (localStorage). No account, no download.

## NASA data used

The in-game **NASA data** page lists every dataset, what it controls and its source link. Embedded data was copied from NASA APIs on 14 Nov 2026 and is always labelled as archived. Only the “This month's real Sun” button fetches live data, and it shows LIVE only when NASA answers.

- **DONKI** (solar flares and solar energetic particle events): https://api.nasa.gov/ · https://kauai.ccmc.gsfc.nasa.gov/DONKI/
  - On the fetch date `/DONKI/FLR` returned 404, so flare classes come from DONKI flare notifications (`/DONKI/notifications?type=FLR`).
- **OSDR RadLab** (ISS absorbed dose rates, µGy/hour): https://visualization.osdr.nasa.gov/radlab/
- **OSDR studies** (crew health journal): https://osdr.nasa.gov/
- **JPL approximate planetary elements:** https://ssd.jpl.nasa.gov/planets/approx_pos.html
- **Mission Archive facts:** NASA NSSDCA catalogue (https://nssdc.gsfc.nasa.gov/) and NASA mission pages for Europa Clipper (https://science.nasa.gov/mission/europa-clipper/) and Artemis (https://www.nasa.gov/mission/artemis-iii/), checked 15 Nov 2026.
- **NASA Blue Marble:** https://visibleearth.nasa.gov/collection/1484/blue-marble (copy via WebGL Earth: https://github.com/turban/webgl-earth/blob/master/images/2_no_clouds_4k.jpg)
- **Sutton & Graves, NASA TR R-376** (heating): https://ntrs.nasa.gov/citations/19720003329
- **Canadian Space Agency food production toolkit** (greenhouse reference): https://www.asc-csa.gc.ca/eng/youth-educators/toolkits/food-production/

Outpost balance numbers (card costs, daily use, storm multipliers, the 7-day lunar night) are game simplifications, listed on the NASA data page.

## Simulation scope

SI-unit inverse-square gravity; finite propellant and thrust/Isp mass flow; exponential atmospheres and aerodynamic drag; torque divided by moment of inertia; damped SAS; simplified Sutton–Graves heating, radiative cooling and per-part thermal failure; collision debris; patched primary-body reference frames with solar/lunar tidal terms.

This is an educational 2D approximation, **not a validated engineering simulator**. Planets use fixed J2000 orbital elements advanced with Kepler's equation in a common 2D plane. The Moon has a simplified eccentric orbit. Atmospheres, drag, heat shields and fragmentation are simplified. Sputnik, Explorer and Hubble-inspired missions are simplified mission-goal exercises, not exact historic reconstructions.

## Credits

The detailed part renderer and recovery-canopy design are adapted from the user-provided APOGEE_9_Space_Program.html. Feature inspiration: https://store.steampowered.com/app/1718870/Spaceflight_Simulator/

Original visual interface and code. Not affiliated with NASA, the Canadian Space Agency, Team Curiosity or Spaceflight Simulator.
