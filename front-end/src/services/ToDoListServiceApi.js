import axios from 'axios';


// Const Persist Data
const ToDoList_URL = "/ToDoList/api";

class RegisterServicesApi {
    // SPEED DATA
    // http://localhost:8080/ToDoList/api/speed/data/5
    //@GetMapping("/speed/data/{id}")
    toDoListApiSpeedData(key) {
        return axios.get(ToDoList_URL + "/speed/data/" + key);
    }

    // ALL DELETE
    // http://localhost:8080/ToDoList/api/delete/all
    //@GetMapping("/delete/all")
    toDoListApiDeleteAll() {
        return axios.get(`${ToDoList_URL}/delete/all`);
    }

    // C R U D
    // CREATE   
    // http://localhost:8080/ToDoList/api/create
    // @PostMapping("create")
    toDoListApiCreate(toDoListDto) {
        return axios.post(`${ToDoList_URL}/create`, toDoListDto);
    }
    //LIST
    // http://localhost:8080/ToDoList/api/list
    //@GetMapping("list")
    toDoListApiList() {
        return axios.get(`${ToDoList_URL}/list`);
    }
    // FIND BY ID
    //http://localhost:8080/ToDoList/api/find/1
    //@GetMapping(value = "/find/{id}")
    toDoListApiFindById(id) {
        return axios.get(`${ToDoList_URL}/find/${id}`);
    }
    //UPDATE
    // http://localhost:8080/ToDoList/api/update/1
    // @PutMapping(value = "/update/{id}")
    toDoListApiUpdate(id, toDoListDto) {
        return axios.put(`${ToDoList_URL}/update/${id}`, toDoListDto);
    }
    // DELETE BY ID
    // http://localhost:8080/ToDoList/api/delete/1
    // @DeleteMapping(value = "/delete/{id}")
    toDoListApiDeleteById(id) {
        return axios.delete(`${ToDoList_URL}/delete/${id}`);
    }
}
// EXPORT
export default new RegisterServicesApi();
