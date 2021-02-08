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

function pageToAlgoliaRecord({ node: { id,slug,articles,tag,...rest } }) {
    return {
        objectID:id,
        slug:`/blog/${slug}/`,
        excerpt: articles.childMarkdownRemark.excerpt,
        tag: tag.map(item=>item.tagName),
        ...rest
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:100`] },
  },
]

module.exports = queries