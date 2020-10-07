package com.gzhh.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestThread2 {
    private static final SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss.SSS");
    
    public static void main(String[] args) throws InterruptedException {
        int count = 40000;
        Vector<String> vec = new Vector<String>();
        
        System.out.println("开始");
        for(int i = 0 ; i< count; i++){
            try {
                Thread.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            vec.add("1");
        }
        
        System.out.println(vec.size());
        System.out.println("完成");
    }

}
