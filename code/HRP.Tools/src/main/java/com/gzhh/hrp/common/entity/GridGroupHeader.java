package com.gzhh.hrp.common.entity;

public class GridGroupHeader {

    private int numberOfColumns;
    private String startColumnName;
    private String titleText;
    
    public int getNumberOfColumns() {
        return numberOfColumns;
    }
    public void setNumberOfColumns(int numberOfColumns) {
        this.numberOfColumns = numberOfColumns;
    }
    public String getStartColumnName() {
        return startColumnName;
    }
    public void setStartColumnName(String startColumnName) {
        this.startColumnName = startColumnName;
    }
    public String getTitleText() {
        return titleText;
    }
    public void setTitleText(String titleText) {
        this.titleText = titleText;
    }
}
