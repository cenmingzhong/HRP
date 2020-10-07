package com.gzhh.hrp.tools;

public class PageInfo {
    private int totalCount;
    private int totalPage;
    private int pageSize;
    private int curPage;
    private String orderBy;
    private String orderSort;

    public int getTotalCount() {
        return totalCount;
    }


    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
        Populate();
    }



    public int getTotalPage() {
        return totalPage;
    }



    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }



    public int getPageSize() {
        return pageSize;
    }



    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
        if (this.pageSize == 0){
            this.pageSize = 20;
        }
    }



    public int getCurPage() {
        return curPage;
    }



    public void setCurPage(int curPage) {
        this.curPage = curPage;
        if (this.curPage < 0){
            this.curPage = 1;
        }
    }



    public String getOrderBy() {
        return orderBy;
    }



    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }



    public String getOrderSort() {
        return orderSort;
    }



    public void setOrderSort(String orderSort) {
        this.orderSort = orderSort;
    }
    public void Populate(){
        if (this.totalCount == 0){
            this.totalPage = 0;
        }else{
            if (this.pageSize <= 0){
                this.pageSize = 20;
                this.totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : this.totalCount / this.pageSize + 1;
            }
        }
    }




}
