import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class HomePage extends Component {
    render() {
        return (
            <div>
                Home
                {console.log("Location", this.props.location)}
                {console.log("Location", this.props)}
                <Button variant="primary" onClick={() => console.log("Go to page")}>Primary</Button>{' '}
            </div>
        );
    }
}

export default HomePage;