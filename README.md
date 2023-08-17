## Kaip paleisti projektą su docker?

↓ ↓ ↓ Sukurti image (-t for tag) ↓ ↓ ↓
> docker build -t myapp:v1 .

↓ ↓ ↓ ↓ Paleisti naują konteinerį (with volume!)
> docker run --name myapp_c_nodemon -p 3000:3000 --rm -v C:\...\BaigiamasisDarbas_PicerijaFront:app/ -v /app/node_modules myapp:nodemon

# Pizzeria - FRONT dalis
<i>Atkreipkite dėmesį, kad projektas, kuriame tai skaitote, yra tik priekinė dalis!
jums taip pat reikės back-end dalies. Nuoroda pateikta po šią pastabą ↓</i><br/>
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">Backas</a>

[***Readme in english***](README_EN.md)

# Turinys

- [**Įvadas**](#įvadas)
    - [Kūrėjai](#kūrėjai)
- [**Serverio paleidimas**](#serverio-paleidimas)
    - [Saugykla](#saugykla)
- [**Serverio veikimas**](#serverio-veikimas)
    - [API komandos](#api-komandos)
        - [Swagger 3 - OpenAPI 3](#swagger-3---openapi-3)
        - [Autentikacija ir autorizacija](#autentikacija-ir-autorizacija)
            - [Registracija](#registracija)
            - [Prisijungimas](#prisijungimas)
            - [Atsijungimas](#atsijungimas)
            - [Refresh tokenas](#refresh-tokenas)

# Įvadas

<p>Šiame baigiamajame projekte pateikiamas picerijos restorano priekinė dalis arba frontendas. 
Dėl <i>"Back"</i> galinės dalies galite spustelėti 
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">šią nuorodą.</a></p>

## Kūrėjai

Šį projektą vykdė 3 dalyviai (vienas iš jų turėjo dvi paskyras😂):

<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Vlinkus/BaigiamasisDarbas_Picerija" width="40%"/>
</a>





# Front dalies paleidimas

Prieš tęsdami įsitikinkite, kad jūsų sistemoje įdiegta bent ***JDK 17*** versijos.

```shell
git clone https://github.com/Vlinkus/BaigiamasisDarbas_PicerijaFront.git
```

Taip pat yra daug daugiau būdų, kaip atsiųsti šį projektą.
Projekto "GitHub" saugykloje paspauskite mygtuką "*code*", kad gautumėte papildomų pasirinkimų.

Po greito įdiegimo galėsite naudoti savo kodo redaktorių(*Eclipse*, *Intellij IDEA*,*Visual Studio Code*...)


SVARBU

Norint, kad projektas veiktų savo kodo redaktoriuje turite įvesti šias komandas ir jas paleisti:

npm i react@latest react-dom@latest

npm install react-i18next i18next

npm start




## API komandos

Projekto portas pagal nutylėjimą  nustatytas kaip 3000.
Visose su api susijusiose nuorodose šiuose poskyriuose bus naudojamas anksčiau minėtas portas.





#### Registracija
Paskyros registravimas yra gana paprastas procesas:
- Tai galite atlikte svetainėje, bet norint tūrėti aukštesnes roles, kaip ADMIN arba MANAGER, reikėtų naudoti    Postman arba sql duombazėje, pakeisti užregistruoto vertotojo rolę.

Postman instrukcija:

- Nustatyti *HTTP* užklausą į ``POST``
- Nustatyti adresą ``localhost:8080/api/v1/auth/register``
- Siųskite *JSON* kūną, kaip žemiau pateiktame pavyzdyje

```json
{
    "firstname": "Vardenis",
    "lastname": "Pavardenis",
    "username": "vartotojoVardas",
    "email": "kaz@kas.lt",
    "password": "slaptazodis",
    "role": "ADMIN"
}
```
Svarbu paminėti, kad laukas "*role*" nėra privalomas ir siuntėjas gali jo nenurodyti,
tokiu atveju numatytasis registruojamo naudotojo vaidmuo bus "USER".

Visi galimi vaidmenų(*rolių*) variantai: `USER`, `MANAGER`, `ADMIN`

#### Prisijungimas
Prisijungimui reikia tik dviejų laukų.
- Nustatyti *HTTP* užklausą į ``POST``
- Nustatyti adresą ``localhost:8080/api/v1/auth/login``

```json
{
    "username": "someUsername",
    "password": "password"
}
```
Sėkmingai patvirtinus autentiškumą, gausite ***JWT prieigos žetoną***(refresh token),
naudotojo ***role*** ir ***HttpOnly atnaujinimo žetono slapuką***(HttpOnly refresh token cookie).


