import React from 'react';
import { Link } from 'react-router';

const HomePage = (props) => (
    <React.Fragment>
        <header>
            <Link to="/" className="header-logo"> Mini Facebook</Link>
        </header>
        <div className="homepage-layout" >
            {props.children}
        </div>
    </React.Fragment>
);

export default HomePage;