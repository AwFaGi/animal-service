import React from 'react';
import {Link} from "react-router-dom";

const LeftMenu = () => {

    const username = localStorage.getItem("username");

    return (
        <div>
            <p className="center username">{username}</p>
            <Link to="/account" className="btn">Личный кабинет</Link>
            <Link to="/travels" className="btn">Мои поездки</Link>
            <Link to="/map" className="btn">Карта</Link>
            <Link to="/help" className="btn">Справка</Link>
        </div>
    );
};

export default LeftMenu;
