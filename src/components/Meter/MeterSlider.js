import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faFire } from '@fortawesome/free-solid-svg-icons'
import {iceColor,fireColor} from '../../utils/ice-fire-color'


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
            <div className="w-70 w-60-m w-50-l ph3 mw8 mv2 mv4-ns center flex items-center">
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

        </div>
    )
}

export default MeterSlider
