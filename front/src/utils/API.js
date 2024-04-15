import axios from "axios";

const API_URL="http://localhost:27800/api/";

const AuthService = {
    login(username, password){
        return axios.post(API_URL + "auth/login",
            {
                "username": username,
                "password": password
        })
    },

    register(username, password, fio, email, phone, citizenship){
        return axios.post(API_URL + "auth/register",
            {
                "username": username,
                "password": password,
                "fio": fio,
                "email": email,
                "phone": phone,
                "citizenship": citizenship
        })
    },

    getInfo(){

        return axios.get(API_URL + "account/info",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
        })
    },

    changePassword(username, oldPassword, newPassword){

        return axios.post(API_URL + "account/changePassword",
            {
                "username": username,
                "oldPassword": oldPassword,
                "newPassword": newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
        })
    },

    updateUserInfo(username, fio, email, phone, citizenship){
        return axios.post(API_URL + "account/updateInfo",
            {
                "username": username,
                "password": "",
                "fio": fio,
                "email": email,
                "phone": phone,
                "citizenship": citizenship
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
    },

    delete(username){
        return axios.post(API_URL + "account/delete",
            {
                "username": username,
                "password": "",
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
    }
}

const ConstDataService = {
    getCitizenship(){
        return axios.get(API_URL + "staticData/getAllCitizenship")
    },
    getAnimalTypes(){
        return axios.get(API_URL + "staticData/getAnimalTypes")
    },
    getAllTravelPlace(){
        return axios.get(API_URL + "staticData/getAllTravelPlace")
    },
    getAllTravelType(){
        return axios.get(API_URL + "staticData/getAllTravelType")
    }
}

const AnimalService = {
    getAnimals(){

        return axios.get(API_URL + "animal/get",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
        })
    },
    addAnimal(name, type, sex, birth, image){
        const [day, month, year] = birth.split('.');
        return axios.post(API_URL + "animal/add",
            {
                "name": name,
                "type": type,
                "sex": sex,
                "birthday": new Date(`${year}-${month}-${day}`).toISOString(),
                "image": image
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            })
    },
    deleteAnimal(i){
        return axios.post(API_URL + `animal/delete/${i}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
    },
    updateAnimal(id, name, type, sex, birth){
        const [day, month, year] = birth.split('.');
        return axios.post(API_URL + "animal/update",
            {
                "id": id,
                "name": name,
                "type": type,
                "sex": sex,
                "birthday": new Date(`${year}-${month}-${day}`).toISOString(),
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    },

    uploadFile(name, animalId, data){
        return axios.post(API_URL + "animal/uploadDocument",
            {
                "name": name,
                "animalId": animalId,
                "data": data
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            })
    },
    deleteDocument(value) {
        return axios.post(API_URL + `animal/deleteDocument/${value}`,
            {
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    }
}

const TravelService = {
    getTravels(){
        return axios.get(API_URL + "travel/get",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
    },
    addTravel(from, to, departureDate, arrivalDate, travelType, animal) {
        const [day1, month1, year1] = departureDate.split('.');
        const [day2, month2, year2] = arrivalDate.split('.');
        return axios.post(API_URL + "travel/add",
            {
                "from": from,
                "to": to,
                "departureDate": new Date(`${year1}-${month1}-${day1}`).toISOString(),
                "arrivalDate": new Date(`${year2}-${month2}-${day2}`).toISOString(),
                "travelType": travelType,
                "animalId": animal,
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    },
    deleteTravel(value) {
        return axios.post(API_URL + `travel/delete/${value}`,
            {
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    },
    updateTravel(id, expense, time) {
        return axios.post(API_URL + `travel/update`,
            {
                "id": id,
                "expense": expense,
                "time": time
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
    }
}

export {AuthService, ConstDataService, AnimalService, TravelService};