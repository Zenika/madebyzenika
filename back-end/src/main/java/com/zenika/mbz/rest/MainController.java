package com.zenika.mbz.rest;

import com.zenika.mbz.repository.GenericRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;


public abstract class MainController<T> extends AbstractController {

    protected abstract GenericRepository<T> getRepository();

    @RequestMapping(method = GET)
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public T findById(@PathVariable("id") String id) {
        return getRepository().findById(id);
    }

    @RequestMapping(method = GET, params = "name")
    public List<T> findByName(@RequestParam("name") String name) {
        return getRepository().findByName(name);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public T save(@Valid @RequestBody T entity) {
        return getRepository().save(entity);
    }

    @RequestMapping(value = "/list", consumes = "application/json", method = POST)
    public List<T> saveAll(@RequestBody List<T> entities) {
        return getRepository().save(entities);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public T update(@PathVariable("id") String id, @Valid @RequestBody T entity) {
        return getRepository().update(id, entity);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void delete(@PathVariable("id") String id) {
        getRepository().delete(id);
    }
}
