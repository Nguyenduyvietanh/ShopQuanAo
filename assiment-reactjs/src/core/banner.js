import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="">
                <img className="banerr" src="img/hero-1.jpg" alt />
            </div>

            <div>
                {/* Hero Section End */}
                {/* Banner Section Begin */}
                <div className="banner-section spad mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="single-banner">
                                    <img src="img/banner-1.jpg" alt />
                                    <div className="inner-text">
                                        <h4>Phong Cách</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-banner">
                                    <img src="img/banner-2.jpg" alt />
                                    <div className="inner-text">
                                        <h4>Lịch Sự</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="single-banner">
                                    <img src="img/banner-3.jpg" alt />
                                    <div className="inner-text">
                                        <h4>Trẻ Trung</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner
