import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight, faAngleDoubleLeft, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const ProjectBottons = ({ slug, demoLink, repoLink }) => {

    return (
        <footer className="w-100 flex justify-around-l flex-row-l items-center-l flex-column mv2">
            <a key={`button-${demoLink}`} href={demoLink} rel="noreferrer" target="_blank">
                <div className="tc bg-mid-gray mv1 br2 f4 fw3 pa1 near-white">
                    試玩 &nbsp;<FontAwesomeIcon icon={faGamepad} />
                </div>
            </a>
            <a  key={`button-${repoLink}`} href={repoLink} rel="noreferrer" target="_blank">
                <div className="tc bg-mid-gray mv1 br2 f4 fw3 pa1 near-white">
                    原始碼 &nbsp;<FontAwesomeIcon icon={faGithub} />
                </div>
            </a>
            {
                slug ?
                    (
                        <Link to={`/project/${slug}/`}>
                            <div className="tc bg-mid-gray mv1 br2 f4 fw3 pa1 near-white">
                                了解更多 &nbsp;<FontAwesomeIcon icon={faAngleDoubleRight} />
                            </div>
                        </Link>
                    )
                    :
                    (
                        <Link to="/project/">
                            <div className="tc bg-mid-gray mv1 br2 f4 fw3 pa1 near-white">
                                回作品集 &nbsp;<FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </div>
                        </Link>
                    )
            }
        </footer>
    )
}

export default ProjectBottons
