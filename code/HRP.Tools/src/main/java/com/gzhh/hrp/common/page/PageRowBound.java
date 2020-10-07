package com.gzhh.hrp.common.page;

import org.apache.ibatis.session.RowBounds;

public class PageRowBound extends RowBounds{

    public PageRowBound(int offset, int limit){
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
