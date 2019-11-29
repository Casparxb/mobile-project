<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle"> 
        <span>发表时间:{{newsinfo.add_time | dataFormat}}</span>
        <span>点击:{{newsinfo.click}}次</span>
        </p>
        
        <hr>

        <div class="content" v-html="newsinfo.content"></div>
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import comment from '../subcompoents/comment.vue'

export default {
    data(){
        return {
            //将URL地址中传来的ID值，挂载到data上方便以后调用
            id:this.$route.params.id,
            //新闻对象
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id)
            .then(res=>{
                if(res.body.status === 0){
                    this.newsinfo = res.body.message[0];
                }else{
                    Toast('获取新闻详情失败!')
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style >
.newsinfo-container{
    padding:0 4px;
}
.title{
    font-size:16px;
    text-align: center;
    margin: 15px 0;
    color: red;
}
.subtitle{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}
img{
    width: 100%;
}
</style>