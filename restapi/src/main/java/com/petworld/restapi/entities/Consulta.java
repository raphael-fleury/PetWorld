package com.petworld.restapi.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data
@NoArgsConstructor @AllArgsConstructor
public class Consulta {
    
    @ManyToOne
    private Atendimento atendimento;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sintomas;
    private String prescricao;

    public Consulta(Atendimento atendimento, String sintomas, String prescricao) {
        this.atendimento = atendimento;
        this.sintomas = sintomas;
        this.prescricao = prescricao;
    }

}
