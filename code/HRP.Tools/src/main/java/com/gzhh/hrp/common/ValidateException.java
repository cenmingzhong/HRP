package com.gzhh.hrp.common;

@SuppressWarnings("serial")
public class ValidateException extends RuntimeException {

    public ValidateException(String message){
        super(message);
    }
    public ValidateException(String message, Exception ex){
        super(message,ex);
    }
}
