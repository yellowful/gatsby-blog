import React from 'react'
import { Comments } from 'react-facebook';

const FbComments = ({fbHref}) => {
    return (
        <div className="flex justify-center">
            <Comments className="center" href={fbHref} />
        </div>
    )
}

export default FbComments
