import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";

import "./ManageDoctor.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import {
    fetchAllDoctorsStart,
    fetchRequiredDoctorInfoStart,
    saveInfoDoctorStart,
} from "../../../store/actions";
import { getInfoDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // basic info
            contentMarkdown: "",
            contentHTML: "",
            description: "",

            selectedDoctor: "",
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            specialtyId: "",
            selectedSpecialty: "",
            selectedClinic: "",

            listDoctors: [],
            listPrices: [],
            listPayments: [],
            listProvinces: [],
            listSpecialties: [],
            listClinics: [],

            nameClinic: "",
            addressClinic: "",
            note: "",
            clinicId: "",

            hasData: false,
        };
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getAllRequiredDoctorInfo();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listDoctors !== this.props.listDoctors) {
            const buildDoctors = this.buildDataInputSelect(
                this.props.listDoctors,
                "USERS"
            );
            this.setState({
                listDoctors: buildDoctors,
            });
        }

        if (
            prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo
        ) {
            const {
                resPrice,
                resPayment,
                resProvince,
                resSpecialty,
                resClinic,
            } = this.props.allRequiredDoctorInfo;
            const buildPrices = this.buildDataInputSelect(resPrice, "PRICE");
            const buildPayments = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            const buildProvinces = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            const buildSpecialties = this.buildDataInputSelect(
                resSpecialty,
                "SPECIALTY"
            );
            const buildClinics = this.buildDataInputSelect(resClinic, "CLINIC");

            this.setState({
                listPrices: buildPrices,
                listPayments: buildPayments,
                listProvinces: buildProvinces,
                listSpecialties: buildSpecialties,
                listClinics: buildClinics,
            });
        }

        if (prevProps.language !== this.props.language) {
            const buildDoctors = this.buildDataInputSelect(
                this.props.listDoctors,
                "USERS"
            );
            const { resPrice, resPayment, resProvince } =
                this.props.allRequiredDoctorInfo;
            const buildPrices = this.buildDataInputSelect(resPrice, "PRICE");
            const buildPayments = this.buildDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            const buildProvinces = this.buildDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            this.setState({
                listDoctors: buildDoctors,
                listPrices: buildPrices,
                listPayments: buildPayments,
                listProvinces: buildProvinces,
            });
        }
    }
    buildDataInputSelect = (inputData, type) => {
        const currentLanguage = this.props.language;

        if (inputData && inputData.length) {
            if (type === "USERS") {
                return inputData.map((item) => {
                    const labelVi = `${item.lastName} ${item.firstName}`;
                    const labelEn = `${item.firstName} ${item.lastName}`;
                    return {
                        value: item.id,
                        label:
                            currentLanguage === LANGUAGES.EN
                                ? labelEn
                                : labelVi,
                    };
                });
            }
            if (type === "PRICE") {
                return inputData.map((item) => {
                    const labelVi = `${item.valueVi} VND`;
                    const labelEn = `${item.valueEn} USD`;
                    return {
                        value: item.keyMap,
                        label:
                            currentLanguage === LANGUAGES.EN
                                ? labelEn
                                : labelVi,
                    };
                });
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                return inputData.map((item) => {
                    const labelVi = `${item.valueVi}`;
                    const labelEn = `${item.valueEn}`;
                    return {
                        value: item.keyMap,
                        label:
                            currentLanguage === LANGUAGES.EN
                                ? labelEn
                                : labelVi,
                    };
                });
            }
            if (type === "SPECIALTY") {
                return inputData.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
            }
            if (type === "CLINIC") {
                return inputData.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
            }
        }
        return [];
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveDoctorContent = () => {
        this.props.saveDoctorInfo({
            doctorId: this.state.selectedDoctor.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: this.state.hasData
                ? CRUD_ACTIONS.EDIT
                : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value,
        });

        //check is save success
        if (this.props.isSaveSuccess){
            this.setState({
                selectedDoctor: "",
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasData: false,
                selectedPrice: "",
                selectedPayment: "",
                selectedProvince: "",
                selectedSpecialty: "",
                selectedClinic: "",
                nameClinic: "",
                addressClinic: "",
                note: "",
            });
        }

    };

    handleSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        const {
            listPrices,
            listPayments,
            listProvinces,
            listSpecialties,
            listClinics,
        } = this.state;
        const doctorId = selectedDoctor.value;
        const response = await getInfoDoctorService(doctorId);
        if (
            response &&
            response.errCode === 0 &&
            response.data?.Markdown?.contentMarkdown &&
            response.data.Markdown.description
        ) {
            const markdown = response.data.Markdown;
            let priceId = "",
                paymentId = "",
                provinceId = "",
                nameClinic = "",
                specialtyId = "",
                clinicId = "",
                addressClinic = "",
                note = "",
                selectedPrice = "",
                selectedPayment = "",
                selectedProvince = "",
                selectedSpecialty = "",
                selectedClinic = "";
            if (response.data.Doctor_Info) {
                priceId = response.data.Doctor_Info.priceId;
                paymentId = response.data.Doctor_Info.paymentId;
                provinceId = response.data.Doctor_Info.provinceId;
                nameClinic = response.data.Doctor_Info.nameClinic;
                addressClinic = response.data.Doctor_Info.addressClinic;
                specialtyId = response.data.Doctor_Info.specialtyId;
                clinicId = response.data.Doctor_Info.clinicId;
                note = response.data.Doctor_Info.note;

                // find out the selected option before
                selectedPrice = listPrices.find(
                    (item) => item.value === priceId
                );
                selectedPayment = listPayments.find(
                    (item) => item.value === paymentId
                );
                selectedProvince = listProvinces.find(
                    (item) => item.value === provinceId
                );
                selectedSpecialty = listSpecialties.find(
                    (item) => item.value === specialtyId
                );
                selectedClinic = listClinics.find(
                    (item) => item.value === clinicId
                );
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasData: true,
                priceId,
                paymentId,
                provinceId,
                nameClinic,
                addressClinic,
                selectedPrice,
                selectedPayment,
                selectedProvince,
                selectedSpecialty,
                selectedClinic,
                note,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasData: false,
                selectedPrice: "",
                selectedPayment: "",
                selectedProvince: "",
                selectedSpecialty: "",
                selectedClinic: "",
                nameClinic: "",
                addressClinic: "",
                note: "",
            });
        }
        // console.log(`Option selected:`, selectedDoctor);
    };
    handleChangeSelectDoctorInfo = async (selectedOption, event) => {
        const name = event.name;
        this.setState({
            [name]: selectedOption,
        });
    };

    handleTextChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const hasData = this.state.hasData;
        const { language } = this.props;
        
        return (
            <div className="manage-doctor-container">
                <h1 className="title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </h1>
                <div className="basic-info row">
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleSelectDoctor}
                            options={this.state.listDoctors}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.description" />
                        </label>
                        <textarea
                            className="form-control"
                            value={this.state.description}
                            name="description"
                            placeholder={
                                language === LANGUAGES.VI
                                    ? "Nhập ..."
                                    : "Type ..."
                            }
                            onChange={this.handleTextChange}
                            cols="30"
                            rows="2 "
                        ></textarea>
                    </div>
                </div>

                <div className="more-info row">
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrices}
                            name="selectedPrice"
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayments}
                            name="selectedPayment"
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvinces}
                            name="selectedProvince"
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.name-clinic" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={
                                language === LANGUAGES.VI
                                    ? "Nhập ..."
                                    : "Type ..."
                            }
                            value={this.state.nameClinic}
                            name="nameClinic"
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.address-clinic" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={
                                language === LANGUAGES.VI
                                    ? "Nhập ..."
                                    : "Type ..."
                            }
                            value={this.state.addressClinic}
                            name="addressClinic"
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={
                                language === LANGUAGES.VI
                                    ? "Nhập ..."
                                    : "Type ..."
                            }
                            value={this.state.note}
                            name="note"
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialties}
                            name="selectedSpecialty"
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">Phòng khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinics}
                            name="selectedClinic"
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select" />
                            }
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <label htmlFor="">
                        <FormattedMessage id="admin.manage-doctor.detail" />
                    </label>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                        placeholder={
                            language === LANGUAGES.VI
                                ? "Nhập thông tin..."
                                : "Type something...."
                        }
                    />
                </div>
                <div className="row">
                    <div className="col-12 pt-3">
                        <button
                            className={hasData ? "update-btn" : "create-btn"}
                            onClick={this.handleSaveDoctorContent}
                        >
                            <FormattedMessage
                                id={
                                    hasData
                                        ? "manage-user.edit-button"
                                        : "manage-user.create-button"
                                }
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        listDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
        isSaveSuccess: state.admin.isSaveDoctorInfoSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(fetchAllDoctorsStart()),
        getAllRequiredDoctorInfo: () =>
            dispatch(fetchRequiredDoctorInfoStart()),
        saveDoctorInfo: (doctorInfo) =>
            dispatch(saveInfoDoctorStart(doctorInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
