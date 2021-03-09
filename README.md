# API - Net Promoter Score

### ℹ️ Descrição

Utilizando de uma métrica criada por [Fred Heichheld](https://en.wikipedia.org/wiki/Fred_Reichheld), para medir o grau de lealdade de clientes de qualquer setor, a api - Net Promoter Score serve o seu proposito enviando emails com perguntas previamente configuradas para usuários cadastrados

### 🤼‍♀️ Funcionalidades

<small> [Cadastro de usuário](#Cadastro-de-usuário) </small>
<br> <small> [Cadastro de questionário](#Cadastro-de-questionário) </small>
<br> <small> [Envio de emails](#Envio-de-emails) </small>
<br> <small> [Suporte a templates de emails](#Suporte-a-templates-de-emails) </small>

### Cadastro de usuário

Para cadastrar um novo usuário você deve enviar uma requisição `POST` para [http://localhost:3333/users](http://localhost:3333/users)
com os seguintes parâmetros

```json
{
  "name": "User",
  "email": "UserEmail@exemple.com"
}
```

para receber uma resposta com status `201`

```json
{
  "id": "45f6fdbd-4b0d-41cd-9d7e-7498df747f09",
  "name": "User",
  "email": "UserEmail@exemple.com",
  "created_at": "2021-03-09T02:25:06.000Z"
}
```

### Cadastro de questionário

Para cadastrar um novo questionário você deve enviar uma requisição `POST` para [http://localhost:3333/surveys](http://localhost:3333/surveys)
com os seguintes parâmetros

```json
{
  "title": "title exemple",
  "description": "description exemple"
}
```

para receber uma resposta com status `201`

```json
{
  "id": "2f8fb5b5-cf5c-431b-b86a-fc31b68595a5",
  "title": "title exemple",
  "description": "description exemple",
  "created_at": "2021-03-09T02:37:50.000Z"
}
```

### Envio de emails

Para o envio de emails, primeiro você precisa de um questionário cadastrado, [veja mais](#Cadastro-de-questionário).

Use o `id` obtido na resposta ou liste todos que foram cadastrado buscando pela rota `GET` [http://localhost:3333/surveys](http://localhost:3333/surveys)

Com o `id` em mãos, envie um `POST` na rota [http://localhost:3333/sendMail](http://localhost:3333/sendMail) com os seguintes paramentos:

```json
{
  "email": "UserEmail@exemple.com",
  "survey_id": "2f8fb5b5-cf5c-431b-b86a-fc31b68595a5"
}
```

Como resposta você recebera um status `201`:

```json
{
  "id": "a79347ea-2cd9-4fae-8ff1-b356cbf41ed3",
  "user_id": "45f6fdbd-4b0d-41cd-9d7e-7498df747f09",
  "survey_id": "2f8fb5b5-cf5c-431b-b86a-fc31b68595a5",
  "created_at": "2021-03-09T02:48:10.000Z"
}
```

e no console do servidor um link para visualização do email enviado.

### Suporte a templates de emails

Por padrão a api ja busca dentro da pasta `src/views/emails` os arquivos com a extensão `.hbs`

### 🧪 Tecnologias

- [TypeOrm](https://typeorm.io)
- [Jest](https://jestjs.io)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Sqlite](https://www.sqlite.org/)
- [Yup](https://github.com/jquense/yup)
- [Node Mailer](https://nodemailer.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Uuid](https://github.com/uuidjs/uuid)
- [Node](https://nodejs.org/)
