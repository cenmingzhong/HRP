package com.gzhh.hrp.common.tools;

import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.sql.*;

/**
 * @author cenmingzhong
 * @create 2020-10-15-上午 10:06
 */
@RequestMapping("/common/tools/DataBaseBackupAndRecovery/")
public class DataBaseBackupAndRecovery {

    /**
     * 获取数据库连接
     *
     * @return Connection 对象
     */
    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=HRP_Java";
            String username = "sa";
            String password = "123456";
            conn = DriverManager.getConnection(url, username, password);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
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
     *
     * @return backup
     * @throws Exception
     */
    @RequestMapping("/backup")
    public String backup() {
        ActionContext context = ActionContext.getContext();
        HttpServletRequest request = (HttpServletRequest) context
                .get(ServletActionContext.HTTP_REQUEST);
        String webtruepath = request.getParameter("E:/HRP_JAVA_back_path/");
        String name = "dbname"; //数据库名
        try {
            File file = new File(webtruepath);
            String path = file.getPath() + "\\" + name + ".bak";// name文件名
            String bakSQL = "backup database HRP_Java to disk=? with init";// SQL语句
            PreparedStatement bak = getConnection()
                    .prepareStatement(bakSQL);
            bak.setString(1, path);// path必须是绝对路径
            bak.execute(); // 备份数据库
            bak.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "backup";
    }


    /**
     * 数据库还原
     *
     * @return recovery
     */
    public String recovery() {
        ActionContext context = ActionContext.getContext();
        HttpServletRequest request = (HttpServletRequest) context
                .get(ServletActionContext.HTTP_REQUEST);
        String webtruepath = request.getParameter("path");
        String name = "******";
        String dbname = "******";
        try {
            File file = new File(webtruepath);
            String path = file.getPath() + "\\" + name + ".bak";// name文件名
            String recoverySql = "ALTER   DATABASE   HRP_Java   SET   ONLINE   WITH   ROLLBACK   IMMEDIATE";// 恢复所有连接

            PreparedStatement ps = getConnection()
                    .prepareStatement(recoverySql);
            CallableStatement cs = getConnection().prepareCall("{call killrestore(?,?)}");
            cs.setString(1, dbname); // 数据库名
            cs.setString(2, path); // 已备份数据库所在路径
            cs.execute(); // 还原数据库
            ps.execute(); // 恢复数据库连接
//            //执行查询数据库操作
//            PreparedStatement pStatement = getConnection().prepareStatement("select * from [t_sjbf]");
//            System.out.println(pStatement.execute());
//            //将连接异常在后台进行处理，处理完这一次异常之后，就可以建立正常的数据库连接
//            dao.find("select * from [t_sjbf]");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "recovery";
    }

}