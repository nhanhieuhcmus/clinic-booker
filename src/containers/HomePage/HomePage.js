import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <HomeHeader />
                <Specialty />
                <MedicalFacility/>
                <OutstandingDoctor/>
                <Handbook/>
                <About/>
                <Footer/>
            </React.Fragment>
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
