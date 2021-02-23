import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faFire } from '@fortawesome/free-solid-svg-icons'


const MeterSlider = ({ fireNumber }) => {

    const [fireNumberState, setFireNumberState] = useState(fireNumber)

    const onChangeHandler = (e) => {
        //e.persist();
        setFireNumberState(e.target.value);
    }

    const onMouseUpHandler = () => {
        navigate(`/blog/ice-fire-number/${fireNumberState}/`);
    }

    const iceColor = `#386675`
    const fireColor = `#ffbc47`



    return (
        <div className="w-100 bg-light-gray">
            <div className="w-70 w-60-m w-50-l ph3 mw8 mv2 mv4-ns center flex items-center">
                <span className="pr2" style={{ color: iceColor }}>
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
                        WebkitAppearance: `none`,
                        outline: `none`,
                        borderRadius: `1rem`,
                        width: `100%`,
                        height: `2rem`,
                        backgroundImage: `linear-gradient(90deg,${iceColor},${fireColor})`
                    }}
                    onChange={onChangeHandler}
                    onMouseUp={onMouseUpHandler}
                />
                <span className="pl2" style={{ color: fireColor }}>
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </div>

        </div>
    )
}

export default MeterSlider
