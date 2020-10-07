package com.gzhh.hrp.tools;

import java.io.File;

import javax.xml.bind.JAXB;

import org.dom4j.Document;
import org.dom4j.io.SAXReader;

public class ConfigXml {

    String filePath="";

    public ConfigXml() {

    }
    
    public ConfigXml(String filePath){
        this.filePath=filePath;
    }

    /**
     * JAXB方式读XML文件
     * @param file
     * @param clazz
     * @return
     */
    public Object getConfigXmlByJAXB(File file,Class<?> clazz){
        return JAXB.unmarshal(file,clazz);        
    }
    
    /**
     * JAXB方式写XML文件
     * @param clazz
     * @param file
     */
    public void setConfigXmlByJAXB(Object obj,File file){
        JAXB.marshal(obj,file);
    } 
    
    /**
     * load 载入一个xml文档
     * @return 成功返回Document对象，失败返回null
     * @param 文件路径
     */
    public Document load(String filename) {
        Document document = null;
        try {
            SAXReader saxReader = new SAXReader();
            document = saxReader.read(new File(filename));
        } catch (Exception ex) {
            //logger.error("解析配置文件失败：" + ex.getMessage());
        }
        return document;
    }

    public static void main(String[] a) {
//        ConfigXml xml=new ConfigXml("d:\\snmp_collect_config.xml");
//        xml.getProcessList();
//        ConfigXml xml = new ConfigXml();
//        ConfigInfo config = new ConfigInfo();
//        //写
//        List<ConfigInfo> list = new ArrayList<ConfigInfo>();
//        for(int i=1;i<5;i++){
//            ConfigInfo configFactory = new ConfigInfo();
//            configFactory.setFactoryId(i);
//            configFactory.setCollType(1);
//            configFactory.setOltCollMode(1);
//            configFactory.setOnuCollMode(1);
//            configFactory.setSendLength(5);
//            list.add(configFactory);
//        }
//        config.setConfig(list);
//        xml.setConfigXmlByJAXB(config,new File("c:/temp/a.xml"));
//        //读
//        config = (ConfigInfo)xml.getConfigXmlByJAXB(new File("c:/temp/a.xml"),ConfigInfo.class);
//        for(ConfigInfo con:config.getConfig()){
//        }
//        ConfigXml xml = new ConfigXml();
//        InputStream file = xml.getClass().getResourceAsStream( "/a.xml" );
//        SysMenu config = JAXB.unmarshal(file,SysMenu.class);
//        
//        AppConfig config = new AppConfig();
//        
//        VouchGeneral cgrk = new VouchGeneral();
//        cgrk.setCode("123");
//        cgrk.setName("123");
//        
//        HashMap<String, VouchGeneral> v = new HashMap<String, VouchGeneral>();
//        v.put("CGRK", cgrk);
//        
//        //JAXB.marshal(config, new File("c:/temp/a.xml"));
//        
//        //InputStream file = ConfigXml.class.getResourceAsStream( "c:/temp/a.xml" );
//        File file = new File("C:\\temp\\a.xml");
//        AppConfig entity = JAXB.unmarshal(file, AppConfig.class);
    }
    
}
