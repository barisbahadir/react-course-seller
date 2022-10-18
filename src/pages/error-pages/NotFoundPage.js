import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            404!
                        </span>
                        <div className="mb-4 lead">
                            Page not found!
                        </div>
                        <Link to="/" className="btn btn-link">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;