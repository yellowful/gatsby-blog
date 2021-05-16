# bdr.rocks source code

This is the open source code of my personal blog at <https://bdr.rocks>.

如果您想了解這個blog的架構，和如何做出來，[請點這邊](https://www.bdr.rocks/project/personal-blog/ "請點這邊")。

## Installation

[![Netlify Status](https://api.netlify.com/api/v1/badges/9852c1ee-da1c-4cf7-a31d-95cf297f059e/deploy-status)](https://app.netlify.com/sites/bugdetective/deploys)

Make sure the netlify status is Success to clone the correct code. If the netlify status shows failed, the code may not work on netlify temporarilly.

You can download or clone from git hub.

```bash
  git clone https://github.com/yellowful/gatsby-blog.git
```

Install it:

```bash
  npm install
```

## Register

Before setting environmental variables, you can register Contentful, Mailchimp, and Algolia.

## Setting Environmental Variables

In your local developement environment, create and setting your own `.env.development` and `.env.production`, and setting environment variables which you can take `example.env` as reference.

    .
    ├── node_modules
    ├── src
    ├── .env.development
    ├── .env.production
    ├── .gitignore
    ├── .prettierrc
    ├── example.env
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

```javascript
  //save as .env.development
  GATSBY_CONTENTFUL_SPACE_ID=xxxxxxxx
  GATSBY_CONTENTFUL_ACCESS_TOKEN=xxxxxxxx
  GATSBY_MAILCHIMP_ENDPOINT=xxxxxxxx
  GATSBY_ALGOLIA_APP_ID=xxxxxxxx
  GATSBY_ALGOLIA_SEARCH_KEY=xxxxxxxx
  ALGOLIA_ADMIN_KEY=xxxxxxxx
```

## Import Content Type of CMS

You may need the same content types with this project in the Contentful CMS so that you can run this project properly, then you can change the content types and corresponding code. The content type of this project in Contentful is provided [here](./content-type.json "here"). You can import it to your space in Contentful with the steps below:

Install contentful-cli.

```bash
  npm install -g contentful-cli
  contentful login
```

Login to browser, and paste the token to the terminal for authentication.

Import content type to your space in Contentful CMS, and logout.

```bash
  contentful space import --content-model-only content-type.json
  contentful logout
```

Please reference [document of Contentful](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/ "document of Contentful") for more information.

## Run

Run the app when you are developing:

```bash
  gatsby develop
```

Build the app at your local develop environment:

```bash
  gatsby build
  gatsby serve
```

Before deploy to netlify, remember to set the environmental variables on the Netlify.

## License

The code used for generating this web site are licensed as [MIT](./LICENSE "MIT").
