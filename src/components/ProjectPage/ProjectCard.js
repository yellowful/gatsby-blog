import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'



const ProjectCard = ({ slug, projectName, demoLink, repoLink, introduction, image }) => {
    return (
        <div key={`project${slug}`} className="pa2 br3 ma2 mv4-ns bg-moon-gray mh0-ns">
            <h2 className="head-1-shadow f2 ph2 lh-title fw7 mv4 dark-gray">{projectName}</h2>
            <div class="flex flex-column flex-row-ns">
                <div class="w-100 w-50-m w-70-l pr3-ns order-2 order-1-ns ph2">
                    <div dangerouslySetInnerHTML={{ __html: introduction }} />
                    <table className="w-100 tc mb3 f4 lh-copy fw3">
                        <tr>
                            <td>
                                <a href={demoLink} rel="noreferrer" target="_blank">試玩 &nbsp;<FontAwesomeIcon icon={faGamepad} /></a>
                            </td>
                            <td><a href={repoLink} rel="noreferrer" target="_blank">原始碼 &nbsp;<FontAwesomeIcon icon={faGithub} /></a></td>
                            <td>
                                <Link to={`/project/${slug}/`}>
                                    了解更多 &nbsp;<FontAwesomeIcon icon={faAngleDoubleRight} />
                                </Link>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns ph2 center pt5-m w-50-m mw5-m w-30-l">
                    <img className="br3" src={image} alt="demo of project" />
                </div>
            </div>
        </div>
    )
}


export default ProjectCard
