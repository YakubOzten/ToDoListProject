package com.example.YakubOzten.data.repository;

import com.example.YakubOzten.data.entity.ToDoListEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IToDoListRepository extends CrudRepository<ToDoListEntity,Long> {

    Optional<ToDoListEntity> findByName (String name);
}
