import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faFire, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { iceColor, fireColor } from '../../utils/style-number-color'

//用來顯示風格指數拉桿的component
const MeterSlider = ({ fireNumber }) => {
    //設定風格指數的state
    const [fireNumberState, setFireNumberState] = useState(fireNumber)
    //改變風格指數
    const onChangeHandler = (e) => {
        //e.persist();
        setFireNumberState(e.target.value);
    }
    //拉動風格指數拉桿放開的時候，將頁面導去相對應的頁面
    const onUpHandler = () => {
        navigate(`/blog/style-number/${fireNumberState}/`);
    }
    //按左邊按鈕的時候，風格指數減少1
    const handleCooler = () => {
        if(fireNumber>0){
            setFireNumberState(fireNumber-1);
            navigate(`/blog/style-number/${fireNumberState-1}/`);
        }
    }
    //按右邊按鈕的時候，風格指數增加1
    const handleWarmer = () => {
        if(fireNumber<9){
            setFireNumberState(fireNumber+1);
            navigate(`/blog/style-number/${fireNumberState+1}/`);
        }
    }
    //range input的css都寫在檔案裡了，只有變數寫在inline style中
    //共顯示了一個range input、兩個按鈕、兩個說明標籤、兩個風格的icon
    return (
        <div className="w-100 bg-light-gray">
            <div key="meter-slide-line1" className="w-70 w-60-m w-50-l ph3 mw8 mt2 mt4-ns center flex items-center">
                <span key="meter-icon-ice" className="pr2 f3" style={{ color: iceColor }}>
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
                <span key="meter-icon-fire" className="pl2 f3" style={{ color: fireColor }}>
                    <FontAwesomeIcon icon={faFire} />
                </span>
            </div>
            <div key="meter-slide-line2" className="w-70 w-60-m w-50-l ph3 mw8 mv2 mb4-ns center flex items-center justify-between">
                <span key="meter-text-profesional" className="pr2 f6 f5-l" style={{ color: iceColor }}>
                    專業
                </span>
                <button key="meter-slide-button-ice" 
                    className="pa1 f5 f4-l pointer white h2 w2 br-100 bw0 input-reset button-reset" 
                    style={{ backgroundColor: iceColor }}
                    onClick={handleCooler}
                    >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button key="meter-slide-button-fire" 
                    className="pa1 f5 f4-l pointer white h2 w2 br-100 bw0  input-reset button-reset" 
                    style={{ backgroundColor: fireColor }}
                    onClick={handleWarmer}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <span key="meter-text-life" className="pl2 f6 f5-l" style={{ color: fireColor }}>
                    生活
                </span>
            </div>
        </div>
    )
}

export default MeterSlider
