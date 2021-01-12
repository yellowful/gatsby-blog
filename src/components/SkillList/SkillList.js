import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

const SkillList = ({ data, bgColor }) => {

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
            ${ isExpanded ? '' : 'vh-100 vh-50-ns' }
        `}>
            <div className={`w-100 h-100 
                ${ isExpanded ? '' : 'overflow-y-hidden excerpt-gradient' }
            `}>
                <div className="w-100 w-90-m w-80-l ph3 mw8 center">
                    <h1 className="tc font-tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: data.childContentfulAboutContentTextNode.childMarkdownRemark.html }} />
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
