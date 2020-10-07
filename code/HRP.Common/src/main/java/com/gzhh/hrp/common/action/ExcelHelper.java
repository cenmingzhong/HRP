package com.gzhh.hrp.common.action;
//郑瑞之
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.gzhh.hrp.common.entity.GridColumn;
//import com.gzhh.hrp.tools.ExcelTools;

public class ExcelHelper {
    
    /**
     * 导出excel到客户端
     * @param dataList 要导出的数据
     * @param colList  导出数据对应的列名集合(每一个HashMap的键值对为"{key ： colId, text ： colTitle}")
     * @param exportName 导出文件的名称
     * @param sheetname  sheet的名称
     */
    public static void exportExcel(List<HashMap<String, Object>> dataList, List<HashMap<String, Object>> colList, String exportName, String sheetname) {
    	HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		List<GridColumn> titleList = new ArrayList<GridColumn>();
		int colWidth;		//列宽
		String colTitle;		//列标题
		for (int i = 0; i < colList.size(); i++) {
			GridColumn column = new GridColumn();
			column.setColId(colList.get(i).get("key").toString());
			column.setColAlign("center");
			
			colTitle = colList.get(i).get("text").toString();
			column.setColTitle(colTitle);
			
			//计算列宽（由于ExcelTools.outputExcel对写入列宽*40，这里需除去保证导出时列宽为计算的列宽）
			colWidth = colTitle.getBytes().length*2*256/40;
			column.setColWidth(colWidth+"");
			
			titleList.add(column);
		}
		OutputStream fOut = null;
		try {
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(exportName,"UTF-8") + ".xls");  
            fOut = response.getOutputStream(); 
            ExcelTools.outputExcel(fOut, sheetname, titleList, dataList, null, null, null, null,null);
        } catch (Exception e) {
           throw new RuntimeException(e);
        } finally  {  
            try {  
                if(fOut != null){
                    fOut.flush();  
                    fOut.close();  
                }
            }  catch (IOException e){
                throw new RuntimeException(e);
            }
        }
    }
    
    /**
     * 导出excel 表格
     * @param dataList 要导出的数据
     * @param columnNames 导出数据对应的列名
     * @param exportName 导出文件的名称
     * @param sheetname  sheet的名称
     */
    public static void exportExcel(List<HashMap<String, Object>> dataList, String[] columnNames, String exportName, String sheetname){
    	HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    	List<GridColumn> titleList = createExcelColumns(columnNames);

		OutputStream fOut = null;
		try {
            response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(exportName,"UTF-8") + ".xls");  
            fOut = response.getOutputStream(); 
            ExcelTools.outputExcel(fOut, sheetname, titleList, dataList, null, null, null, null, null);
        } catch (Exception e) {
           throw new RuntimeException(e);
        } finally  {  
            try {  
                if(fOut != null){
                    fOut.flush();
                    fOut.close();  
                }
            }  catch (IOException e){
                throw new RuntimeException(e);
            }
        }
    }
    
    public static List<GridColumn> createExcelColumns(String... columnNames) {
		List<GridColumn> titleList = new ArrayList<GridColumn>();
		int colWidth;
		for (int i=0; i<columnNames.length; i++) {
			GridColumn c = new GridColumn();
			c.setColId(columnNames[i]);
			c.setColTitle(columnNames[i]);
			c.setColAlign("center");
			
			//计算列宽（由于ExcelTools.outputExcel对写入列宽*40，这里需除去保证导出时列宽为计算的列宽）
			colWidth = columnNames[i].getBytes().length*2*256/40;
			c.setColWidth(colWidth+"");
			
			titleList.add(c);
		}
		
		return titleList;
	}
}

