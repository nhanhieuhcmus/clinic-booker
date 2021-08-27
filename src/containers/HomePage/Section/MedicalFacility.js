import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cơ sở y tế nổi bật</span>
                        <button className="section-view-more-button">
                            Xem thêm
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...settings}>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">
                                    Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">
                                    Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">
                                    Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">
                                    Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">
                                    Bệnh viện Đại học Y Dược 1
                                </div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <div className="item-tittle">Title</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
