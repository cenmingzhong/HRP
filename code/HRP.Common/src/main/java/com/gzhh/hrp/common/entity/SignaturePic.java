package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import com.gzhh.hrp.common.Title;

@Entity(name="SYS_signature_pic")
@Table(name="SYS_signature_pic", indexes= {@Index(name="person_code", columnList="person_code")})
@Title(value="签名图片")
public class SignaturePic extends BaseEntity {

	@Id
    @Column(name="pic_id")
    private String picId;
	
	/**{@link com.gzhh.hrp.kpi.entity.setting.Person}*/
	@Column(name="person_code")
    @Title("人员编码")
    private String personCode;
	
	@Column(name="pic_path")
    @Title("图片路径")
    private String picPath;

	public String getPicId() {
		return picId;
	}

	public void setPicId(String picId) {
		this.picId = picId;
	}

	public String getPersonCode() {
		return personCode;
	}

	public void setPersonCode(String personCode) {
		this.personCode = personCode;
	}

	public String getPicPath() {
		return picPath;
	}

	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}
}
