import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../utils/";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
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

    // handleChangeLanguage = (event) => {
    //     this.props.changeLanguageAppRedux(event.target.value);
    // };

    toggleLanguageDropdown = () => {
        this.setState({
            isLanguageDropdown: !this.state.isLanguageDropdown,
        });
    };

    handleSelectLanguage = (event) => {
        // fire Redux event: actions
        this.props.changeLanguageAppRedux(event.target.value);
    };

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(">>>>check current language: ", language);
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
                    <ButtonDropdown
                        className="header-language"
                        isOpen={this.state.isLanguageDropdown}
                        toggle={this.toggleLanguageDropdown}
                    >
                        <DropdownToggle color="" caret size="md">
                            {language === LANGUAGES.VI
                                ? "Tiếng Việt"
                                : "English"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                value={LANGUAGES.VI}
                                onClick={this.handleSelectLanguage}
                            >
                                Tiếng Việt
                            </DropdownItem>
                            <DropdownItem
                                value={LANGUAGES.EN}
                                onClick={this.handleSelectLanguage}
                            >
                                English
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

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
