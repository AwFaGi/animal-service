import React, {useEffect, useState} from 'react';
import {AnimalService, AuthService} from "../utils/API";
import { ToastContainer, toast } from 'react-toastify';
import LeftMenu from "./blocks/LeftMenu";
import MyAnimals from "./blocks/MyAnimals";
import UserInfo from "./blocks/UserInfo";
import NewAnimalForm from "./blocks/NewAnimalForm";
import ChangePassword from "./blocks/ChangePassword";
import ChangeUserInfo from "./blocks/ChangeUserInfo";
import Logout from "../utils/Logout";
import {useNavigate} from "react-router-dom";

const AccountPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [animalInfo, setAnimalInfo] = useState([]);
    const [animalAddForm, setAnimalAddForm] = useState(false);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const [updateUserInfoForm, setUpdateUserInfoForm] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        AuthService.getInfo()
            .then(response => setUserInfo(response.data))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.data.message);
                }
            });
    }, []);

    useEffect(() => {
        setNeedUpdate(false);
        AnimalService.getAnimals()
            .then(response => {
                setAnimalInfo(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });

    }, [needUpdate]);

    const clearAnimalsToUpdate = () => {
        setNeedUpdate(true);
    }

    const triggerChangePassword = () => {
        setChangePasswordForm(!changePasswordForm);
    }

    const triggerUpdateUserInfo = () => {
        setUpdateUserInfoForm(!updateUserInfoForm);
    }

    const removeAccount = () => {
        if (window.confirm('Последствия необратимы. Вы уверены?')) {
            AuthService.delete(userInfo.username)
                .then(response => {
                    toast.info(response.data.message);
                    Logout(navigate, toast)
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        Logout(navigate, toast)
                    } else {
                        toast.error(error.response.data.message);
                    }
                });
        } else {

        }
    }

    const addAnimal = () => {
        setAnimalAddForm(true);
    }
    const closeAddAnimal = () => {
        setAnimalAddForm(false);
    }

    return (
        <div className="container">
            <ToastContainer />
            <div className="left-column">
                <LeftMenu />
            </div>
            <div className="right-column">
                <p className="center header-text">Личный кабинет</p>
                {userInfo && (
                    <div>
                        <UserInfo userInfo={userInfo}/>
                        <div className="button-container">
                            <button className="orange-btn" onClick={triggerChangePassword}>Сменить пароль</button>
                            <button className="orange-btn" onClick={triggerUpdateUserInfo}>Обновить данные</button>
                            <button className="orange-btn" onClick={removeAccount}>Удалить профиль</button>
                        </div>
                    </div>
                )}

                {
                    changePasswordForm && (
                        <div className="page-frame page-frame-mini">
                            <ChangePassword toast={toast} username={userInfo.username} />
                            <div className="button-container">
                                <button className="orange-btn" onClick={triggerChangePassword}>Отмена</button>
                            </div>
                        </div>
                    )
                }

                {
                    updateUserInfoForm && (
                        <div className="page-frame page-frame-mini">
                            <ChangeUserInfo toast={toast} userInfo={userInfo} />
                            <div className="button-container">
                                <button className="orange-btn" onClick={triggerUpdateUserInfo}>Отмена</button>
                            </div>
                        </div>
                    )
                }

                <p className="center header-text">Мои питомцы</p>
                <MyAnimals toast={toast} animalInfo={animalInfo} callback={clearAnimalsToUpdate}/>

                {!animalAddForm &&
                    <div className="button-container">
                        <button className="orange-btn" onClick={addAnimal}>Добавить нового питомца</button>
                    </div>
                }

                {animalAddForm &&
                    <div className="page-frame page-frame-mini">
                        <NewAnimalForm
                            clearAnimalsToUpdate={clearAnimalsToUpdate}
                            closeAddAnimal={closeAddAnimal}
                            toast={toast}
                        />
                        <div className="button-container">
                            <button className="orange-btn" onClick={closeAddAnimal}>Закрыть</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default AccountPage;
