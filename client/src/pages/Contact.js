import React, { Component } from "react";
import "../App.css";
import ReactHtmlParser from "react-html-parser";
import API from "../utils/API";
// import ScrollAnimation from 'react-animate-on-scroll';


class Contact extends Component {
    constructor() {
        super();
        this.submitForm = this.submitForm.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }

    state = {
        name: "",
        subject: "",
        message: "",
        email: "",
        errorInvoiceEmail: false,
        isdisabled: "disabled",
        btnText: "Submit",
        isSend: false,
        messageData : ''
    };


    handleInputChange = event => {
        const { name, value } = event.target.name;
        this.setState({ [event.target.name]: event.target.value });
    };
    handleBlur = event => {
        if (this.validateEmail(event.target.value)) {
            this.setState({
                errorInvoiceEmail: false,
                isdisabled: ""
            });
        } else {
            this.setState({
                errorInvoiceEmail: true,
                isdisabled: "disabled"
            });
        }
    };

    closeMessage()
    {
        this.setState({
            messageData : ''
        })
    }

    submitForm() {
     
        if (this.validateEmail(this.state.email)) {
            document.getElementById("contact-div-row").scrollIntoView();
            this.setState({
                errorInvoiceEmail: false,
                isSend: true,
                isdisabled: "disabled",
                btnText: "Submitting..",
                messageData : '',
            });
            const {                name: name,

                email: email,
                subject: subject,
                message: message
            } = this.state;
            const data = { name, email, subject, message };
            API.saveContact(data)
                .then((response) => {
                    console.log(response);
                    setTimeout( ()=> {
                        this.setState({
                            messageData : 1,
                            isdisabled : '',
                            btnText : 'Submit',
                            errorInvoiceEmail : false,
                            isSend : false,
                            name: "",
                            subject: "",
                            message: "",
                            email:"",
                        });
                    },1000);
                })
                .catch(err => { console.log(err);
                    /*this.setState({
                        'btnText' : 'Error Found',
                        errorInvoiceEmail : false,
                        'isSend' : false,
                    });*/
            });
        } else {
            this.setState({
                errorInvoiceEmail: true,
                isSend: false,
                messageData : 2,
            });
            document.getElementById("contact-div").scrollIntoView(100);
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    render() {
        let loaderData = '';
        if (this.state.isSend) {
            loaderData = '<div class="loading-area" > <div class="loading-area-center"><div class="loadingio-spinner-ripple-t2t2b1ha2mj"><div class="ldio-0r7i6arfb8b"> <div></div><div></div> </div></div></div></div>';
        }

        let messageData = '';
        if (this.state.messageData==1) {
            messageData = <div className="alert alert-success"role="alert"> Contact details successfully submitted! <button onClick={this.closeMessage} type="button" className="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>;
        }else if (this.state.messageData==2) {
            messageData = <div class="alert alert-warning fade show"> <button onClick={this.closeMessage} type="button" className="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> <h4>Oh snap!</h4> <p class="mb-0">This form seems to be invalid :(</p> </div>;
        }
        return (
            <div>
                <div className="aboutcontainer">
                    <div className="row" id="contact-div-row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="abouttitle">
                                <h2>
                                    <strong>
                                        <center>Let's Talk</center>
                                    </strong>
                                </h2>
                            </div>
                            <p>
                                We want to work with you on your next project.
                                Fill out the form below with as much info about
                                your project that you can disclose and we'll get
                                back to you within 24 hours.
                            </p>
                            <div className="card">
                                { ReactHtmlParser(loaderData) }
                                <div className="card-header" id="contact-div">
                                    Contact
                                </div>
                                <div className="card-body">
                                    <div id="show-message">{ messageData /*ReactHtmlParser(this.state.messageData)*/ }</div>
                                    <div className="form-group">
                                        <label for="nameInput">Your Name</label>
                                        <input
                                            onChange={this.handleInputChange}
                                            value={this.state.name}
                                            name="name"
                                            className="form-control"
                                            id="nameInput"
                                            placeholder=""
                                        ></input>
                                    </div>

                                    {this.state.errorInvoiceEmail ? (
                                        <div className="form-group text-danger">
                                            <label for="emailInput">
                                                Email address
                                            </label>
                                            <input
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onBlur={this.handleBlur}
                                                value={this.state.email}
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                id="emailInput"
                                                placeholder="name@example.com"
                                            ></input>
                                            <small
                                                id="email"
                                                className="form-text text-danger"
                                            >
                                                Please enter valid email.
                                            </small>
                                        </div>
                                    ) : (
                                        <div className="form-group ">
                                            <label for="emailInput">
                                                Email address
                                            </label>
                                            <input
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                onBlur={this.handleBlur}
                                                value={this.state.email}
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                id="emailInput"
                                                placeholder="name@example.com"
                                            ></input>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label for="subjectInput">
                                            Subject
                                        </label>
                                        <input
                                           onChange={
                                                this.handleInputChange
                                            }
                                            value={this.state.subject}
                                            name="subject"
                                            type="subject"
                                            className="form-control"
                                            id="subjectInput"
                                            placeholder=""
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="messageInput">
                                            Message
                                        </label>
                                        <textarea
                                            onChange={
                                                this.handleInputChange
                                            }
                                            value={this.state.message}
                                            name="message"
                                            className="form-control"
                                            id="messageInput"
                                            rows="5"
                                        ></textarea>
                                    </div>
                                    <button
                                        onClick={this.submitForm}
                                        type="button"
                                        className="btn btn-dark"
                                        value="Submit"
                                    >
                                        {this.state.btnText}
                                    </button>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}
export default Contact;
