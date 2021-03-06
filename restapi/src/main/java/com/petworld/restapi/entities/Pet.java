package com.petworld.restapi.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.petworld.restapi.entities.enums.Sexo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data
@NoArgsConstructor @AllArgsConstructor
public class Pet {
    
    @ManyToOne
    private Clinica clinica;

    @ManyToOne
    private Cliente dono;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String especie;
    private String raca;
    private Boolean castrado;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    public Pet(String nome, String especie, String raca, Boolean castrado, Sexo sexo, Cliente dono) {
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.castrado = castrado;
        this.sexo = sexo;
        this.dono = dono;
    }
}
