import React, {Component, useEffect, useState} from 'react'
import User from "../../models/user";
import {Alert} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../../services/authentication-service";
import {ErrorMessageText} from "../../common/Contants";
import './RegisterPage.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

function RegisterPage() {

    const [user, setUser] = useState(new User('', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user)

    const navigate = useNavigate();
    //mounted
    useEffect(() => {
        if (currentUser && currentUser.id)
            navigate('/profile');
    }, []);

    const handleChange = (e) => {
        const {name, value} = value.target;

        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }))
    }

    const handleRegister = () => {
        setSubmitted(true);

        //validation
        if (!user.username || !user.password || !user.name) {
            return;
        }

        setLoading(true);
        AuthenticationService.register(user).then(_ => {
            navigate('/login');
        }).catch(error => {
            console.log('Register User Response has Error: ', error);
            setErrorMessage(ErrorMessageText(error.response.status));
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
                    <FontAwesomeIcon icon={faUser} className='ms-auto me-auto user-icon'/>
                    {
                        errorMessage != '' && <div className="alert alert-danger mt-2">
                            {errorMessage}
                        </div>
                    }

                    Deneme
                </div>
            </div>
        </>

    );
}

export default RegisterPage;


// class RegisterPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: false,
//             user: new User('', '', ''),
//             submitted: false,
//             errorMessage: ''
//         }
//     }
//
//     const currentUser = useSelector(state => state.user);
//
//     componentDidMount() {
//
//     }
//
//     setIsLoading = (loadingStatus) => {
//         this.setState({isLoading: loadingStatus});
//     }
//
//     setUser = (user) => {
//         this.setState({user: user});
//     }
//
//     checkErrors = () => {
//         return <Alert variant="danger">
//             <Alert.Heading>Error!</Alert.Heading>
//             <div>
//                 Username or password incorrect!
//             </div>
//         </Alert>;
//     }
//
//     render() {
//         return (
//             <>
//                 {this.checkErrors()}
//                 <div>RegisterPage</div>
//             </>
//
//         )
//     }
// }
//
// export default RegisterPage;
