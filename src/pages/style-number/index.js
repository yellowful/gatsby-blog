import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice } from "@fortawesome/free-solid-svg-icons"
import Layout from "../../components/Layout/layout"
import MeterSlider from "../../components/Meter/MeterSlider"
import Seo from "../../components/Seo/seo"

const StyleNumberIndex = () => {
  useEffect(() => {
    const iceFireNumber = Math.floor(Math.random() * 10)
    navigate(`/blog/style-number/${iceFireNumber}/`)
  }, [])

  return (
    <Layout>
      <Seo
        title={`風格指數`}
        pageURL={`https://www.bdr.rocks/style-number/`}
        description={`您可以選取喜歡的風格的文章`}
      />
      <MeterSlider fireNumber={4} />
      <div className="w-100 vh-50 bg-light-gray">
        <div className="w5 center tc white mv4 bounce">
          <FontAwesomeIcon icon={faDice} size="6x" />
        </div>
      </div>
    </Layout>
  )
}

export default StyleNumberIndex
