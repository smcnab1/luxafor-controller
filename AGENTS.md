# Luxafor Controller engineering instructions

## Workflow

1. Identify this extension, the task and authorised scope; inspect current branch/HEAD, status, code/tests and existing PR/review before editing. Preserve unrelated changes.
2. Read the [shared playbook](../raycast-docs/playbook/README.md), the applicable stage, [best practices](../raycast-docs/playbook/standards/best-practices.md), [quality gates](../raycast-docs/playbook/standards/quality-gates.md) and the [extension guide](../raycast-docs/playbook/extensions/luxafor-controller.md). Use the README routing table to load **all** affected standards and linked API guidance before implementation.
3. If repositories are not siblings, use an explicit `RAYCAST_PLAYBOOK_DIR` supplied in the session (the directory containing the playbook README, not the repository root; a navigation hint, not an application setting) or locate `raycast-docs/playbook/README.md` in the workspace. Do not depend on an absolute machine path or assume a hosted URL. If unavailable, retain the safeguards below and locate guidance before a change requiring it.
4. Recheck current official Raycast docs through `https://developers.raycast.com/llms.txt` for submission, new APIs, compatibility changes and unresolved conflicts. Separate mandatory platform/Store rules, official recommendations, project standards and conditional requirements. AI development remains deferred because the owner lacks the required access. Teams/private publishing is deferred. Windows expansion requires separately scoped compatibility and native testing evidence.
5. Implement only the requested scope using existing architecture. Verify the exact dirty candidate, real scripts/locked tools and relevant failure paths. Report results, unavailable native/account/device levels and outstanding gates without claiming unperformed checks.

Stage route: 1 for the baseline; 2 for implementation; 3 for automated checks; 4 for native testing; 5–6 for Store/submission work; 7 for review corrections; 8 for accepted-source reconciliation. Use every affected stage; a read-only investigation does not authorise implementation or delivery.

## Delivery and enduring safeguards

- Do not push, open/modify PRs, merge, publish, tag/release, deploy, grant OAuth or send real device commands without appropriate task authorisation. Prepare concrete local evidence before requesting a delivery decision when needed.
- Submit authorised updates through `smcnab1/extensions`, one upstream PR per extension update; corrections update that PR. Use the [submission-fork preflight](../raycast-docs/playbook/audit/chatgpt-project-export.md#submission-fork-preflight) to explicitly load these instructions when working in the fork. Do not copy these instructions into Store submissions solely to distribute them.
- Never use `agent/` or `codex/` in branch names or commits. Use Conventional Commits and the user's configured Git identity; do not impersonate another identity.
- Keep command/preference/storage identifiers stable pending an authorised migration. Never replace valid saved data with partial/invalid external data, silently reset corrupt storage, or clear a failed form/draft. Cancel obsolete reads and prevent stale completions/writes using the owning implementation.
- Keep credentials/private content out of logs, toasts, screenshots, tests and PR evidence. Use supported preferences/OAuth APIs. No external analytics or direct Keychain access.
- Use native Raycast components/navigation, truthful loading/errors and predictable keyboard actions. Build success is not native distribution, upgrade, live-account or physical-device acceptance. Merge, Store publication and standalone release are distinct.
- Shared playbook prose uses British English; submitted interface/Store copy follows Raycast's US English guidance. Preserve existing standalone document conventions unless the task changes them.

## Luxafor safeguards

- Opening, reopening, refreshing, background/menu status reads and cancelled confirmation must send no light-changing request. Real device effects require explicit task authorisation.
- Preserve fixed HTTPS endpoints, redirect rejection, payload validation, timeout/cancellation and existing macOS cross-command kernel guard. A UI busy flag cannot replace it; do not delete a live guard inode or take over solely by age.
- Never automatically retry, queue/replay or restore a previous light after uncertain delivery. Timeout/abort/network failure after dispatch can follow a real device change. API acceptance does not prove physical LED state.
- Preserve target-scoped `luxafor-history-v2-*`, pending/accepted/uncertain distinctions and legacy choices. Keep previous acceptance on failed attempts; say if acceptance succeeded but persistence failed. No raw identifiers/payloads/responses in diagnostics.
- Retain stable command/preferences, including legacy endpoint/debug values. `.co.uk` operation is unverified. Explicit User ID/request-size and response-byte limits are not currently implemented; do not claim otherwise or add fixes during a documentation-only task.
- Existing validation: `npm run check`; `npm run bundle` is packaging only. Automated tests use injected/no-network transports. Native macOS guard tests, installed distribution, genuine upgrade, live API and physical hardware each need separate evidence; no hardware acceptance without observed device effects.
- Read the current `review/` handoff as historical evidence, not current approval. Preserve published changelog entries exactly; new submission heading is `## [Change title] - {PR_MERGE_DATE}`.
