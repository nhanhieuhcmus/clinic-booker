import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./OutstandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctorsArr: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctorsArr: this.props.topDoctors,
            });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        console.log("check info doctor: ", doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let { topDoctorsArr } = this.state;
        const currentLanguage = this.props.language;
        console.log("check topDoctorsArr: ", topDoctorsArr);

        return (
            <div
                className="general-section section-outstanding-doctor"
                id="section-outstanding-doctor"
            >
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="section-view-more-button">
                            <FormattedMessage id="homepage.view-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {topDoctorsArr &&
                                topDoctorsArr.length > 0 &&
                                topDoctorsArr.map((doctor, index) => {
                                    const nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                                    const nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                                    let imageBase64 = "";
                                    if (doctor.image) {
                                        imageBase64 = Buffer.from(
                                            doctor.image,
                                            "base64"
                                        ).toString("binary");
                                    }
                                    return (
                                        <div
                                            className="item"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    doctor
                                                )
                                            }
                                        >
                                            <div className="item-border">
                                                <div className="contain-zoom-bg-image__doctor">
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-image__doctor"
                                                            style={{
                                                                backgroundImage: `url(${imageBase64})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="item-title">
                                                    {currentLanguage ===
                                                    LANGUAGES.VI
                                                        ? nameVi
                                                        : nameEn}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctorsStart()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
