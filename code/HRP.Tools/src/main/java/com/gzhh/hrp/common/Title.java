package com.gzhh.hrp.common;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;

import java.lang.annotation.Documented;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Target({ TYPE, FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Title {
    String value() default "";
    String appKey() default "";
    boolean isCodeRule() default false;
    String ruleKey() default "";
    String ruleValue() default "";
}
