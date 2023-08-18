# Pizzeria - FRONT dalis
<i>Atkreipkite dėmesį, kad projektas, kuriame tai skaitote, yra tik priekinė dalis!
jums taip pat reikės back-end dalies. Nuoroda pateikta po šią pastabą ↓</i><br/>
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">Backas</a>

[***Readme in english***](README_EN.md)

# Turinys

- [**Įvadas**](#įvadas)
    - [Kūrėjai](#kūrėjai)
- [**Fronto paleidimas**](#fronto-paleidimas)
    - [Saugykla](#saugykla)
    - [Paleidimas iš terminalo](#paleidimas-iš-terminalo)
    - [Paleidimas su Docker](#paleidimas-su-docker)

# Įvadas

<p>Šioje repozitorijoje pateikiamas picerijos priekinė dalis arba frontendas. 
Dėl <i>"Back"</i> galinės dalies galite spustelėti 
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">šią nuorodą.</a></p>

## Kūrėjai

Šį projektą vykdė 3 dalyviai (vienas iš jų turėjo dvi paskyras😂):

<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Vlinkus/BaigiamasisDarbas_Picerija" width="40%"/>
</a>

# Fronto paleidimas

Prieš tęsdami įsitikinkite, kad jūsų sistemoje įdiegtas ***Node.js v20.4***.

## Saugykla

Norėdami gauti šią saugyklą, tiesiog nueikite į vietinį aplanką
kuriame norite ją saugoti, ir paleiskite šią komandą:

```shell
git clone https://github.com/Vlinkus/BaigiamasisDarbas_PicerijaFront.git
```

Taip pat yra daug daugiau būdų, kaip atsiųsti šį projektą.
Projekto "GitHub" saugykloje paspauskite mygtuką "*code*", kad gautumėte papildomų pasirinkimų.

Po greito įdiegimo galėsite paleisti projektą.

## Paleidimas iš terminalo

Norint, kad projektas veiktų kodo redaktoriuje arba iš terminalo,
nueikite į projekto aplanką ir įveskite šias komandas:

1. Suinstaliuoti paketus, kurie nurodyti `package.json` faile:

```shell
npm install
```

2. Paleisti projektą po paketų instaliacijos:

```shell
npm start
```

## Paleidimas su Docker

Šio projekto fronto dalis yra "*dokerizuota*", kas leidžia įdiegti (deploy) projektą į serverį.
Įsitikinkite, kad jūsų kompiuteryje yra ***Docker*** bent 24.0.2 versijos.

1. Sukurti vaizdą (image)

```shell
docker build -t myapp:v1 .
```

2. Paleisti naują konteinerį su tūriu (volume)

```shell
docker run --name myapp_c_nodemon -p 3000:3000 --rm -v C:\...\BaigiamasisDarbas_PicerijaFront:app/ -v /app/node_modules myapp:nodemon
```
