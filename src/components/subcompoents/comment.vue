<template>
  <div cmt-container>
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户:{{item.name}}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormat}}</div>
        <div class="cmt-body">{{item.content === 'undefind' ? '该用户很懒，什么都没说' : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain v-on:click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      msg:''
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(res => {
          if (res.body.status === 0) {
            // this.comments = res.body.message;
            //每当获取新评论数据的时候，不要把老数据清空覆盖
            //而是以老数据拼接上新数据，得到一个数组
            this.comments =this.comments.concat(res.body.message);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    getMore() {
      this.pageIndex += 1, 
      this.getComments();
    },
    postComment(){
        //校验内容是否为空
        if(this.msg.trim().length === 0){
            Toast('评论内容不能为空')
        }
        //发表评论
        //参数1：url地址
        //参数2：提交给服务器的数据对象{content:this.msg}
        //参数3：定义提交时候，表单中数据的格式{emulateJSON：true}
        this.$http.
        post('api/postcomment/'+this.$route.params.id,{
            content:this.msg.trim()
            })
            .then(res=>{
                if(res.body.status === 0){
                    //拼接出一个评论对象
                    var cmt ={
                        uesr_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = '';
                }else{
                    Toast("获取评论内容失败！")
                }
            })
    }
  },
  props: ["id"]
};
</script>

<style scoped>
h3 {
  font-size: 18px;
}
textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}
.cmt-list {
  margin: 5px 0;
}
.cmt-title {
  background-color: #ccc;
  font-size: 13px;
}
.cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>