import React, {useState} from 'react';
import {TravelService} from "../../utils/API";
import Logout from "../../utils/Logout";
import {useNavigate} from "react-router-dom";
import TravelUpdate from "./TravelUpdate";

const TravelTable = ({ travels, toast, callback }) => {

    const navigate = useNavigate();
    const [showUpdate, setShowUpdate] = useState(false);
    const [travelId, setTravelId] = useState(0);

    const onDelete = (value) => {
        TravelService.deleteTravel(
            value
        ).then(
            response => {
                toast.info(response.data.message);
                callback();
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

    const triggerShowUpdate = () => {
        setShowUpdate(!showUpdate)
    }

    const onEdit = (value) => {
        setTravelId(value);
        triggerShowUpdate()
    }

    return (
        <div>
            <table className="travel-table">
                <thead>
                <tr>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Отправление</th>
                    <th>Прибытие</th>
                    <th>Тип поездки</th>
                    <th>Животное</th>
                    <th>Расходы</th>
                    <th>Время</th>
                    <th>Изменение</th>
                    <th>Удаление</th>
                </tr>
                </thead>
                <tbody>
                {travels.map(travel => (
                    <tr key={travel.id}>
                        <td>{travel.from.name}</td>
                        <td>{travel.to.name}</td>
                        <td>{new Date(travel.departureDate).toLocaleDateString()}</td>
                        <td>{new Date(travel.arrivalDate).toLocaleDateString()}</td>
                        <td>{travel.travelType.name}</td>
                        <td>{travel.animal.name}</td>
                        <td>{travel.expenses}</td>
                        <td>{travel.time}</td>
                        <td className="action-buttons">
                            <button className="edit" onClick={() => onEdit(travel.id)}>Edit</button>
                        </td>
                        <td className="action-buttons">
                            <button className="delete" onClick={() => onDelete(travel.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {
                showUpdate && (
                    <TravelUpdate
                        travel={travels.filter(e => e.id === travelId)[0]}
                        close={triggerShowUpdate}
                        callback={callback}
                        toast={toast}
                    />
                )
            }
        </div>

    );
}

export default TravelTable;