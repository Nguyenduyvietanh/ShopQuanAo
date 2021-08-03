import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Signup from './user/Signup';
import Signin from './user/Signin';
import HomePage from "./page/home";
import NotFound from './page/notFound';
import ListCategory from './Admin/listCategory';
import HomeAdmin from './Admin/homeAdmin';
import AddCategory from './Admin/addCategory';
import UpdateCategory from './Admin/updateCategory';
import ListProduct from './Admin/listProduct';
import AddProduct from './Admin/addproduct';
import CategoryPage from "./page/categoryPage";
import DetailPage from "./page/detailPage";
import Updateproduct from './Admin/updateproduct';
import UserPage from './Admin/userPage';

const Routes = () => {

    return(
        
        <Router>
           
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} /> 
                <Route path="/categorypage" exact component={CategoryPage} />
                <Route path="/detailproductpage" exact component={DetailPage} />
                <Route path="/admin" exact component={HomeAdmin} />
                <Route path="/listcategory" exact component={ListCategory} />
                <Route path="/addcategory" exact component={AddCategory} />
                <Route path="/updatecategory" exact component={UpdateCategory} />
                <Route path="/listproduct" exact component={ListProduct} />
                <Route path="/addproduct" exact component={AddProduct} />
                <Route path="/updateproduct" exact component={Updateproduct} />
                <Route path="/userpage" exact component={UserPage} />
                <Route path="*" exact component={NotFound} />
            </Switch>
            
        </Router>
    )

}

export default Routes;