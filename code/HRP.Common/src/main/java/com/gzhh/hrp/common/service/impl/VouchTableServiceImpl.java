package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.VouchTableDao;
import com.gzhh.hrp.common.dao.VouchTableFieldDao;
import com.gzhh.hrp.common.entity.VouchBodyField;
import com.gzhh.hrp.common.entity.VouchHeadField;
import com.gzhh.hrp.common.entity.VouchTable;
import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.common.service.VouchTableService;
import com.gzhh.hrp.common.service.format.VouchFormatService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class VouchTableServiceImpl extends BaseService implements VouchTableService {

    @Resource
    private VouchTableDao vouchTableDao;
    @Resource
    private VouchTableFieldDao vouchTableFieldDao;
	@Resource
	private VouchFormatService vouchFormatService;
    
    public ResultView save(VouchTable vouchTable, List<VouchTableField> vouchTableHeadList, 
    		List<VouchTableField> vouchTableBodyList, List<VouchTableField> vouchTableWorkFlowList
    		, List<VouchTableField> vouchTableAccVoucherList){
        ResultView result = new ResultView();
        if (StringTools.isEmpty(vouchTable.getVouchId()))
        {
            String vouchTableId = StringTools.getGuid();
            vouchTable.setVouchId(vouchTableId);
            vouchTableDao.insert(vouchTable);
            if (CollectionTools.isNotEmpty(vouchTableHeadList))
            {
                for(VouchTableField vouchTableHead :vouchTableHeadList)
                {
                    vouchTableHead.setId(StringTools.getGuid());
                    vouchTableHead.setVouchId(vouchTableId);
                    vouchTableHead.setHeadBody("H");
                    vouchTableHead.setFieldOrder(vouchTableHeadList.indexOf(vouchTableHead));
                    vouchTableFieldDao.insert(vouchTableHead);

                }
            }
            if (CollectionTools.isNotEmpty(vouchTableBodyList)){
                for(VouchTableField vouchTableBody:vouchTableBodyList){
                    vouchTableBody.setId(StringTools.getGuid());
                    vouchTableBody.setVouchId(vouchTableId);
                    vouchTableBody.setHeadBody("B");
                    vouchTableBody.setFieldOrder(vouchTableBodyList.indexOf(vouchTableBody));
                    vouchTableFieldDao.insert(vouchTableBody);
                }
            }
            if (CollectionTools.isNotEmpty(vouchTableWorkFlowList)){
                for(VouchTableField vouchTableWorkFlow:vouchTableWorkFlowList){
                	vouchTableWorkFlow.setId(StringTools.getGuid());
                	vouchTableWorkFlow.setVouchId(vouchTableId);
                	vouchTableWorkFlow.setHeadBody("W");
                	vouchTableWorkFlow.setFieldOrder(vouchTableWorkFlowList.indexOf(vouchTableWorkFlow));
                    vouchTableFieldDao.insert(vouchTableWorkFlow);
                }
            }
            if (CollectionTools.isNotEmpty(vouchTableAccVoucherList)){
                for(VouchTableField vouchTableAccVoucher:vouchTableAccVoucherList){
                    vouchTableAccVoucher.setId(StringTools.getGuid());
                    vouchTableAccVoucher.setVouchId(vouchTableId);
                    vouchTableAccVoucher.setHeadBody("A");
                    vouchTableAccVoucher.setFieldOrder(vouchTableWorkFlowList.indexOf(vouchTableAccVoucher));
                    vouchTableFieldDao.insert(vouchTableAccVoucher);
                }
            }
        }else{
            vouchTableDao.update(vouchTable);
            vouchTableFieldDao.deleteByVouchId(vouchTable.getVouchId());
            if (CollectionTools.isNotEmpty(vouchTableHeadList)){
                for(VouchTableField vouchTableHead : vouchTableHeadList){
                    vouchTableHead.setId(StringTools.getGuid());
                    vouchTableHead.setVouchId(vouchTable.getVouchId());
                    vouchTableHead.setHeadBody("H");
                    vouchTableHead.setFieldOrder(vouchTableHeadList.indexOf(vouchTableHead));
                    vouchTableFieldDao.insert(vouchTableHead);

                }
            }
            if (CollectionTools.isNotEmpty(vouchTableBodyList)){
                for(VouchTableField vouchTableBody :vouchTableBodyList){
                    vouchTableBody.setId(StringTools.getGuid());
                    vouchTableBody.setVouchId(vouchTable.getVouchId());
                    vouchTableBody.setHeadBody("B");
                    vouchTableBody.setFieldOrder(vouchTableBodyList.indexOf(vouchTableBody));
                    vouchTableFieldDao.insert(vouchTableBody);
                }
            }
            if (CollectionTools.isNotEmpty(vouchTableWorkFlowList)){
                for(VouchTableField vouchTableWorkFlow :vouchTableWorkFlowList){
                	vouchTableWorkFlow.setId(StringTools.getGuid());
                	vouchTableWorkFlow.setVouchId(vouchTable.getVouchId());
                	vouchTableWorkFlow.setHeadBody("W");
                	vouchTableWorkFlow.setFieldOrder(vouchTableWorkFlowList.indexOf(vouchTableWorkFlow));
                    vouchTableFieldDao.insert(vouchTableWorkFlow);
                }
            }
            if (CollectionTools.isNotEmpty(vouchTableAccVoucherList)){
                for(VouchTableField vouchTableAccVoucher :vouchTableAccVoucherList){
                    vouchTableAccVoucher.setId(StringTools.getGuid());
                    vouchTableAccVoucher.setVouchId(vouchTable.getVouchId());
                    vouchTableAccVoucher.setHeadBody("A");
                    vouchTableAccVoucher.setFieldOrder(vouchTableWorkFlowList.indexOf(vouchTableAccVoucher));
                    vouchTableFieldDao.insert(vouchTableAccVoucher);
                }
            }
        }
        result.putData("vouchTable", vouchTable);
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }

    public ResultView getVouchTableInfo(String vouchId)
    {
        ResultView result = new ResultView();

        VouchTable vouchtable = vouchTableDao.get(vouchId);

        HashMap<String,Object> ht = new HashMap<String,Object>();
        ht.put("vouchId", vouchId);
        ht.put("headBody", "H");
        List<VouchTableField> headFieldList = vouchTableFieldDao.getListByFilter(ht);

        ht.put("headBody", "B");
        List<VouchTableField> bodyFieldList = vouchTableFieldDao.getListByFilter(ht);
        
        ht.put("headBody", "W");
        List<VouchTableField> workFlowFieldList = vouchTableFieldDao.getListByFilter(ht);
        
        ht.put("headBody", "A");
        List<VouchTableField> accVoucherFieldList = vouchTableFieldDao.getListByFilter(ht);
        result.putData("vouchTable", vouchtable);
        result.putData("vouchTableHead", headFieldList);
        result.putData("vouchTableBody", bodyFieldList);
        result.putData("vouchTableWorkFlow", workFlowFieldList);
        result.putData("vouchTableAccVoucher", accVoucherFieldList);

        return result;
    
    }
    public ResultView getVouchTableList(HashMap<String,Object> params)
    {
        ResultView result = new ResultView();
        List<VouchTable> vouchTableList = vouchTableDao.getVouchTableList(params);
        result.putData("vouchTableList", vouchTableList);
        return result;
    }

    public ResultView delete(String vouchId)
    {
        ResultView result = new ResultView();
        vouchTableDao.delete(vouchId);
        vouchTableFieldDao.delete(vouchId);

        return result;
    }

    public ResultView deleteList(List<String> ids)
    {
        ResultView result = new ResultView();
        if (CollectionTools.isNotEmpty(ids)){
            for(String vouchTableId: ids){
                vouchTableDao.delete(vouchTableId);
            }
        }
        return result;
    }

	@SuppressWarnings("unchecked")
	@Override
	public void setInitTemplate(List<Map<String, Object>> vouchList) {
		if(CollectionTools.isEmpty(vouchList)){
			throw new ValidateException("请勾选需要初始化的单据");
		}
		for (Map<String, Object> map : vouchList) {
			VouchTable vouchTable=new VouchTable();
			vouchTable.setVouchCode((String)map.get("code"));
			vouchTable.setVouchName((String)map.get("name"));
			vouchTable.setIsSystem(false);
			String vouchTableId = StringTools.getGuid();
            vouchTable.setVouchId(vouchTableId);
            vouchTableDao.insert(vouchTable);
			ResultView vouchResult = vouchFormatService.getVouchFormat((String)map.get("code"));
			List<VouchHeadField> vouchHeadFieldList =(List<VouchHeadField>) vouchResult.getData("headFieldList");
			List<VouchBodyField> vouchBodyFieldList =(List<VouchBodyField>) vouchResult.getData("bodyFieldList");
			
			for (VouchHeadField vouchHeadField : vouchHeadFieldList) {
				String code = vouchHeadField.getCode();
				String name = vouchHeadField.getName();
				String text = vouchHeadField.getText();
				code = validataFieldCode(code);
				VouchTableField vouchTableHead=new VouchTableField();
				vouchTableHead.setFieldCode(code);
				vouchTableHead.setFieldName(name);
				vouchTableHead.setFieldText(text);
				vouchTableHead.setId(StringTools.getGuid());
                vouchTableHead.setVouchId(vouchTableId);
                vouchTableHead.setHeadBody("H");
                vouchTableHead.setFieldOrder(vouchHeadFieldList.indexOf(vouchHeadField));
                vouchTableFieldDao.insert(vouchTableHead);
			}
			for (VouchBodyField vouchBodyField : vouchBodyFieldList) {
				String code = vouchBodyField.getCode();
				String name = vouchBodyField.getName();
				String text = vouchBodyField.getText();
				code = validataFieldCode(code);
				VouchTableField vouchTableBody=new VouchTableField();
				vouchTableBody.setFieldCode(code);
				vouchTableBody.setFieldName(name);
				vouchTableBody.setFieldText(text);
				vouchTableBody.setId(StringTools.getGuid());
                vouchTableBody.setVouchId(vouchTableId);
                vouchTableBody.setHeadBody("B");
                vouchTableBody.setFieldOrder(vouchBodyFieldList.indexOf(vouchBodyField));
                vouchTableFieldDao.insert(vouchTableBody);
			}
		}
	}

	private String validataFieldCode(String code) {
		switch (code) {
		case "rdType":
			code="rdType.rdName";
			break;
		case "department":
			code="department.deptName";
			break;
		case "dept":
			code="dept.deptName";
			break;
		case "vendor":
			code="vendor.venName";
			break;
		case "ven":
			code="ven.venName";
			break;
		case "warehouse":
			code="warehouse.whName";
			break;
		case "inWh":
			code="inWh.whName";
			break;
		case "outWh":
			code="outWh.whName";
			break;
		case "person":
			code="person.personName";
			break;
		case "org":
			code="org.orgName";
			break;
		case "organ":
			code="organ.orgName";
			break;
		case "unit":
			code="unit.unitName";
			break;
		case "invCls":
			code="invCls.invClsName";
			break;
		case "inventoryClass":
			code="InventoryClass.invClsName";
			break;
		case "inv":
			code="inv.invName";
			break;
		case "inventory":
			code="Inventory.invName";
			break;
		}
		return code;
	}
}