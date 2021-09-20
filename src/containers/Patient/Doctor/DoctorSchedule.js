import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment, { locale } from "moment";
import { LANGUAGES } from "../../../utils";
import { getScheduleByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenBookingModal: false,
            dataScheduleTimeModal: {}
        };
    }

    async componentDidMount() {
        const { language } = this.props;
        const dayArr = this.getDayArrByLanguage(language);
        if (this.props.doctorId){
            const response = await getScheduleByDateService(
                this.props.doctorId,
                dayArr[0].value
            );
            this.setState({
                allAvailableTime: response.data ? response.data : [],
            });
        }
        if (dayArr && dayArr.length > 0) {
            this.setState({
                allDays: dayArr,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            const dayArr = this.getDayArrByLanguage(this.props.language);
            this.setState({
                allDays: dayArr,
            });
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            const dayArr = this.getDayArrByLanguage(this.props.language);
            const response = await getScheduleByDateService(
                this.props.doctorId,
                dayArr[0].value
            );
            this.setState({
                allAvailableTime: response.data ? response.data : [],
            });
        }
    }

    getDayArrByLanguage = (language) => {
        const dayArr = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    const ddMM = moment(new Date()).format("DD/MM");
                    const today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = this.capitalizeFirstLetter(
                        moment(new Date()).add(i, "days").locale("vn").format("dddd - DD/MM")
                    );
                }
            } else {
                if (i === 0) {
                    const ddMM = moment(new Date()).format("DD/MM");
                    const today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }
            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("days")
                .valueOf();
            dayArr.push(obj);
        }

        return dayArr;
    };

    capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);

    handleSelectChange = async (event) => {
        const doctorId = this.props.doctorId;
        if (doctorId && doctorId !== -1) {
            const date = event.target.value;
            const response = await getScheduleByDateService(doctorId, date);
            console.log("CHECK RESPONSE SCHEDULE: ", response);
            if (response && response.errCode === 0) {
                this.setState({
                    allAvailableTime: response.data,
                });
            }
        }
    };

    handleClickScheduleTime = (timeData) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: timeData
        });
    };
    handleCloseBookingModal = () => {
        this.setState({
            isOpenBookingModal: false,
        });
    };
    toggleBookingModal = () => {
        this.setState({
            isOpenBookingModal: !this.state.isOpenBookingModal,
        });
    }
    

    render() {
        const { allDays, allAvailableTime, isOpenBookingModal, dataScheduleTimeModal} = this.state;
        const { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={this.handleSelectChange}>
                            {allDays &&
                                allDays.length &&
                                allDays.map((item) => {
                                    return (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="calendar">
                            <span>
                                <i className="far fa-calendar-alt icon-calendar"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ? (
                                <>
                                    <div className="head-content">
                                        {allAvailableTime.map((item) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={item.id}
                                                    className={
                                                        language ===
                                                        LANGUAGES.VI
                                                            ? "btn-vi"
                                                            : "btn-en"
                                                    }
                                                    onClick={() =>
                                                        this.handleClickScheduleTime(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="bottom-content">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.select-and-book" />
                                            <i className="far fa-hand-point-up hand-pointer-icon"></i>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="no-schedule">
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpen={isOpenBookingModal}
                    toggle={this.toggleBookingModal}
                    closeModal={this.handleCloseBookingModal}
                    dataScheduleTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
