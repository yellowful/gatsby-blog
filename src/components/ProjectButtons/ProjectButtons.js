import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const ProjectBottons = ({ slug, demoLink, repoLink }) => {

    return (
        <footer className="w-100 flex justify-around-l flex-row-l items-center-l flex-column mv2">
            <div key={`button-${demoLink}`} className="tc bg-mid-gray mv1 br2">
                <a className="f4 fw3 pa2 near-white" href={demoLink} rel="noreferrer" target="_blank">
                    試玩 &nbsp;<FontAwesomeIcon icon={faGamepad} />
                </a>
            </div>
            <div key={`button-${repoLink}`} className="tc bg-mid-gray mv1 br2">
                <a className="f4 fw3 pa2 near-white" href={repoLink} rel="noreferrer" target="_blank">
                    原始碼 &nbsp;<FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
            {
                slug ?
                    (
                        <div key={`button-${slug}`} className="tc bg-mid-gray mv1 br2">
                            <Link className="f4 fw3 pa2 near-white" to={`/project/${slug}/`}>
                                了解更多 &nbsp;<FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Link>
                        </div>
                    )
                    :
                    (
                        <div key="back-to-project" className="tc bg-mid-gray mv1 br2">
                            <Link className="f4 fw3 pa2 near-white" to="/project/">
                                回作品集 &nbsp;<FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </Link>
                        </div>
                    )
            }
        </footer>
    )
}

export default ProjectBottons
