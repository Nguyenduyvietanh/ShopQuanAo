import React from 'react'
import Product from '../component/product';
import Footer from '../core/footer';
import Header from '../core/header';
import Banner from './../core/banner';

const HomePage = () => {
    return (  
        <div>
            <Header/>
            <Banner/>
            <Product/>
            <Footer/>
        </div>
    )
}

export default HomePage
