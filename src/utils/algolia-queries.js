

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

const aboutQuery = `{
    aboutPage: allContentfulAbout{
        edges {
            node {
                slug
                serial
                title
                content{
                    childMarkdownRemark {
                        excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
                    }
                }
                complexData {
                category
                items
                }
            }
        }
    }
}`

function aboutToAlgoliaRecord({ node: { id,content,...rest } }) {
    return {
        objectID:id,
        slug:`/about/`,
        excerpt: content.childMarkdownRemark.excerpt,
        ...rest
  }
}

const projectQuery = `{
    projectPage: allContentfulProject{
        edges {
            node {
                serial
                slug
                projectName
                demoLink
                repoLink
                introduction {
                  childMarkdownRemark {
                    excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
                  }
                }
                section {
                  childMarkdownRemark {
                    excerpt(format: PLAIN, pruneLength: 5000, truncate: true)
                  }
                }
                publishedDate
              }
            }
        }
    }
}`

function projectToAlgoliaRecord({ node: { id,content,...rest } }) {
    return {
        objectID:id,
        slug:`/project/${slug}/`,
        introduction: introduction.childMarkdownRemark.excerpt,
        section: section.childMarkdownRemark.excerpt,
        ...rest
  }
}



const numberOfExcerpt = 100;
const indexName = [`BlogPage`,`AboutPage`,`ProjectPage`];

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName:indexName[0],
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`tag`]
    }
  },
  {
    query: aboutQuery,
    transformer: ({ data }) => data.pages.edges.map(aboutToAlgoliaRecord),
    indexName:indexName[1],
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`complexData`]
    }
  },
  {
    query: projectQuery,
    transformer: ({ data }) => data.pages.edges.map(projectToAlgoliaRecord),
    indexName:indexName[2],
    settings: { 
        attributesToSnippet: [`introduction:${numberOfExcerpt}`],
        searchableAttributes:[`projectName`]
    }
  },
]

module.exports = queries