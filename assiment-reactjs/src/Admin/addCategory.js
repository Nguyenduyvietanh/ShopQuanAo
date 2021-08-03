import React, { useState } from 'react'
import Admin from '../Admin/index'
import CategoryAPI from '../api/categoryAPI'
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router';

const AddCategory = () => {

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


    const onFinish = async (values) => {
        const formdata = new FormData();
        formdata.append("name", values.name);

        const result = await CategoryAPI.add(formdata);
        if (result.status === 200) {
            message.success('Thêm danh mục thành công !!!');
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
                <h1 style={{ textAlign: 'center', color: 'red' }}> Thêm Danh Mục </h1>
                <Form className="mt-5"
                    {...layout}
                    name="basic"
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

export default AddCategory
