/**
 * @author YangLing
 * @date 2022/6/2 3:47 PM
 */
import request from '@/utils/request'

/**
 * 获取分类列表
 * @param data
 * @returns {*}
 */
const getCategoryList = (data = {})=>{
  return request({url : '/article/category/search', method : "POST", data })
}

/**
 * 删除单个分类接口
 * @param id
 * @returns {AxiosPromise}
 */
const deleteCategory = (id)=>{
  return request({url : `/article/category/${id}`, method : "DELETE"})
}

/**
 * 查询单个分类接口
 * @param id
 * @returns {AxiosPromise}
 */
const findCategory = (id) =>{
  return request({url : `/article/category/${id}`, method : "GET"})
}

/**
 * 新增分类接口
 * @param data
 * @returns {AxiosPromise}
 */
const addCategory = (data)=>{
  return request({url : "/article/category", method : "POST", data})
}

/**
 * 编辑分类接口
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
const editCategory = (id,data) =>{
  return request({url : `/article/category/${id}`, method : "PUT", data})
}

export default {
  getCategoryList,
  deleteCategory,
  findCategory,
  addCategory,
  editCategory
}
