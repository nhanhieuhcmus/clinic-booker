import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: "",
            isOpen: false,
            action: "" /* in C/R/U/D */,

            /* Form field */
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phonenumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            const genderArray = this.props.genderRedux;
            this.setState({
                genderArr: genderArray,
                gender:
                    genderArray && genderArray.length > 0
                        ? genderArray[0].keyMap
                        : "",
            });
        }
        if (prevProps.position !== this.props.position) {
            const positionArray = this.props.position;
            this.setState({
                positionArr: positionArray,
                position:
                    positionArray && positionArray.length > 0
                        ? positionArray[0].keyMap
                        : "",
            });
        }
        if (prevProps.role !== this.props.role) {
            const roleArray = this.props.role;
            this.setState({
                roleArr: roleArray,
                role:
                    roleArray && roleArray.length > 0
                        ? roleArray[0].keyMap
                        : "",
            });
        }
        /* Reset field input */
        if (prevProps.users !== this.props.users) {
            const genderArray = this.props.genderRedux;
            const positionArray = this.props.position;
            const roleArray = this.props.role;
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phonenumber: "",
                address: "",
                gender:
                    genderArray && genderArray.length > 0
                        ? genderArray[0].keyMap
                        : "",
                position:
                    positionArray && positionArray.length > 0
                        ? positionArray[0].keyMap
                        : "",
                role:
                    roleArray && roleArray.length > 0
                        ? roleArray[0].keyMap
                        : "",
                avatar: "",
                previewImgURL: "",
            });
            // this.forceUpdate();
        }
    }

    handleUploadImage = async (event) => {
        const data = event.target.files;
        const uploadImg = data[0];
        if (uploadImg) {
            // convert img into base64
            const base64 = await CommonUtils.getBase64(uploadImg);
            const objectURL = URL.createObjectURL(uploadImg);
            this.setState({
                previewImgURL: objectURL,
                avatar: base64,
            });
        }
    };

    checkValidateInput = () => {
        const requireField = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phonenumber",
            "address",
        ];
        const missingFiled = requireField.find(
            (field) => this.state[field] == false
        );
        if (missingFiled) {
            alert(`Missing field: ${missingFiled}`);
            return false;
        }
        return true;
    };

    handleOnInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    openPreviewImage = () => {
        if (this.state.previewImgURL) {
            this.setState({
                isOpen: true,
            });
        }
    };

    handleCreateUser = () => {
        // const isValid = this.checkValidateInput();
        const isValid = true;
        const {
            email,
            password,
            firstName,
            lastName,
            phonenumber,
            address,
            gender,
            position,
            role,
            avatar,
            previewImgURL,
        } = this.state;
        const currentAction = this.state.action;

        if (currentAction === CRUD_ACTIONS.CREATE) {
            if (isValid) {
                // fire action redux
                this.props.createNewUser({
                    email,
                    password,
                    firstName,
                    lastName,
                    phonenumber,
                    address,
                    gender,
                    position,
                    role,
                    avatar,
                    previewImgURL,
                });
            }
        } else {
            // fire action redux
            this.props.editUserStart({
                id: this.state.userEditId,
                email,
                password,
                firstName,
                lastName,
                phonenumber,
                address,
                gender,
                position,
                role,
                avatar,
                previewImgURL,
            });
        }
    };

    handleEditUser = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = Buffer.from(user.image, "base64").toString("binary");
        }
        this.setState({
            action: CRUD_ACTIONS.EDIT,
            /* Form field */
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            userEditId: user.id,
            previewImgURL: imageBase64,
        });
    };

    render() {
        const genders = this.state.genderArr;
        const positions = this.state.positionArr;
        const roles = this.state.roleArr;
        const currLanguage = this.props.language;

        const {
            action,
            email,
            password,
            firstName,
            lastName,
            phonenumber,
            address,
            gender,
            position,
            role,
            avatar,
        } = this.state;

        return (
            <div className="user-redux-container">
                <h1 className="title">
                    <FormattedMessage id="manage-user.add" />
                </h1>
                <div className="user-redux-body">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                                disabled={
                                    action === CRUD_ACTIONS.EDIT ? true : false
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                                disabled={
                                    action === CRUD_ACTIONS.EDIT ? true : false
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.firstName" />
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                            />
                        </div>
                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.lastName" />
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage
                                    id="manage-user.address"
                                    onChange={this.handleOnInputChange}
                                />
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.phonenumber" />
                            </label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={phonenumber}
                                className="form-control"
                                onChange={this.handleOnInputChange}
                            />
                        </div>

                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.sex" />
                            </label>
                            <select
                                id="inputState"
                                className="form-control"
                                name="gender"
                                onChange={this.handleOnInputChange}
                                value={gender}
                            >
                                {genders &&
                                    genders.length &&
                                    genders.map((gender) => (
                                        <option
                                            key={gender.keyMap}
                                            value={gender.keyMap}
                                        >
                                            {currLanguage === LANGUAGES.VI
                                                ? gender.valueVi
                                                : gender.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                id="inputState"
                                className="form-control"
                                name="position"
                                value={position}
                                onChange={this.handleOnInputChange}
                            >
                                {positions &&
                                    positions.length &&
                                    positions.map((position) => (
                                        <option
                                            key={position.keyMap}
                                            value={position.keyMap}
                                        >
                                            {currLanguage === LANGUAGES.VI
                                                ? position.valueVi
                                                : position.valueEn}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-3 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select
                                id="inputState"
                                className="form-control"
                                value={role}
                                name="role"
                                onChange={this.handleOnInputChange}
                            >
                                {roles &&
                                    roles.length &&
                                    roles.map((role) => (
                                        <option
                                            key={role.keyMap}
                                            value={role.keyMap}
                                        >
                                            {currLanguage === LANGUAGES.VI
                                                ? role.valueVi
                                                : role.valueEn}
                                        </option>
                                    ))}
                            </select>
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
                        <div className="col-12 pt-3">
                            <button
                                className={
                                    action === "" ||
                                    action === CRUD_ACTIONS.CREATE
                                        ? "create-btn"
                                        : "update-btn"
                                }
                                onClick={this.handleCreateUser}
                            >
                                <FormattedMessage
                                    id={
                                        action === "" ||
                                        action === CRUD_ACTIONS.CREATE
                                            ? "manage-user.create-button"
                                            : "manage-user.edit-button"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <TableManageUser
                            editUser={this.handleEditUser}
                            // action={this.state.action}
                        />
                    </div>
                </div>

                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
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
        genderRedux: state.admin.genders,
        isGenderLoading: state.admin.isGenderLoading,
        position: state.admin.positions,
        role: state.admin.roles,
        users: state.admin.allUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUserStart(data)),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) =>
        //     dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
