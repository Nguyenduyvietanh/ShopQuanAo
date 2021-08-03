import React, { useEffect, useState } from 'react'
import CategoryAPI from '../api/categoryAPI';
import ProductAPI from '../api/productAPI';
import Footer from '../core/footer';
import Header from '../core/header';
import Banner from './../core/banner';
import HeaderCategorypage from './../component/headerCategorypage';
import { useHistory, Link } from 'react-router-dom';

const CategoryPage = (props) => {
    const history = useHistory();
    const { location } = props;
    const [idParam, setIdParam] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let id = location.state;
        console.log(location);
        setIdParam(id);
        getProduct(id);
        getCategory()
    }, [location, location.state])
    const detailProductPage = (item) => {
        history.push('/detailproductpage', item._id);
    }
    const getProduct = async (id) => {
        const { data: products } = await ProductAPI.getAll();
        const result = products.filter(product => product.category == id);
        setProducts(result);
    }
    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategories(result.data.categories);

    }
    const getNameCategory = (value) => {
        let nameCategory = '';
        categories && categories.length > 0 && categories.map(item => {
            if (item._id == value) {
                nameCategory = item.name
            }
        });
        return nameCategory
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

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                        <HeaderCategorypage />
                    </div>

                    <div className="col-lg-9 order-1 order-lg-2">
                        <div className="product-show-option">
                            <div className="row">
                                <div className="col-lg-7 col-md-7">

                                </div>
                                <div className="col-lg-5 col-md-5 text-right">
                                    <p>Show 01- 09 Of 36 Product</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-list">
                            <div className="row">
                                {categories && categories.length > 0 && products.map(item =>

                                    <>
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="product-item">
                                                <div className="pi-pic">
                                                    <img src={item.photo} alt />

                                                    <div className="icon">
                                                        <i className="icon_heart_alt" />
                                                    </div>
                                                    <ul>
                                                        <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                                        <li className="quick-view"><span onClick={() => detailProductPage(item)}> <Link >Xem chi tiết</Link> </span> </li>
                                                        <li className="w-icon"><a href="#"><i className="fa fa-random" /></a></li>
                                                    </ul>
                                                </div>
                                                <div className="pi-text">
                                                    <div className="catagory-name">{getNameCategory(item.category)}</div>
                                                    <a href="#">
                                                        <h5>{item.name}</h5>
                                                    </a>
                                                    <div className="product-price">
                                                        ${item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>



                                )}


                            </div>
                        </div>
                        <div className="loading-more mb-5">
                            <i className="icon_loading" />
                            <a href="">
                                Loading More
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}

export default CategoryPage
