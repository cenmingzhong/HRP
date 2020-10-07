package com.gzhh.hrp.db.entity;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author cenmingzhong
 * @create 2020-09-14-上午 11:24
 */
@Entity
@Table(name="DB_Person_Type")
@Title("人员类型档案")
public class PersonType extends BaseEntity {

    @Id
    @Column(name="Person_Code",length=50)
    @Title("人员类型编码")
    private String personTypeCode;
}
