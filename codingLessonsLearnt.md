### [HIBA-EXEC-002] Shared admin capability drift across repos
- **Dátum**: 2026-04-03
- **Fájl**: `common_admin/*`, `controller.md`, repo-local admin UIs
- **Hibaüzenet**: Ugyanaz a shared admin feature különböző repo-kban eltérően fejlődik, ezért a Hobbeast és Pubapp admin képességei elcsúsznak egymástól.
- **Gyökérok**: Nem volt egyetlen kanonikus common_admin forrás, ezért a fejlesztések közvetlenül az app repo-kban születtek meg.
- **Javítás**: A common admin modell, rollout szabályok és promptok külön `common_admin/` mappába kerültek a governance repóban, és onnan kell a helyi rolloutot levezetni.
- **Megelőzés**: MINDEN common admin változtatásnál először a governance repo `common_admin/` fájljait kell módosítani, és csak utána szabad a Hobbeast / Pubapp implementációt átvezetni.

### [HIBA-EXEC-003] Changelog overwrite is forbidden
- **Dátum**: 2026-04-03
- **Fájl**: `CHANGELOG.md`, repo-local `changelog.md`
- **Hibaüzenet**: Új szállítás során a changelog teljes tartalma lecserélődött, ezért a delivery history visszakövethetősége sérült.
- **Gyökérok**: A changelog frissítése nem governance-szintű append-only szabályként volt kezelve.
- **Javítás**: Az append-only changelog szabály bekerült a governance kanonikus szabályai közé, és a korábbi történet vissza lett állítva.
- **Megelőzés**: MINDEN repo changelogját append-only történetként kell kezelni. Korábbi bejegyzést törölni, lecserélni vagy felülírni tilos.

