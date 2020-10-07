package com.gzhh.hrp.tools;

import org.apache.ibatis.session.RowBounds;

public class PageRowBounds extends RowBounds{

    public PageRowBounds(int offset, int limit){
        super(offset, limit);
    }
    private int rowCount;

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        this.rowCount = rowCount;
    }
    
}
