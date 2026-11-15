const assert=require('assert/strict');const P=require('./dist/physics.js');
let s=new P.Sim();assert(P.connected(P.starter()));assert(!P.connected([P.makePart('capsule'),P.makePart('tank',0,2)]));
const a=P.makePart('capsule',.3,.4),b=P.makePart('tank',0,P.defs.capsule.h);assert.deepEqual(P.snap(a,[b]),{x:0,y:0,d:.5});
s.stage();for(let i=0;i<1000;i++)s.step(.02);assert(s.altitude()>500,'Rocket lifts off');assert(s.fuel()<32500,'Fuel consumed');console.log('Launch at 20 s:',s.altitude().toFixed(0),'m');
let before=s.parts.filter(p=>p.alive).length;s.stage();assert.equal(s.parts.filter(p=>p.alive).length,before-3);assert(s.activeEngine());assert(s.debris.length===3);console.log('Staging passed');
s=new P.Sim(P.starter().slice(0,3));s.onPad=false;s.pos={x:0,y:P.bodies[3].r+220000};s.vel={x:Math.sqrt(P.bodies[3].mu/s.pos.y),y:0};const initial=s.elements().a;for(let i=0;i<30000;i++)s.step(.02);const drift=Math.abs(s.elements().a-initial)/initial;assert(drift<.001);console.log('Orbital semimajor-axis drift after 600 s:',drift);
s=new P.Sim();s.sas=false;s.onPad=false;s.step(.1,1);const omega=s.omega;s.step(.1,0);assert.equal(s.omega,omega);s.sas=true;s.step(.1,0);assert(s.omega<omega);console.log('Rotational inertia and SAS passed');
s=new P.Sim();s.onPad=false;s.pos={x:0,y:P.bodies[3].r+30};s.vel={x:0,y:-250};for(let i=0;i<20;i++)s.step(.02);assert(s.lost);assert(s.debris.length>0);console.log('Impact breakup passed');
s=new P.Sim([P.makePart('capsule')]);s.onPad=false;s.pos={x:0,y:P.bodies[3].r+35000};s.vel={x:7500,y:-300};for(let i=0;i<1000&&!s.lost;i++)s.step(.02);assert(s.lost);console.log('Unshielded thermal destruction passed');
assert(P.positions(0).every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
// Delta-v: the starter reaches orbit-class speed; the Moon preset has enough for a lunar trip.
const stack=t=>{let y=0;return t.map(k=>{const p=P.makePart(k,0,y);y+=P.defs[k].h;return p})};
const dvStarter=P.deltaV(P.starter()),dvMoon=P.deltaV(stack(['probe','antenna','tankS','engineV','separator','booster','engine','separator','booster','booster','booster','engine']));
assert(dvStarter>9500&&dvStarter<10000,'starter delta-v '+dvStarter);assert(dvMoon>12400,'moon rocket delta-v '+dvMoon);console.log('Delta-v passed:',Math.round(dvStarter),Math.round(dvMoon));
// Ascent heating: a normal gravity-turn climb must not burn parts off the rocket (it used to destroy the upper tank).
s=new P.Sim(P.starter());s.stage();for(let i=0;i<2400&&!s.lost;i++){const alt=s.altitude();s.angle=Math.atan2(s.pos.x,s.pos.y)+Math.min(1.5,Math.PI/2*Math.pow(Math.max(0,alt)/80000,.6));s.omega=0;if(!s.tanks().some(p=>p.fuel>0)&&s.parts.some(p=>p.alive&&p.type==='separator'))s.stage();s.step(.1)}
assert(!s.events.some(e=>/overheating/.test(e)),'ascent overheating: '+s.events.join('|'));console.log('Ascent heating passed');
// Moon: a lander falling from 12 km can touch down softly and lift off again.
s=new P.Sim(stack(['probe','antenna','landing','tankS','engineV']));s.onPad=false;s.primary=9;s.pos={x:0,y:P.bodies[9].r+12000};s.vel={x:220,y:-35};s.stage();
for(let i=0;i<40000&&!s.landed&&!s.lost;i++){const alt=s.altitude(),g=P.bodies[9].mu/(P.bodies[9].r+Math.max(alt,0))**2,amax=P.defs.engineV.thrust/s.mass(),v=s.speed(),stop=v*v/(2*(amax-g));s.angle=Math.atan2(s.vel.x,s.vel.y)+Math.PI;s.omega=0;s.throttle=alt<stop*1.15+150?1:0;if(alt<150&&v<14)s.throttle=Math.max(0,Math.min(1,(g+(v-3))/amax));s.step(.05)}
assert(s.landed&&!s.lost&&s.touchV<18,'moon landing');assert(s.events.some(e=>/Touchdown on the Moon/.test(e)));
s.angle=Math.atan2(s.pos.x,s.pos.y);s.throttle=1;s.stage();for(let i=0;i<100;i++)s.step(.05);assert(!s.landed&&s.altitude()>5,'moon liftoff');console.log('Moon landing and liftoff passed');
console.log('All physics tests passed');


