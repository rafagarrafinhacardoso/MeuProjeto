package com.projectRafa.backend.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "motionAnalysis")
public class MotionAnalysis {

	@Id
	private String id;

	private String serialNumber;

	private EixosCartesiano acceleration;

	private EixosCartesiano gyro;

	private Date updatedAt;

	private Date createdAt;

	@Data
	public static class EixosCartesiano {
		private List<Float> x;
		private List<Float> y;
		private List<Float> z;
	}

}
