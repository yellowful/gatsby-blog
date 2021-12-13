import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons"
import Portal from "../Portal/Portal"
import Modal from "../Modal/Modal"

//用來顯示訂閱電子報的功能
//放在SubscribeContainer裡面
const Subscribe = () => {
  //設定訂閱者姓名和email的state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  //設定mailchimp的回應的state
  const [resOfMailchimp, setResOfMailchimp] = useState({ message: '', popUp: false })
  //監聽姓名欄，改變姓名欄的state
  const onChangeName = e => {
    setName(e.target.value)
  }
  //監聽email欄，改變email的state
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  //如果送出鈕被點了，就把name和，email送給mailchimp
  //addToMailchimp是api
  //setResOfMailchimp是我們設定的，把mailchimp的response去改變resOfMailchimp的state
  const handleSubmit = e => {
    e.preventDefault()
    if (email) {
      addToMailchimp(email, { LNAME: name })
        .then(response => {
          if (response.result === "success") {
            setResOfMailchimp({ message: "收到，為了確認信箱正確可以收到信件，請您到信箱裡點選訂閱確認連結，以完成訂閱，謝謝！", popUp: true })
          } else {
            setResOfMailchimp({ message: "可能格式有誤，或已經重複訂閱，請重新輸入", popUp: true })
          }
        })
        .catch(error => {
          setResOfMailchimp({ message: "可能格式有誤，請重新輸入", popUp: true })
        })
    }
  }
  const handleClose = () => {
    setResOfMailchimp({ message: '', popUp: false });
  }
  //根據mailchimp的response，來顯示送出後要顯示的訊息
  return (
    <div className="w-100 bg-moon-gray h4-l h5 flex justify-center items-center  bb bb-m bn-l b--black-30">
      <div className="bg-moon-gray pa2 pa3-ns flex flex-column w-100">
        <header className="f5 f4-ns mb2 black-80">訂閱文章</header>
        <div className="columns is-desktop">
          <div key="subscribe-user" className="column is-4-desktop">
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="稱呼"
                  onChange={onChangeName}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </p>
            </div>
          </div>
          <div key="subscribe-email" className="column is-6-desktop">
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="電子郵件"
                  onChange={onChangeEmail}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </p>
            </div>
          </div>
          <div key="subscribe-button" className="column is-2-desktop tl-m tr-l">
            <button className="button is-dark" onClick={handleSubmit}>
              訂閱
            </button>
          </div>
        </div>
        <div onClick={handleClose} onKeyPress={handleClose} role="button" aria-label="close" tabIndex="0" >
          <Portal>
            <Modal message={resOfMailchimp.message} popUp={resOfMailchimp.popUp} />
          </Portal>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
