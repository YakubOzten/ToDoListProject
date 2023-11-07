package com.example.YakubOzten.data.repository;

import com.example.YakubOzten.data.entity.ToDoListEntity;
import org.springframework.data.repository.CrudRepository;

public interface IToDoListRepository extends CrudRepository<ToDoListEntity,Long> {
}
