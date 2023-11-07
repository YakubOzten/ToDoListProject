package com.example.YakubOzten.annotation;

import com.example.YakubOzten.data.repository.IToDoListRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

// LOMBOK
@RequiredArgsConstructor

// ConstraintValidator
public class UniqueEmailAddressValidation implements ConstraintValidator<AnnotationUniqueEmailAddress,String> {

    // INJECTION
    private final IToDoListRepository iToDoListRepository;

    @Override
    public void initialize(AnnotationUniqueEmailAddress constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    // DATABASE SORGUSU
    @Override
    public boolean isValid(String emailAddress, ConstraintValidatorContext constraintValidatorContext) {
//        Boolean isEmailAddress=iToDoListRepository.findByRegisterEmail(emailAddress).isPresent();
        //Eğer email address sistemde varsa
       /* if(isEmailAddress){
            return false;
        }*/
        return true;
    } //end isValid
} //end class
