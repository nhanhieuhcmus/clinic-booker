import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
// import { userService } from "../../services/";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        try {
            this.setState({
                errMessage: "",
            });
            const response = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            console.log(response);
            if (response.errCode) {
                this.setState({
                    errMessage: response.message,
                });
            } else {
                this.props.userLoginSuccess(response.user);
            }
        } catch (error) {
            console.log(error.response);
            this.setState({
                errMessage: error.response.data.message,
            });
        }
    };

    handlePasswordToggle = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleEnterPress = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login__content">
                        <div className="login__brand">
                            <span className="login__brand-logo">
                                <i className="fab fa-cuttlefish"></i>
                            </span>
                            <span className="header__brand-name">
                                linicBooker
                            </span>
                        </div>
                        <div>
                            <div className="form-group login-input">
                                <label htmlFor="">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username..."
                                    onChange={this.handleUsernameChange}
                                    onKeyDown={this.handleEnterPress}
                                />
                            </div>
                            <div className="form-group login-input password">
                                <label htmlFor="">Password</label>
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter your password..."
                                    onChange={this.handlePasswordChange}
                                    onKeyDown={this.handleEnterPress}
                                />
                                <div
                                    className="toggle-password"
                                    onClick={this.handlePasswordToggle}
                                >
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "fas fa-eye-slash"
                                                : "far fa-eye"
                                        }
                                    ></i>
                                </div>
                            </div>
                            {!!this.state.errMessage ? (
                                <div className="error-message">
                                    <p>{this.state.errMessage}</p>
                                </div>
                            ) : null}

                            <div>
                                <button
                                    className="btn-login"
                                    onClick={this.handleLogin}
                                >
                                    Log in
                                </button>
                            </div>
                            <div>
                                <a className="forgot-password">
                                    Forgot your password?
                                </a>
                            </div>
                            <div>
                                <p className="login-with">Or login with</p>
                                <div className="social-login">
                                    <i className="fab fa-facebook-f login-item facebook"></i>
                                    <i className="fab fa-twitter login-item twitter"></i>
                                    <i className="fab fa-google-plus-g login-item google"></i>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="login__img">
                        {/* <h1>ClinicBooker</h1> */}
                        <div className="image"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
