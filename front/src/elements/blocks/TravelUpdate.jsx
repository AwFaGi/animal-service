import React from "react";
import {TravelService} from "../../utils/API";
import Logout from "../../utils/Logout";
import {useNavigate} from "react-router-dom";

const TravelUpdate = ({travel, close, toast, callback}) => {

    const navigate = useNavigate();

    const doUpdate = (event) => {
        event.preventDefault();
        const [expense, time] = event.target;

        if (
            [expense, time].some((field) => field.value.includes(" "))
        ) {
            toast.error("Поля не должны содержать пробелов!");
            return;
        }

        if (
            [expense, time].some((field) => field.value.trim() === "")
        ) {
            toast.error("Поля не должны быть пустыми!");
            return;
        }

        TravelService.updateTravel(
            travel.id, expense.value, time.value
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
    }

    return (
        <div className="page-frame page-frame-mini">
            <form className="login-form" onSubmit={doUpdate}>

                <div className="header-text center">
                    <p className="flow-text">Изменение поездки</p>
                </div>

                <div className="form-group">
                    <input
                        id="expense"
                        type="text"
                        className="input-field"
                        placeholder="Расходы"
                        defaultValue={travel.expenses}
                    />
                </div>

                <div className="form-group">
                    <input
                        id="expense"
                        type="text"
                        className="input-field"
                        placeholder="Время"
                        defaultValue={travel.time}
                    />
                </div>

                <div className="form-group">
                    <button className="orange-btn" type="submit" name="action">Обновить</button>
                </div>
            </form>
            <div>
                <button className="orange-btn" type="submit" name="action" onClick={close}>Закрыть</button>
            </div>
        </div>
    )
}

export default TravelUpdate;