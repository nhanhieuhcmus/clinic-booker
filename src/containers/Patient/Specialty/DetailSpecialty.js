import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
    getDetailSpecialtyByIdService,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorIdArr: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectedProvince: "",
        };
    }

    async componentDidMount() {
        if (this.props.match?.params?.id) {
            const id = this.props.match.params.id;

            const resSpecialty = await getDetailSpecialtyByIdService({
                id: id,
                location: "all",
            });
            const resProvince = await getAllCodeService("PROVINCE");
            if (
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                // extract all doctorId from resSpecialty, save into state
                let doctorIdArr = [];
                const data = resSpecialty.data;
                if (data && !_.isEmpty(data)) {
                    const doctorSpecialty = data.doctorSpecialty;
                    doctorIdArr =
                        doctorSpecialty &&
                        doctorSpecialty.length > 0 &&
                        doctorSpecialty.map((item) => item.doctorId);
                }

                // insert all province option for list
                const dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length) {
                    dataProvince.unshift({
                        id: "all",
                        keyMap: "all",
                        type: "PROVINCE",
                        valueVi: "Toàn quốc",
                        valueEn: "All provinces",
                    });
                }

                this.setState({
                    dataDetailSpecialty: resSpecialty.data,
                    doctorIdArr: doctorIdArr,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }

    handleSelectProvince = async (event) => {
        if (this.props.match?.params?.id) {
            const id = this.props.match.params.id;
            const location = event.target.value;

            const resSpecialty = await getDetailSpecialtyByIdService({
                id: id,
                location: location,
            });
            if (resSpecialty && resSpecialty.errCode === 0) {
                // extract all doctorId from resSpecialty, save into state
                let doctorIdArr = [];
                const data = resSpecialty.data;
                if (data && !_.isEmpty(data)) {
                    const doctorSpecialty = data.doctorSpecialty;
                    doctorIdArr =
                        doctorSpecialty &&
                        doctorSpecialty.length > 0 &&
                        doctorSpecialty.map((item) => item.doctorId);
                }

                this.setState({
                    dataDetailSpecialty: resSpecialty.data,
                    doctorIdArr: doctorIdArr,
                    selectedProvince: location,
                });
            }
        }
    };

    render() {
        const {
            doctorIdArr,
            dataDetailSpecialty,
            listProvince,
            selectedProvince,
        } = this.state;
        const { language } = this.props;
        console.log("check state specialty: ", this.state);
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="detail-specialty-content">
                        <div className="specialty-description">
                            <div className="description-title">
                                {dataDetailSpecialty.name}
                            </div>
                            {dataDetailSpecialty &&
                                !_.isEmpty(dataDetailSpecialty) && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: dataDetailSpecialty.descriptionHTML,
                                        }}
                                    ></div>
                                )}
                        </div>
                        <div className="filter-specialty-doctor">
                            <select
                                onChange={this.handleSelectProvince}
                                value={selectedProvince}
                            >
                                {listProvince &&
                                    listProvince.length > 0 &&
                                    listProvince.map((item, index) => (
                                        <option
                                            key={item.id}
                                            value={item.keyMap}
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {doctorIdArr &&
                            doctorIdArr.length>0 &&
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
