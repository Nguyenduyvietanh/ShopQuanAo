import React, { useEffect, useState } from 'react'
import { Input, Form, Select, InputNumber, Button, Upload, message } from 'antd';
import ProductAPI from '../api/productAPI';
import Admin from './index';
import CategoryAPI from '../api/categoryAPI';
import { useHistory } from 'react-router';

const Updateproduct = (props) => {
    const [idParam, setIdParam] = useState(null);
    const [category, setCategory] = useState([]);
    const [isImgFalse, setIsImgFalse] = useState(false);
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: '',
        },
    ]);
    const { Option } = Select;
    const { TextArea } = Input;
    const { location } = props;
    let history = useHistory();

    const [fields, setFields] = useState([
        {
            name: ['name'],
            value: '',
        },
        {
            name: ['description'],
            value: '',
        },
        {
            name: ['price'],
            value: '',
        },
        {
            name: ['category'],
            value: '',
        },
        {
            name: ['quantity'],
            value: '',
        },
    ]);
    useEffect(() => {
        let id = location.state;
        setIdParam(id);
        getDetail(id);
        getCategory();


    }, [location, location.state])
    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 10
        }
    };
    const getCategory = async () => {
        const result = await CategoryAPI.getAll()
        setCategory(result.data.categories)
    }
    const getDetail = async (id) => {
        const result = await ProductAPI.get(id);
        if (result.status == 200) {
            setFields([
                {
                    name: ['name'],
                    value: result.data.name,
                },
                {
                    name: ['description'],
                    value: result.data.description,
                },
                {
                    name: ['price'],
                    value: result.data.price,
                },
                {
                    name: ['category'],
                    value: result.data.category,
                },
                {
                    name: ['quantity'],
                    value: result.data.quantity,
                },
            ]);
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: result.data.photo,
                },
            ]);
        }

    }

    const onFinish = async (values) => {
        if (fileList && fileList.length < 1) {
            setIsImgFalse(true);
            return;
        }
        let imgBase64 = fileList[0].uid === '-1' ? fileList[0].url : fileList[0].thumbUrl;
        const product = new FormData();
        product.append("name", values.name);
        product.append("price", values.price);
        product.append("description", values.description);
        product.append("quantity", values.quantity);
        product.append("category", values.category);
        product.append("photo", imgBase64);
        const result = await ProductAPI.update(idParam, product);
        if (result.status == 200) {
            message.success('Sửa sản phẩm thành công !!!');
            history.push('/listproduct');
        }
    };

    const onChange = ({ fileList: newFileList }) => {
        if (fileList && fileList.length > 0) {
            setIsImgFalse(false);
        }
        if (newFileList[0] && newFileList[0].status === 'error') {
            newFileList[0].status = 'done';
        }
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const onlyNumber = (e) => {
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
        }
    }

    return (
        <>
            <Admin />
            <div id="main-content">
                <h1 style={{ textAlign: 'center', color: 'red' }}> Sửa Danh Mục </h1>
                <Form className="mt-5" name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    fields={fields}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                min: 3,
                                required: true,
                                message:
                                    'Vui lòng nhập tên sản phẩm. (Tên danh mục phải có ít nhất 3 kí tự ) (*) '
                            }
                        ]}
                    >
                        <Input placeholder="Nhập tên sản phẩm ..." />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả sản phẩm. (*) '
                            }
                        ]}
                    >
                        <TextArea placeholder="Nhập mô tả sản phẩm ..." />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm. (*) '
                            }
                        ]}
                    >
                        <Input onKeyPress={onlyNumber} placeholder="Nhập giá sản phẩm ..." />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy chọn danh mục sản phẩm'
                            }
                        ]}
  
                    >
                        <Select placeholder="Danh mục">
                            {category.map(item =>
                                <>
                                    <Option value={item._id}>{item.name}</Option>
                                </>

                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Số lượng">
                        <Form.Item
                         name="quantity" 
                         noStyle
                         rules={[
                            {
                                required: true,
                                message: 'Hãy nhập số lượng sản phẩm'
                            }
                        ]}
                         >
                            <Input onKeyPress={onlyNumber}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="photo"
                        label="Ảnh sản phẩm"
                        extra="Chọn ảnh sản phẩm"
                    >
                        <Upload fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview} maxCount="1" listType="picture-card">
                            {/* <Button icon={<UploadOutlined />}>Tải ảnh lên</Button> */}
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                        {isImgFalse && <span className="text-danger">Hãy chọn ảnh sản phẩm</span>}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 12,
                            offset: 6
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}

export default Updateproduct
