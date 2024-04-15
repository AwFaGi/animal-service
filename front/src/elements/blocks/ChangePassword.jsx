import React from 'react';
import {AuthService} from "../../utils/API";
import {useNavigate} from "react-router-dom";
import Logout from "../../utils/Logout";
import {toast} from "react-toastify";

const ChangePassword = ({username, toast}) => {

    const navigate = useNavigate();

    const changePassword = (event) => {
        event.preventDefault();

        const [oldPassword, newPassword] = event.target;

        if (
            [oldPassword, newPassword].some((field) => field.value.trim() === "")
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        AuthService.changePassword(
            username, oldPassword.value, newPassword.value
        ).then(
            response => {
                toast.info(response.data.message);
                setTimeout(() => {
                    navigate("/login", {replace: true});
                }, 2000);
            }
        ).catch(

            error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            }
        )
    }

    return (
        <form className="login-form" onSubmit={changePassword}>
            <div className="header-text center">
                <p className="flow-text">Смена пароля</p>
            </div>

            <div className="form-group">
                <input id="oldPassword" type="password" className="input-field" placeholder="Старый пароль" />
            </div>

            <div className="form-group">
                <input id="newPassword" type="password" className="input-field" placeholder="Новый пароль" />
            </div>

            <div className="form-group">
                <button className="orange-btn">Изменить</button>
            </div>
        </form>
    );
};

export default ChangePassword;
