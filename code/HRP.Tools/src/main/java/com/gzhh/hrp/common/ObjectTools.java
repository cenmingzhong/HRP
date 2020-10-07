package com.gzhh.hrp.common;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.gzhh.hrp.common.ValidateException;

public class ObjectTools {

	public static <T> Object getField(T obj, String fieldName) {
		Object fieldData;
		try {
			Field field = obj.getClass().getDeclaredField(fieldName);
			field.setAccessible(true);
			fieldData = field.get(obj);
		} catch (Exception e) {
			throw new ValidateException("获取字段失败", e);
		}
		return fieldData;
	}
	
	public static <T> void setField(T obj, String fieldName, Object fieldData) {
		try {
			Field field = obj.getClass().getDeclaredField(fieldName);
			if(fieldData instanceof String) {
				Class<?> type = field.getType();
				if(type == String.class) {
					//empty
				} else if(type == Boolean.class || type == boolean.class) {
					fieldData = Boolean.valueOf(fieldData.toString());
				} else if(type == Integer.class || type == int.class) {
					fieldData = Integer.valueOf(fieldData.toString());
				} else if(type == BigDecimal.class) {
					fieldData = new BigDecimal(fieldData.toString());
				} else if(type == Date.class) {
					fieldData = parseDateStr(fieldData.toString());
				}
			}
			field.setAccessible(true);
			field.set(obj, fieldData);
		} catch (Exception e) {
			throw new ValidateException("设置字段失败", e);
		}
	}
	
	public static <T> T newInstance(Class<T> clazz) {
		T result = null;
		try {
			result = clazz.newInstance();
		} catch (Exception e) {
			throw new ValidateException("生成对象失败", e);
		}
		return result;
	}
	
	public static Object invokeMethod(Object obj, String methodName, Class<?>[] parameterTypes, Object[] params) {
		Method method = null;
		Class<?> clazz = obj.getClass();
		try {
			if(params == null || params.length == 0) {
				method = clazz.getMethod(methodName);
			} else {
				method = clazz.getMethod(methodName, parameterTypes);
			}
			return method.invoke(obj, params);
		} catch (Exception e) {
			Throwable cause = e.getCause();
			if(cause instanceof ValidateException) {
				throw (ValidateException) cause;
			}
			throw new ValidateException("执行方法失败", e);
		}
	}
	
	private static Date parseDateStr(String dateStr) {
		Date result = null;
		SimpleDateFormat[] sdfArray = new SimpleDateFormat[] {
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"),
				new SimpleDateFormat("yyyy-MM-dd HH:mm"), new SimpleDateFormat("yyyy-MM-dd HH"),
				new SimpleDateFormat("yyyy-MM-dd"), new SimpleDateFormat("yyyy-MM"), new SimpleDateFormat("yyyy")
		};
		for(SimpleDateFormat sdf : sdfArray) {
			try {
				result = sdf.parse(dateStr);
			} catch (ParseException e) {
				//empty
			}
			if(result != null) {
				break;
			}
		}
		return result;
	}
}
