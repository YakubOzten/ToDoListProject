package com.example.YakubOzten.data.entity;

import com.example.YakubOzten.data.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;

@Data
@Log4j2
@AllArgsConstructor
@NoArgsConstructor
@Builder

// ENTITY
@Entity
@Table(name = "todolist")
public class ToDoListEntity extends BaseEntity implements Serializable {
    // Serileştirme
    public static final long serialVersionUID=1L;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "IsDone")
    private Boolean IsDone=false;

}
