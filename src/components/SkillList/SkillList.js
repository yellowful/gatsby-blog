import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faHammer } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJsSquare, faCss3, faHtml5, faNodeJs } from '@fortawesome/free-brands-svg-icons'

//用來放在about page，用來顯示自己的技能
//isExpanded用來決定要不要展開，bgColor用來設定這個區塊的顏色
const SkillList = ({ slug, data, bgColor, isExpanded }) => {
    //這些icon放進array可以方便之後render
    const icons = [faReact, faJsSquare, faCss3, faHtml5, faNodeJs, faCloudUploadAlt, faHammer];
    //展開的狀況下，將skill的array顯示成一個一個的card
    //每一個card裡面又list一堆item
    //這裡小心因為category的名稱和item的名稱可能相同，所以設定key的時候，前綴要設定不一樣，以免出現相同的key
    return (
        <section id={slug} className={`w-100 ${bgColor} pt3 pb5
            ${isExpanded ? '' : 'vh-100 vh-50-ns'}
        `}>
            <div className={`w-100 h-100 
                ${isExpanded ? '' : 'overflow-y-hidden excerpt-gradient'}
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h2 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h2>
                    <section key="skill-list-content" dangerouslySetInnerHTML={{ __html: data.content.childMarkdownRemark.html }} />
                    <section key="skill-list-cards-container" className="index-card-container mt4">
                        {
                            data.complexData.map((skill, i) => {
                                return (
                                    <article key={`skill-category-${skill.category}`} className=" bg-light-gray br3">
                                        <h2 className="w-100 mt2 tc f4 fw7">
                                            <span key="skill-list-card-icon"><FontAwesomeIcon icon={icons[i]} /></span>
                                            <span key="skill-list-card-category" className="ml2">
                                                {skill.category}
                                            </span>
                                        </h2>
                                        <ul className="w-60 center flex flex-column items-start mv2">
                                            {
                                                skill.items.map((item) => {
                                                    return (
                                                        <li key={`skill-item-${item}`} className="mv1 w-100">
                                                            <span key="skill-list-item-dash" className="mr2 dib v-top">-</span>
                                                            <span key="skill-list-item-name" className="dib v-top w-90">{item}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </article>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
        </section>
    )
}

export default SkillList
