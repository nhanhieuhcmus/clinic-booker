import React, { Component } from "react";
import { FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./TableManageUser.scss";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllUsersRedux();
    }

    componentDidUpdate(prevState, prevProps, snapshot) {
        if (prevState.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users,
            });
        }
    }

    handleDeleteUser = (event) => {
        const id = event.currentTarget.getAttribute("id");
        this.props.deleteUserRedux(id);
    };

    handleClickEditUser = (user) => {
        console.log("user from handleClickEditUser: ", user);
        this.props.editUser(user);
    };

    render() {
        console.log("check user redux>>>>", this.state.usersRedux)
        return (
            <React.Fragment>
                <table id="customers" className="user-manage__table col-12">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>
                                <FormattedMessage id="manage-user.table.firstname" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.table.lastname" />
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
                        {this.state.usersRedux &&
                            this.state.usersRedux.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <a
                                            className="edit-btn"
                                            onClick={() =>
                                                this.handleClickEditUser(user)
                                            }
                                        >
                                            <i className="fas fa-edit btn-edit"></i>
                                        </a>
                                        <a
                                            className="delete-btn"
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.admin.allUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
