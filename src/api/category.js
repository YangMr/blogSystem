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
  return request({url : `/article/category/${id}`, method : "delete"})
}

export default {
  getCategoryList,
  deleteCategory
}
