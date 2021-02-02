import React from 'react'
import { Link } from "gatsby"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faCalendarAlt, faGlasses } from '@fortawesome/free-solid-svg-icons'

const TimeToRead = ({publishedDate, timeToRead}) => {
    return (
        <div className="mv2 mv4-ns ph2 w-100 flex justify-between">
            <span>
                <span >
                    <Link to="/about/">
                        <span className="f6"><FontAwesomeIcon icon={faAt} /></span>
                        <span className="ml2-ns f6">蟲探理查</span>
                    </Link>
                </span>
                <span className="ml2 ml6-ns">
                    <span className="f6 gray lh-copy ">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </span>
                    <time className="ml2-ns f6 gray lh-copy ">
                        {publishedDate}
                    </time>
                </span>
            </span>
            <span className="f6 ">
                <span>
                    <FontAwesomeIcon icon={faGlasses} />
                </span>
                <span className="ml2-ns">
                    約{timeToRead}分鐘
                        </span>
            </span>
        </div>
    )
}

export default TimeToRead
