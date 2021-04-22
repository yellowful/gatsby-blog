import React, { useEffect } from "react"
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import Layout from "../../components/Layout/layout"
import MeterSlider from "../../components/Meter/MeterSlider"

const StyleNumberIndex = () => {

    useEffect(() => {
        const iceFireNumber = Math.floor(Math.random() * 10)
        navigate(`/blog/style-number/${iceFireNumber}/`);
    }, []);

    return (
        <Layout>
            <MeterSlider fireNumber={4} />
            <div className="w-100 vh-50 bg-light-gray">
                <div className="w5 center tc white mv4 bounce">
                    <FontAwesomeIcon icon={faDice} size="6x" />
                </div>
            </div>
        </Layout >
    )
}

export default StyleNumberIndex


