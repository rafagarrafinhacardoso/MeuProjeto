package com.projectRafa.backend.mqtt;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;

import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.service.EquipamentoService;

@Configuration
public class MqttBeans {

	@Autowired
	private EquipamentoService equipamentoService;

	public MqttPahoClientFactory mqttClientFactory() {
		DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
		MqttConnectOptions options = new MqttConnectOptions();

		options.setServerURIs(new String[] { "tcp://localhost:1883" });
		options.setUserName("admin");
		String pass = "12345678";
		options.setPassword(pass.toCharArray());
		options.setCleanSession(true);

		factory.setConnectionOptions(options);

		return factory;
	}

	@Bean
	public MessageChannel mqttInputChannel() {
		return new DirectChannel();
	}

	@Bean
	public MessageProducer inbound() {
		MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter("serverIn",
				mqttClientFactory(), "#");

		adapter.setCompletionTimeout(5000);
		adapter.setConverter(new DefaultPahoMessageConverter());
		adapter.setQos(2);
		adapter.setOutputChannel(mqttInputChannel());
		return adapter;
	}

	@Bean
	@ServiceActivator(inputChannel = "mqttInputChannel")
	public MessageHandler handler() {
		return new MessageHandler() {

			@Override
			public void handleMessage(Message<?> message) throws MessagingException {
				String topic = message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC).toString();
				List<Equipamento> equips = equipamentoService.findAllSerialNumber();
				for (int i = 0; i < equips.size(); i++) {
					if (topic.equals("device/" + equips.get(i).getSerialNumber() + "/status")) {
						Optional<Equipamento> equip = equipamentoService.findById(equips.get(i).getId());
						Equipamento eq = equip.get();
//						System.out.print("Serial Number: ");
//						System.out.println(equip.get().getSerialNumber());
//						System.out.print("name: ");
//						System.out.println(equip.get().getNome());
						HashMap<String, String> myMap = new HashMap<String, String>();
						String response = message.getPayload().toString();
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
//						equip.;
						eq.setStatus(myMap.get("status"));
						eq.setUpdatedAt(new Date());
						
						equipamentoService.criar(eq);
						System.out.print("update Equipamento: ");
						System.out.println(eq);
						
					}
				}
				if (topic.equals("myTopic")) {
					System.out.println("This is the topic");
				}
				System.out.println(message.getPayload());
			}
		};
	}

	@Bean
	public MessageChannel mqttOutboundChannel() {
		return new DirectChannel();
	}

	@Bean
	@ServiceActivator(inputChannel = "mqttOutboundChannel")
	public MessageHandler mqttOutbound() {
		// clientId is generated using a random number
		MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler("serverOut", mqttClientFactory());
		messageHandler.setAsync(true);
		messageHandler.setDefaultTopic("#");
		messageHandler.setDefaultRetained(false);
		return messageHandler;
	}

	private class jsonTest {

		private String serialNumber;
		private String status;

	}
}
