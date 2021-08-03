import React, { useEffect, useState } from 'react'
import Admin from '../Admin/index'
import CategoryAPI from '../api/categoryAPI'
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router';

const UpdateCategory = (props) => {
    const [idParam, setIdParam] = useState(null);
    const [fields, setFields] = useState([
        {
          name: ['name'],
          value: '',
        },
      ]);

      const {location} = props;

    useEffect(() => {
        console.log(location.state);
        let id = location.state;
        setIdParam(id);
        getDetail(id);
    }, [location, location.state])

    let history = useHistory();

    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 10,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 11,
            span: 6,
        },
    };

    const getDetail = async (id) => {
        const result = await CategoryAPI.get(id);
        if (result.status === 200) {
            setFields([
                {
                  name: ['name'],
                  value: result.data.name,
                },
              ]);
        }
    }


    const onFinish = async (values) => {
        const formdata = new FormData();
        formdata.append("name", values.name);

        const result = await CategoryAPI.update(idParam, formdata);
        console.log(result);
        if (result.status === 200) {
            message.success('Sửa sản phẩm thành công !!!');
            history.push('/listcategory');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Admin />
            <div id="main-content">
                <h1 style={{ textAlign: 'center', color: 'red' }}> Sửa Danh Mục </h1>
                <Form className="mt-5"
                    {...layout}
                    name="basic"
                    fields={fields}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[
                            {   
                                min: 3,
                                required: true,
                                message: 'Vui lòng nhập tên danh mục. (Tên danh mục phải có ít nhất 3 kí tự ) (*) ' 
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" className="" htmlType="submit">
                            Xác Nhận
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}

export default UpdateCategory

