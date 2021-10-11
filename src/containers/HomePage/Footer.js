import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
import { FormattedMessage } from "react-intl";

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-col1">
                        <div
                            className="col1__brand"
                            onClick={this.returnToHome}
                        >
                            <span className="header__brand-logo">
                                <i className="fab fa-cuttlefish"></i>
                            </span>
                            <span className="header__brand-name">
                                linicBooker
                            </span>
                        </div>
                        <div className="col1-title">
                            <FormattedMessage id="footer.corp" />
                        </div>
                        <p>
                            <FormattedMessage id="footer.no" />
                        </p>
                    </div>
                    <div className="footer-col2">
                        <ul className="col2-related-link">
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.collaborate" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.faq" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.term" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.privacy-policy" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.resolve-procedure" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <FormattedMessage id="footer.regulation" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col3">
                        <div className="office">
                            <div className="office-title">
                                <FormattedMessage id="footer.headquarters" />
                            </div>
                            <div className="office-address">
                                <FormattedMessage id="footer.headquarters-address" />
                            </div>
                        </div>
                        <div className="office">
                            <div className="office-title">
                                <FormattedMessage id="footer.office" />
                            </div>
                            <div className="office-address">
                                <FormattedMessage id="footer.office-address" />
                            </div>
                        </div>
                        <div className="support">
                            <div className="support-title">
                                <FormattedMessage id="footer.support" />
                            </div>
                            support@clinicbooker.vn (
                            <FormattedMessage id="footer.support-time" />)
                        </div>
                    </div>
                </div>
                <hr />
                <div className="footer-copyright">© 2021 ClinicBooker.</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
