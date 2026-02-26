/**
 * APPROACH 1: Using For Loop
 * Time Complexity: O(n)
 */
const sum_to_n_a = (n) => {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};

/**
 * APPROACH 2: Recursive with Memoization
 * Time Complexity: O(n) for the first call, O(1) for subsequent calls.
 */
const sumCache = new Map();

const sum_to_n_b = (n) => {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  // Retrieve from cache if already calculated
  if (sumCache.has(n)) return sumCache.get(n);
  // Recursive calculation and caching
  const result = n + sum_to_n_b(n - 1);
  sumCache.set(n, result);
  return result;
};

/**
 * APPROACH 3: Mathematical Formula (with BigInt for Safety)
 * Time Complexity: O(1)
 * To strictly adhere to the "MAX_SAFE_INTEGER" constraint, I used BigInt
 * for intermediate multiplication (n * (n + 1)) to prevent precision loss before dividing by 2.
 */
const sum_to_n_c = (n) => {
  if (n <= 0) return 0;
  const nBig = BigInt(n);
  const result = (nBig * (nBig + 1n)) / 2n;
  return Number(result);
};

// --- Verification ---
const testCases = [
  { input: 5, expected: 15 },
  { input: 1, expected: 1 },
  { input: 10, expected: 55 },
  { input: 100, expected: 5050 },
  { input: 0, expected: 0 },
  { input: -5, expected: 0 },
];

const fns = [
  ["sum_to_n_a", sum_to_n_a],
  ["sum_to_n_b", sum_to_n_b],
  ["sum_to_n_c", sum_to_n_c],
];

let allPassed = true;

fns.forEach(([name, fn]) => {
  testCases.forEach(({ input, expected }) => {
    const result = fn(input);
    const status = result === expected ? "✅ PASS" : "❌ FAIL";
    if (status === "FAIL") allPassed = false;
    console.log(
      `[${status}] ${name}(${input}) = ${result} (expected ${expected})`,
    );
  });
});

console.log(allPassed ? "\n✅ All tests passed!" : "\n❌ Some tests failed!");
