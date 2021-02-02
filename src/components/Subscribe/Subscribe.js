import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'


const Subscribe = () => {

    // const data = useStaticQuery(
    //     graphql`
    //         query {
    //             githubLogo: file(relativePath: { eq: "GitHub-Mark-120px-plus.png" }) {
    //                 childImageSharp {
    //                     fluid(maxWidth: 96, quality: 100) {
    //                         ...GatsbyImageSharpFluid
    //                     }
    //                 }
    //             }
    //         }
    //     `
    // )

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resOfMailchimp, setResOfMailchimp] = useState({});

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            addToMailchimp(email, { LNAME: name })
                .then(result => {
                    setResOfMailchimp(result);
                })
        }
    }

    return (
            <div className="w-100 bg-moon-gray h4-l h5 flex justify-center items-center">
                <div className="bg-moon-gray pa2 pa3-ns flex flex-column w-100">
                    <div className="f5 f4-ns mb2 black-80">訂閱文章</div>
                    <div className="columns is-desktop">
                        <div className="column is-4-desktop">
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="text" placeholder="稱呼" onChange={onChangeName} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="column is-6-desktop">
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input className="input" type="email" placeholder="電子郵件" onChange={onChangeEmail} />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="column is-2-desktop tl-m tr-l">
                            <button className="button is-dark" onClick={handleSubmit}>訂閱</button>
                        </div>
                    </div>
                    {
                        Object.keys(resOfMailchimp).length === 0 ?
                            null
                            : resOfMailchimp.result === 'success'
                                ? <p className="f5 f4-ns light-blue fw3" >收到，為了確認信箱正確可以收到信件，請您到信箱裡點選訂閱確認連結，以完成訂閱，謝謝！</p>
                                : <p className="f5 f4-ns orange fw5 o-80" >可能格式有誤，或已經重複訂閱，請重新輸入</p>
                    }
                </div>
            </div>
    )
}

export default Subscribe
