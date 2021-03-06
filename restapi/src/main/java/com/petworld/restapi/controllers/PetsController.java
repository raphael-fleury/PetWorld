package com.petworld.restapi.controllers;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;
import javax.validation.Valid;

import com.petworld.restapi.entities.Clinica;
import com.petworld.restapi.entities.Pet;
import com.petworld.restapi.models.detailed.PetDetailed;
import com.petworld.restapi.models.insert.PetInsert;
import com.petworld.restapi.models.response.AtendimentoResponse;
import com.petworld.restapi.models.response.ConsultaResponse;
import com.petworld.restapi.models.response.ExameResponse;
import com.petworld.restapi.models.response.PetResponse;
import com.petworld.restapi.models.update.PetUpdate;
import com.petworld.restapi.repositories.ClientesRepository;
import com.petworld.restapi.repositories.ClinicasRepository;
import com.petworld.restapi.repositories.PetsRepository;
import com.petworld.restapi.services.AtendimentosService;
import com.petworld.restapi.services.ConsultasService;
import com.petworld.restapi.services.ExamesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/pets")
public class PetsController {

    private final Long CLINICA_ID = 1L;

    @Autowired private PetsRepository repository;
    @Autowired private ClientesRepository clientesRepository;
    @Autowired private ClinicasRepository clinicasRepository;
    
    @Autowired private AtendimentosService atendimentosService;
    @Autowired private ConsultasService consultasService;
    @Autowired private ExamesService examesService;

    @GetMapping
    public Page<PetDetailed> getAll(Pageable pageable) {
        return PetDetailed.page(repository.findByClinicaId(CLINICA_ID, pageable));
    }

    @GetMapping("/nome/{nome}")
    public List<PetDetailed> getByName(@PathVariable String nome) {
        return PetDetailed.list(repository.findByNomeContainsIgnoreCaseAndClinicaId(nome, CLINICA_ID));
    }

    @GetMapping("/{id}")
    @Cacheable(value = "getPet", key = "#id")
    public ResponseEntity<PetDetailed> getById(@PathVariable Long id) {
        var pet = repository.findByIdAndClinicaId(id, CLINICA_ID);

        if (pet == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(new PetDetailed(pet));
    }

    @PostMapping @Transactional
    public ResponseEntity<?> post(@RequestBody @Valid PetInsert form, UriComponentsBuilder uriBuilder) {
        Pet pet; Clinica clinica;
        
        try {
            pet = repository.save(form.toEntity(clientesRepository));
            clinica = clinicasRepository.findById(CLINICA_ID).get();
        }
        catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        }        

        pet.setClinica(clinica);

        URI uri = uriBuilder.path("/pets/{id}").buildAndExpand(pet.getId()).toUri();
        return ResponseEntity.created(uri).body(new PetResponse(pet));
    }

    @PutMapping("/{id}") @Transactional
    @CacheEvict(value = "getPet", key = "#id")
    public ResponseEntity<PetResponse> put(@PathVariable Long id, @RequestBody @Valid PetUpdate form) {
        var pet = repository.findByIdAndClinicaId(id, CLINICA_ID);

        if (pet == null)
            return ResponseEntity.notFound().build();
        
        return ResponseEntity.ok(new PetResponse(form.update(pet)));
    }

    @DeleteMapping("/{id}") @Transactional
    @CacheEvict(value = "getPet", key = "#id")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        var pet = repository.findByIdAndClinicaId(id, CLINICA_ID);

        if (pet == null)
            return ResponseEntity.notFound().build();
        
        repository.delete(pet);
        return ResponseEntity.ok(new PetResponse(pet));
    }

    @GetMapping("/{id}/atendimentos")
    public Page<AtendimentoResponse> getAtendimentos(@PathVariable Long id, Pageable pageable) {
        return atendimentosService.findByPet(id, CLINICA_ID, pageable);
    }

    @GetMapping("/{id}/consultas")
    public Page<ConsultaResponse> getConsultas(@PathVariable Long id, Pageable pageable) {
        return consultasService.findByPet(id, CLINICA_ID, pageable);
    }

    @GetMapping("/{id}/exames")
    public Page<ExameResponse> getExames(@PathVariable Long id, Pageable pageable) {
        return examesService.findByPet(id, CLINICA_ID, pageable);
    }
}
