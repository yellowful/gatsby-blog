import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import Layout from "../../components/layout"
import SEO from "../../components/seo"



const PrivacyPolicy = () => {
  const data = useStaticQuery(
    graphql`
    query privacyPolocy {
      contentfulPrivacyPolicy(childContentfulPrivacyPolicyPrivacyPolicyContentTextNode: {childMarkdownRemark: {}}) {
        childContentfulPrivacyPolicyPrivacyPolicyContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    `
  )

  const policy = data.contentfulPrivacyPolicy.childContentfulPrivacyPolicyPrivacyPolicyContentTextNode.childMarkdownRemark.html

  return (
    <Layout>
      <SEO title="隱私權政策" />
      <div className="w-100 flex justify-center bg-light-gray">
        <div className="w-100 w-90-m w-70-l flex flex-column ph3 pa3-ns">
        <div dangerouslySetInnerHTML={{ __html: policy }} />
        </div>
      </div>
    </Layout>
  )
}


export default PrivacyPolicy


