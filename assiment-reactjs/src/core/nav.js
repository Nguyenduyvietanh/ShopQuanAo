import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Nav = () => {

    return (
        <>
            <nav className="nav-menu mobile-menu">
                <ul>
                    <li className="">
                        <Link exact to="/">Trang Chủ</Link>
                    </li>
                   
                        <li><a href="#">Bộ Sưu Tập</a>
                            <ul className="dropdown">
                                <li><a href="#">Men's</a></li>
                                <li><a href="#">Women's</a></li>
                                <li><a href="#">Kid's</a></li>
                            </ul>
                        </li>
                        <li><Link to="/categorypage">Shop</Link></li>
                        <li><a href="#">Liên Hệ</a></li>
                        <li><a href="#">Pages</a>
                            <ul className="dropdown">
                                <li><a href="">Blog Details</a></li>
                                <li><a href=".">Shopping Cart</a></li>
                                <li><a href="">Checkout</a></li>
                                <li><a href=".">Faq</a></li>
                                <li><a href=".">Register</a></li>
                                <li><a href="">Login</a></li>
                            </ul>
                        </li>
                    

                </ul>
            </nav>
        </>
    )
}

export default Nav
