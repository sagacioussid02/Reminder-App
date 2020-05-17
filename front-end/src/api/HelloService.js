import Axios from "axios"

class HelloService{
    executeHelloService(){
        return Axios.get('http://localhost:8080/reminder')
    }
}

export default new HelloService()