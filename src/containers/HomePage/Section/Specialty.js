import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span>Chuyên khoa phổ biến</span>
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
                                <div className="item-tittle">Cơ Xương Khớp</div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image2"></div>
                                </div>
                                <div className="item-tittle">Cơ Xương Khớp</div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image3"></div>
                                </div>
                                <div className="item-tittle">Cơ Xương Khớp</div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="bg-image image4"></div>
                                </div>
                                <div className="item-tittle">Cơ Xương Khớp</div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="image image5"></div>
                                </div>
                                <div className="item-tittle">Cơ Xương Khớp</div>
                            </div>
                            <div className="item">
                                <div className="contain-zoom-bg-image">
                                    <div className="image image6"></div>
                                </div>
                                <div className="item-tittle">Cơ Xương Khớp</div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
export default Specialty;
