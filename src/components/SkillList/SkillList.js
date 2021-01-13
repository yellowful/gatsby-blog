import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faCloudUploadAlt, faHammer } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJsSquare, faCss3, faHtml5, faNodeJs } from '@fortawesome/free-brands-svg-icons'


const SkillList = ({ data, bgColor }) => {

    const icons = [faReact, faJsSquare, faCss3, faHtml5, faNodeJs, faCloudUploadAlt, faHammer];
    const [isExpanded, setExpandedState] = useState(false);
    const onExpanding = (ev) => {
        ev.preventDefault();
        setExpandedState(true);
    }
    const onFolding = (ev) => {
        ev.preventDefault();
        setExpandedState(false);
    }

    return (
        <div className={`w-100 ${bgColor} pt3 pb5
            ${isExpanded ? '' : 'vh-100 vh-50-ns'}
        `}>
            <div className={`w-100 h-100 
                ${isExpanded ? '' : 'overflow-y-hidden excerpt-gradient'}
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h1 className="tc font-tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.childContentfulAboutContentTextNode.childMarkdownRemark.html }} />
                    <div className="index-card-container mt4">
                        {
                            data.complexData.map((skill, i) => {
                                return (
                                    <article className=" bg-light-gray br2">
                                        <h2 className="w-100 tc f4 fw7">
                                            <span><FontAwesomeIcon icon={icons[i]} /></span>
                                            <span className="ml2 font-tc">
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
            {
                isExpanded ?
                    (<div className="w-100 w-90-m w-80-l ph3 mw8 center relative tr">
                        <button className="blue bw0 bg-transparent pointer grow button-focus" onClick={onFolding}>
                            <span className="font-tc f4 lh-copy mb4 fw3 tr mr2">收合</span>
                            <span className="f4 lh-copy mb4 fw3"><FontAwesomeIcon icon={faAngleDoubleUp} /></span>
                        </button>
                    </div>)
                    :
                    (<div className="w-100 w-90-m w-80-l ph3 mw8 center relative tr">
                        <button className="blue bw0 bg-transparent pointer grow button-focus" onClick={onExpanding}>
                            <span className="font-tc f4 lh-copy mb4 fw3 tr mr2">展開</span>
                            <span className="f4 lh-copy mb4 fw3"><FontAwesomeIcon icon={faAngleDoubleDown} /></span>
                        </button>
                    </div>)
            }
        </div>
    )
}

export default SkillList
