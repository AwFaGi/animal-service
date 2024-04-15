import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthService, ConstDataService} from "../../utils/API";

const ChangeUserInfo = ({toast, userInfo}) => {
    const navigate = useNavigate();

    const [citizenship, setCitizenship] = useState(userInfo.citizenship.name.toString());
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

    function doUpdate(event){
        event.preventDefault();
        const { fio, citizenship, email, phone } = event.target;

        if (
            [citizenship, email, phone].some((field) => field.value.trim() === "")
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        if (
            [email, phone].some((field) => field.value.includes(" "))
        ) {
            toast.error("Поля не должны содержать пробелов!");
            return;
        }

        AuthService.updateUserInfo(userInfo.username, fio.value, email.value, phone.value, citizenship.value)
            .then((response) => {
                if (response.status === 200) {
                    toast.info("Обновлено");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Ошибка регистрации. Попробуйте позже");
                }
            });
    }

    return (
        <form className="login-form" onSubmit={doUpdate}>

            <div className="header-text center">
                <p className="flow-text">Обновление данных</p>
            </div>

            <div className="form-group">
                <input
                    id="fio"
                    type="text"
                    className="input-field"
                    placeholder="ФИО"
                    defaultValue={userInfo.fio}
                />
            </div>

            <div className="form-group">
                <select
                    id="citizenship"
                    className="input-field"
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                >
                    <option value="">Выберите гражданство</option>
                    {citizenshipOptions.map((option) => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <input
                    id="email"
                    type="email"
                    className="input-field"
                    placeholder="E-mail"
                    defaultValue={userInfo.email}
                />
            </div>

            <div className="form-group">
                <input
                    id="phone"
                    type="tel"
                    pattern="[0-9]{11}"
                    title="11 цифр номера телефона"
                    className="input-field"
                    placeholder="Номер телефона"
                    defaultValue={userInfo.phone}
                />
            </div>

            <div className="form-group">
                <button className="orange-btn" type="submit" name="action">Подтвердить</button>
            </div>
        </form>
    );

}

export default ChangeUserInfo;