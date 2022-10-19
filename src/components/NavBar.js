import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentUser} from "../store/actions/user-actions";
import {useNavigate} from "react-router-dom";
import {Role} from "../models/role";

function NavBar() {

    // const currentUser = {
    //     username: "Leo",
    //     password: "Leo",
    //     name: "Leo",
    //     role: Role.ADMIN
    // };

    const currentUser = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Course Seller</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {
                            currentUser && <>
                                <Nav.Link href="/profile">{currentUser.name}</Nav.Link>
                            </>
                        }
                        {
                            !currentUser && <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        }
                        {
                            currentUser && currentUser.role === Role.ADMIN &&
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        }
                    </Nav>
                    {
                        currentUser && <>
                            <Navbar.Text>
                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={() => logout()}
                                >Logout: {currentUser.username}</a>
                            </Navbar.Text>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;