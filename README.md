# MIDI veebisait · Jekyll + GitHub Pages

Valmis eesti- ja ingliskeelne uurimisrühma veebisait. Kujundus kasutab pehmet rohe-valget värvigammat ja punast aktsenti. See on TLÜ DTI-st inspireeritud kujundus, mitte ametliku brändijuhise reproduktsioon.

## 1. Loo uus GitHubi repositoorium

Soovitus: loo oma GitHubi kontole **uus tühi public repo nimega `midi`**. Ära märgi loomisel README, .gitignore’i ega litsentsi lisamist: failipaketis on README ja .gitignore juba olemas. Sisu kasutusõigused ja koodi litsents saab omanik eraldi määrata.

Sait on algseadistatud aadressile `https://martlaa.github.io/midi/`. Kui repo omanik või nimi erineb, muuda `_config.yml`:

```yaml
url: "https://SINU-KASUTAJANIMI.github.io"
baseurl: "/REPO-NIMI"
```

`url` lõppu ei käi kaldkriipsu. `baseurl` algab kaldkriipsuga, kuid ei lõpe sellega. Keelelehed asuvad `/et/` ja `/en/`; juuraadress suunab eesti avalehele.

## 2. Tõsta failid GitHubi

Paki ZIP lahti. Repo juurkausta peavad jõudma **kausta `midi-website` sees olevad failid ja kaustad**, mitte ümbritsev kaust ega ZIP ise. Repo juures peavad olema `_config.yml`, `index.html`, `_layouts`, `_data`, `et`, `en` ja `assets`.

Lihtsaim viis:

1. Ava tühi repo GitHubis ja vali **uploading an existing file** või **Add file → Upload files**.
2. Lohista kausta `midi-website` sisu üleslaadimisalasse. Kontrolli, et kõik alamkaustad lähevad kaasa.
3. Salvesta failid nupuga **Commit changes** harusse `main`.

GitHub Desktopiga saad tühja repo arvutisse kloonida, failid sinna kopeerida ning valida Commit ja Push. See säilitab ka peidetud `.gitignore` faili. Veebiliidese kaudu avaldamine toimib ka siis, kui `.gitignore` ei läinud kaasa.

Käsurea alternatiiv (asenda KASUTAJA ja REPO õigete väärtustega):

```sh
git init -b main
git add .
git commit -m "Add bilingual MIDI website"
git remote add origin https://github.com/KASUTAJA/REPO.git
git push -u origin main
```

## 3. Lülita GitHub Pages sisse

Repo **Settings → Pages → Build and deployment**:

- Source: **Deploy from a branch**.
- Branch: **main**.
- Folder: **/(root)**.
- Salvesta.

GitHub genereerib lehed Jekylliga. Eraldi Actionsi töövoogu pole selle lahenduse jaoks vaja. Ära lisa `.nojekyll` faili: see lülitaks Jekylli välja. Ära laadi üles kohalikku `_site` kausta.

Valmimise olekut näeb repo **Actions** vaates. Pagesi seadete lehele tekib saidi aadress. Esimesel korral võib avaldamine võtta mõne minuti. Kui avaleht avaneb, testi mõlemat keelt, alamlehti ja mobiilimenüüd. Kui kujundus puudub, kontrolli kõigepealt `_config.yml` `baseurl` väärtust.

## 4. Failide ülesehitus

```text
_config.yml                  saidi aadress ja Jekylli seadistus
Gemfile                      kohaliku eelvaate sõltuvused
index.html                   suunamine eesti avalehele
404.html                     kakskeelne vealeht
_data/
  ui.json                    mõlema keele kasutajaliidese tekstid
  navigation.json            menüü
  communities.json           MIDI, miniMIDI, MIDIx
  research.json              uurimissuunad
  people.json                liikmed ja allikatega toetatud teemad
  projects.json              projektid ja nende seis
  activities.json            tegevused ja sündmused
  categories.json            ajajoone filtrid
_layouts/                    üldkujundus ja avalehe paigutus
_includes/                   korduskasutatavad loendid
assets/css/main.css          kujundus
assets/js/main.js            mobiilimenüü ja ajajoone filtrid
assets/favicon.svg           saidi ikoon
et/                          eestikeelsed Markdown-lehed
en/                          ingliskeelsed Markdown-lehed
docs/SOURCES.md              allikaregister ja sisulised valikud
docs/EDITORIAL.md            toimetamise juhis
```

JSON on Jekylli toetatud andmevorming. Eraldi pistikprogramme, välist teemat ega veebifonte ei kasutata. Sait toimib ka ilma JavaScriptita: kõik menüülingid ja tegevused on siis nähtavad, ainult filtrid puuduvad.

## 5. Kohalik eelvaade

Vajad Ruby ja Bundlerit. Soovitatav on eraldi paigaldatud Ruby 3.3; macOSi süsteemi Ruby võib olla sõltuvuste jaoks liiga vana. Projekti kaustas:

```sh
bundle install
bundle exec jekyll serve --baseurl ""
```

Ava `http://127.0.0.1:4000/`. Ainult genereerimiseks:

```sh
bundle exec jekyll build
```

Genereeritud failid tekivad `_site` kausta. Selle sisu GitHubi üles laadida pole vaja. Pärast `_config.yml` muutmist käivita eelvaade uuesti. `Gemfile.lock` võib pärast `bundle install` käivitamist reposse lisada; seda ei ole käesolevas paketis lukustatud ühe arvuti platvormi külge.

## 6. Sisu uuendamine

- Tavalise lehe muutmiseks ava näiteks `et/about/index.md` ja selle ingliskeelne paar `en/about/index.md`.
- Inimesi muuda failis `_data/people.json`. Säilita kasutaja antud rollijaotus. Kõigil inimestel ei ole allikates uurimisteemat; selle puudumine ei ole viga.
- Projekte muuda `_data/projects.json`. Staatus peab eristama taotlust, rahastusotsust, käivitunud projekti ja lõppenud projekti.
- Tegevused asuvad `_data/activities.json`. Järjekord failis on kuvamise järjekord. Täpse kuupäevata tegevused on lõpus. `featured: true` märgib avalehe esiletõste; avaleht näitab esimest kolme sellist kirjet.
- Uue tegevuse `category` peab vastama `_data/categories.json` identifikaatorile.
- `et` ja `en` väljad täida mõlemad. JSONis peavad võtmed ja stringid olema jutumärkides; viimase välja järele koma ei lisata.
- Keelevahetuseks on igal lehel `translation` ja `other_lang`. `permalink` määrab avaliku aadressi. Uue lehe loomisel lisa mõlema keele fail ja vastastikused viited.
- Siselingi puhul kasuta Liquid-filtrit `relative_url`, näiteks `{{ '/et/projects/' | relative_url }}`. See säilitab lingid nii `/midi` alamkaustas kui oma domeenil.
- Muuda sisulise uuenduse järel kuupäeva failis `_layouts/default.html` ja vajadusel allikaregistrit.

Täiendavad reeglid on [toimetamise juhises](docs/EDITORIAL.md). Algseid sisemisi PPTX-esitlusi ei ole avalikku veebipaketti kopeeritud; nende põhjal on koostatud sisukokkuvõtted ja allikaregister.

## 7. Domeeni midi.opetaja.ee ühendamine hiljem

Tee see siis, kui uus veeb GitHub Pagesi ajutisel aadressil töötab. Praeguse saidi sisu ei kasutatud selle uue saidi koostamisel.

1. Säilita enne üleminekut praeguse hostingu ja DNSi seadete koopia, et oleks võimalik vajadusel tagasi pöörduda. Vajad juurdepääsu `opetaja.ee` DNSi haldusele.
2. Soovi korral kinnita esmalt domeeni omandiõigus GitHubi konto/organisatsiooni **Settings → Pages** kaudu, lisades GitHubi antud TXT-kirje. Kasuta täpselt GitHubi näidatud nime ja väärtust.
3. Lisa uue repo **Settings → Pages → Custom domain** väljale `midi.opetaja.ee` ja salvesta. Harust avaldamise korral lisab GitHub repo juurkausta `CNAME` faili sisuga `midi.opetaja.ee`. Tõmba see muudatus ka kohalikku koopiasse.
4. Muuda `_config.yml` ning salvesta:

```yaml
url: "https://midi.opetaja.ee"
baseurl: ""
```

5. Lisa või muuda DNSis **ainult alamdomeeni `midi` kirje**:

```text
Tüüp:   CNAME
Nimi:   midi
Siht:   martlaa.github.io
```

Kui repo kuulub teisele kontole või organisatsioonile, kasuta sihina selle omaniku `KASUTAJA.github.io` aadressi. CNAME siht ei sisalda `https://`, `/midi` ega repo nime. Kui `midi` nime all on varem A/AAAA või muu CNAME, asenda selle alamdomeeni vastuoluline kirje. Ära muuda `opetaja.ee` juurdomeeni ega e-posti MX-kirjeid.

6. Oota DNS-kontrolli ja sertifikaadi valmimist. DNSi levimine võib võtta kuni 24 tundi. Seejärel lülita Pagesi seadetes sisse **Enforce HTTPS**.
7. Kontrolli `https://midi.opetaja.ee/et/` ja `/en/`, siselinke ning kujundust. Vana WordPressi süvalinkide säilitamiseks tuleb vajadusel koostada eraldi ümbersuunamiste kaart. GitHub Pages ei rakenda WordPressi ega `.htaccess` reegleid; teadaolevate vanade aadresside jaoks saab luua eraldi HTML-suunamislehed.

`CNAME` faili algpaketis ei ole, et ajutine GitHub Pagesi aadress saaks enne domeenivahetust töötada. Ära lisa sinna domeeni enne, kui oled valmis üleminekuks.

## 8. Sisu ulatus

Sisu on koostatud üheksa kasutaja esitluse ning varasemas vestluses kasutaja antud liikmete ja 2026. aasta tegevuste põhjal. Vana `midi.opetaja.ee` sisu ega varasema assistendi kinnitamata väiteid ei kasutatud.

Täielikku publikatsiooniloendit, puuduvaid ametinimetusi, isiklikke e-posti aadresse ja ETISe profiilide URL-e ei ole välja mõeldud. ETISele viidatakse nimeotsingu lähtekohana. CERME käsikirju ei esitata avaldatud artiklitena. Uurimisrühma kontaktiks on kasutaja nimetatud Mart Laanpere kodulehe viide.

## Official setup documentation / ametlikud juhendid

Seadistusjuhis kontrollitud 29.09.2026:

- [GitHub Pagesi avaldamisallika valimine](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Oma domeeni haldamine](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Domeeni kinnitamine](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [HTTPS GitHub Pagesis](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## English quick start

Create an empty public repository named `midi`. Upload the contents of this folder to its root. Edit `url` and `baseurl` in `_config.yml` if the owner or repository name differs from `martlaa/midi`. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)`. Do not add `.nojekyll`.

Both languages have matching pages under `et/` and `en/`. Shared content lives in `_data/*.json`; maintain both language fields together. Source and editorial notes live in `docs/` and are excluded from the published website.

For a local preview, install Ruby 3.3 and Bundler, then run `bundle install` and `bundle exec jekyll serve --baseurl ""`. Open `http://127.0.0.1:4000/`.

When ready for the custom domain, first save `midi.opetaja.ee` in the repository’s Pages settings. Change `url` to `https://midi.opetaja.ee` and `baseurl` to an empty string. Point the DNS CNAME for `midi` to the repository owner’s `USERNAME.github.io` hostname, without a path or protocol. Keep the CNAME file created by GitHub, wait for DNS and certificate provisioning, then enable HTTPS. Full instructions and official references are above.
