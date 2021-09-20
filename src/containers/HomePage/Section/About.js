import React, { Component } from "react";
import "./Section.scss";
import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
    render() {
        return (
            <div className="general-section section-about" id="section-about">
                <div className="section-container">
                    <div className="section-header">
                        <span>
                            <FormattedMessage id="homepage.about" />
                        </span>
                    </div>
                    <div className="section-body">
                        <div className="body-left">
                            <div className="embed-video-responsive">
                                <iframe
                                    // width="956"
                                    // height="538"
                                    src="https://www.youtube.com/embed/eXisi5NLTYA"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullscreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="body-right">
                            <ul className="media-news">
                                <li>
                                    <a
                                        target="_blank"
                                        title="Báo sức khỏe đời sống"
                                    >
                                        <i className="media-image image1"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        title="VTV1 - Cà phê khởi nghiệp 14-11-2018"
                                    >
                                        <i className="media-image image2"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        title="Báo điện tử ictnews giới thiệu"
                                    >
                                        <i className="media-image image3"></i>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" title="VnExpress">
                                        <i className="media-image image4"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        title="Báo điện tử infonet"
                                    >
                                        <i className="media-image image7"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        title="Cục công nghệ thông tin - Bộ Y tế"
                                    >
                                        <i className="media-image image6"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
