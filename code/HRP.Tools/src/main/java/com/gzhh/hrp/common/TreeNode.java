package com.gzhh.hrp.common;

import java.util.List;

public class TreeNode {

    private String nodeCode;
    private String nodeName;
    private String nodeType;
    private String nodeParent;
    private Object entity;
    private String dataCode;
    private List<TreeNode> children;
    
    public TreeNode(){
    }
    public TreeNode(String nodeCode, String nodeName, String nodeType, String nodeParent, String dataCode){
        this.nodeCode = nodeCode;
        this.nodeName = nodeName;
        this.nodeType = nodeType;
        this.nodeParent = nodeParent;
        this.dataCode = dataCode;
    }
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
        this.entity = entity;
    }
    public String getDataCode() {
        return dataCode;
    }
    public void setDataCode(String dataCode) {
        this.dataCode = dataCode;
    }
    public List<TreeNode> getChildren() {
        return children;
    }
    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
    
    
}
