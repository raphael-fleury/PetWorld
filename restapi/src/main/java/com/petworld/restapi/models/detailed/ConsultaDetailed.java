package com.petworld.restapi.models.detailed;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.petworld.restapi.entities.Consulta;
import com.petworld.restapi.models.response.PetResponse;
import com.petworld.restapi.models.response.VeterinarioResponse;

import org.springframework.data.domain.Page;

import lombok.Getter;

@Getter
public class ConsultaDetailed {
    
    private Long id;
    private Date data;
    private String sintomas;
    private String prescricao;
    
    private VeterinarioResponse veterinario;
    private PetResponse pet;

    public ConsultaDetailed(Consulta consulta) {
        id = consulta.getId();
        data = consulta.getAtendimento().getData();
        sintomas = consulta.getSintomas();
        prescricao = consulta.getPrescricao();
        veterinario = new VeterinarioResponse(consulta.getAtendimento().getVeterinario());
        pet = new PetResponse(consulta.getAtendimento().getPet());
    }

    public static List<ConsultaDetailed> list(List<Consulta> entities) {
        return entities.stream().map(e -> new ConsultaDetailed(e)).collect(Collectors.toList());
    }

    public static Page<ConsultaDetailed> page(Page<Consulta> page) {
        return page.map(ConsultaDetailed::new);
    }
}
