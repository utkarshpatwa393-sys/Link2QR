import { validateUrl } from './urlValidator.js';

const testCases = [
  { input: 'https://google.com', expectedValid: true, desc: 'Standard HTTPS' },
  { input: 'https://youtube.com', expectedValid: true, desc: 'YouTube HTTPS' },
  { input: 'https://github.com/utkarshpatwa393-sys', expectedValid: true, desc: 'GitHub user path' },
  { input: 'https://example.com/page?id=123', expectedValid: true, desc: 'URL with query params' },
  { input: 'https://example.com/page?id=123#test-hash', expectedValid: true, desc: 'URL with hash' },
  { input: 'http://my-subdomain.website.org/path', expectedValid: true, desc: 'HTTP with subdomain' },
  { input: '', expectedValid: false, expectedError: 'Please enter a link first.', desc: 'Empty input' },
  { input: '   ', expectedValid: false, expectedError: 'Please enter a link first.', desc: 'Whitespace only' },
  { input: 'hello', expectedValid: false, expectedError: 'Please enter a valid URL.', desc: 'Invalid string hello' },
  { input: 'abc.xyz', expectedValid: false, expectedError: 'Please enter a valid URL.', desc: 'Missing protocol abc.xyz' },
  { input: 'ftp://example.com', expectedValid: false, expectedError: 'Please enter a valid URL.', desc: 'Non-HTTP protocol ftp://' },
  { input: 'javascript:alert(1)', expectedValid: false, expectedError: 'Please enter a valid URL.', desc: 'XSS javascript: URI' },
];

let passed = 0;
let failed = 0;

console.log('--- RUNNING LINK2QR VALIDATION TESTS ---');

testCases.forEach((tc, idx) => {
  const res = validateUrl(tc.input);
  const isValidMatches = res.isValid === tc.expectedValid;
  const isErrorMatches = tc.expectedError ? res.error === tc.expectedError : true;

  if (isValidMatches && isErrorMatches) {
    console.log(`✅ [PASS] Test ${idx + 1}: ${tc.desc} ("${tc.input}")`);
    passed++;
  } else {
    console.error(`❌ [FAIL] Test ${idx + 1}: ${tc.desc} ("${tc.input}")`);
    console.error(`   Expected: valid=${tc.expectedValid}, error=${tc.expectedError}`);
    console.error(`   Received: valid=${res.isValid}, error=${res.error}`);
    failed++;
  }
});

console.log(`\nTEST SUMMARY: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL URL VALIDATION TESTS PASSED PERFECTLY!\n');
}
