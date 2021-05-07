//const { node } = require("prop-types")

//query回來的資料會傳到transformer裡面
const pageQuery = `{
  pages: allContentfulBlog {
    edges {
      node {
        id
        slug
        title
        articles {
          childMarkdownRemark {
            excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
          }
        }
      }
    }
  }
}`
//要把query回來的資料變成object的transformer
function pageToAlgoliaRecord({ node: { id, slug, title, articles } }) {
  return {
    objectID: id,
    slug: `/blog/${slug.toLowerCase()}/`,
    title: title,
    excerpt: articles.childMarkdownRemark.excerpt,
  }
}

//query回來的資料會傳到transformer裡面
const aboutQuery = `{
    aboutPages: allContentfulAbout{
        edges {
            node {
                id
                slug
                title
                content{
                    childMarkdownRemark {
                        excerpt(format: PLAIN, pruneLength: 2000, truncate: true)
                    }
                }
            }
        }
    }
}`
//要把query回來的資料變成object的transformer
function aboutToAlgoliaRecord({ node: { id, slug, title, content} }) {
  return {
    objectID: id,
    slug: `/about/#${slug}`,
    title:title,
    excerpt: content.childMarkdownRemark.excerpt,
  }
}

//query回來的資料會傳到transformer裡面
const projectQuery = `{
    projectPages: allContentfulProject{
        edges {
            node {
                id
                slug
                projectName
                introduction {
                  childMarkdownRemark {
                    excerpt(format: PLAIN, pruneLength: 2500, truncate: true)
                  }
                }
                section {
                  childMarkdownRemark {
                    excerpt(format: PLAIN, pruneLength: 2500, truncate: true)
                  }
                }
            }
        }
    }
}`
//要把query回來的資料變成object的transformer
function projectToAlgoliaRecord({ node: { id, slug, projectName, introduction, section } }) {
  return {
    objectID: id,
    slug: `/project/${slug.toLowerCase()}/`,
    title: projectName,
    excerpt: section.childMarkdownRemark.excerpt + introduction.childMarkdownRemark.excerpt,
  }
}

//query回來的資料會傳到transformer裡面
const policyAlgoliaQuery = `{
  policyPages: allContentfulPrivacyPolicy {
    edges {
      node {
        id
        slug
        title
        privacyPolicyContent {
          childMarkdownRemark {
              excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
          }
        }
      }
    }
  }
}`
//要把query回來的資料變成object的transformer
function policyToAlgoliaRecord({ node: { id, slug, title, privacyPolicyContent } }) {
  return {
    objectID: id,
    slug: `/terms-n-policy/${slug.toLowerCase()}/`,
    title: title,
    excerpt: privacyPolicyContent.childMarkdownRemark.excerpt,
  }
}

//設定excerpt的字數
const numberOfExcerpt = 100;
//要傳到algolia的那個indice裡面
const indexName = `allPages`;
//要傳到gatsby-config裡面的東西
//陣列裡面每一個element都是一個object，不同element可以不同的搜尋結構而傳給不同的indice，因為越多indice消耗越多的search accounts，越貴，所以這裡只建立一個indice
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: {
      attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
      searchableAttributes: [`title`, `excerpt`]
    }
  },
  {
    query: aboutQuery,
    transformer: ({ data }) => data.aboutPages.edges.map(aboutToAlgoliaRecord),
    indexName,
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`excerpt`]
    }
  },
  {
    query: projectQuery,
    transformer: ({ data }) => data.projectPages.edges.map(projectToAlgoliaRecord),
    indexName,
    settings: {
      attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
      searchableAttributes: [`title`, `excerpt`]
    }
  },
  {
    query: policyAlgoliaQuery,
    transformer: ({ data }) => data.policyPages.edges.map(policyToAlgoliaRecord),
    indexName,
    settings: {
      attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
      searchableAttributes: [`title`, `excerpt`]
    }
  }
]

module.exports = queries