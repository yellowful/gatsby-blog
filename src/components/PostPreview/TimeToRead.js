import React from 'react'
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faCalendarAlt, faGlasses, faSnowflake, faFire } from '@fortawesome/free-solid-svg-icons'

const TimeToRead = ({ publishedDate, timeToRead, iceFireNumber }) => {

    let percentColors = [
        { pct: 0.0, color: { r: 0x38, g: 0x66, b: 0x75 } },
        { pct: 1.0, color: { r: 0xff, g: 0xbc, b: 0x47 } }];

    const getColorForPercentage = (pct) => {
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    };

    const iceFireColor = getColorForPercentage(iceFireNumber / 10);
    //console.table({ iceFireColor: iceFireColor, iceFireNumber: iceFireNumber })

    return (
        <section className="mv2 mv4-ns ph2 w-100 flex justify-between">
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
                <span className="ml2">
                    {
                        iceFireNumber > 4 ?
                            (
                                <Link to={`/blog/ice-fire-number/${iceFireNumber}/`}>
                                    <span className="f5" style={{ color: iceFireColor }}>
                                        <FontAwesomeIcon icon={faFire} />
                                    </span>
                                </Link>
                            )
                            :
                            (
                                <Link className="f5" to={`/blog/ice-fire-number/${iceFireNumber}/`}>
                                    <span style={{ color: iceFireColor }}>
                                        <FontAwesomeIcon icon={faSnowflake} />
                                    </span>
                                </Link>
                            )
                    }
                </span>
            </span>
        </section>
    )
}

export default TimeToRead
