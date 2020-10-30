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
            allMarkdownRemark{
                edges{
                    node{
                        html
                        id
                        frontmatter{
                            slug
                            title
                            date
                            published
                        }
                    }
                }
            }
        }
    `)
          
    if(result.errors){
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
            path:node.frontmatter.slug,
            component:postTemplate,
            context:{
                slug: node.frontmatter.slug,
            },
        })
    })    
}
