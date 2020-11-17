import React from 'react';
import Img from 'gatsby-image'
import { Link } from "gatsby"

const Card = ({slug,postTitle,publishedDate,imageSrc,excerpt})=>{    
    return(
        <div className="card has-background-light ma2 w5 h6">
            
                <div className="card-image">
                    <Img fluid={{...imageSrc,aspectRatio: 1.5}} />
                </div>
                <div className="card-content">
                    <p className="title">{postTitle}</p>
                    <p>{publishedDate}</p>
                    <p>{excerpt}</p>
                    <p className="pointer"><Link to={`/blog/${slug}`}>更多</Link></p>
                </div>
            
        </div>
    )
}

export default Card;