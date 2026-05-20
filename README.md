# Lapin Maakuntakomppanian Kilta ry — Nettisivut

## Tiedostorakenne

```
kilta-site/
├── index.html          # Pääsivu
├── css/
│   └── style.css       # Kaikki tyylit
├── js/
│   └── main.js         # JavaScript
├── kuvat/
│   ├── lapvaakuna.png       
│   ├── ampumarata-talvi.jpg 
│   ├── maasto-kesa.jpg      
│   └── pkm.jpg              
└── README.md
```

## Sivuston rakenne

| Osio | ID | Kuvaus |
|---|---|---|
| Hero | `#hero` | Kaksipalstainen: teksti vasemmalla, kuvat oikealla |
| Esittely | `#esittely` | Yhdistyksen kuvaus + tietokortit |
| Tue toimintaa | `#toiminta` | 4 tapaa tukea toimintaa |
| Galleria | `#galleria` | Kolme kuvaa lightbox-toiminnolla |
| Liity jäseneksi | `#liity` | Jäsenyyskuvaus + yhteydenottolomake |
| Yhteystiedot | `#yhteystiedot` | Yhteystiedot + info |

## Fonttiriippuvuudet

Google Fonts — Internet-yhteys vaaditaan:
- **EB Garamond** (otsikot, serif)
- **Inter** (leipäteksti, sans-serif)

Ilman internettiä fontit fallback-tilassa (Georgia / system-ui).

## Kuvien lisääminen / vaihtaminen

Lisää uusia kuvia `kuvat/`-kansioon ja viittaa niihin `index.html`:ssä
galleria-osion `.gal-item` elementeissä:

```html
<div class="gal-item"
     data-src="kuvat/uusikuva.jpg"
     data-caption="Kuvateksti">
  <img src="kuvat/uusikuva.jpg" alt="Kuvausteksti">
  ...
</div>
```

## Lomakkeen käyttöönotto

Web3Forms


## Väripaletti

| Muuttuja | Arvo | Käyttö |
|---|---|---|
| `--navy` | `#1c2b3a` | Taustat, painikkeet |
| `--gold` | `#9a7c3a` | Aksenttiväri, reunaviivat |
| `--gold-l` | `#b8963e` | Hover-tila, hero-teksti |
| `--snow` | `#f4f1eb` | Sivun tausta |
| `--ink` | `#1a1a18` | Leipäteksti |
