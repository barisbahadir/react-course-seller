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

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: true
        }
    }

    componentDidMount() {
        console.log("Is Logged In: ", this.state.isLoggedIn)
    }


    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className='container'>
                    <Routes>
                        <Route exact path="/">

                        </Route>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
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