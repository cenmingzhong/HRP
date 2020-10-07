package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.PrintTemplateClassDao;
import com.gzhh.hrp.common.dao.PrintTemplateCompDao;
import com.gzhh.hrp.common.dao.PrintTemplateDao;
import com.gzhh.hrp.common.dao.PrintTemplateItemDao;
import com.gzhh.hrp.common.dao.PrintTemplateItemPropDao;
import com.gzhh.hrp.common.entity.PrintTemplate;
import com.gzhh.hrp.common.entity.PrintTemplateClass;
import com.gzhh.hrp.common.entity.PrintTemplateComp;
import com.gzhh.hrp.common.entity.PrintTemplateItem;
import com.gzhh.hrp.common.entity.PrintTemplateItemProp;
import com.gzhh.hrp.common.entity.TreeNote;
import com.gzhh.hrp.common.service.PrintTemplateService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class PrintTemplateServiceImpl extends BaseService implements PrintTemplateService {

    @Resource
    private PrintTemplateDao printTemplateDao;
    @Resource
    private PrintTemplateClassDao printTemplateClassDao ;
    @Resource
    private PrintTemplateCompDao printTemplateCompDao ;
    @Resource
    private PrintTemplateItemDao printTemplateItemDao ;
    @Resource
    private PrintTemplateItemPropDao printTemplateItemPropDao ;

    private final String COMPONENT_TYPE_PAGE = "P";
    private final String COMPONENT_TYPE_HEAD = "H";
    private final String COMPONENT_TYPE_BODY = "B";
    private final String COMPONENT_TYPE_WORK_FLOW = "W";
    private final String COMPONENT_TYPE_ACC_VOUCHER = "A";
    private final String COMPONENT_TYPE_DEFINE = "D";

    public ResultView save(PrintTemplate printTemplate)
    {
        ResultView result = new ResultView();
        if (StringTools.isEmpty(printTemplate.getTemplateCode())){
            printTemplate.setTemplateCode(StringTools.getGuid());
            printTemplateDao.insert(printTemplate);
        }else{
            printTemplateDao.update(printTemplate);
        }

        //如果保存的模板是默认模板，则设置其他默认为非默认模板
        if (printTemplate.getIsDefault()){
           printTemplateDao.removeOtherDefault(printTemplate.getTemplateClsCode(), printTemplate.getTemplateCode());
        }
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }

    public ResultView delete(String templateCode)
    {
        ResultView result = new ResultView();

        printTemplateDao.delete(templateCode);

        return result;
    }
    //复制打印模板
    
    @SuppressWarnings("unchecked")
    public ResultView copyTemplate(PrintTemplate printTemplate, String copyTemplateCode)
    {
        ResultView result = new ResultView();

        save(printTemplate);

        ResultView copyResult = getPrintTemplate(printTemplate.getTemplateClsCode() ,copyTemplateCode);

       HashMap<String,Object> pageData =(HashMap<String, Object>) copyResult.getData("pageData");
       HashMap<String,Object> bodyData =(HashMap<String, Object>)copyResult.getData("bodyData");
       HashMap<String,Object> workFlowData =(HashMap<String, Object>)copyResult.getData("workFlowData");
       HashMap<String,Object> accVoucherData =(HashMap<String, Object>)copyResult.getData("accVoucherData");
       List<HashMap<String, Object>> headItemList = ( List<HashMap<String, Object>>)copyResult.getData("headItemList");
       List<HashMap<String, Object>> bodyItemList = (List<HashMap<String, Object>>) copyResult.getData("bodyItemList");
       List<HashMap<String, Object>> workFlowItemList = (List<HashMap<String, Object>>) copyResult.getData("workFlowItemList");
       List<HashMap<String, Object>> accVoucherItemList = (List<HashMap<String, Object>>) copyResult.getData("accVoucherItemList");
       List<HashMap<String, Object>> defineItemList =(List<HashMap<String, Object>>)copyResult.getData("defineItemList");
        
       savePrintTemplate(printTemplate.getTemplateCode(), pageData, bodyData, workFlowData, accVoucherData, headItemList, 
    		   bodyItemList, workFlowItemList, accVoucherItemList, defineItemList);

        return result;
    }
    //获取打印模板树
    public ResultView getTemplateTree()
    {
        ResultView result = new ResultView();

        List<TreeNote> tree = new ArrayList<TreeNote>();
        List<PrintTemplateClass> classList = printTemplateClassDao.getListByFilter(null);
        
        for(PrintTemplateClass tempCls : classList){
            TreeNote node = new TreeNote();
      
            node.setNodeCode(tempCls.getTemplateClsCode());
            node.setNodeName(tempCls.getTemplateClsName());
            node.setNodeParent("");
            node.setNodeType("TempCls");
            node.setEntity(tempCls);

            tree.add(node);
        }
        
        List<PrintTemplate> tempList = printTemplateDao.getListByFilter(null);
        
        List<PrintTemplate> defList = tempList.stream().filter(t->t.getIsDefault()).collect(Collectors.toList());
        for(PrintTemplate temp : defList){
            TreeNote node = new TreeNote();
            node.setNodeCode(temp.getTemplateClsCode()+"_"+temp.getTemplateCode());
            node.setNodeName(temp.getTemplateName());
            node.setNodeParent(temp.getTemplateClsCode());
            node.setNodeType("Temp");
            node.setEntity(temp);

            tree.add(node);
        }

        List<PrintTemplate> unDefList = tempList.stream().filter(t->!t.getIsDefault()).collect(Collectors.toList());
        for(PrintTemplate temp : unDefList){
            TreeNote node = new TreeNote();
            node.setNodeCode(temp.getTemplateClsCode()+"_"+temp.getTemplateCode());
            node.setNodeName(temp.getTemplateName());
            node.setNodeParent(temp.getTemplateClsCode());
            node.setNodeType("Temp");
            node.setEntity(temp);

            tree.add(node);
        }
        result.putData("templateTree", tree);

        return result;
    }

    public PrintTemplate getDefaultTemplate(String templateClsCode)
    {
        HashMap<String,Object> ht = new  HashMap<String,Object>();

        ht.put("templateClsCode", templateClsCode);
        ht.put("isDefault", true);

        List<PrintTemplate> printTemplateList = printTemplateDao.getListByFilter(ht);
        if (CollectionTools.isNotEmpty(printTemplateList))
        {
            return printTemplateList.get(0);
        }
        return null;
    }

    public ResultView getPrintTemplateList(String templateClsCode)
    {
        ResultView result = new ResultView();

        HashMap<String,Object> ht = new  HashMap<String,Object>();

        ht.put("templateClsCode", templateClsCode);
        List<PrintTemplate> templateList = printTemplateDao.getListByFilter(ht);
        templateList.sort(new Comparator<PrintTemplate>() {
            @Override
            public int compare(PrintTemplate o1, PrintTemplate o2) {
                int i1 = o1.getIsDefault()?1:0;
                int i2 = o2.getIsDefault()?1:0;
                return i1<i2?1:-1;
            }
        });;

        result.putData("templateList", templateList);

        return result;
    }

    //获取打印模板信息
    //templateClsCode表示单据类型，templateCode表示打印模板编号
    //如果TemplateCode不为空，则取对应的模板，
    //如果templateCode为空，则去templateClsCode对应单据的默认模板
    public ResultView getPrintTemplate(String templateClsCode, String templateCode)
    {
        ResultView result = new ResultView();

        HashMap<String,Object> pageData = null;
        HashMap<String,Object> bodyData = null; 
        HashMap<String,Object> workFlowData = null;
        HashMap<String,Object> accVoucherData = null;
        List< HashMap<String,Object>> headItemList = null;
        List< HashMap<String,Object>> bodyItemList = null;
        List< HashMap<String,Object>> workFlowItemList = null;
        List< HashMap<String,Object>> accVoucherItemList = null;
        List< HashMap<String,Object>> defineItemList = null;

        if (StringTools.isEmpty(templateCode)){
            PrintTemplate defaultTemplate = getDefaultTemplate(templateClsCode);
            if (defaultTemplate == null){
                throw new ValidateException("未设置默认模板");
            }
            templateCode = defaultTemplate.getTemplateCode();
        }

        //获取页面设置
        PrintTemplateComp pageComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_PAGE);
        if (pageComp != null){
            pageData = new HashMap<String,Object>();

            List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", pageComp.getComponentId()));
            for(PrintTemplateItemProp prop: propList){
                pageData.put(prop.getPropName(), prop.getPropValue());
            }
        }

        //获取表头项目
        PrintTemplateComp headComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_HEAD);
        if (headComp != null){
            headItemList = new ArrayList< HashMap<String,Object>>();

            List<PrintTemplateItem> itemList = printTemplateItemDao.getListByFilter(CommonTools.newHashMap("componentId", headComp.getComponentId()));

            for(PrintTemplateItem item : itemList){
                HashMap<String,Object> headItem = new HashMap<String,Object>();

                List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", item.getItemId()));
                for(PrintTemplateItemProp prop :propList){
                    headItem.put(prop.getPropName(), prop.getPropValue());
                }
                headItemList.add(headItem);
            }
        }

        //获取表体项目
        PrintTemplateComp bodyComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_BODY);
        if (bodyComp != null){
            bodyData = new HashMap<String,Object>();

            //获取表体设置信息
            List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", bodyComp.getComponentId()));
            for(PrintTemplateItemProp prop:propList){
                bodyData.put(prop.getPropName(), prop.getPropValue());
            }

            bodyItemList = new ArrayList< HashMap<String,Object>>();
            //获取表体列项目信息
            List<PrintTemplateItem> itemList = printTemplateItemDao.getListByFilter(CommonTools.newHashMap("componentId", bodyComp.getComponentId()));

            for(PrintTemplateItem item:itemList){
                HashMap<String,Object> bodyItem = new HashMap<String,Object>();

                List<PrintTemplateItemProp> bodyPropList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", item.getItemId()));
                for(PrintTemplateItemProp prop: bodyPropList){
                    bodyItem.put(prop.getPropName(), prop.getPropValue());
                }
                bodyItemList.add(bodyItem);
            }
        }
        
        //获取打印流项目
        PrintTemplateComp workFlowComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_WORK_FLOW);
        if (workFlowComp != null){
        	workFlowData = new HashMap<String,Object>();

            //获取打印流设置信息
            List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", workFlowComp.getComponentId()));
            for(PrintTemplateItemProp prop:propList){
            	workFlowData.put(prop.getPropName(), prop.getPropValue());
            }

            workFlowItemList = new ArrayList< HashMap<String,Object>>();
            //获取打印流列项目信息
            List<PrintTemplateItem> itemList = printTemplateItemDao.getListByFilter(CommonTools.newHashMap("componentId",  workFlowComp.getComponentId()));

            for(PrintTemplateItem item:itemList){
                HashMap<String,Object>  workFlowItem = new HashMap<String,Object>();

                List<PrintTemplateItemProp>  workFlowPropList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", item.getItemId()));
                for(PrintTemplateItemProp prop:  workFlowPropList){
                	 workFlowItem.put(prop.getPropName(), prop.getPropValue());
                }
                workFlowItemList.add( workFlowItem);
            }
        }
        
        //获取凭证套打项目
        PrintTemplateComp accVoucherComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_ACC_VOUCHER);
        if (accVoucherComp != null){
            accVoucherData = new HashMap<String,Object>();

            //获取打印流设置信息
            List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", accVoucherComp.getComponentId()));
            for(PrintTemplateItemProp prop:propList){
                accVoucherData.put(prop.getPropName(), prop.getPropValue());
            }

            accVoucherItemList = new ArrayList< HashMap<String,Object>>();
            //获取打印流列项目信息
            List<PrintTemplateItem> itemList = printTemplateItemDao.getListByFilter(CommonTools.newHashMap("componentId",  accVoucherComp.getComponentId()));

            for(PrintTemplateItem item:itemList){
                HashMap<String,Object>  accVoucherItem = new HashMap<String,Object>();

                List<PrintTemplateItemProp>  accVoucherPropList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", item.getItemId()));
                for(PrintTemplateItemProp prop:  accVoucherPropList){
                     accVoucherItem.put(prop.getPropName(), prop.getPropValue());
                }
                accVoucherItemList.add(accVoucherItem);
            }
        }


        //获取自定义项目
        PrintTemplateComp defineComp = printTemplateCompDao.getComponentByType(templateCode, COMPONENT_TYPE_DEFINE);
        if (defineComp != null){
            defineItemList = new ArrayList< HashMap<String,Object>>();

            List<PrintTemplateItem> itemList = printTemplateItemDao.getListByFilter(CommonTools.newHashMap("componentId", defineComp.getComponentId()));

            for(PrintTemplateItem item:itemList){
                HashMap<String,Object> defineItem = new HashMap<String,Object>();

                List<PrintTemplateItemProp> propList = printTemplateItemPropDao.getListByFilter(CommonTools.newHashMap("itemId", item.getItemId()));
                for(PrintTemplateItemProp prop:propList){
                    defineItem.put(prop.getPropName(), prop.getPropValue());
                }
                defineItemList.add(defineItem);
            }
        }

        result.putData("pageData", pageData);
        result.putData("bodyData", bodyData);
        result.putData("workFlowData", workFlowData);
        result.putData("accVoucherData", accVoucherData);
        result.putData("headItemList", headItemList);
        result.putData("bodyItemList", bodyItemList);
        result.putData("workFlowItemList", workFlowItemList);
        result.putData("accVoucherItemList", accVoucherItemList);
        result.putData("defineItemList", defineItemList);

        return result;
    }

    //保存打印模板
     public ResultView savePrintTemplate(String templateCode, HashMap<String, Object> pageData,
            HashMap<String, Object> bodyData, HashMap<String,Object> workFlowData, HashMap<String,Object> accVoucherData,List<HashMap<String,Object>> headItemList, 
            List<HashMap<String,Object>> bodyItemList, List<HashMap<String,Object>> workFlowItemList,List<HashMap<String,Object>> accVoucherItemList,
            List<HashMap<String,Object>> defineItemList){
         
            ResultView result = new ResultView();
            
            //清空原有设置
            printTemplateCompDao.deleteByTemplateCode(templateCode);
            printTemplateItemDao.deleteByTemplateCode(templateCode);
            printTemplateItemPropDao.deleteByTemplateCode(templateCode);
            
            //保存页面信息
            if (pageData != null && pageData.size() > 0){
                PrintTemplateComp comp = new PrintTemplateComp();
                comp.setComponentId(StringTools.getGuid());
                comp.setComponentType(COMPONENT_TYPE_PAGE);
                comp.setTemplateCode(templateCode);
                printTemplateCompDao.insert(comp);
                //迭代pageData的key，value逐个插入到对应的模块
                Iterator<Entry<String, Object>> iter = pageData.entrySet().iterator();
                while(iter.hasNext()){  
                    Entry<String, Object> entry = iter.next();
      
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();
    
                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId(comp.getComponentId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType(COMPONENT_TYPE_PAGE);
                    prop.setPropName(String.valueOf(entry.getKey()));
                    prop.setPropValue(String.valueOf(entry.getValue()));
    
                    printTemplateItemPropDao.insert(prop);
                }
            }

        //保存表头项目
        if (CollectionTools.isNotEmpty(headItemList)){
            PrintTemplateComp comp = new PrintTemplateComp();
            comp.setComponentId(StringTools.getGuid());
            comp.setComponentType(COMPONENT_TYPE_HEAD);
            comp.setTemplateCode(templateCode);
            printTemplateCompDao.insert(comp);

            for(HashMap<String,Object> itemData : headItemList){
                PrintTemplateItem item = new PrintTemplateItem();

                item.setItemId(StringTools.getGuid());
                item.setComponentId(comp.getComponentId());
                item.setTemplateCode(templateCode);
                item.setItemType( COMPONENT_TYPE_HEAD);
                item.setItemOrder(headItemList.indexOf(itemData));

                printTemplateItemDao.insert(item);
               
                Iterator<Entry<String, Object>> iter = itemData.entrySet().iterator();
                while(iter.hasNext()){   
                    Entry<String, Object> entry = iter.next();
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();

                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId( item.getItemId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType( COMPONENT_TYPE_HEAD);
                    prop.setPropName( String.valueOf(entry.getKey()));
                    prop.setPropValue( String.valueOf(entry.getValue()));

                    printTemplateItemPropDao.insert(prop);
                }
            }
        }

        //保存表体项目
        if (bodyData != null && bodyData.size() > 0 && CollectionTools.isNotEmpty(bodyItemList)){
            //保存表体设置信息
            PrintTemplateComp comp = new PrintTemplateComp();
            comp.setComponentId(StringTools.getGuid());
            comp.setComponentType(COMPONENT_TYPE_BODY);
            comp.setTemplateCode(templateCode);
            printTemplateCompDao.insert(comp);
            Iterator<Entry<String, Object>> iter =  bodyData.entrySet().iterator();
            while(iter.hasNext()){   
                Entry<String, Object> entry = iter.next();
            
                PrintTemplateItemProp prop = new PrintTemplateItemProp();

                prop.setPropId(StringTools.getGuid());
                prop.setItemId(comp.getComponentId());
                prop.setTemplateCode(templateCode);
                prop.setPropType(COMPONENT_TYPE_BODY);
                prop.setPropName(String.valueOf(entry.getKey()));
                prop.setPropValue(String.valueOf(entry.getValue()));

                printTemplateItemPropDao.insert(prop);
            }

            //保存表体列项目
            for (HashMap<String,Object> itemData :bodyItemList){
                PrintTemplateItem item = new PrintTemplateItem();

                item.setItemId(StringTools.getGuid());
                item.setComponentId(comp.getComponentId());
                item.setTemplateCode(templateCode);
                item.setItemType(COMPONENT_TYPE_BODY);
                item.setItemOrder(bodyItemList.indexOf(itemData));

                printTemplateItemDao.insert(item);
                Iterator<Entry<String, Object>> it = itemData.entrySet().iterator();
                while(it.hasNext()){   
                    Entry<String, Object> entry = it.next();
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();

                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId(item.getItemId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType(COMPONENT_TYPE_BODY);
                    prop.setPropName(String.valueOf(entry.getKey()));
                    prop.setPropValue(String.valueOf(entry.getValue()));

                    printTemplateItemPropDao.insert(prop);
                }
            }
        }


        //保存自定义项目
        if (CollectionTools.isNotEmpty(defineItemList)){
            PrintTemplateComp comp = new PrintTemplateComp();
            comp.setComponentId(StringTools.getGuid());
            comp.setComponentType(COMPONENT_TYPE_DEFINE);
            comp.setTemplateCode( templateCode);
            printTemplateCompDao.insert(comp);
            
            for(HashMap<String, Object> itemData : defineItemList){
                PrintTemplateItem item = new PrintTemplateItem();

                item.setItemId(StringTools.getGuid());
                item.setComponentId(comp.getComponentId());
                item.setTemplateCode(templateCode);
                item.setItemType(COMPONENT_TYPE_DEFINE);
                item.setItemOrder(defineItemList.indexOf(itemData));
                
                printTemplateItemDao.insert(item);
                
                Iterator<Entry<String, Object>> it = itemData.entrySet().iterator();
                while(it.hasNext()){   
                    Entry<String, Object> entry = it.next();
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();

                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId(item.getItemId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType(COMPONENT_TYPE_DEFINE);
                    prop.setPropName(String.valueOf(entry.getKey()));
                    prop.setPropValue(String.valueOf(entry.getValue()));

                    printTemplateItemPropDao.insert(prop);
                }
            }
        }
        
        //保存打印流项目信息
        if (workFlowData != null && workFlowData.size() > 0 && CollectionTools.isNotEmpty(workFlowItemList)) {
            //保存打印流设置信息
            PrintTemplateComp comp = new PrintTemplateComp();
            comp.setComponentId(StringTools.getGuid());
            comp.setComponentType(COMPONENT_TYPE_WORK_FLOW);
            comp.setTemplateCode(templateCode);
            printTemplateCompDao.insert(comp);
            Iterator<Entry<String, Object>> iter =  workFlowData.entrySet().iterator();
            while(iter.hasNext()){   
                Entry<String, Object> entry = iter.next();
            
                PrintTemplateItemProp prop = new PrintTemplateItemProp();

                prop.setPropId(StringTools.getGuid());
                prop.setItemId(comp.getComponentId());
                prop.setTemplateCode(templateCode);
                prop.setPropType(COMPONENT_TYPE_WORK_FLOW);
                prop.setPropName(String.valueOf(entry.getKey()));
                prop.setPropValue(String.valueOf(entry.getValue()));

                printTemplateItemPropDao.insert(prop);
            }

            //保存打印流列项目
            for (HashMap<String,Object> itemData :workFlowItemList){
                PrintTemplateItem item = new PrintTemplateItem();

                item.setItemId(StringTools.getGuid());
                item.setComponentId(comp.getComponentId());
                item.setTemplateCode(templateCode);
                item.setItemType(COMPONENT_TYPE_WORK_FLOW);
                item.setItemOrder(workFlowItemList.indexOf(itemData));

                printTemplateItemDao.insert(item);
                Iterator<Entry<String, Object>> it = itemData.entrySet().iterator();
                while(it.hasNext()){   
                    Entry<String, Object> entry = it.next();
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();

                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId(item.getItemId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType(COMPONENT_TYPE_WORK_FLOW);
                    prop.setPropName(String.valueOf(entry.getKey()));
                    prop.setPropValue(String.valueOf(entry.getValue()));

                    printTemplateItemPropDao.insert(prop);
                }
            }
        }
        
        //保存凭证套打项目信息
        if (accVoucherData != null && accVoucherData.size() > 0 && CollectionTools.isNotEmpty(accVoucherItemList)) {
            //保存打印流设置信息
            PrintTemplateComp comp = new PrintTemplateComp();
            comp.setComponentId(StringTools.getGuid());
            comp.setComponentType(COMPONENT_TYPE_ACC_VOUCHER);
            comp.setTemplateCode(templateCode);
            printTemplateCompDao.insert(comp);
            Iterator<Entry<String, Object>> iter =  accVoucherData.entrySet().iterator();
            while(iter.hasNext()){   
                Entry<String, Object> entry = iter.next();
            
                PrintTemplateItemProp prop = new PrintTemplateItemProp();

                prop.setPropId(StringTools.getGuid());
                prop.setItemId(comp.getComponentId());
                prop.setTemplateCode(templateCode);
                prop.setPropType(COMPONENT_TYPE_ACC_VOUCHER);
                prop.setPropName(String.valueOf(entry.getKey()));
                prop.setPropValue(String.valueOf(entry.getValue()));

                printTemplateItemPropDao.insert(prop);
            }

            //保存凭证套打列项目
            for (HashMap<String,Object> itemData :accVoucherItemList){
                PrintTemplateItem item = new PrintTemplateItem();

                item.setItemId(StringTools.getGuid());
                item.setComponentId(comp.getComponentId());
                item.setTemplateCode(templateCode);
                item.setItemType(COMPONENT_TYPE_ACC_VOUCHER);
                item.setItemOrder(accVoucherItemList.indexOf(itemData));

                printTemplateItemDao.insert(item);
                Iterator<Entry<String, Object>> it = itemData.entrySet().iterator();
                while(it.hasNext()){   
                    Entry<String, Object> entry = it.next();
                    PrintTemplateItemProp prop = new PrintTemplateItemProp();

                    prop.setPropId(StringTools.getGuid());
                    prop.setItemId(item.getItemId());
                    prop.setTemplateCode(templateCode);
                    prop.setPropType(COMPONENT_TYPE_ACC_VOUCHER);
                    prop.setPropName(String.valueOf(entry.getKey()));
                    prop.setPropValue(String.valueOf(entry.getValue()));

                    printTemplateItemPropDao.insert(prop);
                }
            }
        }
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }

    @Override
    public ResultView getPrintTemplateInfo(String templateCode) {
        ResultView result=new ResultView();
        PrintTemplate  PrintTemplate=printTemplateDao.get(templateCode);
        result.putData("PrintTemplate", PrintTemplate);
        return result;
    }

 
}
