package com.example.YakubOzten.controller.api.impl;

import com.example.YakubOzten.business.dto.ToDoListDto;
import com.example.YakubOzten.business.services.IToDoListServices;
import com.example.YakubOzten.controller.api.ITodoListApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2


@RestController
@RequestMapping("/ToDoList/api")
@CrossOrigin
public class ToDoListApiImpl implements ITodoListApi<ToDoListDto> {

    // Injection
    private  final IToDoListServices iToDoListServices;

    // SPEED DATA
    // http://localhost:8080/ToDoList/api/speed/data/5
    @Override
    @GetMapping("/speed/data/{id}")
    public ResponseEntity<List<ToDoListDto>> toDoListApiSpeedData(@PathVariable(name = "id") long key) {
        return ResponseEntity.ok(iToDoListServices.ToDoListServiceSpeedData(key));
    }

    // ALL DELETE
    // http://localhost:8080/ToDoList/api/delete/all
    @Override
    @GetMapping("/delete/all")
    public ResponseEntity<?> toDoListApiDeleteAll() {
        return ResponseEntity.ok(iToDoListServices.TodoListServiceDeleteAll());
    }
    // C R U D
    // CREATE
    // http://localhost:8080/ToDoList/api/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<?> toDoListApiCreate(@Valid @RequestBody ToDoListDto toDoListDto) {
        return ResponseEntity.ok(iToDoListServices.TodoListServiceCreate(toDoListDto));
    }
    //LIST
    // http://localhost:8080/ToDoList/api/list
    @Override
    @GetMapping("/list")
    public ResponseEntity<?> toDoListApiList() {
        return ResponseEntity.ok(iToDoListServices.TodoListServiceList());
    }
    // FIND BY ID
    //http://localhost:8080/ToDoList/api/find/1
    @Override
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?> toDoListApiFindById(@PathVariable(name = "id")   Long id) {
        return ResponseEntity.ok().body(iToDoListServices.ToDoListServiceFindById(id));
    }
    //UPDATE
    // http://localhost:8080/ToDoList/api/update/1
    @Override
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> toDoListApiUpdate(@PathVariable(name = "id")@Valid @RequestBody Long id, ToDoListDto toDoListDto) {
        return ResponseEntity.status(200).body(iToDoListServices.TodoListServiceUpdate(id,toDoListDto));
    }
    // DELETE BY ID
    // http://localhost:8080/ToDoList/api/delete/1
    @Override
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> toDoListApiDeleteById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(iToDoListServices.TodoListServiceDeleteById(id));
    }
}
