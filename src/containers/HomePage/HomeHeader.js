import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import {
    dentistryOption,
    testOption,
    spiritOption,
    specialtyOption,
    remoteOption,
    generalOption,
} from "../../assets/images/index";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
    handleSelectLanguage = (event) => {
        // fire Redux event: actions
        this.props.changeLanguageAppRedux(event.target.value);
    };

    render() {
        const currentLanguage = this.props.language;
        console.log("check language: ", currentLanguage);
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-header">
                            <i class="fas fa-bars header-option-icon"></i>
                            <div className="header-logo"></div>
                            <ul className="header-menu">
                                <li className="menu-item">
                                    <a href="">
                                        <FormattedMessage id="home-header.specialty" />
                                        <p>
                                            <FormattedMessage id="home-header.search-doctor" />
                                        </p>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="">
                                        <FormattedMessage id="home-header.health-facility" />
                                        <p>
                                            <FormattedMessage id="home-header.select-room" />
                                        </p>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="">
                                        <FormattedMessage id="home-header.doctor" />

                                        <p>
                                            <FormattedMessage id="home-header.select-good-doctor" />
                                        </p>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="">
                                        <FormattedMessage id="home-header.fee" />
                                        <p>
                                            <FormattedMessage id="home-header.check-health" />
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="right-header">
                            <a className="header-support">
                                <i className="fas fa-question-circle question-icon"></i>
                                <FormattedMessage id="home-header.support" />
                            </a>
                            <select
                                className="select-language"
                                onChange={this.handleSelectLanguage}
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
                        </div>
                    </div>
                </div>

                <div className="banner">
                    <div className="banner-body">
                        <div className="banner-title">
                            Nền tảng y tế
                            <p>Chăm sóc sức khoẻ toàn diện</p>
                        </div>
                        <div className="banner-search">
                            <div className="input-search">
                                <i class="fas fa-search search-icon"></i>

                                <input
                                    type="text"
                                    placeholder="Tìm phòng khám ..."
                                />
                            </div>
                        </div>
                        <div className="banner-download-media">
                            <div className="google-play"></div>
                            <div className="app-store"></div>
                        </div>
                    </div>
                    <div className="banner-footer">
                        <div className="banner-option">
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={specialtyOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.specialty-test" />
                                </div>
                            </div>
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={remoteOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.remote-test" />
                                </div>
                            </div>
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={generalOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.general-test" />
                                </div>
                            </div>
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={testOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.medicine-test" />
                                </div>
                            </div>
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={spiritOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.spirit-health" />
                                </div>
                            </div>
                            <div className="option-item">
                                <div className="option-image">
                                    <img src={dentistryOption} alt="" />
                                </div>
                                <div className="option-title">
                                    <FormattedMessage id="banner.dentistry-test" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
