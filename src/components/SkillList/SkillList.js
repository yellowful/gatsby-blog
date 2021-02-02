import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faHammer } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJsSquare, faCss3, faHtml5, faNodeJs } from '@fortawesome/free-brands-svg-icons'


const SkillList = ({ data, bgColor, isExpanded }) => {

    const icons = [faReact, faJsSquare, faCss3, faHtml5, faNodeJs, faCloudUploadAlt, faHammer];

    return (
        <div className={`w-100 ${bgColor} pt3 pb5
            ${isExpanded ? '' : 'vh-100 vh-50-ns'}
        `}>
            <div className={`w-100 h-100 
                ${isExpanded ? '' : 'overflow-y-hidden excerpt-gradient'}
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h1 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.childContentfulAboutContentTextNode.childMarkdownRemark.html }} />
                    <div className="index-card-container mt4">
                        {
                            data.complexData.map((skill, i) => {
                                return (
                                    <article className=" bg-light-gray br3">
                                        <h2 className="w-100 mt2 tc f4 fw7">
                                            <span><FontAwesomeIcon icon={icons[i]} /></span>
                                            <span className="ml2">
                                                {skill.category}
                                            </span>
                                        </h2>
                                        <ul className="w-60 center flex flex-column items-start mv2">
                                            {
                                                skill.items.map((item) => {
                                                    return (
                                                        <li className="mv1 w-100">
                                                            <span className="mr2 dib v-top">-</span>
                                                            <span className="dib v-top w-90">{item}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </article>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillList
