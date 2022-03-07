<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>

## Description

Project created using [Nest](https://github.com/nestjs/nest), [MySQL](https://www.mysql.com/) and [Docker](https://www.docker.com/). The project consist in two parts: 
-  User creation using /create with a e-mail and password and login using /login with these credentials which will generate a 3600s long token that will contain the user ID and email;
- With a valid token it will be possible to make a CRUD of favorite-songs.
- Project listen on port 3000. 
- If problems occurred on the first build due to MySQL connection, create a user called user and grant it all privileges as shown in docker-compose.yaml

## Libraries used
- [bcrypt](https://www.npmjs.com/package/bcrypt): To encrypt the password
- [typeorm](https://www.npmjs.com/package/typeorm): To use typescript
- [passport-jwt](https://www.npmjs.com/package/passport-jwt): To generate and verify the token
- [class-validator](https://www.npmjs.com/package/class-validator): Field validator when requests are made to endpoints
## Installation and Running the app in development mode 

```bash
$ sudo docker-compose up --build
```
## Postman
All collections used for testing in this project are available in postman folder.
## Stay in touch

- Author - [André Melinski](https://www.linkedin.com/in/andr%C3%A9-melinski-aab0b6138/)