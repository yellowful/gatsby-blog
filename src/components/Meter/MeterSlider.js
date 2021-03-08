import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faFire, faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { iceColor, fireColor } from '../../utils/ice-fire-color'


const MeterSlider = ({ fireNumber }) => {

    const [fireNumberState, setFireNumberState] = useState(fireNumber)

    const onChangeHandler = (e) => {
        //e.persist();
        setFireNumberState(e.target.value);
    }

    const onUpHandler = () => {
        navigate(`/blog/ice-fire-number/${fireNumberState}/`);
    }

    return (
        <div className="w-100 bg-light-gray">
            <div className="w-70 w-60-m w-50-l ph3 mw8 mt2 mt4-ns center flex items-center">
                <span className="pr2 f3" style={{ color: iceColor }}>
                    <FontAwesomeIcon icon={faSnowflake} />
                </span>
                <input
                    className="slider"
                    type="range"
                    min="0"
                    max="9"
                    step="1"
                    value={fireNumberState}
                    style={{
                        backgroundImage: `linear-gradient(90deg,${iceColor},${fireColor})`
                    }}
                    onChange={onChangeHandler}
                    onMouseUp={onUpHandler}
                    onTouchEnd={onUpHandler}
                />
                <span className="pl2 f3" style={{ color: fireColor }}>
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </div>
            <div className="w-70 w-60-m w-50-l ph3 mw8 mb2 mb4-ns center flex items-center justify-between">
                <span className="pr2 f6 f5-l" style={{ color: iceColor }}>
                    專業
                </span>
                <span className="pr2 f5 f4-l" style={{ color: iceColor }}>
                    <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </span>
                <span className="pl2 f5 f4-l" style={{ color: fireColor }}>
                    <FontAwesomeIcon icon={faLongArrowAltRight} />
                </span>
                <span className="pl2 f6 f5-l" style={{ color: fireColor }}>
                    生活
                </span>
            </div>
        </div>
    )
}

export default MeterSlider
