# Build-safe delivery artifacts

## Shared lesson
If AI-generated delivery or governance artifacts are committed as `.ts` or `.tsx` files inside repository-visible paths, they may be included in repository-wide TypeScript validation even if they are not part of the intended runtime application.

## Consequence
- mirrored or illustrative route and component files can break preview deployments
- invalid relative imports inside delivery artifacts can create repeated failing preview builds
- multiple failing deployments are often only symptoms; the real cause is the first unresolved module or typecheck error in the branch state

## Shared rule
1. Any committed delivery `.ts` or `.tsx` artifact must be build-safe.
2. If the artifact is illustrative only, keep it outside the app build and typecheck scope or provide valid import resolution.
3. Do not assume repeated preview failures are caused by commit granularity; first inspect the earliest concrete build or typecheck error.
4. Treat delivery artifact trees such as `ai-delivery/` as potentially typechecked unless the repository guarantees otherwise.
