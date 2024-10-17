import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
const Home = () => {
    return (
        <div>
        <h1>Home</h1>
            <Link to="/login">
                <Button label="Login" className="p-button-raised" />
            </Link>
        </div>
    );
    }

export default Home;