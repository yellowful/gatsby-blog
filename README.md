# Gatsby content site

This is the open source code of Gatsby content site, my personal blog at <https://bdr.rocks>.

[這個 Gatsby 內容網站中文詳細說明。](https://www.bdr.rocks/project/gatsby-%E5%85%A7%E5%AE%B9%E7%B6%B2%E7%AB%99/ "這個 Gatsby 內容網站中文詳細說明。")

## Installation

[![Netlify Status](https://api.netlify.com/api/v1/badges/9852c1ee-da1c-4cf7-a31d-95cf297f059e/deploy-status)](https://app.netlify.com/sites/bugdetective/deploys)

Before you clone this project, make sure the Netlify status above is Success. If the Netlify status shows Failed, the code may not work well on Netlify temporarilly.

You can download or clone this project from git hub.

```shell
  git clone https://github.com/yellowful/gatsby-blog.git
```

Install it:

```shell
  npm install
```

## Register

Before setting environmental variables, you can register [Netlify](https://www.netlify.com/), [Contentful](https://www.contentful.com/), [Mailchimp](https://mailchimp.com/), [Algolia](https://www.algolia.com), [Formspree](https://formspree.io/), [Facebook for Developers](https://developers.facebook.com/), and [Google Analytics](https://analytics.google.com/).

## Setting Environmental Variables

In your local developement environment, create and setting your own `.env.development` and `.env.production`, and setting environment variables which you can take `example.env` as reference.

```text
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
```

```shell
//save as .env.development
GATSBY_CONTENTFUL_SPACE_ID = xxxxxxxx
GATSBY_CONTENTFUL_ACCESS_TOKEN = xxxxxxxx
GATSBY_MAILCHIMP_ENDPOINT = xxxxxxxx
GATSBY_ALGOLIA_APP_ID = xxxxxxxx
GATSBY_ALGOLIA_SEARCH_KEY = xxxxxxxx
ALGOLIA_ADMIN_KEY = xxxxxxxx
```

## Setting Formspree

In `./src/utils/api.js`, change the setting of the `endpointOfFormspree`

```js
export const endpointOfFormspree = 'https://formspree.io/f/xxxxx'
```

## Setting Google Analytics 4

In `gatsby-config.js`, change tackingIds:

```js
{
  resolve: `gatsby-plugin-google-gtag`,
  options: {
    // You can add multiple tracking ids and a pageview event will be fired for all of them.
    trackingIds: [
      "G-xxxxxxxxxx", // Google Analytics / GA
    ],
    gtagConfig: {
      anonymize_ip: true,
    },
    pluginConfig: {
      // Puts tracking script in the head instead of the body
      head: false,
      // Setting this parameter is also optional
    },
  },
},
```

Also, in `gatsby-browser.js`, change the tracking ID `G-xxxxxxxxxx`:

```js
window["ga-disable-G-xxxxxxxxxx"] = true
```

Last, in `./src/components/Layout/layout.js`, change the tracking ID `G-xxxxxxxxxx`:

```js
const onAccept = () => {
  window["ga-disable-G-xxxxxxxxxx"] = false
}
```

## Setting Facebook commnents

In `./src/utils/api.js`, change the setting of the `facebookAppId`

```js
export const facebookAppId = 'xxxxxxxxxxxxxxx';
```

## Import Content Type of CMS

You may need the same content types with this project in the Contentful CMS so that you can run this project properly, then you can change the content types and corresponding code. The content type of this project in Contentful is provided [here](./content-type.json "here").

Make sure to replace "your-space-id" in the `content-type.json` with your own space id of Contentful.

You can import it to your space in Contentful with the steps below:

Install contentful-cli.

```shell
  npm install -g contentful-cli
  contentful login
```

Login to browser, and paste the token to the terminal for authentication.

Import content type to your space in Contentful CMS, and logout.

```shell
  contentful space import --content-model-only content-type.json
  contentful logout
```

Please reference [document of Contentful](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/ "document of Contentful") for more information.

## Run

Run the app when you are developing:

```shell
  gatsby develop
```

Build the app at your local develop environment:

```shell
  gatsby build
  gatsby serve
```

Before deploy to Netlify, remember to set the environmental variables on the Netlify.

## License

The code used for generating this web site are licensed as [MIT](./LICENSE "MIT").
