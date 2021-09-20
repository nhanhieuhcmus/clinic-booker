import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { getInfoDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import LikeShare from "../../System/SocialPlugin/LikeShare";
import Comment from "../../System/SocialPlugin/Comment";
import { FormattedMessage } from "react-intl";

require("dotenv").config();

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }

    async componentDidMount() {
        if (this.props.match?.params?.id) {
            const id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id,
            });
            const response = await getInfoDoctorService(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailDoctor: response.data,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {}

    render() {
        // console.log(this.props.match.params.id);
        const detailDoctor = this.state.detailDoctor;
        const currentLanguage = this.props.language;
        const currentURL =
            +process.env.REACT_APP_IS_LOCALHOST === 1
                ? "herokuapp"
                : window.location.href;
        let fullName, position;
        if (!detailDoctor.positionData) {
            fullName = "";
            position = "";
        } else {
            fullName =
                currentLanguage === LANGUAGES.VI
                    ? `${detailDoctor.lastName} ${detailDoctor.firstName}`
                    : `${detailDoctor.firstName} ${detailDoctor.lastName}`;
            position =
                currentLanguage === LANGUAGES.VI
                    ? detailDoctor.positionData.valueVi
                    : detailDoctor.positionData.valueEn;
        }
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="doctor-detail-content">
                        <div className="doctor-intro">
                            <div className="doctor-info__left">
                                <div
                                    className="avatar"
                                    style={{
                                        backgroundImage: `url(${
                                            detailDoctor.image
                                                ? detailDoctor.image
                                                : ""
                                        })`,
                                    }}
                                ></div>
                            </div>
                            <div className="doctor-info__right">
                                <div className="doctor-name">
                                    {position} - {fullName}
                                </div>
                                <div className="doctor-description">
                                    {detailDoctor.Markdown?.contentHTML &&
                                        detailDoctor.Markdown.description}
                                </div>
                                <div className="doctor-like-share">
                                    <LikeShare
                                    // dataHref={currentURL}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="doctor-schedule">
                            <div className="content-left">
                                <DoctorSchedule
                                    doctorId={this.state.currentDoctorId}
                                />
                            </div>
                            <div className="content-right">
                                <DoctorExtraInfo
                                    doctorId={this.state.currentDoctorId}
                                />
                            </div>
                        </div>

                        <div className="doctor-detail">
                            <h3>
                                <FormattedMessage id="patient.detail-doctor.doctor-info" />
                            </h3>
                            {detailDoctor.Markdown?.contentHTML && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailDoctor.Markdown
                                            .contentHTML,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="doctor-comment">
                            <Comment dataHref={currentURL} width="100%" />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
