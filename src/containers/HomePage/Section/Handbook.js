import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./Handbook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";

class Handbook extends Component {
    render() {
        return (
            <div
                className="general-section section-handbook"
                id="section-handbook"
            >
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.handbook" />
                        </span>
                        <button className="section-view-more-button">
                            <FormattedMessage id="homepage.view-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-title">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image2"></div>
                                </div>
                                <span className="item-title">
                                    5 điểm Test nhanh Covid-19 uy tín ở Hà Nội
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image3"></div>
                                </div>
                                <span className="item-title">
                                    7 Bác sĩ khám online bệnh Da liễu giỏi (Khám
                                    từ xa qua video)
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image4"></div>
                                </div>
                                <span className="item-title">
                                    5 bác sĩ khám online bệnh nội tiết - tiểu
                                    đường giỏi ở Hà Nội, TP.HCM
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image5"></div>
                                </div>
                                <span className="item-title">
                                    Phòng khám TTClinic có tốt không? Bác sĩ da
                                    liễu nào giỏi?
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image6"></div>
                                </div>
                                <span className="item-title">
                                    5 bệnh viện phòng khám bác sĩ gia đình khám
                                    tại nhà tốt ở Hà Nội
                                </span>
                            </div>
                        </Slider>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
