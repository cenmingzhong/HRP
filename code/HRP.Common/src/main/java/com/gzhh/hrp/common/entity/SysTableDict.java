package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name="Sys_Table_Dict",uniqueConstraints = {@UniqueConstraint(columnNames={"App_Key","Table_Code", "Column_Code"})})
public class SysTableDict extends BaseEntity {

    @Id
    @Column(name="Id")
    private String id;
    
    @Column(name="App_Key")
    private String appKey;
    
    @Column(name="Table_Code")
    private String tableCode;

    @Column(name="Table_Name")
    private String tableName;

    @Column(name="Table_Title")
    private String tableTitle;

    @Column(name="Column_Code")
    private String columnCode;

    @Column(name="Column_Name")
    private String columnName;

    @Column(name="Column_Title")
    private String columnTitle;

    @Column(name="Column_Type")
    private String columnType;

    @Column(name="Column_Len")
    private int columnLen;

    @Column(name="Column_Precision")
    private int columnPrecision;

    @Column(name="Is_Pk")
    private boolean isPk;

    @Column(name="Is_Null")
    private boolean isNull;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
        this.tableCode = tableCode;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableTitle() {
        return tableTitle;
    }

    public void setTableTitle(String tableTitle) {
        this.tableTitle = tableTitle;
    }

    public String getColumnCode() {
        return columnCode;
    }

    public void setColumnCode(String columnCode) {
        this.columnCode = columnCode;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnTitle() {
        return columnTitle;
    }

    public void setColumnTitle(String columnTitle) {
        this.columnTitle = columnTitle;
    }

    public String getColumnType() {
        return columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public int getColumnLen() {
        return columnLen;
    }

    public void setColumnLen(int columnLen) {
        this.columnLen = columnLen;
    }

    public int getColumnPrecision() {
        return columnPrecision;
    }

    public void setColumnPrecision(int columnPrecision) {
        this.columnPrecision = columnPrecision;
    }

    public boolean getIsPk() {
        return isPk;
    }

    public void setIsPk(boolean isPk) {
        this.isPk = isPk;
    }

    public boolean getIsNull() {
        return isNull;
    }

    public void setIsNull(boolean isNull) {
        this.isNull = isNull;
    }
}
