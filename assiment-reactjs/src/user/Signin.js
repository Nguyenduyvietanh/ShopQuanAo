import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom';
import { signIn, authenticate } from '../auth';
import Swal from 'sweetalert2'
import Header from '../core/header';
import Footer from '../core/footer';
const SignIn = () => {
    const { register,handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);


    const onSubmit = (data) => {
        setLoading(true);
        signIn(data)
        
            .then(dataUser => {
                if(dataUser.error){
                    setError(dataUser.error);
                    setLoading(false);
                } else {
                    authenticate(dataUser, () => { 
                        Swal.fire({
                            position: 'center-center',
                            icon: 'success',
                            title: 'Đăng nhập thành công !!!',
                            showConfirmButton: false,
                            timer: 2500
                          })
                        history.push('/')
                    }) 
                   
                }
                
            })
    }
    const showError = () => {
        return <div className="alert alert-danger text-center col-md-5 container-fluid" style={{display: error ? "block" : "none"}} >
            {error}
        </div>
    }
    const showLoading = () => {
        return loading && <div className="alert alert-info">
                    <h2>...loadingg</h2>
             </div>
    }
    const signInForm = () => {
        return (
            
            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="login-form">
                                <h2>Đăng Nhập</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <button type="submit" className="site-btn login-btn">Đăng Nhập</button>
                                </form>
                                <div className="switch-login">
            
                                    <a href="/signup" className="or-login">Bạn chưa có tài khoản? Click để đăng kí.</a>
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
            {showLoading()}
            {signInForm()}
            <Footer/>
           
        </div>
    )
}

export default SignIn;