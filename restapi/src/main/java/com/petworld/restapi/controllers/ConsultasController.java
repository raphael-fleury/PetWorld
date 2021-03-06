package com.petworld.restapi.controllers;

import java.net.URI;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.petworld.restapi.models.detailed.ConsultaDetailed;
import com.petworld.restapi.models.insert.ConsultaInsert;
import com.petworld.restapi.models.update.ConsultaUpdate;
import com.petworld.restapi.services.ConsultasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/consultas")
public class ConsultasController {
    
    private final Long CLINICA_ID = 1L;

    @Autowired private ConsultasService service;

    @GetMapping("/{id}")
    @Cacheable(value = "getConsulta", key = "#id")
    public ResponseEntity<ConsultaDetailed> getById(@PathVariable Long id) {
        var detailed = service.findById(id, CLINICA_ID);

        if (detailed == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(detailed);
    }

    @PostMapping @Transactional
    public ResponseEntity<ConsultaDetailed> post(@RequestBody @Valid ConsultaInsert form, UriComponentsBuilder uriBuilder) { 
        var detailed = service.insert(form, CLINICA_ID);
        URI uri = uriBuilder.path("/consultas/{id}").buildAndExpand(detailed.getId()).toUri();
        return ResponseEntity.created(uri).body(detailed);
    }

    @PutMapping("/{id}") @Transactional
    @CacheEvict(value = "getConsulta", key = "#id")
    public ResponseEntity<ConsultaDetailed> put(@PathVariable Long id, @RequestBody @Valid ConsultaUpdate form) {
        var detailed = service.update(id, CLINICA_ID, form);
        return ResponseEntity.ok(detailed);
    }

    @DeleteMapping("/{id}") @Transactional
    @CacheEvict(value = "getConsulta", key = "#id")
    public ResponseEntity<ConsultaDetailed> delete(@PathVariable Long id) {
        var detailed = service.delete(id, CLINICA_ID);
        return ResponseEntity.ok(detailed);
    }
}
