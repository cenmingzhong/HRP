package com.gzhh.hrp.common.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.gzhh.hrp.common.entity.GridColumn;
import com.gzhh.hrp.common.entity.GridGroupHeader;
import com.gzhh.hrp.tools.StringTools;

@Controller
@RequestMapping("/system/export/")
public class ExportAction extends BaseAction {
	
	@RequestMapping("downloadFile")
	public ModelAndView downloadFile() {
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		String fullFileName = null;
		String fileName = request.getParameter("downName");

		if (StringTools.equals(request.getParameter("isFull"), "Y")) {
			fullFileName = request.getParameter("fullFileName");
		} else {
			String fileUrl = request.getParameter("fileName");
			fileUrl = fileUrl.substring(fileUrl.lastIndexOf("upload"));
			fullFileName = request.getSession().getServletContext().getRealPath("/") + fileUrl;
		}
		
		if (StringTools.isEmpty(fileName)) {
			fileName = fullFileName.substring(fullFileName.lastIndexOf("\\") + 1);
		}
		InputStream fis = null;
		OutputStream os = null;
		try {
			File file = new File(fullFileName);
			if (!file.exists()) {
				response.getWriter().write("<script>alert('文件已被删除')</script>");
				return null;
			}

			fis = new BufferedInputStream(new FileInputStream(fullFileName));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);

			response.reset();
			response.resetBuffer();
			response.setContentType("application/octet-stream");// 设置强制下载不打开
			response.addHeader("Content-Disposition",
					"attachment;fileName=" + new String(fileName.replaceAll(" ", "").getBytes("utf-8"), "iso8859-1"));// 设置文件名
			response.addHeader("Content-Length", "" + file.length());

			os = new BufferedOutputStream(response.getOutputStream());
			os.write(buffer);// 输出文件
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
				if (os != null) {
					os.flush();
					os.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@RequestMapping("exportExcel")
	public ModelAndView exportExcel(String fileName, String sheetName, List<GridColumn> titleList,
			List<HashMap<String, Object>> dataList, List<String> titleData, List<List<GridGroupHeader>> groupHeaderList,
			List<String> footData, List<String> mergeList) {
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();

		// 生成提示信息，
		response.setContentType("application/vnd.ms-excel");
		response.setCharacterEncoding("UTF-8");

		OutputStream fOut = null;
		try {
			if (request.getHeader("User-Agent").toLowerCase().contains("firefox")) {
				response.setHeader("Content-Disposition",
						"attachment; filename*=UTF-8''" + URLEncoder.encode(fileName, "UTF-8"));
			} else {
				response.setHeader("content-disposition",
						"attachment;filename=" + URLEncoder.encode(fileName, "UTF-8") + ".xls");
			}
			// response.setHeader("content-disposition", "attachment;filename=" + fileName +
			// ".xls");
			fOut = response.getOutputStream();
			ExcelTools.outputExcel(fOut, sheetName, titleList, dataList, titleData, groupHeaderList, footData,
					mergeList, null);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fOut != null) {
					fOut.flush();
					fOut.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	// 两个日期之间几个月份，在sName年中
	@SuppressWarnings("unused")
	private static List<String> getMonthBetween(String minDate, String maxDate,String sName) throws ParseException {
		ArrayList<String> result = new ArrayList<String>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");// 格式化为年月
		
		String startStr = minDate.substring(0,4);
		String endStr = maxDate.substring(0,4);
		if(!StringTools.equals(sName, endStr)) {
			maxDate = sName+"-12";
		}
		if(!StringTools.equals(sName, startStr)) {
			minDate = sName+"-01";
		}
		
		Calendar min = Calendar.getInstance();
		Calendar max = Calendar.getInstance();

		min.setTime(sdf.parse(minDate));
		min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);

		max.setTime(sdf.parse(maxDate));
		max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);

		Calendar curr = min;
		while (curr.before(max)) {
			result.add(sdf.format(curr.getTime()));
			curr.add(Calendar.MONTH, 1);
		}

		return result;
	}
	
	// 两个日期之间几个月份，在当前日期中
	@SuppressWarnings("unused")
	private static List<String> getMonthBetween(String minDate, String maxDate) throws ParseException {
		ArrayList<String> result = new ArrayList<String>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");// 格式化为年月
		
		Calendar min = Calendar.getInstance();
		Calendar max = Calendar.getInstance();

		min.setTime(sdf.parse(minDate));
		min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);

		max.setTime(sdf.parse(maxDate));
		max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);

		Calendar curr = min;
		while (curr.before(max)) {
			result.add(sdf.format(curr.getTime()));
			curr.add(Calendar.MONTH, 1);
		}

		return result;
	}
	
	// 两个日期之间几个年份(去重)
	@SuppressWarnings("unused")
	private static List<String> getYearIn(String minDate, String maxDate) throws ParseException {
		ArrayList<String> result = new ArrayList<String>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");// 格式化为年

		Calendar min = Calendar.getInstance();
		Calendar max = Calendar.getInstance();

		min.setTime(sdf.parse(minDate));
		min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);

		max.setTime(sdf.parse(maxDate));
		max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);

		Calendar curr = min;
		while (curr.before(max)) {
			result.add(sdf.format(curr.getTime()));
			curr.add(Calendar.YEAR, 1);
		}

		return result;
	}

	/**
	 * * 获取当前日期是星期几<br>
	 * * * @param date * @return 当前日期是星期几
	 */
	public String getWeekOfDate(Date date) {
		String[] weekDays = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" };
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (w < 0)
			w = 0;
		return weekDays[w];
	}

	/**
	 * 获得指定日期的前一天
	 * 
	 * @param specifiedDay
	 * @return
	 * @throws Exception
	 */
	public static String getSpecifiedDayBefore(String specifiedDay) {
		// SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = new SimpleDateFormat("yy-MM-dd").parse(specifiedDay);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		c.setTime(date);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day - 1);

		String dayBefore = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
		return dayBefore;
	}

	/**
	 * 获得指定日期的后一天
	 * 
	 * @param specifiedDay
	 * @return
	 */
	public static String getSpecifiedDayAfter(String specifiedDay) {
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = new SimpleDateFormat("yy-MM-dd").parse(specifiedDay);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		c.setTime(date);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day + 1);

		String dayAfter = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
		return dayAfter;
	}
	
	/**
	 * 获取这个月有多少天
	 * @param dateStr 年月
	 * @return 天数
	 */
	public static int getDaysByYearMonth(String dateStr)
	{
		Calendar a = Calendar.getInstance();
		try {
			a.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(dateStr));
			a.roll(Calendar.DATE, -1);
			int maxDate = a.get(Calendar.DATE);
			return maxDate;
		} catch (ParseException e) {
			e.printStackTrace();
			return 31;
		}
	}
	
	/**
	 * 数字转Excel表头的字母
	 * @param index 第几列
	 * @return 表头的字母
	 */
	public static String getKey(int index){
		String colCode = "";
		char key='A';
		int loop = index / 26;
		if(loop>0){
			colCode += getKey(loop-1);
		}
		key = (char) (key+index%26);
		colCode += key;
		return colCode;
	}
	
	/**
	 * 字符串转中文月份
	 * @param index 第几列
	 * @return 表头的字母
	 */
	public static String getMouthToChinese(String mouth){
		try {
			char[] numberArr = {19968,20108,19977,22235,20116,20845,19971,20843,20061,21313};
			int mouthInt = Integer.valueOf(mouth);
			String mouthStr =StringTools.toString(mouthInt);
			String a = "";
			if(mouthInt<=10) {
				a += numberArr[mouthInt-1];
			}else {
				a = "十";
				a += numberArr[Integer.valueOf(mouthStr.substring(1, 2))-1];
			}
			return a;
		} catch (Exception e) {
			return mouth;
		}
	}
	
	/**
	 * 字符串转英文月份
	 * @param index 第几列
	 * @return 英文月份
	 */
	public static String getMouthToEnglish(String mouth){
		try {
			String[] numberArr = {"Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"};
			int mouthInt = Integer.valueOf(mouth);
			String a = numberArr[mouthInt-1];
			return a;
		} catch (Exception e) {
			return mouth;
		}
	}
}
