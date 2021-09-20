import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
    createNewSpecialtyService,
    deleteSpecialtyService,
    editSpecialtyService,
    getAllSpecialtiesService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            descMarkdown: "",
            descHTML: "",
            allSpecialties: [],
            action: "",
            editId: "",
            previewImgURL: "",
            isOpen: false,
        };
    }

    componentDidMount() {
        this.getAllSpecialties();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.allSpecialties !== this.state.allSpecialties) {
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                name: "",
                imageBase64: "",
                descMarkdown: "",
                descHTML: "",
                previewImgURL: "",
            });
        }
    }

    getAllSpecialties = async () => {
        const response = await getAllSpecialtiesService();
        if (response && response.errCode === 0) {
            this.setState({
                allSpecialties: response.data ? response.data : [],
            });
        }
    };

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

    handleSaveSpecialty = async () => {
        const { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            const response = await createNewSpecialtyService({
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionMarkdown: this.state.descMarkdown,
                descriptionHTML: this.state.descHTML,
            });
            if (response && response.errCode === 0) {
                toast.success("Create new specialty successfully!");
                this.getAllSpecialties();
            } else {
                toast.error("Create specialty failed!");
            }
        } else {
            // EDIT CASE
            const response = await editSpecialtyService({
                id: this.state.editId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionMarkdown: this.state.descMarkdown,
                descriptionHTML: this.state.descHTML,
            });
            if (response && response.errCode === 0) {
                toast.success("Update new clinic successfully!");
                this.getAllSpecialties();
            } else {
                toast.error("Update clinic failed!");
            }
        }
    };

    handleEditButtonSpecialty = (specialty) => {
        this.setState({
            // action: CRUD_ACTIONS.EDIT,
            /* Form field */
            action: CRUD_ACTIONS.EDIT,
            editId: specialty.id,
            name: specialty.name,
            descMarkdown: specialty.descriptionMarkdown,
            descHTML: specialty.descriptionHTML,
            imageBase64: specialty.image,
            previewImgURL: specialty.image ? specialty.image : "",
        });
    };

    handleDeleteSpecialty = async (specialty) => {
        const specialtyId = specialty.id;
        const response = await deleteSpecialtyService(specialtyId);
        if (response && response.errCode === 0) {
            toast.success("Delete specialty successfully!");
            this.getAllSpecialties();
        } else {
            toast.error("Delete specialty failed!");
        }
    };

    render() {
        const {
            allSpecialties,
            name,
            previewImgURL,
            isOpen,
            descMarkdown,
            action,
        } = this.state;
        const { language } = this.props;
        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-content">
                    <h3 className="title">
                        <FormattedMessage id="admin.manage-specialty.title" />
                    </h3>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="admin.manage-specialty.name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
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
                                {previewImgURL && (
                                    <div
                                        className="preview-box"
                                        style={{
                                            background: `url(${previewImgURL}) center center / contain no-repeat`,
                                        }}
                                        onClick={this.openPreviewImage}
                                    ></div>
                                )}
                            </div>
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
                                value={descMarkdown}
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
                                onClick={this.handleSaveSpecialty}
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
                                    <th>
                                        <FormattedMessage id="admin.manage-specialty.table.name" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="admin.manage-specialty.table.updatedAt" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="manage-user.table.action" />
                                    </th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {allSpecialties &&
                                    allSpecialties.length > 0 &&
                                    allSpecialties.map((item, index) => (
                                        <tr key={item.id.toString()}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                {moment(item.updatedAt).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </td>
                                            <td>
                                                <a
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        this.handleEditButtonSpecialty(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-edit btn-edit"></i>
                                                </a>
                                                <a
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        this.handleDeleteSpecialty(
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
