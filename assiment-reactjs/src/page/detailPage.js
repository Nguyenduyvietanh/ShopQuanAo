import React, { useEffect, useState } from 'react'
import ProductAPI from '../api/productAPI';
import HeaderCategorypage from './../component/headerCategorypage';
import Header from './../core/header';
import Banner from './../core/banner';
import { Footer } from 'antd/lib/layout/layout';

const DetailPage = (props) => {
    const { location } = props;
    const [idParam, setIdParam] = useState(null);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        let id = location.state;
        setIdParam(id);
        getProduct(id);
    }, [location, location.state])
    const getProduct = async (id) => {
        const result = await ProductAPI.get(id)
        setProduct(result.data);
        console.log(result);
    }
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-text">
                            <a href="/"><i className="fa fa-home" /> Home</a>
                            <span>Shop</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-3">
                        <HeaderCategorypage />
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-pic-zoom">
                                    <img className="product-big-img" src={product.photo} alt />
                                    <div className="zoom-icon">
                                        <i className="fa fa-search-plus" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details">
                                    <div className="pd-title">
                                        <h3>{product.name}</h3>
                                        <a href="#" className="heart-icon"><i className="icon_heart_alt" /></a>
                                    </div>
                                    <div className="pd-rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-o" />
                                        <span>(5)</span>
                                    </div>
                                    <div className="pd-desc">
                                        <p><b>M?? t???:</b> {product.description}</p>
                                        <h4>${product.price} </h4>
                                    </div>
                                    <div className="pd-color">
                                        <h6>Color</h6>
                                        <div className="pd-color-choose">
                                            <div className="cc-item">
                                                <input type="radio" id="cc-black" />
                                                <label htmlFor="cc-black" />
                                            </div>
                                            <div className="cc-item">
                                                <input type="radio" id="cc-yellow" />
                                                <label htmlFor="cc-yellow" className="cc-yellow" />
                                            </div>
                                            <div className="cc-item">
                                                <input type="radio" id="cc-violet" />
                                                <label htmlFor="cc-violet" className="cc-violet" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pd-size-choose">
                                        <div className="sc-item">
                                            <input type="radio" id="sm-size" />
                                            <label htmlFor="sm-size">s</label>
                                        </div>
                                        <div className="sc-item">
                                            <input type="radio" id="md-size" />
                                            <label htmlFor="md-size">m</label>
                                        </div>
                                        <div className="sc-item">
                                            <input type="radio" id="lg-size" />
                                            <label htmlFor="lg-size">l</label>
                                        </div>
                                        <div className="sc-item">
                                            <input type="radio" id="xl-size" />
                                            <label htmlFor="xl-size">xs</label>
                                        </div>
                                    </div>
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <input type="text" defaultValue={1} />
                                        </div>
                                        <a href="#" className="primary-btn pd-cart">Add To Cart</a>
                                    </div>
                                    <ul className="pd-tags">
                                        <li><span>TAGS</span>: Clothing, T-shirt, Woman</li>
                                    </ul>
                                    <div className="pd-share">
                                        <div className="p-code">Sku : 00012</div>
                                        <div className="pd-social">
                                            <a href="#"><i className="ti-facebook" /></a>
                                            <a href="#"><i className="ti-twitter-alt" /></a>
                                            <a href="#"><i className="ti-linkedin" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="product-tab">
                            <div className="tab-item">
                                <ul className="nav" role="tablist">
                                    <li>
                                        <a className="active" data-toggle="tab" href="#tab-1" role="tab">DESCRIPTION</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#tab-2" role="tab">SPECIFICATIONS</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#tab-3" role="tab">Customer Reviews (02)</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-item-content">
                                <div className="tab-content">
                                    <div className="tab-pane fade-in active" id="tab-1" role="tabpanel">
                                        <div className="product-content">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <h5>Introduction</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                                    <h5>Features</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                                </div>
                                                <div className="col-lg-5">
                                                    <img src="img/product-single/tab-desc.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                        <div className="specification-table">
                                            <table>
                                                <tbody><tr>
                                                    <td className="p-catagory">Customer Rating</td>
                                                    <td>
                                                        <div className="pd-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                            <span>(5)</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                        <td className="p-catagory">Price</td>
                                                        <td>
                                                            <div className="p-price">$495.00</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Add To Cart</td>
                                                        <td>
                                                            <div className="cart-add">+ add to cart</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Availability</td>
                                                        <td>
                                                            <div className="p-stock">22 in stock</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Weight</td>
                                                        <td>
                                                            <div className="p-weight">1,3kg</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Size</td>
                                                        <td>
                                                            <div className="p-size">Xxl</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Color</td>
                                                        <td><span className="cs-color" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-catagory">Sku</td>
                                                        <td>
                                                            <div className="p-code">00012</div>
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-3" role="tabpanel">
                                        <div className="customer-review-option">
                                            <h4>2 Comments</h4>
                                            <div className="comment-option">
                                                <div className="co-item">
                                                    <div className="avatar-pic">
                                                        <img src="img/product-single/avatar-1.png" alt />
                                                    </div>
                                                    <div className="avatar-text">
                                                        <div className="at-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                        <h5>Brandon Kelley <span>27 Aug 2019</span></h5>
                                                        <div className="at-reply">Nice !</div>
                                                    </div>
                                                </div>
                                                <div className="co-item">
                                                    <div className="avatar-pic">
                                                        <img src="img/product-single/avatar-2.png" alt />
                                                    </div>
                                                    <div className="avatar-text">
                                                        <div className="at-rating">
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star-o" />
                                                        </div>
                                                        <h5>Roy Banks <span>27 Aug 2019</span></h5>
                                                        <div className="at-reply">Nice !</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="personal-rating">
                                                <h6>Your Ratind</h6>
                                                <div className="rating">
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star" />
                                                    <i className="fa fa-star-o" />
                                                </div>
                                            </div>
                                            <div className="leave-comment">
                                                <h4>Leave A Comment</h4>
                                                <form action="#" className="comment-form">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <input type="text" placeholder="Name" />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <input type="text" placeholder="Email" />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <textarea placeholder="Messages" defaultValue={""} />
                                                            <button type="submit" className="site-btn">Send message</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DetailPage
