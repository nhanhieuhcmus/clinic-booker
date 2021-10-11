import React, { Component } from "react";
import { connect } from "react-redux";
import "./Section.scss";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialtiesService } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialties: [],
        };
    }
    async componentDidMount() {
        const response = await getAllSpecialtiesService();
        if (response && response.errCode === 0) {
            this.setState({
                allSpecialties: response.data ? response.data : [],
            });
        }
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`);
    };

    render() {
        let { allSpecialties } = this.state;
      
        return (
            <div className="general-section section-specialty" id="section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.specialty" />
                        </span>
                        <button className="section-view-more-button">
                        <FormattedMessage id="homepage.view-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {allSpecialties &&
                                allSpecialties.length > 0 &&
                                allSpecialties.map((item) => (
                                    <div
                                        className="item"
                                        key={item.id}
                                        onClick={() =>
                                            this.handleViewDetailSpecialty(item)
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
// export default Specialty;
