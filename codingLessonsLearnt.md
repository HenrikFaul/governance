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



## ➕ APPEND — 2026-04-03 siteadmin / venue-admin szétválasztás (Pubapp-specifikus)

### [HIBA-051] Site Admin rossz entrypointra mutatott a venue-admin shellből
- **Dátum**: 2026-04-03 (Pubapp v1.4.3)
- **Fájl**: `src/app/admin/layout.tsx`
- **Hibaüzenet**: A venue-admin oldalsávban megjelent a Site Admin link, ami nem a Site Admin főoldalra, hanem a `siteadmin/venues` nézetre vitt — a dashboard üresnek látszott.
- **Gyökérok**: A siteadmin külön route létrejött, de a régi `/admin` shellben bent maradt a keverő menüpont rossz célútvonallal.
- **Javítás**: A közvetlen sidebar menüpont kikerült a venue-admin navigációból; superadmin esetén csak elkülönítő CTA marad a `/siteadmin` felületre.
- **Megelőzés**: Ha két adminhatókör szétválik, az egyik shell főnavigációjában NEM maradhat a másik felület azonos prioritású menüpontként. Az entrypoint a gyökér route-ra mutasson, nem belső aloldalra.

### [HIBA-052] A külön siteadmin route létrehozása önmagában nem szünteti meg a funkcionális keveredést
- **Dátum**: 2026-04-03 (Pubapp v1.4.4)
- **Fájl**: `src/app/admin/layout.tsx`, `src/app/admin/config/page.tsx`
- **Hibaüzenet**: A siteadmin a szolgáltatói admin részeként látszott; a Common Admin bent maradt a venue-admin konfigurátorban.
- **Gyökérok**: Az új route és layout létrejött, de a régi entrypointok és tabok megmaradtak a venue-admin shellben.
- **Javítás**: Venue-adminból eltávolítva a Site Admin navigáció és a Common Admin tab; siteadmin/venues visszalépést kapott a `/siteadmin` dashboardra.
- **Megelőzés**: Admin hatóköri szétválasztásnál kötelező a régi shell ÖSSZES entrypointját, tabját és navigációs elemét eltávolítani — nem elég csak az új route-ot létrehozni.

*Appendelve: 2026-04-03 — governance integritás sync*
