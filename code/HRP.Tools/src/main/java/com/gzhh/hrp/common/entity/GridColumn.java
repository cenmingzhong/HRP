package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Grid_Column")
public class GridColumn{
    @Id
    @Column(name="Id")
    @Title("Id")
    private String id;
    
    @Column(name="Path_Url")
    @Title("页面路径")
    private String pathUrl;
    
    @Column(name="Grid_Id")
    @Title("表格ID")
    private String gridId;
    
    @Column(name="col_Id")
    @Title("列编码")
    private String colId;
    
    @Column(name="col_field")
    @Title("列字段")
    private String colField;
    
    @Column(name="Col_Title")
    @Title("列标题")
    private String colTitle;
    
    @Column(name="Col_Width")
    @Title("列宽")
    private String colWidth;
    
    @Column(name="Col_Order")
    @Title("列顺序")
    private Integer colOrder;
    
    @Column(name="Col_Align")
    @Title("对齐方式")
    private String colAlign;
    
    @Column(name="Is_Hidden")
    @Title("是否隐藏")
    private boolean isHidden;
    
    @Column(name="Col_Type")
    @Title("列类型")
    private String colType;
    
    @Column(name="col_Precision")
    @Title("列类型")
    private Integer colPrecision;
    
    @Column(name="is_sum")
    @Title("是否汇总")
    private Boolean isSum;

    @Column(name="col_Formatter",length=500,columnDefinition="TEXT")//因为string格式放不下，所有改为text格式
    @Title("格式化")
    private String colFormatter;
    
    @Column(name="frozen")
    @Title("是否冻结")
    private Boolean frozen;
    
    @Column(name="is_export_fmt")
    @Title("导出时是否过滤格式化")
    private Boolean isExportFmt;
    
    @Column(name="sortable")
    @Title("排序")
    private Boolean sortable;
    
    @Column(name="formative")
    @Title("会计格式")
    private String formative;
    
    @Column(name="Sys_User_Code")
    private String sysUserCode;
    
    @Transient
    private boolean isNew;
    @Transient
    private boolean isUpdate;
    @Transient
    private boolean isDelete;
    
    @Column(name="ts",insertable = false, updatable = false,columnDefinition="timestamp")
    private String ts;
    
    public boolean getIsNew() {
        return isNew;
    }
    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }
    public boolean getIsUpdate() {
        return isUpdate;
    }
    public void setIsUpdate(boolean isUpdate) {
        this.isUpdate = isUpdate;
    }
    public boolean getIsDelete() {
        return isDelete;
    }
    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }
    public String getTs() {
        return ts;
    }
    public void setTs(String ts) {
        this.ts = ts;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPathUrl() {
        return pathUrl;
    }

    public void setPathUrl(String pathUrl) {
        this.pathUrl = pathUrl;
    }

    public String getGridId() {
        return gridId;
    }

    public void setGridId(String gridId) {
        this.gridId = gridId;
    }

    public String getColId() {
        return colId;
    }

    public void setColId(String colId) {
        this.colId = colId;
    }

    public String getColField() {
        return colField;
    }

    public void setColField(String colField) {
        this.colField = colField;
    }

    public String getColTitle() {
        return colTitle;
    }

    public void setColTitle(String colTitle) {
        this.colTitle = colTitle;
    }

    public String getColWidth() {
        return colWidth;
    }

    public void setColWidth(String colWidth) {
        this.colWidth = colWidth;
    }

    public String getColAlign() {
        return colAlign;
    }

    public void setColAlign(String colAlign) {
        this.colAlign = colAlign;
    }

    public boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(boolean isHidden) {
        this.isHidden = isHidden;
    }

    public String getSysUserCode() {
        return sysUserCode;
    }

    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }

    public Integer getColOrder() {
        return colOrder==null?0:colOrder;
    }

    public void setColOrder(Integer colOrder) {
        this.colOrder = colOrder;
    }

    public String getColType() {
        return colType;
    }

    public void setColType(String colType) {
        this.colType = colType;
    }

    public Integer getColPrecision() {
        return colPrecision;
    }

    public void setColPrecision(Integer colPrecision) {
        this.colPrecision = colPrecision;
    }

    public String getColFormatter() {
        return colFormatter;
    }

    public void setColFormatter(String colFormatter) {
        this.colFormatter = colFormatter;
    }

    public Boolean getIsSum() {
        return isSum;
    }

    public void setIsSum(Boolean isSum) {
        this.isSum = isSum == null? false: isSum;
    }

	public Boolean getFrozen() {
		return frozen;
	}

	public void setFrozen(Boolean frozen) {
		this.frozen = frozen;
	}

	public Boolean getIsExportFmt() {
		return isExportFmt;
	}

	public void setIsExportFmt(Boolean isExportFmt) {
		this.isExportFmt = isExportFmt;
	}

	public String getFormative() {
		return formative;
	}

	public void setFormative(String formative) {
		this.formative = formative;
	}

	public Boolean getSortable() {
		return sortable;
	}

	public void setSortable(Boolean sortable) {
		this.sortable = sortable;
	}
    
}
