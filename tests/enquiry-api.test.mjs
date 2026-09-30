import assert from 'node:assert/strict';
import test from 'node:test';
import { deliverEnquiry } from '../api/enquiry.js';
const input = { name: 'Example visitor', email: 'visitor@example.com', problem: 'Missed calls', _honey: '' };
test('only reports confirmation after both messages are accepted', async () => {
  process.env.RESEND_API_KEY = 'test-placeholder';
  const sent = [];
  const result = await deliverEnquiry(input, async (url, options) => { sent.push(JSON.parse(options.body)); return {ok:true,json:async()=>({id:'test-id'})}; });
  assert.equal(result.ok, true); assert.equal(result.confirmationSent, true);
  assert.equal(sent.length, 2); assert.match(sent[1].text, /1 working day/);
  assert.equal(sent[1].from, 'Maz Works <info@mazworks.uk>');
});
test('owner acceptance survives confirmation failure without inviting a duplicate fallback', async () => {
  let count=0;
  const result=await deliverEnquiry(input, async()=>({ok:++count===1,json:async()=>({id:'test-id'})}));
  assert.deepEqual(result,{ok:true,confirmationSent:false});
});
test('owner failure allows fallback and does not send a misleading confirmation', async () => {
  let count=0;
  const result=await deliverEnquiry(input,async()=>{count++;return {ok:false};});
  assert.equal(result.ok,false); assert.equal(count,1);
});
