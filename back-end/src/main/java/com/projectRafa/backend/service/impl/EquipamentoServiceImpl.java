package com.projectRafa.backend.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.repository.EquipamentoRepository;
import com.projectRafa.backend.service.EquipamentoService;

@Service
public class EquipamentoServiceImpl implements EquipamentoService {

	@Autowired
	private EquipamentoRepository equipamentoRepository;

	@Override
	public List<Equipamento> obterTodos() {
		return this.equipamentoRepository.findAll();
	}

	@Override
	public List<Equipamento> findAllSerialNumber() {
		return this.equipamentoRepository.findAllIdSerialNumber();
	}

	@Override
	public Equipamento criar(Equipamento equip) {
		return this.equipamentoRepository.save(equip);
	}

	@Override
	public Optional<Equipamento> findById(String id) {
		return this.equipamentoRepository.findById(id);
	}
	
	@Override
	public List<Equipamento> obterAtivos(){
		Date dt = new Date(System.currentTimeMillis() - 3600 * 1000) ;
		System.out.println( dt + " >><< " + new Date() );
		return this.equipamentoRepository.findAtivos(dt);
	}

}
