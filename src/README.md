## 修改上传到GitHub步骤：
1. git add .
2. git commit -m '提交新信息'
3. git.push
## 制作首页App组件
1. 完成Header区域，用mint-ui中的header组件
2. 制作底部Tabbar区域，用的MUI的Tabbar.html
3. 制作购物车时麻烦一些
   先把扩展图标的css样式，拷贝到项目中。
   再把扩展字体库的ttf文件，拷贝到项目中
   最后为购物车图标，添加样式 3.要在 中间区域放一个router-view来展示匹配到的组件
## 改造tabbar 为router-link
## 设置路由高亮
## 点击tabbar的路由连接，展示对应组件
1. 制作首页轮播图布局
2. 加载首页轮播图数据
3. 获取数据，vue-resource
4. 使用vue-resource 的 this.$http.get
5. 将获取到的数据保存到data上一个空数组上
   用v-for 循环渲染每个item项
## 改造九宫格的样式

## 改造新闻资讯 路由链接
1. 注意path中路径与routerlink 中路径一致

## 新闻资讯页面制作
1. 绘制界面， 用MUI中media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表 点击跳转到新闻详情 
1. 把列表中每一个改为router-link ，在跳转时提供唯一标识符id
2. 创建新闻详情组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应

## 实现新闻详情的布局和渲染

## 单独封装一个comment评论组件(私有组件)
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment的组件页面中，导入comment组件
3. 在components属性下，将comment注册为自己的组件
4. 在div里调用标签组件名称

## 获取所有的评论数据到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中请求下一页评论数据
2. 点击加载更多，让pageIndex++ ，然后重新调用this.getComments()方法获取最新一页的数据即可
3. 为了防止新数据覆盖老数据，在点击加载更多的时候，应该让老数据调用
concat方法，拼接新数组

