import React from 'react'
import Admin from './index'
import { Popconfirm, Button, Row, Col } from 'antd';

const UserPage = () => {
    // const [user, setUser] = useState([]);
    // const getUser = async () => {
    //     const result = await userApi.getAll();
    //     console.log(result);
    //     // setUser(result.data.categories)
    // }
    // useEffect(() => {
    //     getUser();
    // }, [])

    return (
        <>
            <Admin/>
            <div id="main-content">
                <h1 style={{ textAlign: 'center', color: 'red' }}> Danh sách User </h1>
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
                            <th scope="col">Tên User</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
           

                        <>
                            <tbody>
                                <tr>

                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Row gutter={[16, 16]}>
                                            <Col>
                                                <Button type="primary" >
                                                Update
                                                    {/* <Link to={`/updatecategory/${item._id}`}></Link> */}
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Popconfirm
                                                 
                                                ><Button type="danger" class="btn btn-danger btn-remove remove-product">Remove</Button>
                                                </Popconfirm>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>

                            </tbody>
                        </>
              
                </table>
            </div>
        </>
    )
}

export default UserPage
