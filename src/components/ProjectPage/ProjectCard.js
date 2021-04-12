import React from 'react'
import { Link } from 'gatsby'
import ProjectButtons from '../ProjectButtons/ProjectButtons'

//顯示單一project的預覽
//顯示標題、重點介紹、試玩連結、原始碼連結、代表圖片等
const ProjectCard = ({ slug, projectName, demoLink, repoLink, introduction, image }) => {
    return (
        <article className="pa2 br3 ma2 mv4-ns bg-moon-gray mh0-ns">
            <Link to={`/project/${slug}/`}>
                <h2 className="head-1-shadow f2 ph2 lh-title fw7 mv4 dark-gray">{projectName}</h2>
            </Link>
            <div className="flex flex-column flex-row-ns">
                <div key="project-card-section" className="w-100 w-50-m w-70-l pr3-ns order-2 order-1-ns ph2">
                    <section dangerouslySetInnerHTML={{ __html: introduction }} />
                    <ProjectButtons slug={slug} demoLink={demoLink} repoLink={repoLink} />
                </div>
                <div key="project-card-image" className="pl3-ns order-1 order-2-ns mb4 mb0-ns ph2 center pt5-m w-50-m mw5-m w-30-l">
                    <Link to={`/project/${slug}/`}>
                        <img className="br3" src={image} alt="demo of project" />
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default ProjectCard
