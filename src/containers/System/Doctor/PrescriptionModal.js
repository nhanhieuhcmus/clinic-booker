import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./PrescriptionModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { CommonUtils } from "../../../utils";

class PrescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
        };
    }

    componentDidMount() {
        if (this.props.dataModal.email) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dataModal.email !== prevProps.dataModal.email) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleUploadImage = async (event) => {
        const data = event.target.files;
        const uploadImg = data[0];
        if (uploadImg) {
            // convert img into base64
            const base64 = await CommonUtils.getBase64(uploadImg);
            this.setState({
                imgBase64: base64,
            });
        }
    };


    handlePrescription = () => {
        this.props.sendPrescription(this.state)
    }
    
    render() {
        const { isOpen, toggle } = this.props;
        return (
            <Modal
                className="prescription-modal-container"
                isOpen={isOpen}
                toggle={toggle}
                size="lg"
                centered
            >
                <ModalHeader toggle={toggle}>Hoàn tất lịch khám</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">File hoá đơn</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={this.handleUploadImage}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="send-btn" onClick={this.handlePrescription}>
                        Gửi
                    </Button>
                    <Button className="cancel-btn" onClick={toggle}>
                        Huỷ
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
