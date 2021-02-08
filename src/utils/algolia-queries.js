const indexName = `Pages`

//query回來的資料會傳到transformer裡面
const pageQuery = `{
  pages: allContentfulBlog {
    edges {
      node {
        id
        slug
        title
        publishedDate
        articles {
          childMarkdownRemark {
            excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
          }
        }
        tag {
            tagName
          }
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { articles,tag,...rest } }) {
  return {
    excerpt: articles.childMarkdownRemark.excerpt,
    tag:tag.tagName,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries