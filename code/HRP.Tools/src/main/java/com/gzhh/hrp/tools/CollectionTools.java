package com.gzhh.hrp.tools;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.calcite.linq4j.Grouping;
import org.apache.calcite.linq4j.Linq4j;
import org.apache.calcite.linq4j.function.BigDecimalFunction1;
import org.apache.calcite.linq4j.function.Function1;
import org.apache.commons.collections.CollectionUtils;

import com.gzhh.hrp.common.ValidateException;

public class CollectionTools {

	public static boolean isEmpty(Collection<?> col) {
		return CollectionUtils.isEmpty(col);
	}
    public static boolean isNotEmpty(Collection<?> col) {
        return !isEmpty(col);
    }
    
    /** 
     * 对list的元素按照多个属性名称排序, 
     * list元素的属性可以是数字（byte、short、int、long、float、double等，支持正数、负数、0）、char、String、java.util.Date 
     *  
     *  
     * @param lsit 
     * @param sortname 
     *            list元素的属性名称 
     * @param isAsc 
     *            true升序，false降序 
     */  
    public static <E> void sort(List<E> list, final boolean isAsc, final List<String> sortnameArr) {  
        Collections.sort(list, new Comparator<E>() {  
  
            public int compare(E a, E b) {  
                int ret = 0;  
                try {  
                    for (int i = 0; i < sortnameArr.size(); i++) {  
                        ret = compareObject(sortnameArr.get(i), isAsc, a, b);  
                        if (0 != ret) {  
                            break;  
                        }  
                    }  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
                return ret;  
            }  
        });  
    }  
      
    /** 
     * 给list的每个属性都指定是升序还是降序 
     *  
     * @param list 
     * @param sortnameArr  参数数组 
     * @param typeArr      每个属性对应的升降序数组， true升序，false降序 
     */  
  
    public static <E> void sort(List<E> list, final String[] sortnameArr, final boolean[] typeArr) {  
        if (sortnameArr.length != typeArr.length) {  
            throw new RuntimeException("属性数组元素个数和升降序数组元素个数不相等");  
        }  
        Collections.sort(list, new Comparator<E>() {  
            public int compare(E a, E b) {  
                int ret = 0;  
                try {  
                    for (int i = 0; i < sortnameArr.length; i++) {  
                        ret = compareObject(sortnameArr[i], typeArr[i], a, b);  
                        if (0 != ret) {  
                            break;  
                        }  
                    }  
                } catch (Exception e) {  
                    e.printStackTrace();  
                }  
                return ret;  
            }  
        });  
    }  
  
    /** 
     * 对2个对象按照指定属性名称进行排序 
     *  
     * @param sortname 
     *            属性名称 
     * @param isAsc 
     *            true升序，false降序 
     * @param a 
     * @param b 
     * @return 
     * @throws Exception 
     */  
    private static <E> int compareObject(final String sortname, final boolean isAsc, E a, E b) throws Exception {  
        int ret;  
        Object value1 = forceGetFieldValue(a, sortname);  
        Object value2 = forceGetFieldValue(b, sortname);  

        String str1 = StringTools.toString(value1);
        String str2 = StringTools.toString(value2);

        if (value1 instanceof Number && value2 instanceof Number) {  
            int maxlen = Math.max(str1.length(), str2.length());  
            str1 = StringTools.padLeft(str1, maxlen, '0');  
            str2 = StringTools.padLeft(str2, maxlen, '0');
        } else if (value1 instanceof Date && value2 instanceof Date) {  
            long time1 = ((Date) value1).getTime();  
            long time2 = ((Date) value2).getTime();  
            int maxlen = Long.toString(Math.max(time1, time2)).length();  
            str1 = StringTools.padLeft(String.valueOf(time1), maxlen, '0');  
            str2 = StringTools.padLeft(String.valueOf(time2), maxlen, '0');
        }
        if (isAsc) {  
            ret = str1.compareTo(str2);  
        } else {  
            ret = str2.compareTo(str1);  
        }  
        return ret;  
    }  
  
  
    /** 
     * 获取指定对象的指定属性值（去除private,protected的限制） 
     *  
     * @param obj 
     *            属性名称所在的对象 
     * @param fieldName 
     *            属性名称 
     * @return 
     * @throws Exception 
     */  
    public static Object forceGetFieldValue(Object obj, String fieldName) throws Exception {
        if(obj instanceof Map){
            return getValueFromMap((Map)obj, fieldName);
            //return ((Map)obj).get(fieldName);
        }
        Field field = obj.getClass().getDeclaredField(fieldName);  
        Object object = null;  
        boolean accessible = field.isAccessible();  
        if (!accessible) {  
            // 如果是private,protected修饰的属性，需要修改为可以访问的  
            field.setAccessible(true);  
            object = field.get(obj);  
            // 还原private,protected属性的访问性质  
            field.setAccessible(accessible);  
            return object;  
        }  
        object = field.get(obj);  
        return object;  
    }
    
    public static List<Map> getGroupDataList(List<Map> dataList, List<String> groupByList, List<String> sumByList){
        sort(dataList, true, groupByList);  
        List<Grouping<List<String>, Map>> list = Linq4j.asEnumerable(dataList).groupBy(new Function1<Map, List<String>>() {

            @Override
            public List<String> apply(Map m) {
                List<String> l = new ArrayList<String>();
                for (String groupBy : groupByList) {
                    //l.add(StringTools.toString(m.get(groupBy)));
                    l.add(StringTools.toString(getValueFromMap(m,groupBy)));
                }
                return l;
            }

        }).toList();
        
        List<Map> sumDataList = new ArrayList<Map>();
        for(Grouping<List<String>, Map> data: list){
            Map<String, Object> sumData = new HashMap<String, Object>();
            sumData.put("jqGroupData",true);

            for(String groupBy : groupByList){
                sumData.put(groupBy, data.getKey().get(groupByList.indexOf(groupBy)));
            }
            for(String sumBy: sumByList){
                BigDecimal d = Linq4j.asEnumerable(data.toList()).sum(new BigDecimalFunction1<Map>() {
                    public BigDecimal apply(Map arg0) {
                        //return NumberTools.toDecimal(arg0.get(sumBy));
                        return NumberTools.toDecimal(getValueFromMap(arg0,sumBy));
                    }
                });
                sumData.put(sumBy, d);
            }
            
            sumDataList.add(sumData);
        }
        dataList.addAll(sumDataList);

        sort(dataList, true, groupByList);
        
        return dataList;
    }
    
    public static Object getValueFromMap(Map data, String key){
        Object value = data.get(key);
        if(value != null){
            return value;
        }
        if(key.indexOf(".") !=-1){
            Object tempData = data.get(key.substring(0, key.indexOf(".")));
            if(tempData == null){
                return null;
            }else{
                return getValueFromMap((Map)tempData, key.substring(key.indexOf(".")+1));
            }
        }else{
            return null;
        }
    }
    
    public static <E> Map<String, E> listToMap(Class<E> clazz, List<E> list, String keyCol) {
    	return listToMap(clazz, list, "", keyCol);
    }
    
    public static <E> Map<String, E> listToMap(Class<E> clazz, List<E> list, String cutStr, String...keyCols) {
		Map<String, E> map = new HashMap<>();
		List<Field> keyList = new ArrayList<>();
		for(String keyCol : keyCols) {
			try {
				Field key = clazz.getDeclaredField(keyCol);
				key.setAccessible(true);
				keyList.add(key);
			} catch (Exception e) {
				throw new ValidateException("获取字段失败, class: " + clazz.getName() + ", field: " + keyCol, e);
			}
		}
		if(cutStr == null) {
			cutStr = "";
		}
		if(isNotEmpty(list)) {
			for(E element : list) {
				String keyStr = "";
				for(Field key : keyList) {
					try {
						keyStr += (String) key.get(element) + cutStr;
					} catch (Exception e) {
						throw new ValidateException("获取属性失败, keyCol: " + key.getName() + ", obj: " + element, e);
					}
				}
				keyStr = keyStr.substring(0, keyStr.length() - cutStr.length());
				map.put(keyStr, element);
			}
		}
		return map;
	}
    
    public static <E> Map<String, List<E>> groupList(Class<E> clazz, List<E> list, String groupCol) {
    	return groupList(clazz, list, "", groupCol);
    }
    
    public static <E> Map<String, List<E>> groupList(Class<E> clazz, List<E> list, String cutStr, String...groupCols) {
		Map<String, List<E>> map = new HashMap<>();
		List<Field> groupFieldList = new ArrayList<>();
		for(String groupCol : groupCols) {
			try {
				Field groupField = clazz.getDeclaredField(groupCol);
				groupField.setAccessible(true);
				groupFieldList.add(groupField);
			} catch (Exception e) {
				throw new ValidateException("获取字段失败, class: " + clazz.getName() + ", field: " + groupCol, e);
			}
		}
		if(cutStr == null) {
			cutStr = "";
		}
		if(isNotEmpty(list)) {
			for(E element : list) {
				String groupStr = "";
				for(Field groupField : groupFieldList) {
					try {
						groupStr += (String) groupField.get(element) + cutStr;
					} catch (Exception e) {
						throw new ValidateException("获取属性失败, keyCol: " + groupField.getName() + ", obj: " + element, e);
					}
				}
				groupStr = groupStr.substring(0, groupStr.length() - cutStr.length());
				List<E> groupList = map.get(groupStr);
				if(groupList == null) {
					groupList = new ArrayList<>();
					map.put(groupStr, groupList);
				}
				groupList.add(element);
			}
		}
		return map;
	}
    
    /*
     * 将参数集合根据参数长度拆分
     */
    public static List<List<?>> splitList(List<?> list, int len) {
        if (list == null || list.size() == 0 || len < 1) {
            return null;
        }
     
        List<List<?>> result = new ArrayList<List<?>>();
        int size = list.size();
        int count = (size + len - 1) / len;
    
        for (int i = 0; i < count; i++) {
            List<?> subList = list.subList(i * len, ((i + 1) * len > size ? size : len * (i + 1)));
            result.add(subList);
        }
        return result;
    }
}
