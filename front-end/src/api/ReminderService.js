import Axios from "axios"

class ReminderService{
    retrieveReminders(name){
        return Axios.get(`http://localhost:8080/reminders/${name}`)
    }

    retrieveReminder(name, id){
        return Axios.get(`http://localhost:8080/reminder/${name}/${id}`)
    }

    deleteReminder(username, id){
        return Axios.delete(`http://localhost:8080/reminders/${username}/delete/${id}`)
    }

    updateReminder(username, id, reminder){
        return Axios.put(`http://localhost:8080/reminders/${username}`, {reminder},
            {
                headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
    }

    addReminder(username, reminder){
        return Axios.post(`http://localhost:8080/reminders/${username}`, {reminder})
    }
}

export default new ReminderService()