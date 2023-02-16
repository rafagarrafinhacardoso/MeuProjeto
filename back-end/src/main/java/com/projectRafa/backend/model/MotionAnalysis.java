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
	
	private String userName;
	
	private String analysName;

	private EixosCartesiano acceleration;

	private EixosCartesiano gyro;

	private Date updatedAt;

	private Date createdAt;

	@Data
	public static class EixosCartesiano {
		private List<Float> x;
		private List<Float> y;
		private List<Float> z;
		public List<Float> getX() {
			return x;
		}
		public void setX(List<Float> x) {
			this.x = x;
		}
		public List<Float> getY() {
			return y;
		}
		public void setY(List<Float> y) {
			this.y = y;
		}
		public List<Float> getZ() {
			return z;
		}
		public void setZ(List<Float> z) {
			this.z = z;
		}
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAnalysName() {
		return analysName;
	}

	public void setAnalysName(String analysName) {
		this.analysName = analysName;
	}

	public EixosCartesiano getAcceleration() {
		return acceleration;
	}

	public void setAcceleration(EixosCartesiano acceleration) {
		this.acceleration = acceleration;
	}

	public EixosCartesiano getGyro() {
		return gyro;
	}

	public void setGyro(EixosCartesiano gyro) {
		this.gyro = gyro;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
