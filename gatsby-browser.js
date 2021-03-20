/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
require("prismjs/themes/prism-okaidia.css");

//讓cookies失效
if (typeof window !== `undefined`) {
    console.log('cookies',document.cookie);
    console.log('google-before-true',window['ga-disable-G-4T61R4H6E8'])
    window['ga-disable-G-4T61R4H6E8'] = true;
    console.log('google-after-true',window['ga-disable-G-4T61R4H6E8'])
}