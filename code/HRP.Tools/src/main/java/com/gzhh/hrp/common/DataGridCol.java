package com.gzhh.hrp.common;

public class DataGridCol {

    private String field;
    private String title ;
    private String align ;
    private int colSpan ;
    public String getField() {
        return field;
    }
    public void setField(String field) {
        this.field = field;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAlign() {
        return align;
    }
    public void setAlign(String align) {
        this.align = align;
    }
    public int getColSpan() {
        return colSpan;
    }
    public void setColSpan(int colSpan) {
        this.colSpan = colSpan;
    }
}
