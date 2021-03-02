const { node } = require("prop-types")

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

function pageToAlgoliaRecord({ node: { id, slug, title, articles } }) {
  return {
    objectID: id,
    slug: `/blog/${slug.toLowerCase()}/`,
    title: title,
    excerpt: articles.childMarkdownRemark.excerpt,
  }
}

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

// function aboutToAlgoliaRecord (acc,{node: {content}}) {
//   return (acc+content.childMarkdownRemark.excerpt)
// }

function aboutToAlgoliaRecord({ node: { id, slug, title, content} }) {
  return {
    objectID: id,
    slug: `/about/#${slug}`,
    title:title,
    excerpt: content.childMarkdownRemark.excerpt,
    ...rest
  }
}

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

function projectToAlgoliaRecord({ node: { id, slug, projectName, introduction, section } }) {
  return {
    objectID: id,
    slug: `/project/${slug.toLowerCase()}/`,
    title: projectName,
    excerpt: section.childMarkdownRemark.excerpt + introduction.childMarkdownRemark.excerpt,
  }
}

const numberOfExcerpt = 100;
const indexName = `allPages`;

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
    transformer: ({ data }) => data.aboutPages.edges.map(projectToAlgoliaRecord),
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
  }
]

module.exports = queries