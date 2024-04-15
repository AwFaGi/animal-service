import React, {useEffect, useState} from 'react';
import {AnimalService, ConstDataService} from "../../utils/API";
import DatePicker from 'react-datepicker';
import {useNavigate} from "react-router-dom";
import Logout from "../../utils/Logout";
import {toast} from "react-toastify";

const NewAnimalForm = ({clearAnimalsToUpdate, closeAddAnimal, toast}) => {
    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [animalTypeList, setAnimalTypeList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        ConstDataService.getAnimalTypes()
            .then(response => setAnimalTypeList(response.data))
            .catch(error => console.error("Error fetching animal types:", error));
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file.size > 512*1024) {
            toast.error("Размер файла не должен превышать 512 Кб");
            event.target.value = null;
            return;
        }

        setFile(event.target.files[0]);

    };

    const sendAnimal = (event) => {
        event.preventDefault();

        const [name, type, sex, birth, image] = event.target;

        if (
            [sex, birth].some((field) => field.value.includes(" "))
        ) {
            toast.error("Поля не должны содержать пробелов!");
            return;
        }

        if (
            [name, type, sex, birth].some((field) => field.value.trim() === "")
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        console.log(file);

        AnimalService.addAnimal(
            name.value, type.value, sex.value, birth.value, file
        ).then(
            response => {
                toast.info(response.data.message);
                clearAnimalsToUpdate();
                closeAddAnimal();
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
        <form className="login-form" onSubmit={sendAnimal}>

            <div className="header-text center">
                <p className="flow-text">Добавление питомца</p>
            </div>

            <div className="form-group">
                <input id="name" type="text" className="input-field" placeholder="Имя" />
            </div>

            <div className="form-group">
                <select id="type" className="input-field" defaultValue="">
                    <option value="" disabled>Выберите вид</option>
                    {animalTypeList.map(animalType => (
                        <option key={animalType.id} value={animalType.name}>{animalType.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <select id="sex" className="input-field">
                    <option value="">Выберите пол</option>
                    <option value="M">Мужской</option>
                    <option value="Ж">Женский</option>
                </select>
            </div>

            <div className="form-group">
                <DatePicker
                    id="birth"
                    className="input-field"
                    placeholderText="Дата рождения"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="dd.MM.yyyy"
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Изображение</label>
                <input type="file" id="image" accept="image/*" className="input-field" onChange={handleFileChange} />
            </div>

            <div className="form-group">
                <button className="orange-btn">Добавить</button>
            </div>
        </form>
    );
};

export default NewAnimalForm;
