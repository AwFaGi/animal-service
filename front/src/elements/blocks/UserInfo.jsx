import React from 'react';

const UserInfo = ({userInfo}) => {
    return (
        <div className="center gray">
            <p>Логин: <span className="bold-text">{userInfo.username}</span></p>
            <p>ФИО: <span className="bold-text">{userInfo.fio}</span></p>
            <p>Гражданство: <span className="bold-text">{userInfo.citizenship.name}</span></p>
            <p>Email: <span className="bold-text">{userInfo.email}</span></p>
            <p>Номер: <span className="bold-text">{userInfo.phone}</span></p>
        </div>
    );
};

export default UserInfo;
