// Exercise the actual inline classifier without sending analytics or form data.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('_includes/head.html', 'utf8');
const begin = source.indexOf('function classifyReferrerHost()');
const end = source.indexOf('function computeFirstTouch()', begin);
assert.ok(begin > 0 && end > begin);
const classify = source.slice(begin, end);
const cases = [
  ['', 'direct'],
  ['https://novatitan.net/services/', 'direct'],
  ['https://chatgpt.com/', 'chatgpt_referral'],
  ['https://chat.openai.com/', 'chatgpt_referral'],
  ['https://www.perplexity.ai/', 'perplexity_referral'],
  ['https://claude.ai/', 'claude_referral'],
  ['https://gemini.google.com/', 'gemini_referral'],
  ['https://copilot.microsoft.com/', 'copilot_referral'],
  ['https://www.google.com/search?q=cabling', 'google_organic'],
  ['https://www.bing.com/search?q=cabling', 'bing_organic'],
  ['https://notchatgpt.com/', 'referral'],
  ['https://chatgpt.com.example.org/', 'referral'],
  ['https://example.org/?from=claude.ai', 'referral'],
  ['invalid-url', 'direct'],
];
for (const [referrer, expected] of cases) {
  const actual = vm.runInNewContext(classify + '\nclassifyReferrerHost()', {
    document: {referrer}, window: {location: {hostname: 'novatitan.net'}}, URL,
  });
  assert.equal(actual, expected, referrer);
}
console.log(`${cases.length} referral cases passed; no network or form submission.`);
