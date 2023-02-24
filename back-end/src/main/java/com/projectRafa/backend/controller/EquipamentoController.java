package com.projectRafa.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.service.EquipamentoService;

@RestController
@RequestMapping("/equipamento")
public class EquipamentoController {

	@Autowired
	private EquipamentoService equipamentoService;

	@GetMapping
	public List<Equipamento> buscarTodos() {
		return this.equipamentoService.obterTodos();
	}
	
	@GetMapping("ativo")
	public List<Equipamento> buscarTodosAtivos() {
		return this.equipamentoService.obterAtivos();
	}

	@PostMapping
	public Equipamento novoEquipamento(@RequestBody Equipamento equip) {
		System.out.println(equip.getNome() + " : " + equip.getSerialNumber() + " : " + equip.getEquipType());
//		equip.setEquipType(EQUIPTYPE.LUVA_BOXE);
		equip.setCreatedAt(new Date());
		equip.setUpdatedAt(new Date());
		return this.equipamentoService.criar(equip);
	}

}
