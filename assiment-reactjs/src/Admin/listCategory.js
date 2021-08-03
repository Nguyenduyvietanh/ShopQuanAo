import React, { useEffect, useState } from 'react'
import CategoryAPI from '../api/categoryAPI'
import Admin from '../Admin/index'
import {  useHistory } from 'react-router-dom';
import { Popconfirm, Button, Row, Col } from 'antd';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);

    let history = useHistory();

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        const result = await CategoryAPI.getAll();
        setCategories(result.data.categories)
    }

    const updateProduct = (item) => {
        console.log(item._id);
    }

    // const showPopconfirm = () => {
    // };

    const handleOk = async (item) => {
        setConfirmLoading(true);
        const result = await CategoryAPI.remove(item._id);
        if (result.status === 200) {
            getCategory();
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
    };

    const update = (item) => {
        history.push('/updatecategory', item._id);
    }

    return (
        <>
            <Admin />


            <div id="main-content">
                <h1 style={{ textAlign: 'center', color: 'red' }}>  Danh Mục  </h1>
                <div className="row">
                    <div className="col-10">
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <a href="/addcategory" className="btn btn-primary">Thêm mới danh mục</a>
                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên danh mục sản phẩm</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {categories.map((item, index) =>

                        <>
                            <tbody>
                                <tr>

                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Row gutter={[16, 16]}>
                                            <Col>
                                                <Button type="primary" onClick={() => update(item)}>
                                                Update
                                                    {/* <Link to={`/updatecategory/${item._id}`}></Link> */}
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Popconfirm
                                                    title={`Bạn có chắc muốn xóa ${item.name}`}
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

export default ListCategory
