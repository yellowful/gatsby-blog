import React from 'react'
import Img from 'gatsby-image'


const TagCard = ({slug, postTitle, publishedDate, excerpt, imageSrc, timeToRead}) => {
    return (
        <>
            <article class="pv4 bt bb b--black-10 ph3 ph0-l" key={`tag-${slug}`}>
                <div class="flex flex-column flex-row-ns">
                    <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                        <h1 class="f3 athelas mt0 lh-title">{postTitle}</h1>
                        <p class="f5 f4-l lh-copy athelas">
                            {excerpt}
                        </p>
                    </div>
                    <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                        <Img className="db" fluid={{ ...imageSrc, aspectRatio: 1.5 }} />
                    </div>
                </div>
                <p class="f6 lh-copy gray mv0">By <span class="ttu">Robin Darnell</span></p>
                <time class="f6 db gray">{publishedDate}</time>
            </article>
        </>
    )
}

export default TagCard
