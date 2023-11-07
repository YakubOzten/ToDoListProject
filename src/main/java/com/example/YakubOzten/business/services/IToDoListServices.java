package com.example.YakubOzten.business.services;

import java.util.List;

// D: Dto
// E: Entity
public interface IToDoListServices <D,E> {
    // MODEL MAPPER
    public D entityToDto(E e);
    public E dtoToEntity(D d);

    //SPEED DATA
    public  List<D> ToDoListServiceSpeedData(long key);

    //ALL DELETE
    public  String TodoListServiceDeleteAll();

    ////////////////////////////////////////////////////////////
    // REGISTER C R U D
    // CREATE
    public  D TodoListServiceCreate(D d);
    //LIST
    public List<D> TodoListServiceList();

    //FIND
    public D ToDoListServiceFindById(Long id);

    //UPDATE
    public D TodoListServiceUpdate(Long id,D d);

    //DELETE
    public  D TodoListServiceDeleteById(Long id);
}
