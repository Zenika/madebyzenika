package com.zenika.mbz.rest;

import java.util.Iterator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.ui.ModelMap;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;


public class MainController{

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ModelMap handleMethodArgumentNotValidException(MethodArgumentNotValidException error) {
        List errors = error.getBindingResult().getFieldErrors();
        ModelMap map = new ModelMap();
        ModelMap errorMap = new ModelMap();
        map.addAttribute("hasErrors", Boolean.valueOf(true));
        Iterator var5 = errors.iterator();

        while(var5.hasNext()) {
            FieldError fieldError = (FieldError)var5.next();
            errorMap.addAttribute(fieldError.getField(), fieldError.getDefaultMessage());
        }

        map.addAttribute("bindingErrors", errorMap);
        return map;
    }
}
