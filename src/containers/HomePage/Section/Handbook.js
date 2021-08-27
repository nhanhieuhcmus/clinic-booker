import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./Handbook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cẩm nang</span>
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
                                <span className="item-tittle">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-tittle">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-tittle">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-tittle">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-tittle">
                                    Chương trình tư vấn từ xa miễn phí dành cho
                                    F0, F1
                                </span>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image1"></div>
                                </div>
                                <span className="item-tittle">Title</span>
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
