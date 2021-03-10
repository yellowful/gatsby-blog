import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

//是about page裡面，用來曲線區隔內容的區域
//可以用來設定顏色、高度、重疊多少
//因為螢幕寬度不同，內容高度會不同，也會造成曲線高度差異非常大，所以才將裁切的邊邊(clipPath)分成三種size
const ClippedEdge = ({ topBackground, edgeHeight, edgeMarginTop, edgeMarginBottom, isExpanded, onExpanding, onFolding }) => {
    return (
        <div className={`clipped-div z-4 ${topBackground}`} style={{ height: `${edgeHeight}`, marginTop: `-${edgeMarginTop}`, marginBottom: `-${edgeMarginBottom}` }}>
            {
                //根據是不是有傳進來onExpanding和onFolding這兩個個按鈕偵測function，來決定要不要把按鈕畫出來，如果都是true的話，就畫出來，不然就不要畫
                onExpanding && onFolding ?
                    (
                        <>
                            {
                                //如果是展開的狀態下，就顯示收合按鈕；反之顯示展開按鈕
                                isExpanded ?
                                    (<footer className="w-100 w-90-m w-80-l ph3 pt2 mw8 center tr">
                                        <button className="blue bw0 bg-transparent pointer grow button-focus br2" onClick={onFolding}>
                                            <span className="f4 lh-copy mb4 fw3 tr mr2">收合</span>
                                            <span className="f4 lh-copy mb4 fw3"><FontAwesomeIcon icon={faAngleDoubleUp} /></span>
                                        </button>
                                    </footer>)
                                    :
                                    (<footer className="w-100 w-90-m w-80-l ph3 pt2 mw8 center relative tr">
                                        <button className="blue bw0 bg-transparent pointer grow button-focus" onClick={onExpanding}>
                                            <span className="f4 lh-copy mb4 fw3 tr mr2">展開</span>
                                            <span className="f4 lh-copy mb4 fw3"><FontAwesomeIcon icon={faAngleDoubleDown} /></span>
                                        </button>
                                    </footer>)
                            }
                        </>
                    )
                    :
                    null
            }
            <svg width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="rowClip" clipPathUnits="objectBoundingBox" transform="scale(0.002666666667 0.01219512195)">
                    <path d="M0 69.9301V0H375V69.9301C375 69.9301 340.063 80.4587 299.5 81C258.937 81.5413 232.153 66.9203 195.5 66C158.847 65.0797 119.372 78.3917 85 78.5C50.6277 78.6083 0 69.9301 0 69.9301Z" stroke="black" />
                </clipPath>
            </svg>

            <svg width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="tabletRowClip" clipPathUnits="objectBoundingBox" transform="scale(0.001199040767 0.005714285714)">
                    <path d="M0 137.419V0H834V136.061C834 136.061 751.711 172.94 661.5 174C571.289 175.06 530.516 137.864 449 136.061C367.484 134.259 262.444 163.788 186 164C109.556 164.212 0 137.419 0 137.419Z" stroke="black" />
                </clipPath>
            </svg>

            <svg width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="desktopRowClip" clipPathUnits="objectBoundingBox" transform="scale(0.0008673026886 0.00826446281)">
                    <path d="M1 88.1734V1H1152V88.1734C1152 88.1734 1070.5 129 918.5 118.5C766.5 108 760.5 87.113 617 85.6115C473.5 84.1101 400.5 108.325 267 108.5C133.5 108.675 1 88.1734 1 88.1734Z" stroke="black" />
                </clipPath>
            </svg>

        </div>
    )
}

export default ClippedEdge
