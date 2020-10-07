package com.gzhh.hrp.db.entity;

public class User{
    private Integer teacherNumber;
    private String teacherName;
    private  Integer positionNumber;
    private String teachPositionType;
    private Integer positionLevel;
    private Integer permissionNumber;

    public Integer getTeacherNumber() {
        return teacherNumber;
    }

    public void setTeacherNumber(Integer teacherNumber) {
        this.teacherNumber = teacherNumber;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public Integer getPositionNumber() {
        return positionNumber;
    }

    public void setPositionNumber(Integer positionNumber) {
        this.positionNumber = positionNumber;
    }

    public String getTeachPositionType() {
        return teachPositionType;
    }

    public void setTeachPositionType(String teachPositionType) {
        this.teachPositionType = teachPositionType;
    }

    public Integer getPositionLevel() {
        return positionLevel;
    }

    public void setPositionLevel(Integer positionLevel) {
        this.positionLevel = positionLevel;
    }

    public Integer getPermissionNumber() {
        return permissionNumber;
    }

    public void setPermissionNumber(Integer permissionNumber) {
        this.permissionNumber = permissionNumber;
    }

    public User() {
    }

    public User(Integer teacherNumber, String teacherName, Integer positionNumber, String teachPositionType, Integer positionLevel, Integer permissionNumber) {
        this.teacherNumber = teacherNumber;
        this.teacherName = teacherName;
        this.positionNumber = positionNumber;
        this.teachPositionType = teachPositionType;
        this.positionLevel = positionLevel;
        this.permissionNumber = permissionNumber;
    }

    @Override
    public String toString() {
        return "User{" +
                "teacherNumber=" + teacherNumber +
                ", teacherName='" + teacherName + '\'' +
                ", positionNumber=" + positionNumber +
                ", teachPositionType='" + teachPositionType + '\'' +
                ", positionLevel=" + positionLevel +
                ", permissionNumber=" + permissionNumber +
                '}';
    }
}
