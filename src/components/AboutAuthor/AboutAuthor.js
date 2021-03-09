import React from 'react'

const AboutAuthor = ({ slug,data, bgColor, isExpanded }) => {
    //contentful的slug當作section的id，讓hash tag navigate能找到這裡
    //isExpanded是false的話，就縮小成螢幕一部分大小，如果是true的話，就不限制高度
    //bgColor可以設定這個區塊的背景顏色
    //還沒展開的話要設定 overflow是hidden，摘要要消失
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
