import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import EmailForm from "../components/EmailForm/EmailForm"


const Blog = () => (
  <Layout>
    <SEO title="關於作者" />
    <div className="flex flex-column items-center">
      <div className="w-100 w-90-m w-80-l mw8">
        <h1>大家好，我是蟲探理查</h1>
        <EmailForm />
      </div>
    </div>
  </Layout>
)

export default Blog
