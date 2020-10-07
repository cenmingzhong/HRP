package com.gzhh.hrp.tools;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.calcite.linq4j.Linq4j;
import org.apache.calcite.linq4j.function.BigDecimalFunction1;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.alibaba.fastjson.JSONObject;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.entity.GridColumn;
import com.gzhh.hrp.common.entity.GridGroupHeader;


public class ExcelTools {

    public static List<Map<String, String>> readExcelWithTitle(String filepath, String sheetName) throws Exception {
        String fileType = filepath.substring(filepath.lastIndexOf(".") + 1, filepath.length());
        InputStream is = null;
        Workbook wb = null;
        try {
            is = new FileInputStream(filepath);
             
            if (fileType.equals("xls")) {
                wb = new HSSFWorkbook(is);
            } else if (fileType.equals("xlsx")) {
                wb = new XSSFWorkbook(is);
            } else {
                throw new Exception("读取的不是excel文件");
            }
             
            Sheet sheet = wb.getSheet(sheetName);
            if(sheet == null){
                throw new Exception("Excel文件不存在sheet["+sheetName+"]");
            }
            
            List<Map<String, String>> dataList = new ArrayList<Map<String, String>>();//对应sheet页
             
            List<String> titles = new ArrayList<String>();//放置所有的标题
             
            int rowSize = sheet.getLastRowNum() + 1;
            for (int j = 0; j < rowSize; j++) {//遍历行
                Row row = sheet.getRow(j);
                if (row == null) {//略过空行
                    continue;
                }
                int cellSize = row.getLastCellNum();//行中有多少个单元格，也就是有多少列
                if (j == 0) {//第一行是标题行
                    for (int k = 0; k < cellSize; k++) {
                        Cell cell = row.getCell(k);
                        titles.add(cell.toString());
                    }
                } else {//其他行是数据行
                    Map<String, String> rowMap = new HashMap<String, String>();//对应一个数据行
                    for (int k = 0; k < titles.size(); k++) {
                        Cell cell = row.getCell(k);
                        String key = titles.get(k);
                        String value = null;
                        if (cell != null) {
                            value = parseExcel(cell);
                        }
                        rowMap.put(key, value);
                    }
                    dataList.add(rowMap);
                }
            }
            return dataList;
        } catch (FileNotFoundException e) {
            throw e;
        } finally {
            if (wb != null) {
                wb.close();
            }
            if (is != null) {
                is.close();
            }
        }
    }
    
    private static String parseExcel(Cell cell) {  
        String result = new String();  
        switch (cell.getCellTypeEnum()) {  
            case NUMERIC:// 数字类型  
                if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式  
                    SimpleDateFormat sdf = null;  
                    if (cell.getCellStyle().getDataFormat() == HSSFDataFormat  
                            .getBuiltinFormat("h:mm")) {  
                        sdf = new SimpleDateFormat("HH:mm");  
                    } else {// 日期  
                        sdf = new SimpleDateFormat("yyyy-MM-dd");  
                    }  
                    Date date = cell.getDateCellValue();  
                    result = sdf.format(date);  
                } else if (cell.getCellStyle().getDataFormat() == 58) {  
                    // 处理自定义日期格式：m月d日(通过判断单元格的格式id解决，id的值是58)  
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
                    double value = cell.getNumericCellValue();  
                    Date date = org.apache.poi.ss.usermodel.DateUtil  
                            .getJavaDate(value);  
                    result = sdf.format(date);  
                } else {  
                    double value = cell.getNumericCellValue();
                    result = new DecimalFormat().format(value);
                }  
                break;  
            case STRING:// String类型  
                result = cell.getRichStringCellValue().toString();  
                break;   
            default:  
                result = "";  
                break;  
        }  
        return result;  
    } 
    
    public static boolean isIntegerForDouble(double obj) {  
        double eps = 1e-10;  // 精度范围  
        return obj-Math.floor(obj) < eps;  
    }
    
    public static String getFormatStr(int precision){
        if(precision==0){
            return "0";
        }
        StringBuffer sb = new StringBuffer("0.");
        for(int i = 1; i <= precision; i++){
            sb.append("0");
        }
        return sb.toString();
    }
    
    public static Object getValueFromMap(HashMap<String, Object> map, String key){
        if(key.indexOf(".")>-1){
            String str1 = key.substring(0, key.indexOf("."));
            String str2 = key.substring(key.indexOf(".")+1, key.length());
            
            return getValueFromJson((JSONObject)map.get(str1),str2);
        }
        return map.get(key);
    }
    
    public static Object getValueFromJson(JSONObject jsonObj, String key){
        if(jsonObj == null){
            return null;
        }
        if(key.indexOf(".")>-1){
            String str1 = key.substring(0, key.indexOf("."));
            String str2 = key.substring(key.indexOf(".")+1, key.length());
            
            return getValueFromJson((JSONObject)jsonObj.get(str1),str2);
        }
        return jsonObj.get(key);
    }
    
    private static Invocable getColFormatterFun(String colFormatter){
        ScriptEngineManager sem = new ScriptEngineManager();
        ScriptEngine se = sem.getEngineByName("javascript");
        
        String script = "function formatter(value, rowOpts, rowData){"+colFormatter+"}";
        
        try {
            se.eval(script);
            return (Invocable) se;
        } catch (ScriptException e) {
            throw new ValidateException("执行格式化数据出错："+e.getMessage());
        }
    }
    private static Object getValueFromJsFun(Object oriValue, HashMap<String, Object> data, Invocable formatterFun){
        Object value = null;
        try {
            value = formatterFun.invokeFunction("formatter", oriValue,data, data);
        } catch (Exception e) {
            throw  new ValidateException("执行格式化数据出错："+e.getMessage());
        }
        return value;
    }
    
    public static void main(String[] args) {
        List<GridColumn> titleList = new ArrayList<GridColumn>();
        
        GridColumn col1 = new GridColumn();
        col1.setColId("invClsName1");
        titleList.add(col1);

        GridColumn col2 = new GridColumn();
        col2.setColId("invClsName2");
        titleList.add(col2);

        GridColumn col3 = new GridColumn();
        col3.setColId("qcAmount");
        titleList.add(col3);

        GridColumn col4 = new GridColumn();
        col4.setColId("inAmount");
        titleList.add(col4);

        GridColumn col5 = new GridColumn();
        col5.setColId("qtInAmount");
        titleList.add(col5);
        
        
    }
    
    public static void outputExcel(OutputStream outStream, String sheetName, List<GridColumn> titleList, 
            List<HashMap<String, Object>> dataList,List<String> titleData,List<List<GridGroupHeader>> groupHeaderList) {//传入

        //创建HSSFWorkbook对象(excel的文档对象)  
        HSSFWorkbook hwb = new HSSFWorkbook();
        
        try{
            //建立新的sheet对象（excel的表单）  
            HSSFSheet sheet = hwb.createSheet(sheetName);
            sheet.setDisplayGridlines(true);
            
            HSSFCellStyle style = hwb.createCellStyle(); 
            HSSFFont fontType = hwb.createFont();  
            fontType.setBold(true);
            fontType.setFontName("宋体");  
            fontType.setFontHeightInPoints((short) 11);
            style.setFont(fontType);  
            style.setAlignment(HorizontalAlignment.CENTER);
            style.setBorderLeft(BorderStyle.THIN);  
            style.setBorderRight(BorderStyle.THIN);// 右边框
            
            int rowIdx =0; 
            if(CollectionTools.isNotEmpty(titleData)){
                for(int i =0;i<titleData.size();i++){
                    HSSFRow row = sheet.createRow(i);
                    HSSFCell cell = row.createCell(0); 
                    cell.setCellValue(titleData.get(i));
                    cell.setCellStyle(style); 
                    sheet.addMergedRegion(new CellRangeAddress(i,i,0,titleList.size()-1));
                    
                }
                rowIdx = titleData.size();
            }

            HSSFCellStyle headStyle = hwb.createCellStyle();
            HSSFFont font = hwb.createFont();  
            font.setBold(true);
            font.setFontName("宋体");  
            font.setFontHeightInPoints((short) 11);
            headStyle.setFont(font);  
            headStyle.setAlignment(HorizontalAlignment.CENTER);
            headStyle.setBorderBottom(BorderStyle.THIN);  
            headStyle.setBorderLeft(BorderStyle.THIN);  
            headStyle.setBorderRight(BorderStyle.THIN);  
            headStyle.setBorderTop(BorderStyle.THIN);  
           
            if(CollectionTools.isNotEmpty(groupHeaderList)){
                for(List<GridGroupHeader> gridGroupHeaders: groupHeaderList){
                    HSSFRow row = sheet.createRow(rowIdx);
                    
                    int colIdx= 0;
                    for(GridGroupHeader header: gridGroupHeaders){
                        int startColNum = titleList.indexOf(titleList.stream().filter(t->StringTools.equals(t.getColId(), header.getStartColumnName())).collect(Collectors.toList()).get(0));
                        
                        HSSFCell cell = row.createCell(startColNum);
                        cell.setCellValue(header.getTitleText());
                        cell.setCellStyle(headStyle);
                        
                        if(header.getNumberOfColumns()>1){
                            sheet.addMergedRegion(new CellRangeAddress(rowIdx,rowIdx,startColNum,startColNum+header.getNumberOfColumns()-1));
                        }
                        
                        colIdx= startColNum+header.getNumberOfColumns()-1;
                    }
                    if(CollectionTools.isNotEmpty(titleList)){
                        colIdx = titleList.size()-1;
                    }
                    RegionUtil.setBorderBottom(BorderStyle.THIN, new CellRangeAddress(rowIdx, rowIdx,0, colIdx), sheet);
                    RegionUtil.setBorderTop(BorderStyle.THIN, new CellRangeAddress(rowIdx, rowIdx,0, colIdx), sheet);
                    RegionUtil.setBorderLeft(BorderStyle.THIN, new CellRangeAddress(rowIdx, rowIdx,0, colIdx), sheet);
                    RegionUtil.setBorderRight(BorderStyle.THIN, new CellRangeAddress(rowIdx, rowIdx,0, colIdx), sheet);

                    rowIdx++;
                }
            }
            
            if(CollectionTools.isNotEmpty(titleList)){
                HSSFRow row = sheet.createRow(rowIdx);
                
                int colIdx =0;
                for(GridColumn col: titleList){
                    if(col.getIsHidden())continue;
                    HSSFCell cell = row.createCell(colIdx);
                    cell.setCellValue(col.getColTitle());
                    cell.setCellStyle(headStyle);
                    colIdx++;
                }
                rowIdx++;
            }
            
            HashMap<String, HSSFCellStyle> styleList = new HashMap<String, HSSFCellStyle>();
            HashMap<String, Invocable> formatterList = new HashMap<String, Invocable>();
            
            boolean isSum = false;
            List<String> sumByList = new ArrayList<String>();
            
            if(CollectionTools.isNotEmpty(titleList)){
                for(GridColumn col: titleList){
                    if(col.getIsHidden())continue;
                    
                    HSSFCellStyle cellStyle = hwb.createCellStyle();
                    
                    HSSFFont cellFont = hwb.createFont();  
                    cellFont.setFontName("宋体");  
                    
                    cellStyle.setBorderBottom(BorderStyle.THIN);  
                    cellStyle.setBorderLeft(BorderStyle.THIN);  
                    cellStyle.setBorderRight(BorderStyle.THIN);  
                    cellStyle.setBorderTop(BorderStyle.THIN);
                    cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
                    cellStyle.setFont(cellFont);
                    
                    if(StringTools.equalsIgnoreCase(col.getColAlign(), "right")){
                        cellStyle.setAlignment(HorizontalAlignment.RIGHT);
                    }else if(StringTools.equalsIgnoreCase(col.getColAlign(), "center")){
                        cellStyle.setAlignment(HorizontalAlignment.CENTER);
                    }else{
                        cellStyle.setAlignment(HorizontalAlignment.LEFT);
                    }
                    if(StringTools.equalsIgnoreCase(col.getColType(), "number")){
                        Integer precision = col.getColPrecision();
                        if(precision==null){
                            precision = 2;
                        }
                        HSSFDataFormat format = hwb.createDataFormat();
                        cellStyle.setDataFormat(format.getFormat(getFormatStr(precision)));
                    }
                    styleList.put(col.getColId(), cellStyle);
                    
                    if(StringTools.isNotEmpty(col.getColFormatter())){
                        formatterList.put(col.getColId(), getColFormatterFun(col.getColFormatter()));
                    }
                    if(StringTools.isNotEmpty(col.getColWidth())){
                        sheet.setColumnWidth(titleList.indexOf(col), (short) (40*Integer.parseInt(col.getColWidth())));
                    }
                    
                    if(col.getIsSum() != null && col.getIsSum().booleanValue()){
                        isSum = true;
                        sumByList.add(col.getColId());
                    }
                }
            }
            
            if(isSum && CollectionTools.isNotEmpty(dataList)){
                HashMap<String, Object> sumData = new HashMap<String, Object>();
                for(GridColumn col: titleList){
                    if(col.getIsHidden()){
                        continue;
                    }
                    if(!StringTools.equalsIgnoreCase(col.getColType(), "number")){
                        sumData.put(col.getColId(), "合计");
                        break;
                    }
                }
                
                for(String sumBy: sumByList){
                    BigDecimal d = Linq4j.asEnumerable(dataList).sum(new BigDecimalFunction1<HashMap<String, Object>>() {
                        public BigDecimal apply(HashMap<String, Object> arg0) {
                            return NumberTools.toDecimal(arg0.get(sumBy));
                        }
                    });
                    sumData.put(sumBy, d);
                }
                dataList.add(sumData);
            }
            
            if(CollectionTools.isNotEmpty(dataList) && CollectionTools.isNotEmpty(titleList)){
                
                for(HashMap<String, Object> data : dataList){
                    HSSFRow row = sheet.createRow(rowIdx);
                    
                    int colIdx = 0;
                    for(GridColumn col: titleList){
                        if(col.getIsHidden())continue;
                        HSSFCell cell = row.createCell(colIdx);
                        cell.setCellStyle(styleList.get(col.getColId()));
                        
                        Object value = getValueFromMap(data,col.getColId());
                        if(formatterList.get(col.getColId()) != null){
                            value = getValueFromJsFun(value, data, formatterList.get(col.getColId()));
                        }
                        if(StringTools.equalsIgnoreCase(col.getColType(), "number")){
                            if(value == null){
                                cell.setCellValue("");
                            }else{
                                Integer precision = col.getColPrecision();
                                if(precision==null){
                                    precision = 2;
                                }
                                cell.setCellValue(Double.parseDouble(value.toString()));
                            }
                        }else{
                            if(value == null){
                                cell.setCellValue("");
                            }else{
                                cell.setCellValue(value.toString());
                            }
                        }
                        colIdx++;
                    }
                    rowIdx++;
                }
            }
            
            hwb.write(outStream);
        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                hwb.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
