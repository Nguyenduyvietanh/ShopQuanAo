import React, { useState, useEffect } from 'react'
import Nav from './nav'
import { useHistory, Link } from 'react-router-dom';
import { signOut, isAuthenticate } from './../auth/index';
import { useLocation } from 'react-router-dom'
import CategoryAPI from '../api/categoryAPI';


const Header = () => {
    const [isAdmin, setIsAdmin] = useState(null)
    const [nameUser, setNameUser] = useState(null)
    const userAdmin = async () => {
        const tokenUser = localStorage.getItem('user');
        if (tokenUser) {
            const user = JSON.parse(tokenUser).user;
            let authed = user.role;
            setNameUser(user.name)
            setIsAdmin(authed)

        }
    }

    const history = useHistory();
    const { pathname } = useLocation();
    const [isLogged, setIsLogged] = useState(false)
    const [category, setCategory] = useState([]);
    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategory(result.data.categories);

    }
    const categorypage = (item) => {
        history.push('/categorypage', item._id);
    }
    useEffect(() => {
        isAuthenticate() && setIsLogged(true)
        getCategory();
        userAdmin()
    }, [pathname, isLogged])
    return (
        <>

            <header className="header-section">
                <div className="header-top">
                    <div className="container">
                        <div className="ht-left">
                            <div className="mail-service">
                                <i className=" fa fa-envelope" />
                                VietAnhNguyenDuy@gmail.com
                            </div>
                            <div className="phone-service">
                                <i className=" fa fa-phone" />
                                085.985.0000
                            </div>
                        </div>
                        <div className="ht-right">
                            {isAdmin == 1 ? <a href="/admin" className="login-panel"><i className="fa fa-user" />Trang Quản Lý </a> : ''}
                            {!isLogged && (
                                <>
                                    <a href="/signin" className="login-panel"><i className="fa fa-user" />Đăng nhập   </a>
                                    <a href="/signup" className="login-panel "><i className="fa fa-user" />Đăng kí</a>
                                </>
                            )}
                            {isLogged && (
                                <>
                                    <div className="login-panel">

                                        <a href="" onClick={() => signOut(() => {
                                            history.push('/')
                                        })}>
                                            <i className="fa fa-user" />
                                            Đăng Xuất
                                        </a> (Hi, <b>{nameUser}</b>)
                                    </div>
                                </>
                            )}




                            <div className="top-social">
                                <a href="#"><i className="ti-facebook" /></a>
                                <a href="#"><i className="ti-twitter-alt" /></a>
                                <a href="#"><i className="ti-linkedin" /></a>
                                <a href="#"><i className="ti-pinterest" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="inner-header">
                        <div className="row">
                            <div className="col-lg-2 col-md-2">
                                <div className="logo">
                                    <a href="/">
                                        <img src="img/logo.png" alt />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7">
                                <div className="advanced-search">
                                    <button type="button" className="category-btn">Tất Cả
                                    </button>
                                    <div className="input-group">
                                        <input type="text" placeholder="Tìm kiếm..." />
                                        <button type="button"><i className="ti-search" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 text-right col-md-3">
                                <ul className="nav-right">
                                    <li className="heart-icon">
                                        <a href="#">
                                            <i className="icon_heart_alt" />
                                            <span>1</span>
                                        </a>
                                    </li>
                                    <li className="cart-icon">
                                        <a href="#">
                                            <i className="icon_bag_alt" />
                                            <span>3</span>
                                        </a>
                                        <div className="cart-hover">
                                            <div className="select-items">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="si-pic"><img src="img/select-product-1.jpg" /></td>
                                                            <td className="si-text">
                                                                <div className="product-selected">
                                                                    <p>$60.00 x 1</p>
                                                                    <h6>Kabino Bedside Table</h6>
                                                                </div>
                                                            </td>
                                                            <td className="si-close">
                                                                <i className="ti-close" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="si-pic"><img src="img/select-product-2.jpg" alt /></td>
                                                            <td className="si-text">
                                                                <div className="product-selected">
                                                                    <p>$60.00 x 1</p>
                                                                    <h6>Kabino Bedside Table</h6>
                                                                </div>
                                                            </td>
                                                            <td className="si-close">
                                                                <i className="ti-close" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="select-total">
                                                <span>total:</span>
                                                <h5>$120.00</h5>
                                            </div>
                                            <div className="select-button">
                                                <a href="#" className="primary-btn view-card">VIEW CARD</a>
                                                <a href="#" className="primary-btn checkout-btn">CHECK OUT</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="cart-price">$150.00</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-item">
                    <div className="container">
                        <div className="nav-depart">
                            <div className="depart-btn">
                                <i className="ti-menu" />
                                <span>Danh Mục Sản Phẩm</span>
                                <ul className="depart-hover">
                                    {category && category.length > 0 && category.map(item =>
                                        <li><span onClick={() => categorypage(item)}> <Link>{item.name}</Link></span> </li>
                                    )}
                                    {/* <li className="active"><a href="#">Women’s Clothing</a></li>
                                    <li><a href="#">Men’s Clothing</a></li>
                                    <li><a href="#">Underwear</a></li>
                                    <li><a href="#">Kid's Clothing</a></li>
                                    <li><a href="#">Brand Fashion</a></li>
                                    <li><a href="#">Accessories/Shoes</a></li>
                                    <li><a href="#">Luxury Brands</a></li>
                                    <li><a href="#">Brand Outdoor Apparel</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <Nav />
                        <div id="mobile-menu-wrap" />
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header
