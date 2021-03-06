package com.petworld.restapi.repositories;

import com.petworld.restapi.entities.Consulta;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultasRepository extends JpaRepository<Consulta, Long> {
    
    Page<Consulta> findByAtendimentoPetIdAndAtendimentoClinicaId(Long petId, Long clinicaId, Pageable pageable);
    
    Consulta findByAtendimentoIdAndAtendimentoClinicaId(Long atendimentoId, Long clinicaId);
    Consulta findByIdAndAtendimentoClinicaId(Long id, Long clinicaId);
}
