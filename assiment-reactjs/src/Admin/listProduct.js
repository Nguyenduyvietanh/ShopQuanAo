import React, { useEffect, useState } from 'react'
import Admin from '../Admin/index'
import ProductAPI from '../api/productAPI';
import CategoryAPI from '../api/categoryAPI';
import { useHistory } from 'react-router-dom';
import { Popconfirm, Button, Row, Col } from 'antd';
const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let history = useHistory();
    useEffect(() => {
        getProduct();
        getCategory();
    }, [])

    const getProduct = async () => {
        const result = await ProductAPI.getAll();
        setProducts(result.data)
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
    const handleOk = async (item) => {
        setConfirmLoading(true);
        const result = await ProductAPI.remove(item._id);
        if (result.status === 200) {
            getProduct();
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
    };
    const update = (item) => {
        history.push('/updateproduct', item._id);
    }
    return (
        <>
            <Admin />
            <div id="main-content">
            <h1 style={{textAlign: 'center', color: 'red'}}>  Sản Phẩm </h1>
                <div className="row">
                    <div className="col-10">
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <a href="/addproduct" className="btn btn-primary">Thêm mới Sản Phẩm</a>
                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col">Ảnh sản phẩm</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    {products.map((item, index) =>
                        
                        <>
                            <tbody>
                                <tr>

                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td> <img src={item.photo} style={{width: 70, height: 70}} alt /> </td>
                                    <td>{getNameCategory(item.category)}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <Row gutter={[16, 16]}>
                                                <Col>
                                                    <Button type="primary" onClick={() => update(item)}>
                                                        Update
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Popconfirm
                                                        title={`Bạn có chắc muốn xóa: "${item.name}" `}
                                                        onConfirm={() => handleOk(item)}
                                                        okButtonProps={{ loading: confirmLoading }}
                                                        onCancel={handleCancel}
                                                    ><Button type="danger" class="btn btn-danger btn-remove remove-product">Remove</Button>
                                                    </Popconfirm>
                                                </Col>
                                        </Row>
                                    </td>
                                </tr>

                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </>
    )
}

export default ListProduct
