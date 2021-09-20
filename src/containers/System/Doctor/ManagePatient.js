import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
    getAllPatientByDateService,
    sendPrescriptionService,
} from "../../../services/userService";
import moment from "moment";
import PrescriptionModal from "./PrescriptionModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("days").valueOf(),
            dataPatient: [],
            isOpenPrescriptionModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        const { user } = this.props;
        const { currentDate } = this.state;
        const formattedDate = new Date(currentDate).getTime().toString();

        const response = await getAllPatientByDateService({
            doctorId: user.id,
            date: formattedDate,
        });
        if (response && response.errCode === 0) {
            this.setState({
                dataPatient: response.data,
            });
        }
    };

    handleDatePickerChange = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };

    componentDidUpdate(prevProps, prevState) {}

    handleClickConfirm = (item) => {
        console.log("check item>>>>", item);
        const data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientTypeData.email,
            timeType: item.timeType,
            patientName: item.patientTypeData.firstName,
        };
        this.setState({
            isOpenPrescriptionModal: true,
            dataModal: data,
        });
    };

    toggleModal = () => {
        this.setState({
            isOpenPrescriptionModal: !this.state.isOpenPrescriptionModal,
            dataModal: {},
        });
    };

    sendPrescription = async (dataFromModal) => {
        this.setState({
            isShowLoading: true,
        });
        const { dataModal } = this.state;
        const response = await sendPrescriptionService({
            ...dataFromModal,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
        });
        if (response && response.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Gửi hoá đơn thành công!");
            this.getDataPatient(); // update patient list view
            this.toggleModal();
        } else {
            this.setState({
                isShowLoading: true,
            });
            toast.error("Gửi hoá đơn thất bại!");
        }
    };

    render() {
        const { dataPatient, isOpenPrescriptionModal, dataModal } = this.state;
        console.log("check dataModal: ", dataModal);
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Vui lòng đợi ..."
                >
                    <div className="manage-patient-container">
                        <h1 className="title">QUẢN LÝ BỆNH NHÂN</h1>
                        <div className="manage-patient__body row">
                            <div className="col-4 form-group">
                                <label htmlFor="">Chọn ngày</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleDatePickerChange}
                                    value={this.state.currentDate}
                                    // className="form-control"
                                    // minDate={yesterday}
                                />
                            </div>

                            <table
                                id="customers"
                                className="user-manage__table col-12"
                            >
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>
                                            Thời gian
                                        </th>
                                        <th>
                                            Họ tên
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-user.table.address" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-user.table.action" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {
                                                        item.timeTypeDataPatient
                                                            .valueVi
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.patientTypeData
                                                            .firstName
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.patientTypeData
                                                            .address
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-confirm"
                                                        onClick={() =>
                                                            this.handleClickConfirm(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Hoàn tất {" "}
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="no-data">
                                                Chưa có bệnh nhân
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <PrescriptionModal
                                isOpen={isOpenPrescriptionModal}
                                toggle={this.toggleModal}
                                dataModal={dataModal}
                                sendPrescription={this.sendPrescription}
                            />
                        </div>
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
