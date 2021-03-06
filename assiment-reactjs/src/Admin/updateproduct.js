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
            message.success('S???a s???n ph???m th??nh c??ng !!!');
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
                <h1 style={{ textAlign: 'center', color: 'red' }}> S???a Danh M???c </h1>
                <Form className="mt-5" name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    fields={fields}
                >
                    <Form.Item
                        label="T??n s???n ph???m"
                        name="name"
                        rules={[
                            {
                                min: 3,
                                required: true,
                                message:
                                    'Vui l??ng nh???p t??n s???n ph???m. (T??n danh m???c ph???i c?? ??t nh???t 3 k?? t??? ) (*) '
                            }
                        ]}
                    >
                        <Input placeholder="Nh???p t??n s???n ph???m ..." />
                    </Form.Item>
                    <Form.Item
                        label="M?? t???"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p m?? t??? s???n ph???m. (*) '
                            }
                        ]}
                    >
                        <TextArea placeholder="Nh???p m?? t??? s???n ph???m ..." />
                    </Form.Item>
                    <Form.Item
                        label="Gi??"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p gi?? s???n ph???m. (*) '
                            }
                        ]}
                    >
                        <Input onKeyPress={onlyNumber} placeholder="Nh???p gi?? s???n ph???m ..." />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Danh m???c"
                        rules={[
                            {
                                required: true,
                                message: 'H??y ch???n danh m???c s???n ph???m'
                            }
                        ]}
  
                    >
                        <Select placeholder="Danh m???c">
                            {category.map(item =>
                                <>
                                    <Option value={item._id}>{item.name}</Option>
                                </>

                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="S??? l?????ng">
                        <Form.Item
                         name="quantity" 
                         noStyle
                         rules={[
                            {
                                required: true,
                                message: 'H??y nh???p s??? l?????ng s???n ph???m'
                            }
                        ]}
                         >
                            <Input onKeyPress={onlyNumber}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="photo"
                        label="???nh s???n ph???m"
                        extra="Ch???n ???nh s???n ph???m"
                    >
                        <Upload fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview} maxCount="1" listType="picture-card">
                            {/* <Button icon={<UploadOutlined />}>T???i ???nh l??n</Button> */}
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                        {isImgFalse && <span className="text-danger">H??y ch???n ???nh s???n ph???m</span>}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 12,
                            offset: 6
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            X??c nh???n
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}

export default Updateproduct
