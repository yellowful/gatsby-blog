import React from "react"

//用來放所有project預覽的框框
const ProjectList = props => {
  return (
    <div className="w-100 bg-near-white">
      <section className="w-100 w-90-m w-80-l mw8 center ph2-m ph4-l">
        {props.children}
      </section>
    </div>
  )
}

export default ProjectList
