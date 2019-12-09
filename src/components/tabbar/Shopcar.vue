<template>
  <div class="shaopcar-container">
    <div class="goods-list">
      <!--商品列表项区域-->
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!--如何从购物车中获取商品的数量？？？-->
                <!--我们先创建一个空对象，然后循环购物车中所有商品的数据，
                吧当前商品的id作为对象的属性名，count值作为对象的属性值，
                这样把所有的商品循环一遍，就可以得到一个对象:{88:2,89:1,90:4}-->
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--结算区域-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选的商品 <span class="r">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
              总价￥<span class="r">{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import numbox from "../subcompoents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //1.获取store中所有商品的id拼接出一个，用都好分隔的字符串
      //获取购物车商品列表
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(res => {
          if (res.body.status == 0) {
            this.goodslist = res.body.message;
          }
        });
    },
    remove(id, index) {
      //点击删除
      //1.根据item.id把商品从store中删除
      //2.根据index把当前组件的goodslist中，对应的商品删除
      this.goodslist.splice(index, 1); //删除了本地数据
      //删除远程store数据，得用mutation
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id,val){
        //每当点击开关，把最新的状态同步到store中
        // console.log(id,val)
        this.$store.commit('updateGoodsSelected',{id,selected:val});
    }
  },
  components: {
    numbox
  }
};
</script>

<style scoped>
.shaopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.goods-list {
}
img {
  width: 60px;
  height: 60px;
  margin: 13px;
}
h1 {
  font-size: 13px;
}
.price {
  color: red;
  font-weight: bold;
}
.mui-card-content-inner {
  display: flex;
  align-items: center;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.jiesuan{
    display: flex;
    justify-content: space-between;
}
.r{
    color: red;
}
</style>