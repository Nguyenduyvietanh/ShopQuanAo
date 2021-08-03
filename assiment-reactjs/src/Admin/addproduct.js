import React, { useEffect, useState } from 'react'
import Admin from '../Admin/index'
import CategoryAPI from '../api/categoryAPI'
import ProductApi from '../api/productAPI'
import { useForm } from 'react-hook-form'
import firebase from 'firebase'
import { firebaseConfig } from '../firebbase/index'
import { message } from 'antd';
import { useHistory } from 'react-router';

 const AddProduct = () => {
    let history = useHistory();
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategories(result.data.categories)
    }

    const onSubmit = async (data) => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const productImage = data.photo[0];
        console.log(productImage);
        let storageRef = firebase.storage().ref(`images/${productImage.name}`);   
        storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then(async (url) => {
            const product = new FormData();
            product.append("name", data.name);
            product.append("price", data.price);
            product.append("description", data.description);
            product.append("quantity", data.quantity);
            product.append("category", data.category);
            product.append("photo", url);

            const result= await ProductApi.add(product)
            if(result.status == 200) {
                message.success('Thêm sản phẩm thành công !!!');
                history.push('/listproduct');
            }
           
            })     
        })      
    };
    return (
        <>
            <Admin />
            <div id="main-content">
                <h1 style={{ textAlign: 'center', color: 'red' }}> Thêm Sản Phẩm  </h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <div className="col-12 mb-3">
                            <label htmlFor="name">Tên sản phẩm <b className="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập tên sản phẩm" 
                                id="product-name" className="form-control"
                                {...register('name', { required: true, maxLength: 30 })}
                             />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="description">Mô tả sản phẩm <b className="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập mô tả sản phẩm" 
                                id="product-description" 
                                className="form-control"
                                {...register('description', { required: true })} 
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="price">Giá sản phẩm <b className="text-danger">*</b></label>
                            <input type="text" placeholder="Nhập giá sản phẩm" 
                                id="product-price" 
                                className="form-control"
                                {...register('price', { required: true})}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="price">Chọn Danh mục <b className="text-danger">*</b></label>
                            <select className="custom-select form-control"
                                id="category"
                                name="category"
                                {...register("category", { required: true })}
                            >
                                <option selected>Chọn Danh Mục ...</option>
                                {categories.map((ele) => (
                                    <option key={ele._id} value={ele._id}>{ele.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="col-12 mb-3">
                                <label htmlFor="quantity">Số lượng sản phẩm <b className="text-danger">*</b></label>
                                <input type="number" placeholder="Nhập số lượng sản phẩm" 
                                    id="product-quantity" 
                                    className="form-control" 
                                    {...register('quantity', { required: true})}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="file">Ảnh sản phẩm <b className="text-danger">*</b></label>
                                <input type="file" placeholder 
                                id="product-image" 
                                className="form-control" 
                                {...register('photo', { required: true})}
                                />
                            </div>
                            <div className="col-12">
                                <input type="submit" className="btn btn-primary w-100" Value="Thêm sản phẩm mới" />
                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </>
    )
}

export default AddProduct
