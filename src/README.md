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