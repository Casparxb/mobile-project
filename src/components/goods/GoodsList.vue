<template>
  <div class="goods-list">
    
     <!-- 
<router-link class="goods-item" v-for="item in goodslist"
     :to="'/home/goodsinfo/'+item.id" :key="item.id" tag="div">
      <img :src="item.img_url"/>
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
     </router-link>

     -->
     <div class="goods-item" v-for="item in goodslist" 
     :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url"/>
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
     </div>

    <mt-button type='danger' size='large' @click="getMore">加载更多</mt-button>
  </div>
  
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  //data是往自己组建内部，挂在一些私有数据
  data(){
    return {
      pageindex:1,//分页的页数
      goodslist:[]//存放商品列表的数组
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex=' + this.pageindex)
      .then(res=>{
        if(res.body.status==0){
          this.goodslist =this.goodslist.concat(res.body.message);
        }else{
          Toast("加载更多失败！")
        }
      })
    },
    getMore(){
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id){
      //使用js跳转，借助router的实例方法，通过编写代码来实现
      //1.最简单的
      // this.$router.push('/home/goodsinfo/'+id);
      //2.传递对象
      // this.$router.push({path:'/home/goodsinfo/'+id});
      //3.name属性跳转，命名路由
      console.log(this);
      this.$router.push({name:'goodsinfo',params:{id:id}})
    }
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;
}
.goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 9px #ccc;
  margin: 5px 0;
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 253px;
}
.goods-item img {
  width: 100%;
}
.title {
  font-size: 14px;
}

P{
    margin: 0;
    padding: 5px;
}
.price{

}
.now{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
.sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
</style>