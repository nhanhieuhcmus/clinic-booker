import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookingService } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class verifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            isVerifyDone: false,
        };
    }

    async componentDidMount() {
        if (this.props.location?.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get("token");
            const doctorId = urlParams.get("doctorId");
            const response = await postVerifyBookingService({
                token,
                doctorId,
            });
            if (response) {
                this.setState({
                    isVerifyDone: true,
                });
                if (response.errCode === 0) {
                    this.setState({
                        statusVerify: true,
                    });
                }
            }
        }
    }

    render() {
        const { statusVerify, isVerifyDone } = this.state;
        return (
            <>
                <HomeHeader />

                <div
                    style={{
                        fontSize: "20px",
                        textAlign: "center",
                        marginTop: "24px",
                    }}
                >
                    {!isVerifyDone
                        ? "Đang xác nhận ..."
                        : statusVerify
                        ? "Xác nhận lịch hẹn thành công!"
                        : "Lịch hẹn không tồn tại hoặc đã xác nhận trước đó!"}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
