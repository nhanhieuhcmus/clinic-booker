import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
    createNewClinicService,
    getAllClinicsService,
    editClinicService,
    deleteClinicService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            address: "",
            descMarkdown: "",
            descHTML: "",
            allClinics: [],
            action: "", // C,R,U,D
            editId: "",
            previewImgURL: "",
            isOpen: false,
        };
    }

    componentDidMount() {
        this.getAllClinics();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.allClinics !== this.state.allClinics) {
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                name: "",
                imageBase64: "",
                address: "",
                descMarkdown: "",
                descHTML: "",
                previewImgURL: "",
            });
        }
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descMarkdown: text,
            descHTML: html,
        });
    };

    handleUploadImage = async (event) => {
        const data = event.target.files;
        const uploadImg = data[0];
        if (uploadImg) {
            // convert img into base64
            const base64 = await CommonUtils.getBase64(uploadImg);
            const objectURL = URL.createObjectURL(uploadImg);

            this.setState({
                previewImgURL: objectURL,
                imageBase64: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (this.state.previewImgURL) {
            this.setState({
                isOpen: true,
            });
        }
    };
    handleSaveClinic = async () => {
        const { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            const response = await createNewClinicService({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                address: this.state.address,
                descriptionMarkdown: this.state.descMarkdown,
                descriptionHTML: this.state.descHTML,
            });
            if (response && response.errCode === 0) {
                toast.success("Create new clinic successfully!");
                this.getAllClinics();
            } else {
                toast.error("Create clinic failed!");
            }
        } else {
            // EDIT CASE
            const response = await editClinicService({
                id: this.state.editId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                address: this.state.address,
                descriptionMarkdown: this.state.descMarkdown,
                descriptionHTML: this.state.descHTML,
            });
            if (response && response.errCode === 0) {
                toast.success("Update new clinic successfully!");
                this.getAllClinics();
            } else {
                toast.error("Update clinic failed!");
            }
        }
    };

    getAllClinics = async () => {
        const response = await getAllClinicsService();
        if (response && response.errCode === 0) {
            this.setState({
                allClinics: response.data ? response.data : [],
            });
        }
    };

    handleEditClinicButton = (clinic) => {
        console.log("check clinic edit: ", clinic);
        this.setState({
            // action: CRUD_ACTIONS.EDIT,
            /* Form field */
            action: CRUD_ACTIONS.EDIT,
            editId: clinic.id,
            name: clinic.name,
            address: clinic.address,
            descMarkdown: clinic.descriptionMarkdown,
            descHTML: clinic.descriptionHTML,
            imageBase64: clinic.image,
            previewImgURL: clinic.image ? clinic.image : "",
        });
    };

    handleDeleteClinic = async (clinic) => {
        const clinidId = clinic.id;
        const response = await deleteClinicService(clinidId);
        if (response && response.errCode === 0) {
            toast.success("Delete clinic successfully!");
            this.getAllClinics();
        } else {
            toast.error("Delete clinic failed!");
        }
    };

    render() {
        const { allClinics, previewImgURL, isOpen, action } = this.state;
        const { language } = this.props;
        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-content">
                    <h3 className="title">
                        <FormattedMessage id="admin.manage-clinic.title" />
                    </h3>

                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="admin.manage-clinic.name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.avatar" />
                            </label>

                            <div className="preview-img">
                                <input
                                    id="preview-img"
                                    type="file"
                                    onChange={this.handleUploadImage}
                                    hidden
                                />
                                <label
                                    htmlFor="preview-img"
                                    className="preview-img__label"
                                >
                                    <FormattedMessage id="manage-user.upload" />

                                    <i className="fas fa-upload"></i>
                                </label>
                                {this.state.previewImgURL && (
                                    <div
                                        className="preview-box"
                                        style={{
                                            background: `url(${this.state.previewImgURL}) center center / contain no-repeat`,
                                        }}
                                        onClick={this.openPreviewImage}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="admin.manage-clinic.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="manage-doctor-editor col-12">
                            <label htmlFor="">
                                <FormattedMessage id="admin.manage-doctor.detail" />
                            </label>
                            <MdEditor
                                style={{ height: "300px" }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descMarkdown}
                                placeholder={
                                    language === LANGUAGES.VI
                                        ? "Nhập thông tin..."
                                        : "Type something...."
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button
                                className={
                                    action === "" ||
                                    action === CRUD_ACTIONS.CREATE
                                        ? "create-btn"
                                        : "update-btn"
                                }
                                onClick={this.handleSaveClinic}
                            >
                                <FormattedMessage
                                    id={
                                        action === "" ||
                                        action === CRUD_ACTIONS.CREATE
                                            ? "manage-clinic.create-btn"
                                            : "manage-clinic.update-btn"
                                    }
                                />
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <table
                            id="customers"
                            className="user-manage__table col-12"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Updated at</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allClinics &&
                                    allClinics.length > 0 &&
                                    allClinics.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                {moment(item.updatedAt).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </td>
                                            <td>
                                                <a
                                                className="edit-btn"
                                                    onClick={() =>
                                                        this.handleEditClinicButton(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-edit btn-edit"></i>
                                                </a>
                                                <a
                                                className="delete-btn"
                                                    onClick={() =>
                                                        this.handleDeleteClinic(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash-alt btn-delete"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
