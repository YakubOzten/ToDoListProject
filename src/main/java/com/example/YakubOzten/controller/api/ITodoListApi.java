package com.example.YakubOzten.controller.api;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITodoListApi<D> {
    // SPEED DATA
    public ResponseEntity<List<D>> toDoListApiSpeedData(long key);

    // ALL DELETE
    public ResponseEntity<?>toDoListApiDeleteAll();
    // FIND NAME
    public ResponseEntity<?> toDoListApiFindByName(String name);

    ////////////////////////////////////////////////////////////
    // C R U D
    // CREATE
    public ResponseEntity<?>toDoListApiCreate(D d);
    // LIST
    public ResponseEntity<?>toDoListApiList();
    // FIND
    public ResponseEntity<?>toDoListApiFindById(Long id);
    // UPDATE
    public ResponseEntity<?>toDoListApiUpdate(Long id,D d);
    // DELETE
    public ResponseEntity<?>toDoListApiDeleteById(Long id);
}
