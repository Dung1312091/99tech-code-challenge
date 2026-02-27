# List of Issues & Anti-patterns Found

1. **`lhsPriority` doesn't exist** — the filter uses `lhsPriority` but the actual variable is `balancePriority`. This crashes immediately with a ReferenceError.

2. **Filter logic is inverted** — `balance.amount <= 0` returns true, so it keeps zero/negative balances and throws away real ones. Should be `> 0`.

3. **`prices` in useMemo deps for no reason** — `prices` is in the dependency array but never used inside the memo. Every price update re-runs the whole filter+sort for nothing.

4. **`formattedBalances` computed but never used** — the code maps `sortedBalances` into `formattedBalances` (adding `formatted`), but then `rows` maps over `sortedBalances` again. So `balance.formatted` is always undefined in the JSX.

5. **Missing types** — `WalletBalance` doesn't have `blockchain` even though it's used everywhere. `FormattedWalletBalance` copies fields instead of extending. `getPriority` takes `any` which kills type safety.

6. **Sort doesn't return 0 for equal priorities** — when both sides have the same priority, the comparator returns `undefined`. Most browsers handle it but it's technically wrong per the spec.

7. **Array index as key** — using `index` as key means React can't track items correctly when the list re-sorts. Leads to stale UI. Should use something stable like `${blockchain}-${currency}`.

8. **`getPriority` inside the component** — it's a pure function that doesn't depend on props/state, but gets recreated every render since it's in the component body. Should be outside.

9. **Unused `children` destructure** — `children` is pulled from props but never referenced. Just dead code.
