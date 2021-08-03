import React from 'react'

const Admin = () => {
    
    return (
        <>

            <div className="sidebar">
                <div className="logo"><a href="/admin" className="simple-text logo-normal">
                    <img src="img/logo1.jpg" alt />
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-itemm ">
                            <a className="nav-link" href="/listcategory">
                                <i className="material-icons">library_books</i>
                                <p>Danh Mục</p>
                            </a>
                        </li>
                        <li className="nav-itemm ">
                            <a className="nav-link" href="/listproduct">
                                <i className="material-icons">content_paste</i>
                                <p>Sản phẩm</p>
                            </a>
                        </li>
                        <li className="nav-itemm ">
                            <a className="nav-link" href="/userpage">
                                <i className="material-icons">language</i>
                                <p>User</p>
                            </a>
                        </li>
                        <li className="nav-itemm ">
                            <a className="nav-link" href="#/contacts">
                                <i className="material-icons">notifications</i>
                                <p>Quản lý liên hệ</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-panel">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div className="container-fluid">
                        <div className="navbar-wrapper">
                            <a id="title" className="navbar-brand" href>Dashboard</a>
                        </div>
                        <div className="collapse navbar-collapse justify-content-end" >
                            <div>
                                
                                <ul className="navbar-nav">
                                    <li className="nav-itemm">
                                        <a className="nav-link" href>
                                            <i className="material-icons">dashboard</i>
                                            <p className="d-lg-none d-md-block">
                                                Stats
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-itemm dropdown">
                                        <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="material-icons">notifications</i>
                                            <span className="notification">5</span>
                                            <p className="d-lg-none d-md-block">
                                                Some Actions
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-itemm dropdown">
                                        <a href="/" className="nav-link" id="logout">
                                            Trang bán hàng
                                        </a>
                                    </li>
                                    <li className="nav-itemm dropdown">
                                        <a href="#" className="nav-link" id="logout">
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </nav>
                {/* End Navbar */}
                
            </div>
            
            


        </>
    )
}

export default Admin
