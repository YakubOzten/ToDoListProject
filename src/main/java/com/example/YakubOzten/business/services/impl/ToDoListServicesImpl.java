package com.example.YakubOzten.business.services.impl;


import com.example.YakubOzten.bean.ModelMapperBeanClass;
import com.example.YakubOzten.bean.PasswordEncoderBeanClass;
import com.example.YakubOzten.business.dto.ToDoListDto;
import com.example.YakubOzten.business.services.IToDoListServices;
import com.example.YakubOzten.data.entity.ToDoListEntity;
import com.example.YakubOzten.data.repository.IToDoListRepository;
import com.example.YakubOzten.exception.Resource404NotFoundException;
import com.example.YakubOzten.exception.YakubOztenException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

@Service
public class ToDoListServicesImpl implements IToDoListServices<ToDoListDto, ToDoListEntity> {

    // Injection
    private  final IToDoListRepository iToDoListRepository;
    private  final ModelMapperBeanClass modelMapperBeanClass;
    ////////////////////////////////////////////////////////////
    // MODEL MAPPER
    @Override
    public ToDoListDto entityToDto(ToDoListEntity toDoListEntity) {
        return modelMapperBeanClass.modelMapperMethod().map(toDoListEntity, ToDoListDto.class);
    }

    @Override
    public ToDoListEntity dtoToEntity(ToDoListDto toDoListDto) {
        return modelMapperBeanClass.modelMapperMethod().map(toDoListDto,ToDoListEntity.class);
    }
    //SPEED DATA
    @Override
    public List<ToDoListDto> ToDoListServiceSpeedData(long key) {
        List<ToDoListDto>toDoListDtoList=new ArrayList<>();
        ToDoListEntity toDoListEntity=null;
        for (int i=1;i<=key;i++){
          toDoListEntity=ToDoListEntity.builder()
                  .name("todo-name"+i)
                  .IsDone(false)
                  .build();
         iToDoListRepository.save(toDoListEntity);
          toDoListDtoList.add(entityToDto(toDoListEntity));
        }
        return toDoListDtoList;
    }
    //////////////////////////////////////////////////////////////////////////////////

//DELETE ALL
    @Override
    public String TodoListServiceDeleteAll() {
        iToDoListRepository.deleteAll();
        System.out.println(iToDoListRepository.findAll().toString());

        return iToDoListRepository.findAll().toString();
    }
//FIND NAME
    @Override
    public ToDoListDto TodoListServiceFindByName(String name) {
        Optional<ToDoListEntity> toDoListEntity=iToDoListRepository.findByName(name);
        ToDoListDto toDoListDto=entityToDto(toDoListEntity.get());
        if(toDoListDto != null){
        return toDoListDto;
        }
        return null;
    }

    //CREATE
    @Override
    @Transactional
    public ToDoListDto TodoListServiceCreate(ToDoListDto toDoListDto) {
        if (toDoListDto != null){
        ToDoListEntity toDoListEntity=dtoToEntity(toDoListDto);
        iToDoListRepository.save(toDoListEntity);
        toDoListDto.setId(toDoListDto.getId());
        toDoListDto.setSystemDate(toDoListDto.getSystemDate());
        return toDoListDto;
        }
        return  null;
    }
//LIST
    @Override
    public List<ToDoListDto> TodoListServiceList() {
        Iterable<ToDoListEntity>ToDolistEntityIterable=iToDoListRepository.findAll();
        List<ToDoListDto>toDoDtoList=new ArrayList<>();
        for (ToDoListEntity entity:ToDolistEntityIterable){
            toDoDtoList.add(entityToDto(entity));
        }
        toDoDtoList.forEach(System.out::println);
        return toDoDtoList;
    }
//FINDBYID
    @Override
    public ToDoListDto ToDoListServiceFindById(Long id) {
//        Optional<ToDoListEntity> toDoListEntity=iToDoListRepository.findById(id);
        ToDoListEntity toDoListEntity = null;
        if (id != null) {
            toDoListEntity = iToDoListRepository.findById(id).orElseThrow
                    (() -> new Resource404NotFoundException(id + "Nolu id yoktur."));
        } else if (id == null) {
            throw new YakubOztenException("id null olarak geldi");
        }

        return entityToDto(toDoListEntity);
    }
//UPDATE
    @Override
    @Transactional
    public ToDoListDto TodoListServiceUpdate(Long id, ToDoListDto toDoListDto) {
        // FIND
        ToDoListDto toDoListfindDto= ToDoListServiceFindById(id);
      ToDoListEntity toDoListEntity=null;
      if (toDoListfindDto != null){
          toDoListEntity=dtoToEntity(toDoListDto);
          toDoListEntity.setId(id);
          toDoListEntity.setName(toDoListDto.getName());
          toDoListEntity.setIsDone(toDoListDto.getIsDone());
          iToDoListRepository.save(toDoListEntity);
      }

        return entityToDto(toDoListEntity);
    }
//DELETE BY ID
    @Override
    @Transactional
    public ToDoListDto TodoListServiceDeleteById(Long id) {
        ToDoListDto toDoListfindDto=ToDoListServiceFindById(id);
        if (toDoListfindDto!= null){
            iToDoListRepository.deleteById(id);
        }

        return toDoListfindDto;
    }
}//End Class Services
