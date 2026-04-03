# LEGFONTOSABB: SEMMILYEN MÁR JÓL MŰKÖDŐ FUNKCIÓT NEM SZABAD ELRONTANI.

# FEJLESZTÉSI MÓDSZERTAN (MINDIG EZT KÖVESD ELŐSZÖR)

**KÖTELEZŐ indító prompt minden új fejlesztéshez / hibajavításhoz:**
1. **Legfontosabb, hogy semmilyen már jól működő funkciót ne ronts el.**
2. Olvasd be a `codingLessonsLearnt.md` és a `changelog.md` fájlt.
3. Az újonnan megfogalmazott üzleti követelmény vagy hibajavítás érdekében **szedd össze az összes szükséges tudást elsődlegesen hivatalos forrásokból / megbízható dokumentációból**.
4. A begyűjtött tudás alapján **detektáld a valós gyökérokot** a kódban / konfigurációban / futási láncban.
5. **Tesztek vagy célzott próbák alapján** hasonlíts össze legalább 2 megoldási koncepciót, és a **leghatékonyabbat / legkisebb regressziós kockázatút** válaszd.
6. A fejlesztést checklist-alapon végezd el.
7. A fejlesztés végén kötelezően ellenőrizd:
   - minden kért javítás / fejlesztés elkészült-e,
   - minden korábbi fontos funkció megmaradt-e,
   - a `codingLessonsLearnt.md`-ben felsorolt korábbi hibaminták nem tértek-e vissza,
   - a `changelog.md` frissült-e,
   - ha a projekt módszertana megköveteli, a `versioning/` mappába bekerült-e az új PDF + MD dokumentumpár.

**Kötelező végellenőrző checklist minden szállítás előtt:**
- [ ] `codingLessonsLearnt.md` beolvasva
- [ ] `changelog.md` beolvasva
- [ ] szükséges forráskutatás / dokumentációellenőrzés megtörtént
- [ ] gyökérok detektálva
- [ ] legalább 2 megoldási koncepció kiértékelve
- [ ] a legkisebb regressziós kockázatú megoldás kiválasztva
- [ ] korábbi működő funkciók megléte double-checkelve
- [ ] új regresszió nem maradt bent
- [ ] changelog frissítve
- [ ] projekt-specifikus átadási artefaktumok elkészítve, ha kötelezőek

# codingLessonsLearnt.md — ÖSSZEVONT KÖZÖS TUDÁSBÁZIS

## ⚠️ UTASÍTÁSOK (MINDIG OLVASD EL ELŐSZÖR!)

**KÖTELEZŐ MUNKAFOLYAMAT — Minden fejlesztés előtt:**
1. Nyisd meg és olvasd végig ezt a fájlt MIELŐTT bármit kódolnál.
2. Ellenőrizd, hogy az új kódod nem tartalmaz-e az itt felsorolt hibamintákat.
3. Ha új hibát találsz/javítasz, AZONNAL appendeld a megfelelő kategóriába.
4. SOHA ne töröld a meglévő tartalmat — csak hozzáadni szabad.
5. SOHA ne hozz létre új fájlt ezzel a céllal — mindig ebbe a fájlba írd.

**Struktúra minden hiba bejegyzésnél:**
```md
### [HIBA-XXX] Rövid cím
- **Dátum**: Mikor fordult elő
- **Fájl**: Melyik fájlban volt / melyik logikai komponenshez tartozik
- **Hibaüzenet**: Pontos TypeScript/build/runtime/API error
- **Gyökérok**: Miért történt
- **Javítás**: Hogyan lett megoldva
- **Megelőzés**: Hogyan kerüld el a jövőben
```

**Megjegyzés az összevont tudásbázishoz:**
- A duplikált tanulságok csak EGYSZER szerepelnek.
- A több alkalmazásból származó, de azonos hibaminták összevonva kerültek be.
- Az alkalmazásfüggetlen külső API / integrációs hibák is bekerültek általános mintaként.

---

## 🔴 KATEGÓRIA 1: TypeScript / React / komponens szerződés hibák

### [HIBA-001] Hiányzó property az interface-ből
- **Dátum**: 2026-03-30 (v1.1.0)
- **Fájl**: `src/app/admin/menu/templates/page.tsx:157`
- **Hibaüzenet**: `Type error: Property 'item_sort' does not exist on type 'TemplateItem'.`
- **Gyökérok**: A `TemplateItem` interface-ben nem volt definiálva az `item_sort` property, miközben a kód hivatkozott rá (`sort_order: item.item_sort`). Az interface-t kézzel írtam, és kifelejtettem egy mezőt amit az SQL tábla tartalmaz.
- **Javítás**: Hozzáadtam `item_sort: number` a `TemplateItem` interface-hez.
- **Megelőzés**: **MINDIG** hasonlítsd össze az interface mezőket az SQL tábla oszlopaival. Ha az SQL-ben van `item_sort`, az interface-ben is KELL lennie. Checklist: minden SQL oszlop = egy interface property.

### [HIBA-002] Supabase FK reláció típusozás — `.table.number` hiba
- **Dátum**: 2026-03-30 (v1.2.0)
- **Fájl**: `src/app/admin/reports/page.tsx:61`
- **Hibaüzenet**: `Type error: Property 'number' does not exist on type '{ number: any; }[]'.`
- **Gyökérok**: Supabase `.select('table:tables(number)')` esetén a TypeScript a relációt **tömbként** (`{ number: any }[]`) típusozza, nem objektumként. Ezért `o.table.number` helyett `o.table[0].number` kellene, de valójában futásidőben objektumot ad vissza (nem tömböt).
- **Javítás**: A `.map()` callback-ben `(o: any)` típust használtam: `.map((o: any) => [...])` — ez megkerüli a Supabase TS típus problémát.
- **Megelőzés**: **MINDIG** használj `(item: any)` cast-ot amikor Supabase `.select()` eredményt iterálsz és FK relációkat (`table:tables(...)`, `venue:venues(...)`, `menu_item:menu_items(...)`) használsz. VAGY használj `useState<any[]>([])` a state-hez. A kettő közül az egyik KÖTELEZŐ.

### [HIBA-003] Supabase FK — új oszlopok nem ismertek a TS típusokban
- **Dátum**: 2026-03-30 (v1.2.0)
- **Fájl**: `src/app/admin/reports/page.tsx:137`
