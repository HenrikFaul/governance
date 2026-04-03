# Governance Pack - Changelog

Minden governance változtatás append-only módon kerül ide.

---

## [1.0.1] - 2026-04-03

### 🧩 Common Admin canonical model és append-only javítás
- Kanonikus `common_admin/` modell és rollout-szabályrendszer hozzáadva.
- Kifejezett append-only changelog szabály hozzáadva az execution és controller réteghez.
- A közös admin capability-k rolloutját a governance központi forrásából kell indítani Hobbeast és Pubapp irányába.
- Új versioning dokumentumpár:
  - `versioning/14040333_v1.0.1_business_request_summary.pdf`
  - `versioning/14040333_v1.0.1_ai_dev_prompts.md`

---

## [1.0.2] — 2026-04-03

### 🔧 Governance integritás sync — cross-repo cleanup

- **Pubapp cleanup**: Az APPEND fájlok (`CHANGELOG_APPEND_v1.4.3/4.md`, `CODING_LESSONS_APPEND_v1.4.3/4.md`) beolvasztva a célállományokba; duplicate v1.4.3 versioning pár (14040335) törölve; HIBA-051/052 siteadmin tanulságok appendelve a megosztott tudásbázisba.
- **Hobbeast cleanup**: Changelog kronológiai sorrendbe hozva, v1.4.2 bejegyzés hozzáadva, controller szinkronizálva, `codingLessonsLearnt.local.md` létrehozva.
- **ReleaseGovernance cleanup**: `.governance/controller.md` kiegészítve common_admin és append-only szabályokkal.
- **Governance central**: `codingLessonsLearnt.md` frissítve HIBA-051/052-vel.
- **Szabály kiterjesztve**: A controller `Append-only changelog rule` most explicit megjegyzést tartalmaz arról, hogy kronológiai reordering csak teljes history megőrzése mellett, explicit governance fix deliveryként megengedett.

### ✅ Végellenőrzési checklist
- [x] Minden repo changelog history érintetlen
- [x] Megosztott tanulságok (HIBA-051/052) szinkronban minden érintett repóban
- [x] Controller fájlok szinkronizálva
- [x] Felesleges APPEND fájlok törölve (tartalom beolvasztva)
