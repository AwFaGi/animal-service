import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthService, ConstDataService} from "../utils/API";
import { ToastContainer, toast } from 'react-toastify';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [citizenshipOptions, setCitizenshipOptions] = useState([]);

    useEffect(() => {
        ConstDataService.getCitizenship()
            .then((response) => {
                setCitizenshipOptions(response.data);
            })
            .catch((error) => {
                toast.error("Ошибка обращения к серверу");
            });
    }, []);

    function doRegister(event){
        event.preventDefault();
        const { login, fio, citizenship, email, phone, password } = event.target;

        if (
            [login, citizenship, email, phone, password].some((field) => field.value.trim() === "")
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        if (
            [login, citizenship, email, phone, password].some((field) => field.value.includes(" "))
        ) {
            toast.error("Поля не должны содержать пробелов!");
            return;
        }

        AuthService.register(login.value, password.value, fio.value, email.value, phone.value, citizenship.value)
            .then((response) => {
                if (response.status === 200) {
                    toast.info("Регистрация прошла успешно");
                    setTimeout(() => {
                        navigate("/login", {replace: true});
                    }, 2000);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Ошибка регистрации. Попробуйте позже");
                }
            });

        event.preventDefault();
    }

    return (
        <div className="page-frame">
            <ToastContainer />
            <div className="whiten">
                <form className="login-form" onSubmit={doRegister}>

                    <div className="header-text center">
                        <p className="flow-text">Регистрация</p>
                    </div>

                    <div className="form-group">
                        <input id="login" type="text" className="input-field" placeholder="Логин" />
                    </div>

                    <div className="form-group">
                        <input id="fio" type="text" className="input-field" placeholder="ФИО" />
                    </div>

                    <div className="form-group">
                        <select id="citizenship" className="input-field">
                            <option value="">Выберите гражданство</option>
                            {citizenshipOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <input id="email" type="email" className="input-field" placeholder="E-mail" />
                    </div>

                    <div className="form-group">
                        <input
                            id="phone"
                            type="tel"
                            pattern="[0-9]{11}"
                            title="11 цифр номера телефона"
                            className="input-field"
                            placeholder="Номер телефона"
                        />
                    </div>

                    <div className="form-group">
                        <input id="password" type="password" className="input-field" placeholder="Пароль" />
                    </div>

                    <div className="form-group">
                        <button className="orange-btn" type="submit" name="action">Зарегистрироваться</button>
                    </div>
                </form>
                <div>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button className="orange-btn">Войти</button>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default RegisterPage;