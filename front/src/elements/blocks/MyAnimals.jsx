import React, {useState} from 'react';
import {AnimalService} from "../../utils/API";
import UpdateAnimalForm from "./UpdateAnimalForm";
import Logout from "../../utils/Logout";
import {useNavigate} from "react-router-dom";

const MyAnimals = ({ toast, animalInfo, callback }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [updateAnimalForm, setUpdateAnimalForm] = useState(false);
    const [uploadDocForm, setUploadDocForm] = useState(false);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleNext = () => {
        if (currentIndex < animalInfo.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
        setUpdateAnimalForm(false);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
        setUpdateAnimalForm(false);
    };

    const handleDelete = () => {
        const animalId = animalInfo[currentIndex].id;
        AnimalService.deleteAnimal(animalId)
            .then(() => {
                toast.success('Питомец успешно удален');
                callback();
                setCurrentIndex(0);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });
    };

    const triggerUpdateAnimal = () => {
        setUpdateAnimalForm(!updateAnimalForm);
    }

    const triggerUploadDocument = () => {
        setUploadDocForm(!uploadDocForm);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file.size > 512*1024) {
            toast.error("Размер файла не должен превышать 512 Кб");
            event.target.value = null;
            setFile(null);
            return;
        }
        setFile(event.target.files[0]);
    };

    const handleDocumentDelete = (value) => {
        AnimalService.deleteDocument(
            value
        ).then(() => {
            toast.success('Документ удалён');
            callback();
            setCurrentIndex(0);
        })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });
    }

    const sendDocument = (event) => {
        event.preventDefault();

        const [name] = event.target;

        if (name.value.includes(" ")){
            toast.error("Поля не должны содержать пробелов!");
            return;
        }

        if (name.value.trim() === ""){
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        if (file == null){
            toast.error("Вы не загрузили файл!");
            return;
        }

        AnimalService.uploadFile(
            name.value, animalInfo[currentIndex].id, file
        ).then(
            response => {
                toast.info(response.data.message);
                callback();
                setUploadDocForm(false);
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
        <div>
            {animalInfo.length > 0 && (
                <div className="center">
                    <div className="button-container">
                        <button className="orange-btn nav" onClick={handlePrevious}>←</button>
                        <div key={animalInfo[currentIndex].id}>
                            <img
                                className="animal-image"
                                src={animalInfo[currentIndex].image ? `data:image/jpeg;base64, ${animalInfo[currentIndex].image}` : "http://localhost:27800/sample_avatar.jpg"}
                                alt="Фото животного"
                            />
                            <p>Id: <span className="bold-text">{animalInfo[currentIndex].id}</span></p>
                            <p>Имя: <span className="bold-text">{animalInfo[currentIndex].name}</span></p>
                            <p>Вид: <span className="bold-text">{animalInfo[currentIndex].animalType.name}</span></p>
                            <p>Пол: <span className="bold-text">{animalInfo[currentIndex].sex}</span></p>
                            <p>
                                Дата рождения:&nbsp;
                                <span className="bold-text">
                                    {new Date(animalInfo[currentIndex].dateOfBirth).toLocaleDateString()}
                                </span>
                            </p>

                        </div>
                        <button className="orange-btn nav" onClick={handleNext}>→</button>
                    </div>
                    {
                        animalInfo[currentIndex].documents.length > 0 && (
                            <div className="animal-documents">
                                <p style={{fontSize: "larger"}}>Документы питомца</p>
                                {animalInfo[currentIndex].documents.map(document => (
                                    <div key={document.id} className="document">
                                        <div className="button-container">
                                            <p className="document-name">{document.name}</p>
                                            <button
                                                className="orange-btn"
                                                onClick={e => handleDocumentDelete(document.id)}
                                            >Удалить</button>
                                        </div>
                                        <img
                                            src={`data:image/jpeg;base64, ${document.data}`}
                                            alt="Document"
                                            className="animal-image"
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    }

                    <div className="button-container">
                        <button className="orange-btn" onClick={triggerUpdateAnimal}>Обновить данные</button>
                        <button className="orange-btn" onClick={triggerUploadDocument}>Загрузить документ</button>
                        <button className="orange-btn" onClick={handleDelete}>Удалить</button>
                    </div>
                </div>
            )}
            {
                updateAnimalForm && (
                    <div className="page-frame page-frame-mini">
                        <UpdateAnimalForm
                            toast={toast}
                            animal={animalInfo[currentIndex]}
                            clearAnimalsToUpdate={callback}
                            closeUpdateAnimal={triggerUpdateAnimal}
                        />
                        <div className="button-container">
                            <button className="orange-btn" onClick={triggerUpdateAnimal}>Отмена</button>
                        </div>
                    </div>
                )
            }
            {
                uploadDocForm && (
                    <div className="page-frame page-frame-mini">
                        <form className="login-form" onSubmit={sendDocument}>

                            <div className="header-text center">
                                <p className="flow-text">Добавление документа</p>
                            </div>

                            <div className="form-group">
                                <input id="name" type="text" className="input-field" placeholder="Название" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Изображение</label>
                                <input type="file" id="image" accept="image/*" className="input-field" onChange={handleFileChange} />
                            </div>

                            <div className="form-group">
                                <button className="orange-btn">Добавить</button>
                            </div>

                        </form>
                        <div className="button-container">
                            <button className="orange-btn" onClick={triggerUploadDocument}>Отмена</button>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default MyAnimals;
