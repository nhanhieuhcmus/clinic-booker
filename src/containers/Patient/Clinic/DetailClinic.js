import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getDetailClinicByIdService,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorIdArr: [],
            dataDetailClinic: {},
        };
    }

    async componentDidMount() {
        if (this.props.match?.params?.id) {
            const id = this.props.match.params.id;

            const resClinic = await getDetailClinicByIdService(id);
            if (resClinic && resClinic.errCode === 0) {
                // extract all doctorId from resClinic, save into state
                let doctorIdArr = [];
                const data = resClinic.data;
                if (data && !_.isEmpty(data)) {
                    const doctorClinic = data.doctorClinic;
                    doctorIdArr =
                        doctorClinic &&
                        doctorClinic.length > 0 &&
                        doctorClinic.map((item) => item.doctorId);
                }

                this.setState({
                    dataDetailClinic: resClinic.data,
                    doctorIdArr: doctorIdArr,
                });
            }
        }
    }

    render() {
        const { doctorIdArr, dataDetailClinic } = this.state;
        const { language } = this.props;
        console.log("check state clinic: ", this.state);
        return (
            <>
                <HomeHeader />
                <div className="detail-clinic-container">
                    <div className="detail-clinic-content">
                        <div className="clinic-description">
                            <div className="description-title">
                                {dataDetailClinic.name}
                            </div>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailClinic.descriptionHTML,
                                    }}
                                ></div>
                            )}
                        </div>

                        {doctorIdArr &&
                            doctorIdArr.length > 0 &&
                            doctorIdArr.map((item) => (
                                <div className="doctor-info-item" key={item}>
                                    <div className="doctor-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="doctor-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorId={item} />
                                        </div>
                                        <div className="doctor-extra-info">
                                            <DoctorExtraInfo doctorId={item} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
