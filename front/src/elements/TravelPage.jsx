import React, {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import LeftMenu from "./blocks/LeftMenu";
import TravelTable from "./blocks/TravelTable";
import {AnimalService, TravelService} from "../utils/API";
import TravelForm from "./blocks/TravelForm";
import Logout from "../utils/Logout";
import {useNavigate} from "react-router-dom";

const TravelPage = () => {
    const [travelInfo, setTravelInfo] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [travelForm, setTravelForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setNeedUpdate(false)
        TravelService.getTravels()
            .then(response => {
                setTravelInfo(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Logout(navigate, toast)
                } else {
                    toast.error(error.response.data.message);
                }
            });

    }, [needUpdate]);

    const triggerUpdate = () => {
        setNeedUpdate(true);
    }

    const triggerTravelForm = () => {
        setTravelForm(!travelForm);
    }

    return (
        <div className="container">
            <ToastContainer />
            <div className="left-column">
                <LeftMenu />
            </div>
            <div className="right-column">
                <p className="center header-text">История поездок</p>
                <div className="travel-table-container">
                    <TravelTable toast={toast} travels={travelInfo} callback={triggerUpdate}/>
                </div>
                {
                    travelInfo.length > 0 &&
                    (new Date(travelInfo[travelInfo.length-1].departureDate) > new Date()) && (
                        <div className="page-frame page-frame-mini">
                            <p className="center header-text">Чек-лист</p>
                            <ul className="plan-list">
                            {
                                travelInfo[travelInfo.length-1].travelType.plan.split("\n").map(
                                    point => {
                                        return (
                                            <li className="plan-item">{point}</li>
                                        )
                                    }
                                )
                            }
                            </ul>
                        </div>
                    )
                }
                {
                    !travelForm && (
                        <div className="button-container">
                            <button className="orange-btn" onClick={triggerTravelForm}>Добавить поездку</button>
                        </div>
                    )
                }
                {
                    travelForm && (
                        <div className={"page-frame page-frame-mini"}>
                            <TravelForm toast={toast} callback={triggerUpdate} close={triggerTravelForm}/>
                            <div className="button-container">
                                <button className="orange-btn" onClick={triggerTravelForm}>
                                    Закрыть
                                </button>
                            </div>
                        </div>

                    )
                }


            </div>
        </div>
    );
};

export default TravelPage;
