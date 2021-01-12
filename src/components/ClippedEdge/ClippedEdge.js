import React from 'react'

const ClippedEdge = ({ topBackground, edgeHeight, edgeMarginTop, edgeMarginBottom }) => {


    return (
        <div className={`clipped-div z-4 ${topBackground}`} style={{ height: `${edgeHeight}`, marginTop: `-${edgeMarginTop}`, marginBottom: `-${edgeMarginBottom}` }}>

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

            {/* <svg width="0" height="0" viewBox="0 0 375 667" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="rowClip" clipPathUnits="objectBoundingBox" transform="scale(0.002666666667 0.001499250375)">
                    <path d="M0 647.5V0H375V647.5C375 647.5 338.51 660.633 297.947 665.645C257.385 670.658 233.153 656.021 196.5 647.5C159.847 638.979 119.733 664.643 85.3605 665.645C50.9883 666.648 0 647.5 0 647.5Z" stroke="black" />
                </clipPath>
            </svg>

            <svg width="0" height="0" viewBox="0 0 834 1194" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="tabletRowClip" clipPathUnits="objectBoundingBox" transform="scale(0.001199040767 0.000834028357)">
                    <path d="M0 1164.5V0H834V1153C834 1153 752.846 1184.38 662.635 1193.36C572.424 1202.35 530.516 1168.28 449 1153C367.484 1137.72 266.286 1191.57 189.842 1193.36C113.398 1195.16 0 1164.5 0 1164.5Z" stroke="black" />
                </clipPath>
            </svg>

            <svg width="0" height="0" viewBox="0 0 1153 704" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="desktopRowClip" clipPathUnits="objectBoundingBox" transform="scale(0.0008810572687 0.001420454545)">
                    <path d="M1 666.171V1H1152V666.171C1152 666.171 1040 697.343 915.5 702.626C791 707.909 729.5 655.604 617 646.623C504.5 637.641 368.5 701.569 263 702.626C157.5 703.683 1 666.171 1 666.171Z" stroke="black" />
                </clipPath>
            </svg> */}



        </div>
    )
}

export default ClippedEdge
