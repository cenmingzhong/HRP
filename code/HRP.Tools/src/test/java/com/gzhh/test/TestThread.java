package com.gzhh.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Vector;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestThread {
    private static final SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss.SSS");
    
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(200);

        int count = 40000;
        CountDownLatch latch = new CountDownLatch(count);
        
        Vector<String> vec = new Vector<String>();
        
        System.out.println("开始");
        for(int i = 0 ; i< count; i++){
            final int tempI = i;
            Runnable run = new Runnable() {
                @Override
                public void run() {
                    //System.out.println("i="+tempI+",thread:" + Thread.currentThread().getName() + ",time:" + format.format(new Date()));
                    try {
                        Thread.sleep(5);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    vec.add("1");
                    latch.countDown();
                }
            };
            executor.execute(run);
        }
        latch.await();
        executor.shutdown();
        
        System.out.println(vec.size());
        System.out.println("完成");
    }

}
