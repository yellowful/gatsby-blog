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
        slug:`/blog/${slug.toLowerCase()}/`,
        excerpt: articles.childMarkdownRemark.excerpt,
        tag: tag.map(item=>item.tagName),
        ...rest
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

function aboutToAlgoliaRecord({ node: { id,slug,content,...rest } }) {
    return {
        objectID:id,
        slug:`/about/`,
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
}`

function projectToAlgoliaRecord({ node: { id,slug,introduction,section,...rest } }) {
    return {
        objectID:id,
        slug:`/project/${slug.toLowerCase()}/`,
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
        searchableAttributes:[`title`,`excerpt`,`tag`]
    }
  },
  {
    query: aboutQuery,
    transformer: ({ data }) => data.aboutPages.edges.map(aboutToAlgoliaRecord),
    indexName:indexName[1],
    settings: { 
        attributesToSnippet: [`excerpt:${numberOfExcerpt}`],
        searchableAttributes:[`title`,`excerpt`,`complexData`]
    }
  },
  {
    query: projectQuery,
    transformer: ({ data }) => data.projectPages.edges.map(projectToAlgoliaRecord),
    indexName:indexName[2],
    settings: { 
        attributesToSnippet: [`introduction:${numberOfExcerpt}`,`section${numberOfExcerpt}`,`demoLink${numberOfExcerpt}`,`repoLink${numberOfExcerpt}`],
        searchableAttributes:[`projectName`,`introduction`,`section`,`demoLink`,`repoLink`]
    }
  }
]

module.exports = queries