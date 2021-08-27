import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils/";

class Header extends Component {
    handleChangeLanguage = (event) => {
        console.log("check language from Header: ", event.target.value);
        this.props.changeLanguageAppRedux(event.target.value);
    };

    render() {
        const { processLogout } = this.props;
        const currentLanguage = this.props.language;


        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div>
                    <select
                        className="language"
                        onClick={this.handleChangeLanguage}
                    >
                        <option
                            value={LANGUAGES.EN}
                            selected={
                                currentLanguage === LANGUAGES.EN
                                    ? "selected"
                                    : null
                            }
                        >
                            English
                        </option>
                        <option
                            value={LANGUAGES.VI}
                            selected={
                                currentLanguage === LANGUAGES.VI
                                    ? "selected"
                                    : null
                            }
                        >
                            Tiếng Việt
                        </option>
                    </select>
                    {/* nút logout */}
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Đăng xuất"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
