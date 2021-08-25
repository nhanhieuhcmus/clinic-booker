import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { createNewUser } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
    }
    componentDidMount() {
        const data = this.props.data;
        this.setState({
            id: data.id,
            email:data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address
        });
    }
    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value,
        });
    };

    checkValidateInput = () => {
        return Object.keys(this.state).every((item) => this.state[item]);
    };

    handleSaveChangeUser = () => {
        // const isValidated = this.checkValidateInput();
        const isValidated = true;
        if (!isValidated){
            alert("Missing required parameter!");
        }
        else{
            this.props.updateUser(this.state);
        }
        this.props.updateUser(this.state);

    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                className={"abc"}
                size="lg"
                centered
            >
                <ModalHeader toggle={this.toggle}>
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input
                                className="form-control"
                                name="email"
                                type="text"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                onChange={this.handleInputChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">First name</label>
                            <input
                                className="form-control"
                                name="firstName"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Last name</label>
                            <input
                                className="form-control"
                                name="lastName"
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input
                                className="form-control"
                                name="address"
                                type="text"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="px-3"
                        color="primary"
                        onClick={this.handleSaveChangeUser}
                    >
                        Save changes
                    </Button>
                    <Button
                        className="px-3"
                        color="secondary"
                        onClick={this.props.toggle}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
