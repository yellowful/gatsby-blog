/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = async ({actions,graphql,reporter}) => {
    const {createPage} = actions;
    const postTemplate = path.resolve(`./src/templates/post.js`);
    const result = await graphql(`
        {
            allContentfulBlog(filter: {node_locale: {eq: "en-US"}}) {
                edges {
                  node {
                    slug
                    title
                    articles {
                        childMarkdownRemark {
                            html
                          }
                    }
                    createdAt
                    publishedDate
                    updatedAt
                  }
                }
            }
        }
        
    `)
          
    if(result.errors){
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allContentfulBlog.edges.forEach((edge) => {
        createPage({
            path:`/blog/${edge.node.slug}`,
            component:postTemplate,
            context:{
                slug: edge.node.slug,
            },
        })
    })    
}
