import React from 'react'

const AboutAuthor = ({ data, bgColor, isExpanded }) => {

    return (
        <div className={`w-100 ${bgColor} pt3 pb5
            ${ isExpanded ? '' : 'vh-100 vh-50-ns' }
        `}>
            <div className={`w-100 h-100 
                ${ isExpanded ? '' : 'overflow-y-hidden excerpt-gradient' }
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h1 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.childContentfulAboutContentTextNode.childMarkdownRemark.html }} />
                </div>
            </div>
        </div>
    )
}

export default AboutAuthor
