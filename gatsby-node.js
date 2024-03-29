/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

//用來解析路徑
const path = require("path")
//const { createFilePath } = require("gatsby-source-filesystem")

//用來自動產生很多頁面，也就是gatsby最重要的精華
exports.createPages = async ({ actions, graphql, reporter }) => {
  //gatsby有用redux，這是redux來派發createPage，createPage就是用來自動製作頁面的function
  const { createPage } = actions

  //設定單篇文章的樣板的檔案位置
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const projectTemplate = path.resolve(`./src/templates/project-template.js`)
  const tagListTemplate = path.resolve(`./src/templates/tag-list-template.js`)
  const meterTemplate = path.resolve(`./src/templates/style-meter.js`)
  const policyTemplate = path.resolve(`./src/templates/policy-template.js`)

  //gatsby在產生頁面時，會從contenful的api抓資料回來，然後利用graphql把所有文章抓回來，放到result裡面
  //大括號裡面都是從網址的”http://localhost:8000/___graphql“查詢，查詢完可以直接copy下來
  //其中contentful可能設定多國，這時要限定locale才抓的正確
  const result = await graphql(`
    {
      allContentfulBlog(filter: { node_locale: { eq: "zh-Hant-TW" } }) {
        edges {
          node {
            slug
            iceFireNumber
            title
            createdAt
            publishedDate
            updatedAt
          }
        }
      }
      allContentfulAllTag(filter: { node_locale: { eq: "zh-Hant-TW" } }) {
        edges {
          node {
            slug
            tagName
          }
        }
      }
      allContentfulProject(filter: { node_locale: { eq: "zh-Hant-TW" } }) {
        edges {
          node {
            slug
            projectName
          }
        }
      }
      allContentfulPrivacyPolicy(
        filter: { node_locale: { eq: "zh-Hant-TW" } }
      ) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)

  //如果result.errors有東西，就印出錯誤
  if (result.errors) {
    console.log("query error: ", result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  //這一段用來自動產生文章
  //單篇文章是edges陣列裡面的一個元素，這裡很容易搞錯，以為一個文章是一個node
  //但是一個文章是一個edge.node
  //slug是contentful裡面，每篇文章設定的網址後綴
  //path:指的是要gatsby產生的網頁要用哪個網址當成那個網頁的網址
  //component:指的是你的template放哪裡，要給gatsby依樣畫葫蘆，製作出所有頁面
  //context會傳到template裡，template可以抓到這個變數，來讓每一個產生的網頁有所不同的變數。
  //context這裡傳slug過去，是為了讓template可以用這個slug變數去query出contentful裡面，這個slug的那篇特定文章
  const posts = result.data.allContentfulBlog.edges
  posts.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.slug.toLowerCase()}/`,
      component: postTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  //postsPerPage可以設定每一頁放幾個文章
  const postsPerPage = 3

  //Math.ceil是無條件進入法，算出總頁數numPages
  const numPages = Math.ceil(posts.length / postsPerPage)

  //這一段用來自動產生所有文章列表
  //Array.from({ length: numPages })，是用來得到numPages個undefined元素數量的array，主要可以iterable，_代表每一個元素，值都是undefined
  //createPage可以用來自動建立網頁
  //path是自動建立的網頁，要用什麼當網址
  //component是要放要用哪一個template
  //context是指，要把那些參數傳給template
  //傳總頁數numPages去給blog-list-template是因為，每一頁都需要顯示總頁數
  //傳currentPage過去，是因為每一頁都要知道自己是第幾頁
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog-list/` : `/blog-list/page-${(i + 1).toString()}/`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1,
      },
    })
  })

  //tagList是所有的tag內容
  const tagList = result.data.allContentfulAllTag.edges
  //每一個tag產生一個網頁
  //網址就是path
  //component就是template的位置
  //context就是要傳給template的變數
  tagList.forEach(edge => {
    createPage({
      path: `/blog/tags/${edge.node.slug.toLowerCase()}/`,
      component: tagListTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })
  //把所有project資料抓回來
  const projectPage = result.data.allContentfulProject.edges
  //每一個project產生一個網頁
  //產生的網址就是path
  //component就是project的template
  //context就是把單一project的slug傳給template
  projectPage.forEach(edge => {
    createPage({
      path: `/project/${edge.node.slug.toLowerCase()}/`,
      component: projectTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  //用來產生10個風格指數網頁
  //path是10個網頁的網址
  //component是template的位置
  //context是需要傳給網頁的變數，i代表產生的風格指數，filter number代表的是每一頁要搜尋的內容，要包含風格指數+1和-1的文章，不要太精確，因為目前文章太少
  for (let i = 0; i < 10; i++) {
    createPage({
      path: `/blog/style-number/${i}/`,
      component: meterTemplate,
      context: {
        iceFireNumber: i,
        filterNumber: [i, i + 1, i - 1],
      },
    })
  }

  //抓回隱私權和著作權相關內容的陣列
  const policy = result.data.allContentfulPrivacyPolicy.edges
  //每個內容產生一個網址path
  //component是放template的位置
  //context可以把slug傳過去
  policy.forEach(edge => {
    createPage({
      path: `/terms-n-policy/${edge.node.slug.toLowerCase()}/`,
      component: policyTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions
//     if (node.internal.type === `MarkdownRemark`) {
//       const value = createFilePath({ node, getNode })
//       createNodeField({
//         name: `slug`,
//         node,
//         value,
//       })
//     }
//   }
