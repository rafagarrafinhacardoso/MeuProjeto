package com.projectRafa.backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "equipamento")
public class Equipamento {
	
	@Id
	private String id;
	
	private String nome;
	
	private String serialNumber;
	
	private String status;
	
	private Date updatedAt;
	
	private Date createdAt;
	
	private EQUIPTYPE equipType;
	
	public enum EQUIPTYPE {
		RAQUETE_TENIS(0),TACO_BASEBALL(1),RAQUETE_BEACH_TENNIS(2),LUVA_BOXE(3),SAPATO(4);
		public int type;
		EQUIPTYPE(int ty) {
			this.type = ty;
		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public EQUIPTYPE getEquipType() {
		return equipType;
	}

	public void setEquipType(EQUIPTYPE equipType) {
		this.equipType = equipType;
	}
	

}
