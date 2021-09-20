import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, dateFormat, LANGUAGES } from "../../../utils/constant";
import {
    fetchAllDoctorsStart,
    fetchAllScheduleTimeStart,
} from "../../../store/actions";

import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { bulkCreateScheduleService } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            currentDate: "",
            allDoctors: [],
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getAllScheduleTime();
    }
    buildDataInputSelect = (doctorArr) => {
        const currentLanguage = this.props.language;

        if (doctorArr && doctorArr.length) {
            return doctorArr.map((item) => ({
                value: item.id,
                label:
                    currentLanguage == LANGUAGES.EN
                        ? `${item.firstName} ${item.lastName}`
                        : `${item.lastName} ${item.firstName}`,
            }));
        }
        return [];
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            const selectDoctors = this.buildDataInputSelect(
                this.props.allDoctors
            );
            this.setState({
                allDoctors: selectDoctors,
            });
        }
        if (prevProps.allTimes !== this.props.allTimes) {
            if (this.props.allTimes && this.props.allTimes.length) {
                const modifiedTimeArr = this.props.allTimes.map((item) => ({
                    ...item,
                    isSelected: false,
                }));
                this.setState({
                    rangeTime: modifiedTimeArr,
                });
            }
        }
        // if (prevProps.language !== this.props.language) {
        //     const selectDoctors = this.buildDataInputSelect(
        //         this.props.allDoctors
        //     );
        //     this.setState({
        //         allDoctors: selectDoctors,
        //     });
        // }
        // if (prevState !=this.state){
        //     console.log("Khac");
        // }
    }

    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleDatePickerChange = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleClickRangeTime = (clickedItem) => {
        const { rangeTime } = this.state;
        if (rangeTime && rangeTime.length) {
            const modifiedArr = rangeTime.map((item) => {
                if (item.id === clickedItem.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            this.setState({
                rangeTime: modifiedArr,
            });
        }
        console.log("check status selected: ", rangeTime);
    };

    handleClickSave = async () => {
        const { selectedDoctor, rangeTime, currentDate } = this.state;
        let resultObj = {};
        // validate
        if (_.isEmpty(selectedDoctor)) {
            toast.error("Selected doctor is required!");
            return;
        }
        if (!currentDate) {
            toast.error("Selected date is required!");
            return;
        }

        const formattedDate = new Date(currentDate).getTime().toString();

        if (rangeTime && rangeTime.length) {
            const selectedRangeTime = rangeTime.filter(
                (time) => time.isSelected
            );
            if (selectedRangeTime && selectedRangeTime.length) {
                // build final obj to send to server
                resultObj = selectedRangeTime.map((time) => ({
                    doctorId: selectedDoctor.value,
                    date: formattedDate,
                    timeType: time.keyMap,
                }));
                console.log("check final obj: ", resultObj);
            } else {
                toast.error("Range time is required!");
                return;
            }
        }
        const response = await bulkCreateScheduleService({
            scheduleArr: resultObj,
            doctorId: selectedDoctor.value,
            date: formattedDate,
        });
        console.log("check response from react: ", response);
        if (response && response.errCode === 0) {
            toast.success("Save schedule successfully!");
        } else {
            toast.error("Save schedule failed!");
        }
    };

    render() {
        console.log("check state from ManageSchedule: ", this.state);
        const { rangeTime } = this.state;
        const { language } = this.props;
        const yesterday = new Date(
            new Date().setDate(new Date().getDate() - 1)
        );
        return (
            <div className="manage-schedule-container">
                <h1 className="title">
                    <FormattedMessage id="manage-schedule.title" />
                </h1>
                <div className="schedule-body">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleSelectDoctor}
                                options={this.state.allDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleDatePickerChange}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pick-hour-container">
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item) => (
                                    <button
                                        className={`btn btn-schedule ${
                                            item.isSelected ? "active" : ""
                                        }`}
                                        key={item.id}
                                        onClick={() =>
                                            this.handleClickRangeTime(item)
                                        }
                                    >
                                        {language === LANGUAGES.VI
                                            ? item.valueVi
                                            : item.valueEn}
                                    </button>
                                ))}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 pt-3">
                            <button
                                className="create-btn"
                                onClick={this.handleClickSave}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allTimes: state.admin.allTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(fetchAllDoctorsStart()),
        getAllScheduleTime: () => dispatch(fetchAllScheduleTimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
