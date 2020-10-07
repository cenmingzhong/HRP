package com.gzhh.hrp.common.service.impl;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.xml.bind.JAXB;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.MappingException;
import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.LoginState;
import com.gzhh.hrp.common.LoginUser;
import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.AppActivateDao;
import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.dao.SysRoleDao;
import com.gzhh.hrp.common.dao.SysUserDao;
import com.gzhh.hrp.common.dao.SysUserPersonDao;
import com.gzhh.hrp.common.entity.AppActivate;
import com.gzhh.hrp.common.entity.AppConfig;
import com.gzhh.hrp.common.entity.AppVouch;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.common.entity.SysTableDict;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.entity.VouchGeneral;
import com.gzhh.hrp.common.service.AppActivateService;
import com.gzhh.hrp.common.service.SysMenuService;
import com.gzhh.hrp.common.service.SysPropertyService;
import com.gzhh.hrp.common.service.SysTableDictService;
import com.gzhh.hrp.common.service.SysUserService;
import com.gzhh.hrp.common.service.SystemInitService;
import com.gzhh.hrp.db.entity.CodeRule;
import com.gzhh.hrp.db.service.CodeRuleService;
import com.gzhh.hrp.extension.spring.CustomizedPropertyConfigurer;
import com.gzhh.hrp.tools.ClassTools;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class SystemInitServiceImpl extends BaseService implements SystemInitService {
    
    @Resource
    private SysMenuDao sysMenuDao;
    @Resource
    private SysMenuService sysMenuService;
    @Resource
    private SysUserDao sysUserDao;
    @Resource
    private SysRoleDao sysRoleDao;
    @Resource
    private SysPropertyService SysPropertyService;
    @Resource
    private SysUserService SysUserService;
    @Resource
    private SysTableDictService sysTableDictService;
    @Resource
    private SysUserPersonDao sysUserPersonDao;
    @Resource
    private AppActivateDao appActivateDao;
    @Resource
    private AppActivateService appActivateService;
    @Resource
    private DataSource dataSource;
    @Resource
    private CodeRuleService codeRuleService;
    
    protected static Properties p = new Properties();
    
    @PostConstruct
    public void init(){
        InputStream file = this.getClass().getResourceAsStream("/appConfig.xml" );
        AppConfig entity = JAXB.unmarshal(file, AppConfig.class);
        AppConfig.createInstance(entity);
      
        //自动创建菜单
        if(AppConfig.getAutoCreateMenu()){
            for (SysMenu sysMenu : AppConfig.getSysMenuList()) {
                createMenu(sysMenu, null);
            }
        }
        //自动创建超级管理员
        createAdminAccount();
        //清除配置文件的管理员密码
        AppConfig.cleanAdminPassword();
        
        //自动创建数据表字典
        initTableDict();
        
        //创建单据格式
        initVouchFormat();
        
        //创建模块
        initAppList();
        
        //创建根据拼音首字母查询函数
        createInitialFun();
        
        //创建报表数据库连接
        //initFrDataSource1();
    }
    
    private void createInitialFun() {
        if(CollectionTools.isEmpty(sysMenuDao.findInitialFun())) {
        	sysMenuDao.createInitialFun();
        }
    }
    
    public void createAdminAccount(){
        String adminAccount = AppConfig.getAdminAccount();
        
        SysUser existUser = sysUserDao.getUserByLoginAccount(adminAccount);
        if(existUser == null){
            existUser = new SysUser();
            
            existUser.setSysUserName("系统管理员");
            existUser.setSysUserAccount(adminAccount);
            existUser.setSysUserPassword(AppConfig.getAdminPassword());

            
            SysUserService.save(existUser);
        }
    }
    
    public void createMenu(SysMenu sysMenu, String menuParent) {
        if(StringTools.isNotEmpty(sysMenu.getSysMenuCode())){
            SysMenu existMenu = sysMenuDao.get(sysMenu.getSysMenuCode());
            if(existMenu == null){
                sysMenu.setIsNew(true);
                if(StringTools.equals(sysMenu.getSysMenuType(), "module")){
                    sysMenuService.saveModule(sysMenu);
                }else{
                    SysMenu menuParentObj = sysMenuDao.get(menuParent);
                    if(StringTools.equals(menuParentObj.getSysMenuType(), "module")){
                        sysMenu.setSysMenuModule(menuParent);
                    }else{
                        sysMenu.setSysMenuParent(menuParent);
                        sysMenu.setSysMenuModule(menuParentObj.getSysMenuModule());
                    }
                    sysMenuService.saveMenu(sysMenu);
                }
            }else if(StringTools.isEmpty(existMenu.getSysMenuUrl()) || existMenu.getSysMenuUrl().indexOf("http")==-1){
                existMenu.setSysMenuUrl(sysMenu.getSysMenuUrl());
                existMenu.setSysMenuName(sysMenu.getSysMenuName());
                sysMenuService.saveMenu(existMenu);
            }
        }
        
        List<SysMenu> childList = sysMenu.getChildren();
        if(CollectionTools.isNotEmpty(childList)){
            for (SysMenu child : childList) {
                createMenu(child, sysMenu.getSysMenuCode());
            }
        }
    }
    
    /**
     * 创建数据库字典
     */
    private void initTableDict(){
    	
        Set<String> entityClassNames = ClassTools.getEntityClassNames("com.gzhh.hrp.*.entity");
        HashMap<String, String> tableList = new HashMap<String,String>();
        
        List<CodeRule> codeRuleList = new ArrayList<CodeRule>();
        for (String className : entityClassNames) {
            try{
                Class cls = Class.forName(className);
                if(!cls.isAnnotationPresent(Title.class)){
                	continue;
                }

                Title title = (Title)cls.getAnnotation(Title.class);
                Table table = (Table)cls.getAnnotation(Table.class);
                
                if(StringTools.isNotEmpty(title.ruleKey())){
                	CodeRule codeRule = new CodeRule();
                	codeRule.setObjectKey(title.ruleKey());
                	codeRule.setObjectName(title.value());
                	codeRule.setObjectRule(title.ruleValue());
                	codeRuleList.add(codeRule);
                }
                
                List<Field> fieldList =  ClassTools.getTitledField(cls);
                if(fieldList.size()>0){
                    SysTableDict dict = new SysTableDict();

                    dict.setAppKey(title.appKey());
                    dict.setTableCode(cls.getSimpleName());
                    dict.setTableName(table.name());
                    dict.setTableTitle(title.value());
                    
                    tableList.put(table.name(), title.value());
                    
                    for (Field field : fieldList) {
                        if(field.isAnnotationPresent(Title.class) && field.isAnnotationPresent(Column.class)){
                            Title fieldTitle = field.getAnnotation(Title.class);
                            Column column = field.getAnnotation(Column.class);
                            
                            dict.setColumnCode(field.getName());
                            dict.setColumnName(column.name());
                            dict.setColumnTitle(fieldTitle.value());
                            
                            if(field.getType()==String.class ){
                                dict.setColumnLen(column.length());
                            }else if(field.getType()==BigDecimal.class){
                                dict.setColumnLen(column.length());
                                dict.setColumnPrecision(column.precision());
                            }
                            dict.setColumnType(field.getType().getSimpleName());
                            
                            dict.setIsPk(field.isAnnotationPresent(Id.class));
                            dict.setIsNull(column.nullable());
                            
                            sysTableDictService.save(dict);
                        }else if(field.isAnnotationPresent(Title.class) && field.isAnnotationPresent(JoinColumn.class)){
                            Title fieldTitle = field.getAnnotation(Title.class);
                            JoinColumn column = field.getAnnotation(JoinColumn.class);
                            
                            dict.setColumnCode(field.getName());
                            dict.setColumnName(column.name());
                            dict.setColumnTitle(fieldTitle.value());
                            
                            dict.setIsPk(field.isAnnotationPresent(Id.class));
                            dict.setIsNull(column.nullable());
                            
                            sysTableDictService.save(dict);
                        }
                    }
                }
            }catch (ClassNotFoundException e) {
                throw new MappingException("Failed to scan classpath for unlisted classes", e);
            }
        }
        AppConfig.saveTableList(tableList);
        
        codeRuleService.saveInit(codeRuleList);
    }
    
    
    private void initAppList(){
        List<AppActivate> appList = AppConfig.getAppList();
        for(AppActivate app : appList){
            AppActivate exist = appActivateDao.get(app.getAppKey());
            if(exist == null){
                appActivateService.save(app);
            }
        }
    }
    
    public ResultView initLoginUser(String sessionId) 
    {
        ResultView result = new ResultView();

        LoginState loginState = HRPSession.getLoginStateBySessionId(sessionId);
        if (loginState == null)
        {
            throw new ValidateException("登陆超时，请重新登陆");
        }
        
        String currentUserCode = loginState.getSysUserCode();
        SysUser user = sysUserDao.get(currentUserCode);

        LoginUser loginUser = new LoginUser();
        
        if (user != null)
        {
        	List<SysRole> userRoleList = sysRoleDao.getUserRoleList(user.getSysUserCode());
        	List<String> roleNameList = new ArrayList<>();
        	if(CollectionTools.isNotEmpty(userRoleList)) {
        		for (SysRole sysRole : userRoleList) {
        			roleNameList.add(sysRole.getSysRoleName());
        		}
        		loginUser.setRoleNameList(roleNameList);
        	}

        	
            loginUser.setSysUserCode(currentUserCode);
            loginUser.setSysUserName(user.getSysUserName());
            loginUser.setSysUserAccount(user.getSysUserAccount());
            loginUser.setFileRole(user.getFileRole());

            loginUser.setLoginDate(loginState.getLoginDate());
            
            loginUser.setDeptCode(user.getSysDeptCode());
            loginUser.setDeptName(user.getSysDeptName());
        }

        //保存登陆用户
        loginState.setLoginUser(loginUser);

        result.putData("loginState", loginState);

        return result;
    }
    
    public ResultView getUserInit(String sessionId)
    {
        ResultView result = new ResultView();

        result.putData("loginUser", getLoginUser());
        result.putData("appSetting", SysPropertyService.getAppSetting().getData("appSetting"));

        return result;
    }
    
    public ResultView getMainSetting(){
        ResultView result = new ResultView();
        
        String mainTitle = null;
        SysProperty mainTitleProp = getSysProperty("SYS", "mainTitle");
        if(mainTitleProp != null && StringTools.isNotEmpty(mainTitleProp.getPropValue())){
            mainTitle = mainTitleProp.getPropValue();
        }

        String mainLogoUrl = "";
        SysProperty mainLogoUrlProp = getSysProperty("SYS", "mainLogoUrl");
        if(mainLogoUrlProp != null && StringTools.isNotEmpty(mainLogoUrlProp.getPropValue())){
            mainLogoUrl = mainLogoUrlProp.getPropValue();
        }

        result.putData("mainTitle", mainTitle);
        result.putData("mainLogoUrl", mainLogoUrl);
        
        return result;
    }
    
    
    public static String getProperty(String key) {
        return p.getProperty(key).trim();
    }
    
    public static void initValue(InputStream is) {
        try {
            p.load(is);
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if(is!=null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    public void initFrDataSource1(){
        //获得WEB-INF目录下的路劲
        String webInfoUrl=this.getClass().getResource("").getPath().replaceAll("%20", " ");
         
        //配置文件存放在WEB-INF/config的目录下
        String webInfoFileName="WEB-INF/resources/datasource.xml";
        
        //在WEB-INF目录下找到配置文件
        String webInfoPath=webInfoUrl.substring(0,webInfoUrl.indexOf("WEB-INF"))+webInfoFileName;
        System.out.println("webInfoPath="+webInfoPath);
        try {
            SAXReader reader = new SAXReader();  
            Document doc = reader.read(webInfoPath);
            
            Node rowNode = doc.selectSingleNode("//DatasourceManager/ConnectionMap/Connection/JDBCDatabaseAttr");
            Element ele = (Element)rowNode;
            ele.setAttributeValue("url", dataSource.getUrl());
            ele.setAttributeValue("user", (String)CustomizedPropertyConfigurer.getContextProperty("jdbc.username"));
            ele.setAttributeValue("password", (String)CustomizedPropertyConfigurer.getContextProperty("jdbc.password"));
            
            OutputFormat fmt = OutputFormat.createPrettyPrint();
            fmt.setEncoding("UTF-8");

            XMLWriter xmlWriter = new XMLWriter(new FileWriter(webInfoPath.replace("file:/", "")), fmt);
            xmlWriter.write(doc);
            xmlWriter.close();
        } catch (DocumentException e) {
            System.out.println("读取FineReport数据源配置失败");
            //errorLog("读取FineReport数据源配置失败");
            throw new ValidateException("读取FineReport数据源配置失败", e);
        }  catch(IOException ioe){
            System.out.println("保存FineReport数据源配置失败");
            //errorLog("保存FineReport数据源配置失败");
            throw new ValidateException("保存FineReport数据源配置失败", ioe);
        }
    }
    
    private void initVouchFormat(){
        org.springframework.core.io.Resource[] resources = ClassTools.getXmlResources("vouchFormat");

        AppVouch appVouch = AppConfig.getAppVouch();
        if(appVouch.getVouchList()==null){
            appVouch.setVouchList(new HashMap<String,VouchGeneral>());
        }
        for(int i = 0 ; i < resources.length; i++){
            try {
                InputStream stream = resources[i].getInputStream();
                
                VouchGeneral vouch = JAXB.unmarshal(stream, VouchGeneral.class);
                if(vouch != null){
                    appVouch.getVouchList().put(vouch.getCode(), vouch);
                }
            } catch (IOException e) {
                throw new MappingException("Failed to convert to vouchFormat ", e);
            }
        }
    }
}
