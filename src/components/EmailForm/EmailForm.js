import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'

//讓瀏覽者可以寄Email給作者
export default class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            status: ""
        };
        this.inputName = React.createRef();
        this.inputEmail = React.createRef();
        this.inputMessage = React.createRef();
    }
    //接收姓名欄位的資料
    onNameChange = (ev) => {
        this.setState({ name: ev.target.value })
    }
    //偵測鍵盤是否已經按enter鍵了
    nameEventListener = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.inputEmail.current.focus();
        }
    }
    //接收填入的Email資料
    onEmailChange = (ev) => {
        this.setState({ email: ev.target.value })
    }
    //偵測鍵盤是否已經按enter鍵了
    emailEventListener = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.inputMessage.current.focus();
        }
    }
    //接收信件內容
    onMessageChange = (ev) => {
        this.setState({ message: ev.target.value })
    }
    //偵測送出鈕是否按下去了
    submitForm = (ev) => {
        ev.preventDefault();
        this.fetchForm();
    }
    //將信件送給formspree
    fetchForm = () => {
        //檢查是不是有沒填的欄位
        const isFormValid = this.state.name === '' || this.state.email === '' || this.state.message === '';
        //如果沒填的話就設定status為錯誤
        //如果都有填的話，就把資料fetch給formspree
        if (!isFormValid) {
            fetch('https://formspree.io/f/mwkwaeob', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    'name': this.state.name,
                    'email': this.state.email,
                    'message': this.state.message
                })
            })
            //如果有任何錯誤，就把status設成error
            //順便把欄位清空
                .then(res => {
                    //console.table(res);
                    if (res.status === 200) {
                        this.setState({ status: "SUCCESS", name: '', email: '', message: '' });
                    }
                    else {
                        this.setState({ status: "ERROR", name: '', email: '', message: '' })
                    }
                })
                .catch(err => {
                    this.setState({ status: "ERROR" })
                })
        } else {
            this.setState({ status: "ERROR" })
        }
    }

    //如果還沒收到formspree的訊息的話，就顯示訊息送出
    //如果status是SUCCESS的話，就顯示「訊息已寄出，謝謝」
    //如果status是ERROR的話，就顯示錯誤訊息
    render() {
        const { status } = this.state;
        return (
            <section id="contact" className="w-100 bg-near-white pv4">
                <div className="w-100 w-90-m w-80-l mw8 center pr5-l pr3-m pa2">
                <h2 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">聯絡我</h2>
                    <form onSubmit={this.submitForm}>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label htmlFor="From" className="label">寄件人</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p className="control is-expanded has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="您的稱呼"
                                            onChange={this.onNameChange}
                                            onKeyDown={this.nameEventListener}
                                            ref={this.inputName}
                                            value={this.state.name}
                                        />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control is-expanded has-icons-left has-icons-right">
                                        <input
                                            className="input"
                                            type="email"
                                            placeholder="您的電子郵件"
                                            name="email"
                                            onChange={this.onEmailChange}
                                            onKeyDown={this.emailEventListener}
                                            ref={this.inputEmail}
                                            value={this.state.email}
                                        />
                                        <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label htmlFor="message" className="label">訊息</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="message"
                                            placeholder="您想說什麼"
                                            onChange={this.onMessageChange}
                                            ref={this.inputMessage}
                                            value={this.state.message}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">

                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        {
                                            status === "SUCCESS" ?
                                                <p>訊息已寄出，謝謝！</p>
                                                :
                                                <button type="submit" className="button is-dark">
                                                    送出訊息
                                            </button>
                                        }
                                        {status === "ERROR" && <p>發生未知的錯誤，請檢查是否每個欄位都有填</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }


}