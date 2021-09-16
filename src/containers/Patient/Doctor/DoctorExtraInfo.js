import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";

import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorByIdService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            const response = await getExtraInfoDoctorByIdService(
                this.props.doctorId
            );
            if (response && response.errCode === 0) {
                this.setState({
                    extraInfo: response.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            const response = await getExtraInfoDoctorByIdService(
                this.props.doctorId
            );
            if (response && response.errCode === 0) {
                this.setState({
                    extraInfo: response.data,
                });
            }
        }
    }

    toggleShowHideDetailInfo = () => {
        this.setState({
            isShow: !this.state.isShow,
        });
    };

    renderPrice = (extraInfo, language) => {
        return (
            <>
                {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.VI
                    ? Number(extraInfo.priceTypeData.valueVi).toLocaleString(
                          LANGUAGES.VI,
                          {
                              style: "currency",
                              currency: "VND",
                              minimumFractionDigits: 0,
                          }
                      )
                    : ""}
                {extraInfo &&
                extraInfo.priceTypeData &&
                language === LANGUAGES.EN
                    ? Number(extraInfo.priceTypeData.valueEn).toLocaleString(
                          LANGUAGES.EN,
                          {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                          }
                      )
                    : ""}
            </>
        );
    };

    render() {
        const { isShow, extraInfo } = this.state;
        const { language } = this.props;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="content-up-title">
                        <FormattedMessage
                            id={"patient.extra-info.title-address"}
                        />
                    </div>
                    <div className="hospital">
                        {extraInfo && extraInfo.nameClinic
                            ? extraInfo.nameClinic
                            : ""}
                    </div>
                    <div className="address">
                        {extraInfo && extraInfo.addressClinic
                            ? extraInfo.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    <div className="content-down-basic">
                        <span className="title-price">
                            <FormattedMessage
                                id={"patient.extra-info.title-price"}
                            />
                        </span>
                        {!isShow && (
                            <>
                                <span className="price">
                                    {this.renderPrice(extraInfo, language)}
                                </span>
                                {". "}
                                <span
                                    className="view-detail"
                                    onClick={this.toggleShowHideDetailInfo}
                                >
                                    <FormattedMessage
                                        id={"patient.extra-info.view-detail"}
                                    />
                                </span>
                            </>
                        )}
                    </div>
                    {isShow && (
                        <div className="content-down-additional">
                            <div className="additional-content">
                                <div className="content-note">
                                    <div className="content-left">
                                        <span>
                                            <FormattedMessage
                                                id={
                                                    "patient.extra-info.title-price"
                                                }
                                            />
                                        </span>
                                        <p className="note">
                                            {extraInfo && extraInfo.note
                                                ? extraInfo.note
                                                : ""}
                                        </p>
                                    </div>
                                    <span className="content-right">
                                        {this.renderPrice(extraInfo, language)}
                                    </span>
                                </div>
                                <div className="content-payment">
                                    <span>
                                        <FormattedMessage
                                            id={
                                                "patient.extra-info.title-payment"
                                            }
                                        />
                                        {extraInfo &&
                                        extraInfo.paymentTypeData &&
                                        language === LANGUAGES.VI
                                            ? extraInfo.paymentTypeData.valueVi
                                            : ""}
                                        {extraInfo &&
                                        extraInfo.paymentTypeData &&
                                        language === LANGUAGES.EN
                                            ? extraInfo.paymentTypeData.valueEn
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <span
                                className="view-detail"
                                onClick={this.toggleShowHideDetailInfo}
                            >
                                <FormattedMessage
                                    id={"patient.extra-info.hide-detail"}
                                />
                            </span>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
