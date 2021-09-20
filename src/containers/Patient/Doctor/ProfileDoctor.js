import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        const data = await this.getProfileDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getProfileDoctor = async (doctorId) => {
        if (doctorId) {
            const response = await getProfileDoctorByIdService(doctorId);
            if (response && response.errCode === 0) return response.data;
        }
        return {};
    };
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorId !== this.props.doctorId) {
            const data = await this.getProfileDoctor(this.props.doctorId);
            // this.setState({
            //     dataProfile: data,
            // });
        }
    }

    capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);

    renderTimeBooking = (dataScheduleTime, language) => {
        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            const time =
                language === LANGUAGES.VI
                    ? dataScheduleTime.timeTypeData.valueVi
                    : dataScheduleTime.timeTypeData.valueEn;
            const date =
                language === LANGUAGES.VI
                    ? this.capitalizeFirstLetter(
                          moment
                              .unix(+dataScheduleTime.date / 1000)
                              .format("dddd - DD/MM/YYYY")
                      )
                    : moment
                          .unix(dataScheduleTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        <span>
                            {time}
                            {", "}
                            {date}
                        </span>
                    </div>
                    <div>
                        <FormattedMessage id="patient.profile-doctor.free-booking" />
                    </div>
                </>
            );
        }
        return <></>;
    };

    renderDoctorDescription = (dataProfile) => {
        if (dataProfile?.Markdown) {
            return <>{dataProfile.Markdown.description}</>;
        }
        return "";
    };

    renderPriceBooking = (dataProfile, language) => {
        return (
            <span>
                {dataProfile?.Doctor_Info?.priceTypeData &&
                language === LANGUAGES.VI
                    ? (+dataProfile.Doctor_Info.priceTypeData
                          .valueVi).toLocaleString(LANGUAGES.VI, {
                          style: "currency",
                          currency: "VND",
                          minimumFractionDigits: 0,
                      })
                    : ""}
                {dataProfile?.Doctor_Info?.priceTypeData &&
                language === LANGUAGES.EN
                    ? (+dataProfile.Doctor_Info.priceTypeData
                          .valueEn).toLocaleString(LANGUAGES.EN, {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                      })
                    : ""}
            </span>
        );
    };

    render() {
        const { dataProfile } = this.state;
        const {
            language,
            isShowDescription,
            dataScheduleTime,
            isShowDetail,
            isShowPrice,
            doctorId,
        } = this.props;
        // console.log("check state data profile: ", this.state);
        let fullName, position;
        if (!dataProfile.positionData) {
            fullName = "";
            position = "";
        } else {
            fullName =
                language === LANGUAGES.VI
                    ? `${dataProfile.lastName} ${dataProfile.firstName}`
                    : `${dataProfile.firstName} ${dataProfile.lastName}`;
            position =
                language === LANGUAGES.VI
                    ? dataProfile.positionData.valueVi
                    : dataProfile.positionData.valueEn;
        }
        return (
            <div className="profile-doctor-container">
                <div className="profile-doctor-intro">
                    <div className="profile-doctor__content-left">
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url(${
                                    dataProfile.image ? dataProfile.image : ""
                                })`,
                            }}
                        ></div>
                    </div>
                    <div className="profile-doctor__content-right">
                        <div className="name">
                            {position} - {fullName}
                        </div>
                        <div className="introduction">
                            {isShowDescription
                                ? this.renderDoctorDescription(
                                      dataProfile,
                                      language
                                  )
                                : this.renderTimeBooking(
                                      dataScheduleTime,
                                      language
                                  )}
                        </div>
                    </div>
                </div>
                {isShowDetail && (
                    <span className="profile-doctor--show-detail">
                        {/* Method 1: Use href but cause page reload */}
                        {/* <a href={`/detail-doctor/${doctorId}`}>Xem thêm</a> */}

                        {/* Method 2: Use Link from react-router-dom */}
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </span>
                )}
                <div>
                    {isShowPrice && (
                        <span className="profile-doctor__price">
                            <span>
                                <span>
                                    <FormattedMessage id="patient.profile-doctor.price" />
                                </span>
                                {": "}
                                <span className="profile-doctor__price--price">
                                    <>
                                        {this.renderPriceBooking(
                                            dataProfile,
                                            language
                                        )}
                                    </>
                                </span>
                            </span>
                        </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
