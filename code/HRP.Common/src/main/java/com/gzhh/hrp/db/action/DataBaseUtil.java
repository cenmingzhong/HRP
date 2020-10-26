package com.gzhh.hrp.db.action;

import java.io.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;

import com.gzhh.hrp.tools.ResultView;
import org.aspectj.apache.bcel.generic.DADD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/db/dataBaseUtil/")
public class DataBaseUtil {

    @Autowired
    private DataBaseUtil dataBaseUtil;

    /**
     * 获取数据库连接
     * @return Connection 对象
     */
    public static Connection getConnection(HttpServletRequest request) {
        Properties prop = new Properties();
        Connection conn = null;
        try{
            InputStream in = new BufferedInputStream(new FileInputStream(request.getSession().getServletContext().getRealPath("/")+"dbConfig.properties"));//这个地址在工程目录下
            prop.load(in); //加载属性列表
            in.close();

            String url = prop.getProperty("url");
            String username = prop.getProperty("username");
            String password = prop.getProperty("password");
            String driver = prop.getProperty("driver");

            Class.forName(driver);
            conn = DriverManager.getConnection(url, username, password);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return conn;
    }

    public static void closeConn(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 备份数据库
     * @return backup
     * @throws IOException
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping("backup")
    public void backup(HttpServletRequest request, HttpServletResponse response) throws IOException {


        ResultView resultView = new ResultView();

        Map<String,Object> map = new HashMap<String,Object>();
        String message = "数据库备份失败";
        map.put("success", false);
        map.put("message", message);
        JSONObject rt=null;
        try {

            Properties prop = new Properties();

            String s = request.getSession().getServletContext().getRealPath("/") + "dbConfig.properties";
            InputStream in = new BufferedInputStream(new FileInputStream(s));
            prop.load(in);
            in.close();
            String back_path = prop.getProperty("back_path");
            String dbname = prop.getProperty("dbname"); //数据库名
            java.util.Date date = new java.util.Date();
            String name =dbname+ new SimpleDateFormat("yyyyMMddHHmmssSSS").format(date); //文件名

            File file = new File(back_path);
            String path = file.getPath() + File.separator + name + ".bak";// name文件名
            String str = "backup database "+dbname+" to disk=? with init";
            String s1 = str.toString();
            Connection connection = dataBaseUtil.getConnection(request);
            PreparedStatement ps = connection.prepareStatement(s1);
            ps.setString(1,path);
            boolean bl = ps.execute();

            if(!bl){

//将生成的备份文件信息写入配置文件中
                FileOutputStream oFile = new FileOutputStream(request.getSession().getServletContext().getRealPath("/")+"dbConfig.properties");//true表示追加打开
                prop.setProperty("back_file", name);

                prop.store(oFile, "The New properties file");
                oFile.close();
                map.put("success", true);
                map.put("message", "数据库备份成功");
                 rt= new JSONObject(map);
                response.getWriter().write(rt.toString());

            }
        } catch (Exception e) {
            map.put("success", false);
            map.put("message", "数据库备份异常");
            rt = new JSONObject(map);
            response.getWriter().write(rt.toString());
            e.printStackTrace();
        }

//        resultView.putData("result",rt);
//
//        return resultView;

    }


    /**
     * 数据库还原
     * @return recovery
     * @throws IOException
     */
    @RequestMapping("/recovery")
    public void recovery(HttpServletRequest request,HttpServletResponse response) throws IOException {

        Map<String,Object> map = new HashMap<String,Object>();
        map.put("success", false);
        map.put("message", "数据库还原失败");
        try {

            Properties prop = new Properties();
            InputStream in = new BufferedInputStream(new FileInputStream(request.getSession().getServletContext().getRealPath("/")+"dbConfig.properties"));
            prop.load(in);
            in.close();

            String dbname = prop.getProperty("dbname"); //数据库名

//备份文件路径
            String name = prop.getProperty("back_file");
            String back_path = prop.getProperty("back_path");
            File file= new File(back_path);
            String path = file.getPath()+File.separator+name+".bak";


//恢复所有连接 sql
            String recoverySql = "alter database "+dbname+" set online with rollback immediate";

            StringBuffer restoreSql = new StringBuffer();
            restoreSql.append("RESTORE DATABASE ").append(dbname);
            restoreSql.append(" FROM DISK=N'").append(path).append("'");
            restoreSql.append(" WITH REPLACE,FILE = 1,RECOVERY,STATS = 5");

            PreparedStatement ps = DataBaseUtil.getConnection(request).prepareStatement(recoverySql);
            PreparedStatement rs = DataBaseUtil.getConnection(request).prepareStatement(restoreSql.toString());
            CallableStatement cs = DataBaseUtil.getConnection(request).prepareCall("{call killrestore(?,?)}");

            cs.setString(1, dbname); // 数据库名
            cs.setString(2, "'"+path+"'"); // 已备份数据库所在路径
            boolean bl = cs.execute(); // 关闭数据库链接进程
            boolean flg = rs.execute();

            boolean recoverFlg = ps.execute(); // 恢复数据库连接

            if((!bl)&&(!recoverFlg)&&(!flg)){
                map.put("success", true);
                map.put("message", "数据库还原成功");
            }
        } catch (Exception e) {

            e.printStackTrace();
        }
        JSONObject rt = new JSONObject(map);

        response.getWriter().write(rt.toString());
    }


}