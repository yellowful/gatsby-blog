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

function pageToAlgoliaRecord({ node: { id,slug,title,articles} }) {
    return {
        objectID:id,
        slug:`/blog/${slug.toLowerCase()}/`,
        title:title,
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

function aboutToAlgoliaRecord (acc,{node: {content}}) {
  return (acc+content.childMarkdownRemark.excerpt)
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

function projectToAlgoliaRecord({ node: { id,slug,projectName,introduction,section } }) {
    return {
        objectID:id,
        slug:`/project/${slug.toLowerCase()}/`,
        title:projectName,
        excerpt: introduction.childMarkdownRemark.excerpt+section.childMarkdownRemark.excerpt,
  }
}

const numberOfExcerpt = 100;
const indexName = `allPages`;

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName:indexName,
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`excerpt`]
    }
  },
  {
    query: aboutQuery,
    transformer: ({ data }) =>{
      return (
        {
          objectID:data.aboutPages.edges[0].node.id,
          slug:`/about/`,
          title:`關於`,
          excerpt:data.aboutPages.edges.reduce(aboutToAlgoliaRecord,'')
        }
      )
    },
    indexName:indexName,
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`excerpt`]
    }
  },
  {
    query: projectQuery,
    transformer: ({ data }) => data.projectPages.edges.map(projectToAlgoliaRecord),
    indexName:indexName,
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`excerpt`]
    }
  }
]

console.log(queries);

module.exports = queries