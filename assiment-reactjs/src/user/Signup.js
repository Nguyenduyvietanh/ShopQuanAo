import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom';
import { signUp } from '../auth';
import Footer from '../core/footer';
import Header from '../core/header';
const Signup = () => {
    const { register,handleSubmit, formState: { errors } } = useForm();
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState(false);

    
    const onSubmit = (data, e) => {
        signUp(data)
            .then(dataInput => {
                if(dataInput.error){
                    setError(dataInput.error);
                } else {
                    setError("");
                    setSuccess(true)
                }
                
            })
    }
    const showError = () => {
        return <div className="alert alert-danger text-center col-md-5 container-fluid" style={{display: error ? "block" : "none"}} >
            {error}
        </div>
    }
    const showSucces = () => {
        return <div className="alert alert-info text-center col-md-5 container-fluid" style={{display: success ? "block" : "none"}} >
            Bạn đã đăng kí thành công. <Link to="/">Trang Chủ</Link>
        </div>
    }
    const signUpForm = () => {
        return (
            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-form">
                                <h2>Đăng kí tài khoản</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="group-input">
                                        <label htmlFor="username">Họ và tên *</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            {...register('name')}  
                                        />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="pass">Email *</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            {...register('email')}
                                        />
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="pass">Password *</label>
                                        <input 
                                            type="password" 
                                            id="password"
                                            {...register('password')}
                                        />
                                    </div>
                                    <div className="group-input gi-check">
                                        <div className="gi-more">
                                            <label htmlFor="save-pass">
                                                Save Password
                                         <input type="checkbox" id="save-pass" />
                                                <span className="checkmark" />
                                            </label>    
                                            <a href="#" className="forget-pass">Forget your Password</a>
                                        </div>
                                    </div>
                                    <button type="submit" className="site-btn login-btn">Đăng Kí</button>
                                </form>
                                <div className="switch-login">
                                    <a href="/signup" className="or-login">Trang Chủ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div>
            <Header/>
            {showError()}
            {showSucces()}
            {signUpForm()}
            <Footer/>
           
        </div>
    )
}

export default Signup;