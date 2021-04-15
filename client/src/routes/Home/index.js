import React from 'react';
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <>
            <div className="main">
                <h1>Open-Source URL Shortener!</h1>
                <h3>Non-profit, no hassle, simplistic & fun personal project</h3>
                <img
                    src={process.env.PUBLIC_URL + "/undraw_open_source_1qxw.svg"}
                    alt="illustration"
                />
                <div className="cta">
                    <Link to="/shorten">
                        <button>Shorten!</button>
                    </Link>
                    <Link to="/stats">
                        <button>See Stats!</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Index;
