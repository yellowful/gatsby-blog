import React from 'react'
import { FacebookProvider, Comments } from 'react-facebook';

const Fbcomments = ({fbHref}) => {
    return (
        <div>
            <FacebookProvider appId="129888612117049">
                <Comments href={fbHref} />
            </FacebookProvider>
        </div>
    )
}

export default Fbcomments
