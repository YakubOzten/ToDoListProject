package com.example.YakubOzten.business.dto;

import com.example.YakubOzten.audit.AuditingAwareBaseDto;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;

@Log4j2
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ToDoListDto extends AuditingAwareBaseDto implements Serializable {

    // Serileştirme
    public static final Long serialVersionUID=1L;

    @NotEmpty(message = "{ToDoList.name.validation.constraints.NotNull.message}")
    private  String name;

    @Builder.Default //default olarak kullanıcı pasif olsun admin bunu aktif yapsın
    private Boolean IsDone=false;
}
