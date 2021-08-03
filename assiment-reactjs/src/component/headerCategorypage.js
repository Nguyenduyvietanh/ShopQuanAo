import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import CategoryAPI from '../api/categoryAPI';
const HeaderCategorypage = () => {
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategory(result.data.categories);
    }
    const categorypage = (item) => {
        history.push('/categorypage', item._id);
    }
    useEffect(() => {
        getCategory();
    }, [])   

    return (
        <>
            
                        <div className="filter-widget">
                            <h4 className="fw-title">Categories</h4>
                            <ul className="filter-catagories">
                            {category && category.length > 0 && category.map(item =>
                                    <li><span onClick={() => categorypage(item)}> <Link>{item.name}</Link></span> </li>
                                    
                                )}
                                
                            </ul>
                        </div>
                        <div className="filter-widget">
                            <h4 className="fw-title">Brand</h4>
                            <div className="fw-brand-check">
                                <div className="bc-item">
                                    <label htmlFor="bc-calvin">
                                        Calvin Klein
                                        <input type="checkbox" id="bc-calvin" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="bc-item">
                                    <label htmlFor="bc-diesel">
                                        Diesel
                                        <input type="checkbox" id="bc-diesel" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="bc-item">
                                    <label htmlFor="bc-polo">
                                        Polo
                                        <input type="checkbox" id="bc-polo" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="bc-item">
                                    <label htmlFor="bc-tommy">
                                        Tommy Hilfiger
                                        <input type="checkbox" id="bc-tommy" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                            </div>
                        </div>
                     
                        <div className="filter-widget">
                            <h4 className="fw-title">Color</h4>
                            <div className="fw-color-choose">
                                <div className="cs-item">
                                    <input type="radio" id="cs-black" />
                                    <label className="cs-black" htmlFor="cs-black">Black</label>
                                </div>
                                <div className="cs-item">
                                    <input type="radio" id="cs-violet" />
                                    <label className="cs-violet" htmlFor="cs-violet">Violet</label>
                                </div>
                                <div className="cs-item">
                                    <input type="radio" id="cs-blue" />
                                    <label className="cs-blue" htmlFor="cs-blue">Blue</label>
                                </div>
                                <div className="cs-item">
                                    <input type="radio" id="cs-yellow" />
                                    <label className="cs-yellow" htmlFor="cs-yellow">Yellow</label>
                                </div>
                                <div className="cs-item">
                                    <input type="radio" id="cs-red" />
                                    <label className="cs-red" htmlFor="cs-red">Red</label>
                                </div>
                                <div className="cs-item">
                                    <input type="radio" id="cs-green" />
                                    <label className="cs-green" htmlFor="cs-green">Green</label>
                                </div>
                            </div>
                        </div>
                        <div className="filter-widget">
                            <h4 className="fw-title">Size</h4>
                            <div className="fw-size-choose">
                                <div className="sc-item">
                                    <input type="radio" id="s-size" />
                                    <label htmlFor="s-size">s</label>
                                </div>
                                <div className="sc-item">
                                    <input type="radio" id="m-size" />
                                    <label htmlFor="m-size">m</label>
                                </div>
                                <div className="sc-item">
                                    <input type="radio" id="l-size" />
                                    <label htmlFor="l-size">l</label>
                                </div>
                                <div className="sc-item">
                                    <input type="radio" id="xs-size" />
                                    <label htmlFor="xs-size">xs</label>
                                </div>
                            </div>
                        </div>
                        <div className="filter-widget">
                            <h4 className="fw-title">Tags</h4>
                            <div className="fw-tags">
                                <a href="#">Towel</a>
                                <a href="#">Shoes</a>
                                <a href="#">Coat</a>
                                <a href="#">Dresses</a>
                                <a href="#">Trousers</a>
                                <a href="#">Men's hats</a>
                                <a href="#">Backpack</a>
                            </div>
                        </div>
                    
        </>
    )
}

export default HeaderCategorypage
