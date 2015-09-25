package com.zenika.mbz.rest;

import org.springframework.http.HttpStatus;
import org.springframework.ui.ModelMap;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;


public abstract class AbstractController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ModelMap handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<FieldError> errors = exception.getBindingResult().getFieldErrors();
        ModelMap map = new ModelMap();
        ModelMap errorMap = new ModelMap();
        map.addAttribute("hasErrors", Boolean.TRUE);

        for (FieldError fieldError : errors) {
            errorMap.addAttribute(fieldError.getField(), fieldError.getDefaultMessage());
        }

        map.addAttribute("bindingErrors", errorMap);
        return map;
    }
}
