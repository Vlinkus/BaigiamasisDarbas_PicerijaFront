# Pizzeria - FRONT part
<i>Note that the project where you are reading this is only the front-end part!
you will also need the back-end part. Link is below this note ↓</i><br/>
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">Backend</a>

[**_Readme lietuviškai_**](README.md)

# Table of Contents

- [**Introduction**](#Introduction)
    - [Creators](#creators)
- [**Launching frontend server**](#launching-frontend-server)
    - [Getting the repository](#getting-the-repository)
    - [Launching from terminal](#launching-from-terminal)
    - [Launching with Docker](#launching-with-docker)

# Introduction

<p>This remote repository represents pizza restaurant's frontend REACT server. 
For the SPRING REST backend, you can click
<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija">this link.</a></p>

## Creators

This project was done by 3 contributors(one had two accounts😂):

<a href="https://github.com/Vlinkus/BaigiamasisDarbas_Picerija/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Vlinkus/BaigiamasisDarbas_Picerija" width="40%"/>
</a>

# Launching frontend server

Before you continue, make sure you have at least ***Node.js v20.4***.

## Getting the repository

To get this repository, just got to the local folder 
where you would like to store it and run the git clone command in your terminal:

```shell
git clone https://github.com/Vlinkus/BaigiamasisDarbas_PicerijaFront.git
```

There are also many more methods to acquire this project.
In the project's GitHub repository, press the "code" button for additional options.

After a quick installation, you should be good to go with the code editor of your choice.

## Launching from terminal

To run the project in the code editor or from a terminal,
go to the project folder and enter the following commands:

1. Install the packages specified in the `package.json` file:

```shell
npm install
```

2. Run the project after installing the packages:

```shell
npm start
```

## Launching with Docker

The front-end of this project is "*dockerized*", which allows the project to be deployed on a server.
Make sure your machine has ***Docker*** of at least *v24.0.2* version.

In the folder of your project, type these commands in your terminal:

1. Create an image

```shell
docker build -t myapp:v1 .
```

2. Run a new container with volume

```shell
docker run --name myapp_c_nodemon -p 3000:3000 --rm -v C:\...\BaigiamasisDarbas_PicerijaFront:app/ -v /app/node_modules myapp:nodemon
```
