import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinicsService } from "../../../services/userService";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";


class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinics: [],
        };
    }

    async componentDidMount() {
        const response = await getAllClinicsService();
        console.log("check res clinic: ", response);
        if (response && response.errCode === 0) {
            this.setState({
                allClinics: response.data ? response.data : [],
            });
        }
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    };

    render() {
        let { allClinics } = this.state;
        console.log("check allClinics>>>", allClinics);
        return (
            <div className="general-section section-medical-facility" id="section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span>
                        <FormattedMessage id="homepage.medical-facility" />

                        </span>
                        <button className="section-view-more-button">
                        <FormattedMessage id="homepage.view-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allClinics &&
                                allClinics.length>0 &&
                                allClinics.map((item) => (
                                    <div
                                        className="item"
                                        key={item.id}
                                        onClick={() =>
                                            this.handleViewDetailClinic(item)
                                        }
                                    >
                                        <div className="contain-zoom-bg-image">
                                            <div
                                                className="bg-image"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="item-title">
                                            {item.name}
                                        </div>
                                    </div>
                                ))}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
