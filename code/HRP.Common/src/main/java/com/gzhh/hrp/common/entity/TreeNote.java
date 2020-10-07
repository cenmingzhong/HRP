package com.gzhh.hrp.common.entity;

import java.util.List;

import com.gzhh.hrp.common.Title;

public class TreeNote {
    @Title("节点")
    private String nodeCode ;
    @Title("节点名称")
    private String nodeName ;
    @Title("节点类型")
    private String nodeType ;
    @Title("父节点")
    private String nodeParent ;
    @Title("实体")
    private Object entity ;
    @Title("子节点")
    private List<TreeNote> children ;
    public String getNodeCode() {
        return nodeCode;
    }
    public void setNodeCode(String nodeCode) {
        this.nodeCode = nodeCode;
    }
    public String getNodeName() {
        return nodeName;
    }
    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }
    public String getNodeType() {
        return nodeType;
    }
    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }
    public String getNodeParent() {
        return nodeParent;
    }
    public void setNodeParent(String nodeParent) {
        this.nodeParent = nodeParent;
    }
    public Object getEntity() {
        return entity;
    }
    public void setEntity(Object entity) {
       this. entity = entity;
    }
    public List<TreeNote> getChildren() {
        return children;
    }
    public void setChildren(List<TreeNote> children) {
        this.children = children;
    }
    
}
