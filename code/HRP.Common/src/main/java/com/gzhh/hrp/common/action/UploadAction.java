package com.gzhh.hrp.common.action;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.gzhh.hrp.common.Uploader;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.entity.UploadFile;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Controller
public class UploadAction{
	
	protected static final Logger logger = LoggerFactory.getLogger(UploadAction.class);

    @ResponseBody
    @RequestMapping(value = "/upload.do")  
    public ResultView upload(@RequestParam(value = "ajaxUploadFile", required = false) MultipartFile file, HttpServletRequest request, ModelMap model) {  
  
        String path = request.getSession().getServletContext().getRealPath("upload");  
        
        String fileName = file.getOriginalFilename();  
        String extionName = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());//获取文件扩展名

        if (fileName.indexOf("\\") > -1)
        {
            fileName = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length());
        }

        String fileId = StringTools.getGuid();//获取一个GUID值
        String fileKey = fileId + "." + extionName;//新的文件名
        
        String fileUrl = (request.getContextPath()=="/"?"":request.getContextPath()) + "/upload/" + fileKey;
        
        
        //文件大小，以KB为单位
        long fileSize = file.getSize() / 1024;

        if (fileSize > 20480)
        {
            throw new ValidateException("附件太大，请不要上传超过20M的附件");
        }

        File targetFile = new File(path, fileKey);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }
        //保存  
        try {  
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
            throw new ValidateException("上传文件失败");
        }

        UploadFile uploadFile = new UploadFile();

        uploadFile.setFileId(fileId);
        uploadFile.setFileName(fileName);
        uploadFile.setFilePath(path+"\\"+ fileKey);
        uploadFile.setFileExtension(extionName);
        uploadFile.setFileSize(String.valueOf(fileSize));
        uploadFile.setFileUrl(fileUrl);
        uploadFile.setUploadTime(new Date());

        ResultView result = new ResultView();
        result.putData("uploadFile", uploadFile);
  
        return result;  
    }
    
    @ExceptionHandler
    @ResponseBody
    public ResultView  handleAndReturnData(HttpServletRequest request, HttpServletResponse response, Exception ex) {

        logger.error("请求处理错误：",ex);
        ex.printStackTrace();
        ResultView result = new ResultView();
        result.setIsOk("N");
        
        String errorMsg = ex.getMessage();
        if(ex instanceof NullPointerException){
            errorMsg = "空指针异常";
        }
        else if(ex.getCause() != null){
            errorMsg = ex.getCause().getMessage();
        }
        result.setMessage(errorMsg);
        
        return result;
    }
    
    @ResponseBody
	@RequestMapping(value = "/loadExcel.do")
	public ResultView upload(@RequestParam(value = "ajaxUploadFile", required = false) MultipartFile file,
			HttpServletRequest request)  throws Exception {
    	ResultView result = new ResultView();
    	InputStream inputStream;
    	List<Map<String, String>> list = new ArrayList<Map<String,String>>();
    	String fileName = file.getOriginalFilename();  
    	String fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());//获取文件扩展名
    	
    	inputStream = file.getInputStream();
    	list = ExcelTools.readExcelWithTitleByInput(inputStream,fileType, "sheet");
    	
    	result.putData("dataList", list);
        return result;  
	}

    @ResponseBody
    @RequestMapping(value = "/umeditorUpload.do")  
    public String umeditorUpload(HttpServletRequest request,HttpServletResponse response) throws Exception{
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        Uploader up = new Uploader(request);
        up.setSavePath("upload");
        String[] fileType = {".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp"};
        up.setAllowFiles(fileType);
        up.setMaxSize(10000); //单位KB
        up.upload();

        String callback = request.getParameter("callback");

        String result = "{\"name\":\""+ up.getFileName() +"\", \"originalName\": \""+ up.getOriginalName() +"\", \"size\": "+ up.getSize() +", \"state\": \""+ up.getState() +"\", \"type\": \""+ up.getType() +"\", \"url\": \""+ up.getUrl() +"\"}";

        result = result.replaceAll( "\\\\", "\\\\" );

        if( callback == null ){
            response.getWriter().print( result );
        }else{
            response.getWriter().print("<script>"+ callback +"(" + result + ")</script>");
        }
        return null;
    }
}
