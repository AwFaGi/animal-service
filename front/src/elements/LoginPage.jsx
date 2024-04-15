import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../utils/API";
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    function doLogin(event){
        event.preventDefault();
        const [username, password] = event.target;

        if(username.value.trim() === "" || password.value.trim() === ""){
            toast.error('Поля не должны быть пустыми!');
            return;
        }

        if(username.value.indexOf(" ") >= 0 || password.value.indexOf(" ") >= 0){
            toast.error('Поля не должны содержать пробелов!');
            return;
        }

        AuthService.login(username.value, password.value)
            .then(result => {
                if (result.status === 200){
                    localStorage.setItem("token", result.data.jwtToken);
                    localStorage.setItem("username", result.data.username);
                    navigate('/account', {replace: true});
                    toast.info('Авторизация прошла успешно');
                }
            }).catch(reason => {
                if ( reason.response !== undefined && reason.response.status === 400){
                    toast.error(reason.response.data.message)
                } else {
                    toast.error('Ошибка авторизации!\nПопробуйте позже');
                }

            });
    }

    return (
        <div className="page-frame">
            <ToastContainer />
            <div className="whiten">
                <form className="login-form" onSubmit={doLogin}>

                    <div className="header-text center">
                        <p className="flow-text">Путешествия<br/>с питомцами</p>
                    </div>

                    <div className="form-group">
                        <input id="login" type="text" className="input-field" placeholder="Логин" />
                    </div>

                    <div className="form-group">
                        <input id="password" type="password" className="input-field" placeholder="Пароль" />
                    </div>

                    <div className="form-group">
                        <button className="orange-btn" type="submit" name="action">Вход</button>
                    </div>
                </form>
                <div>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <button className="orange-btn">Регистрация</button>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;