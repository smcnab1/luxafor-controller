# Release checklist

`main` tracks the reconciled published extension with personal documentation and offline tests. Start future features on `release/next-raycast-update`; decide a new standalone version only when its scope is known. Historical release branches remain reference material.

## Development and checks

- Preserve the published commands, preference keys, target-scoped history and uncertain-delivery behaviour. Opening, refreshing, background launches and cancelled confirmations must never change the light.
- Use Node 26.12.1 and npm. Run `npm ci --ignore-scripts`, then `npm run check`. Automated tests block external networking; never insert a real User ID into fixtures.
- Test native Raycast separately: main/custom/menu views, shortcuts, confirmations, read-only refresh and failure feedback. A successful build or mocked test is not physical-device acceptance.
- Genuine upgrade, User ID retention, full menu lifecycle, accessibility, appearance, live API and physical effects need their own evidence. Real-device commands require deliberate authorisation.

## Prepare a Store update

- Compare the complete extension subtree with the latest accepted Raycast source, including screenshots and support files. Keep the personal README, tests, workflows, instructions and development scripts in this repository.
- Add exactly one new user-facing changelog entry with `{PR_MERGE_DATE}` for the next submission; preserve all published entries. Do not guess the merge date or bump the version merely to open the next branch.
- Use the current Raycast PR template with concise text and genuine captures. Update the existing upstream PR for review corrections rather than creating duplicates.
- Review dependencies explicitly; do not automatically apply audit fixes or blanket overrides. Keep next-release changes distinct from the accepted baseline.
- Obtain appropriate delivery authorisation. Do not dispatch a sync workflow to overwrite `main`; the retained sync workflow now reports a comparison only.

## After publication

- Verify both merge and Store publication, then reconcile the actual accepted subtree. Document every intentional personal-only difference and preserve unique work.
- A GitHub tag/release is separate from Store publication. Prepare it only with explicit authorisation and verified version/source evidence; do not upload an untested archive as a release asset.
- Verify tests/build and any applicable native checks. Start or fast-forward `release/next-raycast-update` from the reconciled `main`, preserving any pending work. Never force-reset a branch with unique commits.
