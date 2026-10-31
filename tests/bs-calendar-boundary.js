#!/usr/bin/env node
/* Optional dependency-free Node.js regression test for the EXISTING BSCalendar.js.
 * This test is supplied with docs and has not yet been run on the development VM.
 * Execute: node tests/bs-calendar-boundary.js
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const jsFile = path.resolve(__dirname, '../desktop/sddm/nepalos/BSCalendar.js');
if (!fs.existsSync(jsFile)) {
  console.error('Missing calendar source: ' + jsFile);
  process.exit(2);
}
const context = vm.createContext({ Date, Math });
vm.runInContext(fs.readFileSync(jsFile, 'utf8'), context, { filename: jsFile });
if (typeof context.convert !== 'function') {
  throw Error('Calendar source does not export a convert() function in the VM context');
}
let count = 0;
function assertDate(y, m, d, expected) {
  const got = context.convert(new Date(y, m - 1, d));
  const want = expected ? JSON.stringify(expected) : 'null';
  const actual = got ? JSON.stringify({year:got.year,month:got.month,day:got.day}) : 'null';
  if (actual !== want) throw Error(`${y}-${m}-${d}: got ${actual}; expected ${want}`);
  console.log('PASS', `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, actual);
  count++;
}
assertDate(2022, 4, 13, null);
assertDate(2022, 4, 14, {year:2079,month:1,day:1});
assertDate(2026, 10, 31, {year:2083,month:7,day:14});
assertDate(2044, 3, 14, {year:2100,month:12,day:1});
assertDate(2044, 4, 10, {year:2100,month:12,day:28});
assertDate(2044, 4, 11, {year:2100,month:12,day:29});
assertDate(2044, 4, 12, {year:2100,month:12,day:30});
assertDate(2044, 4, 13, null);
console.log(`ALL ${count} calendar edge cases passed`);
