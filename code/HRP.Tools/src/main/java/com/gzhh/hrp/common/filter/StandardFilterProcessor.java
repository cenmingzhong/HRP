package com.gzhh.hrp.common.filter;

import java.text.MessageFormat;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import com.gzhh.hrp.common.CommonFilter;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.tools.ClassTools;
import com.gzhh.hrp.tools.StringTools;


/**
 * 标准的条件处理器，功能：把零散的条件属性组装成HIBERNATE能识别的Criterion对象 输入：属性名，属性值，所属性的pojo类，和别名
 * 扩展时：
 * 1、如果完整个实现，只需要实现接口IConditionBuilder就行。
 * 2、如果只想自定义某些类型的条件，如整数型条件处理器，则模仿IntegerValueHandler类再实现一个，
 *    然后通过addCustomerConditionHandlers或setCustomerConditionHandlers方法设进来就行
 */
public final class StandardFilterProcessor {
    
    /** 系统默认各类型的条件处理器集合 */
    private Set<IValueHandler> filterHandlers = new LinkedHashSet<IValueHandler>();
    private Set<IValueHandler> customerFilterHandlers = new LinkedHashSet<IValueHandler>();
    
    public static final String EQ = "=";
    public static final String NE = "<>";
    public static final String LIKE = "like";
    public static final String LLIKE = "like%";
    public static final String RLIKE = "%like";
    public static final String NLLIKE = "nlike%";
    public static final String GT = ">";
    public static final String LT = "<";
    public static final String GE = ">=";
    public static final String LE = "<=";
    public static final String IN = "in";
    public static final String NI = "not in";
    public static final String ISNU = "is null";
    public static final String ISNOTNU = "is not null";
    public static final String ISEMP = "is empty";
    public static final String ISNOTEMP = "is not empty";
    /**
     * 初始化的时候，把标准的处理器全部设入
     * 
     */
    public StandardFilterProcessor() {
        filterHandlers.add(StringValueHandler.getInstance());
        filterHandlers.add(DoubleValueHandler.getInstance());
        filterHandlers.add(LongValueHandler.getInstance());
        filterHandlers.add(IntegerValueHandler.getInstance());
        filterHandlers.add(IntValueHandler.getInstance());
        filterHandlers.add(BigDecimalValueHandler.getInstance());
        filterHandlers.add(DateValueHandler.getInstance());
        filterHandlers.add(TimeStampValueHandler.getInstance());
        filterHandlers.add(FloatValueHandler.getInstance());
        filterHandlers.add(BooleanValueHandler.getInstance());
        filterHandlers.add(BoolValueHandler.getInstance());
    }

    /**
     * 把字符串条件解析成condition对象，再解析成Criterion对象 此方法不支持POJO中子集合为MAP类型的查询 2008-10-16
     * 
     * @param key
     * @param value
     * @param pojoClass
     */
    public void parseToCriterion(DetachedCriteria dc, CommonFilter filter,Class<?> pojoClass) {
        if(filter == null){
            return;
        }
        String key = filter.getName();
        Object oriValue = filter.getValue();
        String operator = filter.getOperator();
        
        if(oriValue ==null){
            return;
        }
        try {
            Class<?> valueType = ClassTools.getPropertyType(pojoClass, key);
            
            if (valueType.isAssignableFrom(String.class)) {// 属性为字符串
                String value = String.valueOf(oriValue);
                if(StringTools.equals(operator, ISNU) || StringTools.equals(operator, ISNOTNU)){
                    dc.add(getRestriction(key, value, operator));
                }else if(StringTools.isNotEmpty(value)){
                    dc.add(getRestriction(key, value, operator));
                }
            }else{
                Object value = oriValue;
                if(!StringTools.equals(operator, "in")){
                    value = parseValue(valueType, oriValue);
                }
                if(StringTools.equals(operator, ISNU) || StringTools.equals(operator, ISNOTNU)){
                    dc.add(getRestriction(key, value, operator));
                }else if(value != null){
                    dc.add(getRestriction(key, value, operator));
                }
            }
        } catch (SecurityException e) {
            e.printStackTrace();
            throw new ValidateException("由于安全限制，不能访问属性："+key,e);
        } 
    }

    private Criterion getRestriction(String key, Object value, String operator){
        switch (operator) {
            case EQ:
                return Restrictions.eq(key, value);
            case NE:
                return Restrictions.ne(key, value);
            case LIKE:
                return Restrictions.like(key, String.valueOf(value),MatchMode.ANYWHERE);
            case LLIKE:
                return Restrictions.like(key, String.valueOf(value), MatchMode.START);
            case RLIKE:
                return Restrictions.like(key, String.valueOf(value), MatchMode.END);
            case GT:
                return Restrictions.gt(key, value);
            case LT:
                return Restrictions.lt(key, value);
            case GE:
                return Restrictions.ge(key, value);
            case LE:
                return Restrictions.le(key, value);
            case IN:
                return Restrictions.in(key, (String.valueOf(value)).split("\\,"));
            case NI:
                return Restrictions.not(Restrictions.in(key, (String.valueOf(value)).split("\\,")));
            case ISNU:
                return Restrictions.isNull(key);
            case ISNOTNU:
                return Restrictions.isNotNull(key);
            case ISEMP:
                return Restrictions.isEmpty(key);
            case ISNOTEMP:
                return Restrictions.isNotEmpty(key);
            default:
                throw new ValidateException(MessageFormat.format("系统未提供比较符({0})的操作", operator));
        }
    }

    private Object parseValue(Class<?> valueType, Object value){
        Set<IValueHandler> temp = getConditionHandlers();
        for (IValueHandler handler : temp) {
            if (valueType.isAssignableFrom(handler.getHandleType())) {
                return handler.getValue(value);
            }
        }
        throw new ValidateException("找不到匹配的条件处理类，无法过滤此属性，请定义此类型的条件处理类，条件类型："+ valueType.getName());
    }

    /**
     * 获得所有条件组合器
     * 
     * @return
     */
    private Set<IValueHandler> getConditionHandlers() {
        if (customerFilterHandlers!=null && !customerFilterHandlers.isEmpty()) {
            filterHandlers.addAll(customerFilterHandlers);
        }
        return filterHandlers;
    }

    ////////////////////下面两个方法是预留给用扩展某些类型的条件处理器用的///////////////
    /**
     * 单个增加条件得处器集合
     * @param handler
     */
    public void addCustomerFilterHandlers(IValueHandler handler) {
        if(handler==null){
            throw new ValidateException("传入条件处理器为空。");
        }
        if(customerFilterHandlers==null){
            customerFilterHandlers = new HashSet<IValueHandler>(1);;
        }
        customerFilterHandlers.add(handler);
    }

    /**
     * 传入用户自定义条件处理器集合
     * @param customerConditionDealers
     */
    public void setCustomerConditionHandlers(
            Set<IValueHandler> customerConditionDealers) {
        this.customerFilterHandlers = customerConditionDealers;
    }
}
