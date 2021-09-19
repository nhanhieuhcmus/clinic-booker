import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            editedUser: {},
            isOpenModalUser: false,
            isOpenModalEditUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        const response = await getAllUsers("all");
        if (response && response.errCode === 0) {
            this.setState({
                users: response.users,
            });
        }
    };

    handleAddNewUserModal = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    handleCreateNewUser = async (data) => {
        try {
            const response = await createNewUser(data);
            if (response && response.errCode != 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (event) => {
        /**
         * const id = event.currentTarget.getAttribute('id');
         * or writting as below:
         */
        const id = event.target.parentNode.id;
        try {
            const response = await deleteUser(id);
            if (response && response.errCode != 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleEditUserButton = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
        });
        this.setState({
            editedUser: user,
        });
    };

    handleUpdateUser = async (data) => {
        try {
            const response = await updateUser(data);
            console.log("handleUpdateUser: ", response);
            if (response && response.errCode != 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className="user-manage-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUserModal}
                    createNewUser={this.handleCreateNewUser}
                />
                {this.state.isOpenModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggle={this.toggleUserEditModal}
                        data={this.state.editedUser}
                        updateUser={this.handleUpdateUser}
                    />
                )}

                <div className="user-manage__title">Manage Users</div>
                <div className="col-12">
                    <button
                        className="btn btn-primary px-3"
                        onClick={this.handleAddNewUserModal}
                    >
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className="user-manage__body">
                    <table id="customers" className="user-manage__table col-12">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users &&
                                this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <a
                                                onClick={() =>
                                                    this.handleEditUserButton(
                                                        user
                                                    )
                                                }
                                            >
                                                <i className="fas fa-edit btn-edit"></i>
                                            </a>
                                            <a
                                                id={user.id}
                                                onClick={this.handleDeleteUser}
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
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
