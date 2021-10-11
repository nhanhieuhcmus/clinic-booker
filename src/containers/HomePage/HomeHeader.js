import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLanguageDropdown: false,
            isResponsive: false,
        };
    }

    toggleLanguageDropdown = () => {
        this.setState({
            isLanguageDropdown: !this.state.isLanguageDropdown,
        });
    };

    handleSelectLanguage = (event) => {
        // fire Redux event: actions
        this.props.changeLanguageAppRedux(event.target.value);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleHeaderResponsive = () => {
        console.log("handleHeaderResponsive!");
        let sideBar = document.getElementById("home-header-content");
        if (sideBar.className === "home-header-content") {
            sideBar.className += " responsive";
        } else {
            sideBar.className = "home-header-content";
        }
    };
    componentDidMount() {}
    componentWillUnmount() {
        
    }
    

    render() {
        const currentLanguage = this.props.language;
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div
                        className="home-header-content"
                        id="home-header-content"
                    >
                        <div className="header__left">
                            <span
                                className="header__option-icon"
                                onClick={this.handleHeaderResponsive}
                            >
                                <i
                                    className="fas fa-bars"
                                    
                                ></i>
                            </span>
                            <div
                                className="header__brand"
                                onClick={this.returnToHome}
                            >
                                <span className="header__brand-logo">
                                    <i className="fab fa-cuttlefish"></i>
                                </span>
                                <span className="header__brand-name">
                                    linicBooker
                                </span>
                            </div>
                        </div>
                        <div className="header__center">
                            <ul className="header__menu">
                                <a
                                    className="header__menu-link"
                                    // href="#section-specialty"
                                    href="/home#section-specialty"
                                >
                                    <li className="menu-item">
                                        <FormattedMessage id="home-header.specialty" />
                                    </li>
                                </a>

                                <a
                                    className="header__menu-link"
                                    href="/home#section-medical-facility"
                                >
                                    <li className="menu-item">
                                        <FormattedMessage id="home-header.health-facility" />
                                    </li>
                                </a>
                                <a
                                    className="header__menu-link"
                                    href="/home#section-outstanding-doctor"
                                >
                                    <li className="menu-item">
                                        <FormattedMessage id="home-header.doctor" />
                                    </li>
                                </a>
                                <a
                                    className="header__menu-link"
                                    href="/home#section-handbook"
                                >
                                    <li className="menu-item">
                                        <FormattedMessage id="home-header.package" />
                                    </li>
                                </a>
                                <a
                                    className="header__menu-link"
                                    href="/home#section-about"
                                >
                                    <li className="menu-item">
                                        <FormattedMessage id="home-header.about" />
                                    </li>
                                </a>
                            </ul>
                        </div>
                        <div className="header__right">
                            <a className="header-support">
                                <span>
                                    <i className="fas fa-question-circle question-icon"></i>
                                </span>
                                <span>
                                    <FormattedMessage id="home-header.support" />
                                </span>
                            </a>
                            <ButtonDropdown
                                className="header-language"
                                isOpen={this.state.isLanguageDropdown}
                                toggle={this.toggleLanguageDropdown}
                            >
                                <DropdownToggle color="" caret size="md">
                                    {currentLanguage === LANGUAGES.VI
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
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
