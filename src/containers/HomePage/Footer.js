import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="footer-content">
                    <div className="col1">
                        <div className="logo"></div>
                        <div className="col1-title">
                            Công ty Cổ phần Công nghệ BookingCare
                        </div>
                        <p>
                            {" "}
                            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày
                            16/03/2015
                        </p>
                    </div>
                    <div className="col2">
                        <ul className="col2-related-link">
                            <li>
                                <a href="">Liên hệ hợp tác</a>
                            </li>
                            <li>
                                <a href="">Câu hỏi thường gặp</a>
                            </li>
                            <li>
                                <a href="">Điều khoản sử dụng</a>
                            </li>
                            <li>
                                <a href="">Chính sách bảo mật</a>
                            </li>
                            <li>
                                <a href="">Quy trình giải quyết khiếu nại</a>
                            </li>
                            <li>
                                <a href="">Quy chế hoạt động</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col3">
                        <div className="office">
                            <div className="office-title">
                                Trụ sở tại Hà Nội
                            </div>
                            <div className="office-address">
                                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                            </div>
                        </div>
                        <div className="office">
                            <div className="office-title">
                                Văn phòng tại TP Hồ Chí Minh
                            </div>
                            <div className="office-address">
                                6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1
                            </div>
                        </div>
                        <div className="support">
                            <div className="support-title">Hỗ trợ khách hàng</div>
                            support@bookingcare.vn (7h - 18h)
                        </div>
                    </div>
                </div>
                <hr />
                <div className="footer-media">
                Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:&nbsp;
                <a href="">Android</a>
                &nbsp;|&nbsp;
                <a href="">IOS</a>
                &nbsp;|&nbsp;
                <a href="">Khác</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
