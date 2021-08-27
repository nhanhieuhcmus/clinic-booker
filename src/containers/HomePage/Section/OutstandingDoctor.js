import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./OutstandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button className="section-view-more-button">
                            Xem thêm
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-border">
                                    <div className="contain-zoom-bg-image">
                                        <div className="outer-bg">
                                            <div className="bg-image image1"></div>
                                        </div>
                                    </div>
                                    <div className="item-tittle">
                                        Giáo sư - Tiến sĩ Hà Văn Quyết
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
