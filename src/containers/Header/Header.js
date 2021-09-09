import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../utils/";
import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    componentDidMount() {
        let menu = [];
        const { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            const role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }

    handleChangeLanguage = (event) => {
        this.props.changeLanguageAppRedux(event.target.value);
    };

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="right-header">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />
                        &#44; &nbsp;
                        {userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ""}
                        !
                    </span>
                    <select
                        className="select-language"
                        onClick={this.handleChangeLanguage}
                    >
                        <option
                            value={LANGUAGES.EN}
                            selected={
                                language === LANGUAGES.EN ? "selected" : null
                            }
                        >
                            English
                        </option>
                        <option
                            value={LANGUAGES.VI}
                            selected={
                                language === LANGUAGES.VI ? "selected" : null
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
        userInfo: state.user.userInfo,
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
