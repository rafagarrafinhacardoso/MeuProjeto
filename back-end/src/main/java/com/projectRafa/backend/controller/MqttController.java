package com.projectRafa.backend.controller;

import java.util.List;

//import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.mqtt.MqttGateway;
import com.projectRafa.backend.service.EquipamentoService;

@RestController
@RequestMapping("/mqtt")
public class MqttController {
	
	@Autowired
	MqttGateway mqttGateway;
	
	@Autowired
	private EquipamentoService equipamentoService;
	
	@PostMapping("/sendMensagem")
	public ResponseEntity<?> publicandoMqtt(@RequestBody String msg ){
		try {
			JSONObject json = new JSONObject(msg);
			System.out.print(json.get("message") + " : ");
			System.out.println(json.get("topic"));
			mqttGateway.senToMqtt(json.get("message").toString(), json.get("topic").toString());
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok("fail");
		}
	}
	
	@GetMapping("/btnLed")
	public ResponseEntity<?> clickInterruptor(){
		try {
			mqttGateway.senToMqtt("active", "comando/led");
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok("fail");
		}
	}
	
	@GetMapping("/mqttTest")
	public ResponseEntity<?> enviaJson(){
		try {
			List<Equipamento> equips = equipamentoService.findAllSerialNumber();
			System.out.println(equips.toString());
			mqttGateway.senToMqtt(equips.toString(), "esp32/output");
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok("fail");
		}
	}

}
