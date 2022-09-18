package com.projectRafa.backend.mqtt.util;

import java.util.Date;
import java.util.HashMap;

import com.projectRafa.backend.model.Equipamento;


public class EquipamentoUtil {

	public static Equipamento statusEquipamento(Equipamento eq, String response) {
		HashMap<String, String> myMap = new HashMap<String, String>();
		String[] pairs = response.split(",");
		for (int x = 0; x < pairs.length; x++) {
			String pair = pairs[x];
			String[] keyValue = pair.split(":");
			myMap.put(keyValue[0].replaceAll("\"","").replace("{",""), keyValue[1].replaceAll("\"","").replace("}",""));
		}

		System.out.print("Map: ");
		System.out.println(myMap);
		System.out.println(myMap.get("status"));
		System.out.println(myMap.get("serialNumber"));
//		equip.;
		eq.setStatus(myMap.get("status"));
		eq.setSerialNumber(myMap.get("serialNumber"));
		eq.setUpdatedAt(new Date());
		return eq;
	}

}
