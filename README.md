# bdr.rocks source code

This is the open source code of my personal blog at <https://bdr.rocks>.

如果您想了解這個blog的架構，和如何做出來，[請點這邊](https://www.bdr.rocks/project/personal-blog/ "請點這邊")。

### Installation

You can download or clone from git hub.

```bash
  git clone https://github.com/yellowful/gatsby-blog.git
```

Install it:

```bash
  npm install
```

### Register

Before setting environmental variables, you can register Contentful, Mailchimp, and Algolia.

### Setting environmental Variables

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

### Run

To run the app when you are developing:

```
  gatsby develop
```

To build the app at your local develop environment:

```
  gatsby build
  gatsby serve
```

Before deploy to netlify, remember to set the environmental variables on the netlify.

### License

The code used for generating this web site are licensed as [MIT](./LICENSE "MIT").





