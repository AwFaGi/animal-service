import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {AnimalService, ConstDataService, TravelService} from "../../utils/API";
import Logout from "../../utils/Logout";
import {useNavigate} from "react-router-dom";

const TravelForm = ({ toast, callback, close }) => {

    const [departureDate, setDepartureDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);

    const [travelTypeList, setTravelTypeList] = useState([]);
    const [travelPlaceList, setTravelPlaceList] = useState([]);
    const [animalInfo, setAnimalInfo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        ConstDataService.getAllTravelType()
            .then(response => setTravelTypeList(response.data))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });
    }, []);

    useEffect(() => {
        ConstDataService.getAllTravelPlace()
            .then(response => setTravelPlaceList(response.data))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });
    }, []);

    useEffect(() => {
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

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const [from, to, departureDate, arrivalDate, travelType, animal] = event.target;

        if (
            [from, to, departureDate, arrivalDate, travelType, animal].some(
                (field) => field.value.trim() === ""
            )
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        TravelService.addTravel(
            from.value, to.value, departureDate.value, arrivalDate.value, travelType.value, animal.value
        ).then(
            response => {
                toast.info(response.data.message);
                callback();
                close();
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
    };

    return (
        <form className="travel-form" onSubmit={handleSubmit}>
            <div className="header-text center">
                <p className="flow-text">Добавление путешествия</p>
            </div>

            <div className="form-group">
                <select id="from" className="input-field" defaultValue="">
                    <option value="">Откуда</option>
                    {travelPlaceList.map(travelPlace => (
                        <option key={travelPlace.id} value={travelPlace.name}>{travelPlace.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <select id="to" className="input-field" defaultValue="">
                    <option value="">Куда</option>
                    {travelPlaceList.map(travelPlace => (
                        <option key={travelPlace.id} value={travelPlace.name}>{travelPlace.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <DatePicker
                    id={"departureDate"}
                    className="input-field"
                    placeholderText="Дата отправления"
                    selected={departureDate}
                    onChange={date => setDepartureDate(date)}
                    dateFormat="dd.MM.yyyy"
                />
            </div>

            <div className="form-group">
                <DatePicker
                    className="input-field"
                    placeholderText="Дата прибытия"
                    selected={arrivalDate}
                    onChange={date => setArrivalDate(date)}
                    dateFormat="dd.MM.yyyy"
                />
            </div>

            <div className="form-group">
                <select id="travelType" className="input-field" defaultValue="">
                    <option value="">Тип путешествия</option>
                    {travelTypeList.map(travelType => (
                        <option key={travelType.id} value={travelType.name}>{travelType.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <select id="animal" className="input-field" defaultValue="">
                    <option value="">Животное</option>
                    {animalInfo.map(animal => (
                        <option key={animal.id} value={animal.id}>{animal.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <button className="orange-btn">Добавить</button>
            </div>
        </form>
    );
};

export default TravelForm;