import React from 'react'

const AboutAuthor = ({ slug,data, bgColor, isExpanded }) => {

    return (
        <section id={slug} className={`w-100 ${bgColor} pt3 pb5
            ${ isExpanded ? '' : 'vh-100 vh-50-ns' }
        `}>
            <div className={`w-100 h-100 
                ${ isExpanded ? '' : 'overflow-y-hidden excerpt-gradient' }
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h2 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h2>
                    <section dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }} />
                </div>
            </div>
        </section>
    )
}

export default AboutAuthor
