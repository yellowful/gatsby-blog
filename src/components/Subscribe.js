//import addToMailchimp from 'gatsby-plugin-mailchimp'
import React from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faFacebookSquare } from '@fortawesome/free-solid-svg-icons'

//import Img from "gatsby-image"


const Subscribe = () => {

    // const data = useStaticQuery(
    //     graphql`
    //         query {
    //             githubLogo: file(relativePath: { eq: "GitHub-Mark-120px-plus.png" }) {
    //                 childImageSharp {
    //                     fluid(maxWidth: 96, quality: 100) {
    //                         ...GatsbyImageSharpFluid
    //                     }
    //                 }
    //             }
    //         }
    //     `
    // )



    return (
        <div class="mw9 ph3-ns bg-gray pv2">
                <div class="cf bn ma2">
                    <div class="pa0 f6 f5-ns mb2 black-80 font-tc">訂閱文章</div>
                    <div class="cf">
                        <label class="clip" for="email-address">Email Address</label>
                        <input class="f6 f5-l input-reset bn fl black-80 bg-light-gray pa3 w-100 w-75-m w-80-l br2-ns br--left-ns font-tc" placeholder="請輸入您的Email" type="text" name="email-address" value="" id="email-address" />
                        <input class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black light-gray pointer w-100 w-25-m w-20-l br2-ns br--right-ns font-tc" type="submit" value="訂閱" />
                    </div>
                </div>
        </div>
    )
}

export default Subscribe
