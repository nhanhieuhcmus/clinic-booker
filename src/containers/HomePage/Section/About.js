import React, { Component } from "react";
import "./Section.scss";
import "./About.scss";

class About extends Component {
    render() {
        return (
            <div className="section section-about">
                <div className="section-container">
                    <div className="section-header">
                        <span>Truyền thông nói về BookingCare</span>
                    </div>
                    <div className="section-body">
                        <div className="body-left">
                            <div className="embed-video-responsive">
                                <iframe
                                    src="https://www.youtube.com/embed/FyDQljKtWnI"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                            </div>
                        </div>
                        <div className="body-right">
                            <ul className="media-news">
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"
                                        title="Báo sức khỏe đời sống nói về BookingCare"
                                    >
                                        <i className="media-image image1"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
                                        title="VTV1 - Cà phê khởi nghiệp 14-11-2018"
                                    >
                                        <i className="media-image image2"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict"
                                        title="Báo điện tử ictnews giới thiệu BookingCare"
                                    >
                                        <i className="media-image image3"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://video.vnexpress.net/tin-tuc/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                                        title="VnExpress nói về BookingCare"
                                    >
                                        <i className="media-image image4"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://infonet.vietnamnet.vn/khoe-dep/da-co-hon-20-000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html"
                                        title="Báo điện tử infonet nói về BookingCare"
                                    >
                                        <i className="media-image image7"></i>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="http://ehealth.gov.vn/?action=News&newsId=46094"
                                        title="Cục công nghệ thông tin - Bộ Y tế nói về BookingCare"
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
