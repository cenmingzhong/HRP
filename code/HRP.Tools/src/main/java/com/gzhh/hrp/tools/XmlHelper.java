package com.gzhh.hrp.tools;

import java.io.ByteArrayOutputStream;
import java.io.StringReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamWriter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gzhh.hrp.common.ValidateException;

public class XmlHelper {

    protected static final Logger logger = LoggerFactory.getLogger(XmlHelper.class);
    
//    public static String serializer1(Object obj, String encoding) {  
//        String result = null;  
//        try {  
//            JAXBContext context = JAXBContext.newInstance(obj.getClass());  
//            Marshaller marshaller = context.createMarshaller();  
//            marshaller.setProperty(Marshaller.JAXB_FRAGMENT, false);
//            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);  
//            marshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);
//  
//            StringWriter writer = new StringWriter();  
//            marshaller.marshal(obj, writer);  
//            result = writer.toString();  
//        } catch (Exception ex) {  
//            ex.printStackTrace();
//            logger.error("XML转换失败："+ex.getCause().getMessage(),ex);
//            throw new ValidateException("XML转换失败："+ex.getCause().getMessage());
//        }  
//  
//        return result;  
//    }  
    
    public static String serializer(Object obj) {  
        return serializer(obj, "UTF-8");  
    }  
  
    public static String serializer(Object obj, String encoding) {
        try{
            JAXBContext  jaxbContext = JAXBContext.newInstance(obj.getClass());
            XMLOutputFactory xmlOutputFactory = XMLOutputFactory.newFactory();
            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
            jaxbMarshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);
            jaxbMarshaller.setProperty(Marshaller.JAXB_FRAGMENT, true);
            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);  
    
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            XMLStreamWriter xmlStreamWriter = xmlOutputFactory.createXMLStreamWriter(baos, (String) jaxbMarshaller.getProperty(Marshaller.JAXB_ENCODING));
            xmlStreamWriter.writeStartDocument((String) jaxbMarshaller.getProperty(Marshaller.JAXB_ENCODING), "1.0");
            jaxbMarshaller.marshal(obj, xmlStreamWriter);
            xmlStreamWriter.writeEndDocument();
            xmlStreamWriter.close();
            
            return new String(baos.toByteArray());
        }catch(Exception ex){
            ex.printStackTrace();
            throw new ValidateException("XML转换失败：",ex);
        }
    }
  
    /** 
     * xml转换成JavaBean 
     * @param xml 
     * @param c 
     * @return 
     */  
    @SuppressWarnings("unchecked")  
    public static <T> T deserialize(String xml, Class<T> c) {  
        try {  
            JAXBContext context = JAXBContext.newInstance(c);  
            Unmarshaller unmarshaller = context.createUnmarshaller();  
            return (T) unmarshaller.unmarshal(new StringReader(xml));  
        } catch (Exception ex) {  
            ex.printStackTrace();
            logger.error("XML转换失败："+ex.getCause().getMessage(),ex);
            throw new ValidateException("XML转换失败："+ex.getCause().getMessage());
        }  
    }  
    
    public static void main(String[] args) {
    }
}
