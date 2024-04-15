import React, {useEffect, useState} from 'react';
import {AnimalService, ConstDataService} from "../../utils/API";
import DatePicker from 'react-datepicker';
import {useNavigate} from "react-router-dom";
import Logout from "../../utils/Logout";
import {toast} from "react-toastify";

const UpdateAnimalForm = ({animal, clearAnimalsToUpdate, closeUpdateAnimal, toast}) => {
    const [animalTypeList, setAnimalTypeList] = useState([]);
    const [startDate, setStartDate] = useState(animal.dateOfBirth);
    const [animalType, setAnimalType] = useState(animal.animalType.name);

    const navigate = useNavigate();

    useEffect(() => {
        ConstDataService.getAnimalTypes()
            .then(response => setAnimalTypeList(response.data))
            .catch(error => console.error("Error fetching animal types:", error));
    }, []);

    const sendAnimal = (event) => {
        event.preventDefault();

        const [name, type, sex, birth] = event.target;

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

        AnimalService.updateAnimal(
            animal.id, name.value, type.value, sex.value, birth.value
        ).then(
            response => {
                toast.info(response.data.message);
                clearAnimalsToUpdate();
                closeUpdateAnimal();
            }
        ).catch(
            error => {
                console.log(error);
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
                <p className="flow-text">Изменение питомца</p>
            </div>

            <div className="form-group">
                <input
                    id="name"
                    type="text"
                    className="input-field"
                    placeholder="Имя"
                    defaultValue={animal.name}
                />
            </div>

            <div className="form-group">
                <select
                    id="type"
                    className="input-field"
                    value={animalType}
                    onChange={event => setAnimalType(event.target.value)}
                >
                    <option value="" >Выберите вид</option>
                    {animalTypeList.map(animalType => (
                        <option key={animalType.id} value={animalType.name}>{animalType.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <select id="sex" className="input-field" defaultValue={animal.sex}>
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
                <button className="orange-btn">Обновить</button>
            </div>
        </form>
    );
};

export default UpdateAnimalForm;
