package com.gzhh.hrp.common.entity.format;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="Sys_Code_Format")
@Title(value="单据编号设置", appKey="SYS")
public class CodeFormat extends BaseEntity {

    @Id
    @Column(name="vouch_type")
    @Title("单据类型")
    private String vouchType;
    
    @Column(name="code_mode")
    @Title("编号方式")
    private String codeMode;
    
    @Column(name="code_pre1")
    @Title("前缀1")
    private String codePre1;
    
    @Column(name="code_content1")
    @Title("前缀1内容")
    private String codeContent1;
    
    @Column(name="code_pre2")
    @Title("前缀2")
    private String codePre2;
    
    @Column(name="code_content2")
    @Title("前缀2内容")
    private String codeContent2;
    
    @Column(name="code_pre3")
    @Title("前缀3")
    private String codePre3;
    
    @Column(name="code_content3")
    @Title("前缀3内容")
    private String codeContent3;
    
    @Column(name="code_sep")
    @Title("分隔符")
    private String codeSep;

    @Column(name="according1")
    @Title("流水依据1")
    private String according1;
    
    @Column(name="according_content1")
    @Title("流水依据1内容")
    private String accordingContent1;

    @Column(name="according2")
    @Title("流水依据2")
    private String according2;
    
    @Column(name="according_content2")
    @Title("流水依据2内容")
    private String accordingContent2;

    @Column(name="according3")
    @Title("流水依据3")
    private String according3;
    
    @Column(name="according_content3")
    @Title("流水依据3内容")
    private String accordingContent3;
    
    @Column(name="sn_len")
    @Title("流水长度")
    private int snLen;
    
    @Column(name="is_fill")
    @Title("断号补号")
    private Boolean isFill;

    public String getVouchType() {
        return vouchType;
    }

    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }

    public String getCodeMode() {
        return codeMode;
    }

    public void setCodeMode(String codeMode) {
        this.codeMode = codeMode;
    }

    public String getCodePre1() {
        return codePre1;
    }

    public void setCodePre1(String codePre1) {
        this.codePre1 = codePre1;
    }

    public String getCodeContent1() {
        return codeContent1;
    }

    public void setCodeContent1(String codeContent1) {
        this.codeContent1 = codeContent1;
    }

    public String getCodePre2() {
        return codePre2;
    }

    public void setCodePre2(String codePre2) {
        this.codePre2 = codePre2;
    }

    public String getCodeContent2() {
        return codeContent2;
    }

    public void setCodeContent2(String codeContent2) {
        this.codeContent2 = codeContent2;
    }

    public String getCodePre3() {
        return codePre3;
    }

    public void setCodePre3(String codePre3) {
        this.codePre3 = codePre3;
    }

    public String getCodeContent3() {
        return codeContent3;
    }

    public void setCodeContent3(String codeContent3) {
        this.codeContent3 = codeContent3;
    }

    public String getCodeSep() {
        return codeSep;
    }

    public void setCodeSep(String codeSep) {
        this.codeSep = codeSep;
    }

    public String getAccording1() {
        return according1;
    }

    public void setAccording1(String according1) {
        this.according1 = according1;
    }

    public String getAccordingContent1() {
        return accordingContent1;
    }

    public void setAccordingContent1(String accordingContent1) {
        this.accordingContent1 = accordingContent1;
    }

    public String getAccording2() {
        return according2;
    }

    public void setAccording2(String according2) {
        this.according2 = according2;
    }

    public String getAccordingContent2() {
        return accordingContent2;
    }

    public void setAccordingContent2(String accordingContent2) {
        this.accordingContent2 = accordingContent2;
    }

    public String getAccording3() {
        return according3;
    }

    public void setAccording3(String according3) {
        this.according3 = according3;
    }

    public String getAccordingContent3() {
        return accordingContent3;
    }

    public void setAccordingContent3(String accordingContent3) {
        this.accordingContent3 = accordingContent3;
    }

    public int getSnLen() {
        return snLen;
    }

    public void setSnLen(int snLen) {
        this.snLen = snLen;
    }

    public Boolean getIsFill() {
        return isFill;
    }

    public void setIsFill(Boolean isFill) {
        this.isFill = isFill;
    }
    /*@Id
    @Column(name="vouch_type")
    @Title("单据类型")
    private String vouchType;
    
    @Column(name="code_mode")
    @Title("编号方式")
    private String codeMode;
    
    @Column(name="code_pre1")
    @Title("前缀1")
    private String codePre1;
    
    @Column(name="code_content1")
    @Title("前缀1内容")
    private String codeContent1;
    
    @Column(name="is_according1")
    @Title("前缀1是否流水依据")
    private boolean isAccording1;
    
    @Column(name="code_pre2")
    @Title("前缀2")
    private String codePre2;
    
    @Column(name="code_content2")
    @Title("前缀2内容")
    private String codeContent2;
    
    @Column(name="is_according2")
    @Title("前缀2是否流水依据")
    private boolean isAccording2;
    
    @Column(name="code_pre3")
    @Title("前缀3")
    private String codePre3;
    
    @Column(name="code_content3")
    @Title("前缀3内容")
    private String codeContent3;
    
    @Column(name="is_according3")
    @Title("前缀3是否流水依据")
    private boolean isAccording3;
    
    @Column(name="sn_len")
    @Title("流水长度")
    private int snLen;
    
    @Column(name="sn_start")
    @Title("流水起始值")
    private int snStart;
    
    @Column(name="is_edit")
    @Title("编号是否可改")
    private boolean isEdit;
    
    @Column(name="code_sep")
    @Title("分隔符")
    private String codeSep;
    
    public String getVouchType() {
        return vouchType;
    }
    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }
    public String getCodeMode() {
        return codeMode;
    }
    public void setCodeMode(String codeMode) {
        this.codeMode = codeMode;
    }
    public String getCodePre1() {
        return codePre1;
    }
    public void setCodePre1(String codePre1) {
        this.codePre1 = codePre1;
    }
    public String getCodeContent1() {
        return codeContent1;
    }
    public void setCodeContent1(String codeContent1) {
        this.codeContent1 = codeContent1;
    }
    public boolean getIsAccording1() {
        return isAccording1;
    }
    public void setIsAccording1(boolean isAccording1) {
        this.isAccording1 = isAccording1;
    }
    public String getCodePre2() {
        return codePre2;
    }
    public void setCodePre2(String codePre2) {
        this.codePre2 = codePre2;
    }
    public String getCodeContent2() {
        return codeContent2;
    }
    public void setCodeContent2(String codeContent2) {
        this.codeContent2 = codeContent2;
    }
    public boolean getIsAccording2() {
        return isAccording2;
    }
    public void setIsAccording2(boolean isAccording2) {
        this.isAccording2 = isAccording2;
    }
    public String getCodePre3() {
        return codePre3;
    }
    public void setCodePre3(String codePre3) {
        this.codePre3 = codePre3;
    }
    public String getCodeContent3() {
        return codeContent3;
    }
    public void setCodeContent3(String codeContent3) {
        this.codeContent3 = codeContent3;
    }
    public boolean getIsAccording3() {
        return isAccording3;
    }
    public void setIsAccording3(boolean isAccording3) {
        this.isAccording3 = isAccording3;
    }
    public int getSnLen() {
        return snLen;
    }
    public void setSnLen(int snLen) {
        this.snLen = snLen;
    }
    public int getSnStart() {
        return snStart;
    }
    public void setSnStart(int snStart) {
        this.snStart = snStart;
    }
    public boolean getIsEdit() {
        return isEdit;
    }
    public void setIsEdit(boolean isEdit) {
        this.isEdit = isEdit;
    }
    public String getCodeSep() {
        return codeSep;
    }
    public void setCodeSep(String codeSep) {
        this.codeSep = codeSep;
    }*/
}
