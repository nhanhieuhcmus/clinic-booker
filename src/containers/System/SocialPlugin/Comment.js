import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
require("dotenv").config();

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        const { language } = this.props;
        let locale = language === LANGUAGES.EN ? "en_US" : "vi_VN";
        console.log("check locale: ", locale);
        window.fbAsyncInit = function () {
            window.FB.init({
                // appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                appId: 938304623688681,
                cookie: true,
                autoLogAppEvents: true,
                xfbml: true,
                version: "v12.0",
            });
        };

        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `https://connect.facebook.net/${locale}/sdk.js`;
            // js.async = true;
            // js.defer = true;
            console.log(js.src);
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };

    componentDidMount() {
        this.initFacebookSDK();
    }

    render() {
        const { dataHref, width, numPost } = this.props;
        return (
            <>
                {/* <div
                    className="fb-comments"
                    data-href={dataHref}
                    data-width={width ? width : ""}
                    data-numposts={numPost ? numPost : 5}
                    data-share="true"
                ></div> */}
                <div
                    class="fb-comments"
                    data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                    data-width={width ? width : ""}
                    data-numposts="5"
                    data-lazy={true}
                ></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
