import './App.css';
import React, {Component} from 'react';
import NavBar from './components/NavBar';
import HomePage from './pages/home/HomePage';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './pages/error-pages/NotFoundPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/login/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminPage from './pages/admin/AdminPage';
import UnauthorizedPage from './pages/error-pages/UnauthorizedPage';
import {AuthGuard} from "./guard/AuthGuard";
import {Role} from "./models/role";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        console.log("Is Logged In: ", this.state.isLoggedIn);
    }

    getAuthorizedUserPages = (component) => {
        return <AuthGuard roles={[Role.ADMIN, Role.USER]}>
            {component}
        </AuthGuard>
    };

    getAuthorizedAdminPages = (component) => {
        return <AuthGuard roles={[Role.ADMIN]}>
            {component}
        </AuthGuard>
    }

    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className='container'>
                    <Routes>

                        //Every user can be access
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>

                        //User and Admin can be access
                        <Route path="/profile" element={this.getAuthorizedUserPages(<ProfilePage/>)}/>

                        //Only Admin can be access
                        <Route path="/admin" element={this.getAuthorizedAdminPages(<AdminPage/>)}/>

                        <Route path="/404" element={<NotFoundPage/>}/>
                        <Route path="/401" element={<UnauthorizedPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;