import React, { useEffect, useState } from 'react';
import ProductAPI from '../api/productAPI'
import CategoryAPI from '../api/categoryAPI';
import { useHistory, Link } from 'react-router-dom';
const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getProduct();
        getCategory();
    }, [])
    const detailProductPage = (item) => {
        history.push('/detailproductpage', item._id);
    }
    const getProduct = async () => {
        const result = await ProductAPI.getAll();
        setProducts(result.data);
    }
    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategories(result.data.categories);
    }
    const getNameCategory = (value) => {
        let nameCategory = '';
        categories && categories.length > 0 && categories.map(item => {
            if(item._id == value) {
                nameCategory = item.name
            }
        });
        return nameCategory
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {categories && categories.length > 0 && products.map(item =>
                        <>
                            <div className="product-item col-3">
                                <div className="pi-pic">
                                    <img src={item.photo} alt />
                                    <div className="icon">
                                        <i className="icon_heart_alt" />
                                    </div>
                                    <ul>
                                        <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                        <li className="quick-view"><span onClick={() => detailProductPage(item)}> <Link >Xem chi tiết</Link> </span></li>
                                        <li className="w-icon"><a href="#"><i className="fa fa-random" /></a></li>
                                    </ul>
                                </div>
                                <div className="pi-text">
                                    <div className="catagory-name">{getNameCategory(item.category)} </div>
                                    <a href="#">
                                        <h5>{item.name}</h5>
                                    </a>
                                    <div className="product-price">
                                        ${item.price}
                                </div>
                                </div>
                            </div>
                        </>
                    )
                    }

                </div>
            </div>
        </>
    )
}

export default Product
