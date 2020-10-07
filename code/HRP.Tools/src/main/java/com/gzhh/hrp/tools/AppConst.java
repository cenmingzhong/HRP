package com.gzhh.hrp.tools;

public class AppConst {
    
    public final static String IS_OK_Y = "Y";
    public final static String IS_OK_N = "N";
    
    public final static String ACTION_ADD = "A";       //新增操作
    public final static String ACTION_UPDATE = "U";    //修改操作
    public final static String ACTION_DELETE = "D";    //删除操作
    public final static String ACTION_IMPORT = "I";    //导入操作
    public final static String ACTION_VERIFY = "V";    //审核操作
    public final static String ACTION_DISVERIFY = "DV";//弃审操作
    public final static String ACTION_STOP = "STOP";   //停用操作
    public final static String ACTION_CANCEL = "C";   //作废操作

    public final static String APP_KEY_SYS = "SYS";
    public final static String APP_KEY_NE = "NE";
    public final static String APP_KEY_SR = "SR";
    public final static String APP_KEY_BM = "BM";
    public final static String APP_KEY_XDB = "XDB";
    public final static String APP_KEY_DMS = "DMS";
    public final static String APP_KEY_DB = "DB";
    public final static String APP_KEY_FA = "FA";
    public final static String APP_KEY_RD = "RD";

    public final static String STATE_ACTIVE = "A";//保存状态
    public final static String STATE_VERIFY = "V";//审核状态
    public final static String STATE_SEND = "SEND";//发货状态
    public final static String STATE_REFER = "RF";//被参照状态
    public final static String STATE_REFUSE = "R"; //审核不通过
    public final static String STATE_SUBMIT = "S"; //提交 
    public final static String STATE_DELETE = "D"; // 
    public final static String STATE_CHECK = "C"; // 
    public final static String STATE_PURCHASE = "P"; // 采购中
    public final static String STATE_INSTOCK = "IN"; // 已入库
    
    public final static String OBJECT_KEY_DB_DEPARTMENT = "DB_Department";

    //自定义报表
    public final static String KEY_TYPE_RPT_REPORT_VIEW_ID = "RPT_ReportViewId";
    public final static String KEY_TYPE_RPT_REPORT_DEFINE_ID = "RPT_ReportId";
    public final static String KEY_TYPE_RPT_REPORT_COL_ID = "RPT_ReportColId";
    public final static String KEY_TYPE_RPT_REPORT_QUERY_ID = "RPT_ReportQueryId";
    public final static String KEY_TYPE_RPT_REPORT_AUTH_ID = "RPT_ReportAuthId";
    public final static String KEY_TYPE_RPT_REPORT_ORDER_ID = "RPT_ReportOrderId";
    
    public final static String APPLY_FLAG_UNOUT="待发货";
    public final static String APPLY_FLAG_REJECT="不通过";
    public final static String APPLY_FLAG_RECEIVABLE="待领取";
    public final static String APPLY_FLAG_RECEIVED="已领取";
    public final static String APPLY_FLAG_PURCHASE="采购中";
    public final static String APPLY_FLAG_READYPURCHASE="待采购";

    public final static String OBJECT_KEY_BM_CONTRACT_CLASS = "BM_ContractClass";
    
    public final static String CODE_RULE_CONTRACT_CLASS="22222";
    
}
