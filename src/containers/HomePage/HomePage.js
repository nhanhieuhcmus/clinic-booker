import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";


class HomePage extends Component {
    handleAfterChange = (event, slick, currentSlide) => {
        console.log("check after change: ", event, slick, currentSlide);
    };

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            afterChange: this.handleAfterChange,
        };
        return (
            <Fragment>
                <HomeHeader settings={settings} isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <About />
                <Footer />
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
