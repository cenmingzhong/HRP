package com.gzhh.hrp.kpi.entity.init;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXB;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.entity.ImportTemplate;

@XmlRootElement(name="setting")
public class SysImportTemplate extends BasePresetEntity<ImportTemplate> {

	private static SysImportTemplate instance;
	private SysImportTemplate() {
	    super();
	    this.importTemplateList  = new ArrayList<ImportTemplate>();
	}
	
	@XmlElementWrapper(name="importTemplateList")
    @XmlElement(name="importTemplate")
	private List<ImportTemplate> importTemplateList;
	
    @XmlTransient
	public List<ImportTemplate> getImportTemplateList() {
		return importTemplateList;
	}

	public void setImportTemplateList(List<ImportTemplate> importTemplateList) {
		this.importTemplateList = importTemplateList;
	}

    @Override
    public List<ImportTemplate> getInsList() {
        return getImportTemplateList();
    }
    
    public static synchronized SysImportTemplate getInstance() {
        if(instance == null) {
            InputStream file = SysImportTemplate.class.getResourceAsStream("/init/SysImportTemplate.xml");
            instance = JAXB.unmarshal(file, SysImportTemplate.class);
        }
        return instance;
    }
}
