/**
 * @author YangLing
 * @date 2022/6/1 4:15 PM
 */

const whiteList = ['/login', '/404']

export function isTags(path){
  return whiteList.includes(path)
}
