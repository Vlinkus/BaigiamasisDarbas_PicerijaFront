# Pizzeria - FRONT part

<i>Note that the project where you are reading this is only the front-end part!
 you will also need the back-end part. Link is below this note ↓</i><br/>
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">Backend</a>

[**_Readme lietuviškai_**](README.md)

# Table of Contents

- [**Introduction**](#Introduction)
  - [Creators](#Creators)
- [**Launching the Page**](#Launching-the-Front-Part)
  - [**How to Run the Project with Docker?**](#How-to-Run-the-Project-with-Docker?)
- [**Puslapio veikimas**](#serverio-veikimas)
  - [API komandos](#api-komandos)
    - [Swagger 3 - OpenAPI 3](#swagger-3---openapi-3)
    - [Authentication and Authorization](#Authentication-and-Authorization)
      - [Registration](#Registration)
      - [Login](#Login)
      - [Logout](#Logout)
      - [Refresh Token](#Refresh-Token)

# Introduction

<p>This final project presents the front-end part of a pizza restaurant. For the <i>"Back"</i> end part, you can click on
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">this link.</a></p>

## Creators

This project was executed by 3 participants (one of them had two accounts 😂):

<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Vlinkus/BaigiamasisDarbas_Picerija" width="40%"/>
</a>

# Launching the Front Part

Before proceeding, make sure that you have at least **_JDK 17_** installed on your system.

```shell
git clone https://github.com/Vlinkus/BaigiamasisDarbas_PicerijaFront.git
```

There are also many other ways to download this project. On the project's GitHub repository,
click the "code" button to access additional options.

After a quick installation, you can use your code editor (Eclipse, Intellij IDEA, Visual Studio Code...).

IMPORTANT

To make the project work in your code editor, you need to enter the following commands and execute them:

```shell
npm i react@latest react-dom@latest
```

```shell
npm install react-i18next i18next
```

```shell
npm start
```

## How to Run the Project with Docker?

↓ ↓ ↓  Create an image (-t for tag) ↓ ↓ ↓

> docker build -t myapp:v1 .

↓ ↓ ↓ ↓ Run a new container (with volume!)

> docker run --name myapp_c_nodemon -p 3000:3000 --rm -v C:\...\BaigiamasisDarbas_PicerijaFront:app/ -v /app/node_modules myapp:nodemon

### API Commands

By default, the project port is set to 3000.
In all API-related links in these sections, the aforementioned port will be used.

#### Registration

Account registration is a fairly straightforward process:

- This can be done on the website, but to have higher roles such as ADMIN or MANAGER, you need to use Postman or change the registered user's role in the SQL database.

Postman instructions:

- Set the HTTP request to POST
- Set the address to localhost:8080/api/v1/auth/register
- Send a JSON body, as shown in the example below:

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

It's important to note that the "role" field is not mandatory, and the sender can omit it.
In that case, the default role for the registered user will be "USER".

All possible role options: USER, MANAGER, ADMIN

#### Login

Login requires only two fields.

- Set the HTTP request to  `POST`
- Set the address to `localhost:8080/api/v1/auth/login`

```json
{
  "username": "someUsername",
  "password": "password"
}
```

Upon successful authentication, you will receive the **_JWT prieigos žetoną_**(refresh token),
the user's **_role_**  and the  **_HttpOnly atnaujinimo žetono slapuką_**(HttpOnly refresh token cookie).
