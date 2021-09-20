import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postBookAppointmentService } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            genders: "",
            doctorId: "",
            selectedGender: "",
            timeType: "",
        };
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGenderData(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildGenderData(this.props.genders),
            });
        }
        if (this.props.dataScheduleTime !== prevProps.dataScheduleTime) {
            const doctorId =
                this.props.dataScheduleTime &&
                !_.isEmpty(this.props.dataScheduleTime)
                    ? this.props.dataScheduleTime.doctorId
                    : "";
            const timeType = this.props.dataScheduleTime.timeType;
            this.setState({
                doctorId,
                timeType,
            });
        }
    }

    buildGenderData = (data) => {
        const { language } = this.props;
        if (data && data.length > 0) {
            return data.map((item) => ({
                label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
                value: item.keyMap,
            }));
        }
        return [];
    };

    handleModalInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleDatePickerChange = (date) => {
        this.setState({
            birthDay: date[0],
        });
    };

    handleSelectChange = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    handleConfirmBooking = async () => {
        console.log("check confirm booking: ", this.state);
        // validate
        const birthDay = new Date(this.state.birthDay).getTime();
        const timeStringFormat = this.buildTimeBooking(
            this.props.dataScheduleTime,
            this.props.language
        );
        const doctorNameFormat = this.buildDoctorName(
            this.props.dataScheduleTime,
            this.props.language
        );
        const response = await postBookAppointmentService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTime.date,
            birthDay: birthDay,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeStringFormat,
            doctorName: doctorNameFormat,
        });
        if (response && response.errCode === 0) {
            toast.success("Đặt lịch khám thành công!");
            this.props.closeModal();
            this.setState({
                fullName: "",
                phoneNumber: "",
                email: "",
                address: "",
                reason: "",
                date: "",
                birthDay: "",
                selectedGender: "",
            });
        } else {
            toast.error("Đặt lịch khám thất bại!");
        }
    };

    capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1);
    buildTimeBooking = (dataScheduleTime, language) => {
        /**
         * copy from ProfileDoctor.js/ renderTimeBooking
         * format time before send email
         */
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
            return `${time}${", "}${date}`;
        }
        return "";
    };

    buildDoctorName = (dataScheduleTime, language) => {
        if (dataScheduleTime && !_.isEmpty(dataScheduleTime)) {
            const doctorData = dataScheduleTime.doctorData;
            const nameVi = `${doctorData.lastName} ${doctorData.firstName}`;
            const nameEn = `${doctorData.firstName} ${doctorData.lastName}`;
            return language === LANGUAGES.VI ? nameVi : nameEn;
        }
        return "";
    };

    render() {
        const { isOpen, toggle, closeModal, dataScheduleTime, language } =
            this.props;
        // console.log("check dataScheduleTime: ", dataScheduleTime);
        const doctorId =
            dataScheduleTime && !_.isEmpty(dataScheduleTime)
                ? dataScheduleTime.doctorId
                : "";
        return (
            <Modal
                className="booking-modal-container"
                isOpen={isOpen}
                toggle={toggle}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    {/* Header modal */}
                    <div className="booking-modal-header">
                        <span className="header-title">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="header-close" onClick={closeModal}>
                            <i className="far fa-times-circle"></i>
                        </span>
                    </div>
                    
                    {/* Header body */}
                    <div className="booking-modal-body">
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                isShowPrice={true}
                                dataScheduleTime={dataScheduleTime}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.full-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.fullName}
                                    name="fullName"
                                    onChange={this.handleModalInputChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    name="phoneNumber"
                                    onChange={this.handleModalInputChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleModalInputChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.address}
                                    name="address"
                                    onChange={this.handleModalInputChange}
                                />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.reason}
                                    name="reason"
                                    onChange={this.handleModalInputChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    value={this.state.birthDay}
                                    name="birthDay"
                                    onChange={this.handleDatePickerChange}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="">
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    name="gender"
                                    value={this.state.selectedGender}
                                    onChange={this.handleSelectChange}
                                    options={this.state.genders}
                                    placeholder={
                                        <FormattedMessage id="patient.booking-modal.select" />
                                    }
                                ></Select>
                            </div>
                        </div>
                    </div>
                    {/*  Footer modal */}
                    <div className="booking-modal-footer">
                        <button
                            className="btn-booking-confirm"
                            onClick={this.handleConfirmBooking}
                        >
                            <FormattedMessage id="patient.booking-modal.booking-btn" />
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={closeModal}
                        >
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
