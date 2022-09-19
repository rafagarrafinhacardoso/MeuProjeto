package com.projectRafa.backend.mqtt;

import java.lang.reflect.Type;
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

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.projectRafa.backend.model.Equipamento;
import com.projectRafa.backend.model.MotionAnalysis;
import com.projectRafa.backend.model.MotionAnalysis.EixosCartesiano;
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
						if (equip.isPresent()) {
							Gson gson = new Gson();
							Type listType = new TypeToken<HashMap<String, String>>(){}.getType();
							HashMap<String, String> responseStatus = gson.fromJson(message.getPayload().toString(), listType);
							Equipamento newEquip = equip.get();
							newEquip.setStatus(responseStatus.get("status"));
							newEquip.setSerialNumber(responseStatus.get("serialNumber"));
							newEquip.setUpdatedAt(new Date());
							if (newEquip.getStatus() != null
									&& newEquip.getSerialNumber().equals(equips.get(i).getSerialNumber())) {
								System.out.println("<<<<<<< OK >>>>>>>");
								equipamentoService.criar(newEquip);
							}
						}
					}else if(topic.equals("device/" + equips.get(i).getSerialNumber() + "/movement")) {
						Gson gson = new Gson();
						Type listType = new TypeToken<HashMap<String, Object>>(){}.getType();
						HashMap<String, Object> analiresp = gson.fromJson(message.getPayload().toString(), listType);
						MotionAnalysis anali = new MotionAnalysis();
						anali.setSerialNumber(analiresp.get("serialNumber").toString());
						if(analiresp.get("serialNumber").toString().equals(equips.get(i).getSerialNumber())) {
							Map<String, List<Integer>> accel = (Map<String, List<Integer>>) analiresp
									.get("acceleration");
							EixosCartesiano eixo = new EixosCartesiano();
							eixo.setX(accel.get("x"));
							eixo.setY(accel.get("y"));
							eixo.setZ(accel.get("z"));
							anali.setAcceleration(eixo);
							accel = (Map<String, List<Integer>>) analiresp.get("gyro");
							eixo.setX(accel.get("x"));
							eixo.setY(accel.get("y"));
							eixo.setZ(accel.get("z"));
							anali.setGyro(eixo);

							System.out.print("anali");
							System.out.println(anali);
						}
						
					}
				}
				if (topic.contains("device")) {
					System.out.println("This is the topic: " + topic);
					System.out.println(message.getPayload());
				}
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

}
