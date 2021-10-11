import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
    dentistryOption,
    testOption,
    spiritOption,
    specialtyOption,
    remoteOption,
    generalOption,
} from "../../assets/images/index";
import "./Banner.scss";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <div className="banner-body">
                        <div className="banner-title">
                            <FormattedMessage id="banner.medical-platform" />

                            <p>
                                <FormattedMessage id="banner.slogan" />
                            </p>
                        </div>
                        {/* <div className="banner-search">
                                <div className="input-search">
                                    <i className="fas fa-search search-icon"></i>

                                    <input
                                        type="text"
                                        placeholder="Tìm phòng khám ..."
                                    />
                                </div>
                            </div> */}

                        <div className="banner__button">
                            <a
                                href="/home#section-specialty"
                                className="explore-btn"
                            >
                                <FormattedMessage id="banner.explore" />
                            </a>
                            <a href="#" className="install-btn">
                                <FormattedMessage id="banner.install" />
                            </a>
                        </div>

                        {/* <div className="banner-download-media">
                            <div className="google-play"></div>
                            <div className="app-store"></div>
                        </div> */}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
