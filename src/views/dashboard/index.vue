<template>
  <div>
      我是首页模块
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {}
  },
  methods : {

  }
}
</script>

<style scoped>
*{
  margin : 0;
  padding : 0;
}
.tabs{
  box-shadow: 1px 1px 1px #000;
  padding : 10px 0;
}
ul{
  list-style : none;
  overflow : hidden;
}
.tabs ul li{
  float:left;
  padding : 10px;
  font-size : 12px;
  border : 1px solid #ccc;
  margin-right : 10px;
  cursor : pointer;
}
.contextmenu{
  background:#fff;
  border :1px solid #ccc;
  width : 120px;
}
.contextmenu ul{
  padding :0 20px;
}
.contextmenu li{
  font-size : 12px;
  height : 30px;
  line-height:30px;
  cursor : pointer;
}
.close{
  display:inline-block;
  width : 15px;
  height : 15px;
  text-align : center;
  line-height:15px;
  border-radius:50%;
  background : #eee;
  font-size : 12px;
  margin-left:3px;
}
</style>
