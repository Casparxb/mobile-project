# mobilpro
## 修改上传到GitHub步骤：
1. git add .
2. git commit -m '提交新信息'
3. git.push

## 制作首页App组件
1. 完成Header区域，用mint-ui中的header组件
2. 制作底部Tabbar区域，用的MUI的Tabbar.html
+ 制作购物车时麻烦一些
+ 先把扩展图标的css样式，拷贝到项目中。
+ 再把扩展字体库的ttf文件，拷贝到项目中
+ 最后为购物车图标，添加样式
3.要在 中间区域放一个router-view来展示匹配到的组件
## 改造tabbar 为router-link
## 设置路由高亮
## 点击tabbar的路由连接，展示对应组件
## 制作首页轮播图布局
## 加载首页轮播图数据
1. 获取数据，vue-resource
2. 使用vue-resource 的 this.$http.get
3. 将获取到的数据保存到data上一个空数组上
4. 用v-for 循环渲染每个item项

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

## 发表评论功能
1. 把textarea双向数据绑定
2. 为发表按钮绑定一个事件
3. 判定评论内容是否为空，是的话，Toast用户，评论内容不能为空
4. 通过vue-resource发送一个请求，吧评论内容提交给服务器
5. 发表评论ok后，重新刷新列表。最终目的：以查看最新的评论 
+ 如果调用getComments方法重新刷新列表，可能只能得到，最后一页的评论，前几页的评论获取不到
+ 换一种思路：当评论成功后，在客户端，手动拼接处一个最新的评论对象，
然后调用数组的unshift方法，吧最新的评论，追加到data中comments开头；
这样就能完美实现刷新评论列表的需求；
## 图片分享 将路由链接设置为齐对应的路由组件

## 绘制图片列表 组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

## 制作顶部滑动条遇到的问题：
1. 需要借助MUI中的tab-top-webview-main.html
2. 需要把slider区域中的mui-fulscreen类去掉
3. 滑动条无法触发滑动
在MUI官网查看后知道，这是个JS组件，要初始化一下
+ 导入mui.js
+ 调用官方提供的方式去初始化 
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
4. 在初始化滑动条时，导入了mui.js，报错
mui.js?80c5:3444 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
+ 猜测，可能是mui.js中用到了'caller', 'callee', and 'arguments'这三个东西，但是webpack打包好的bundle.js中，默认是启用严格模式的。所以这2个东西冲突了
+ 解决方案：1.吧mui.js中非严格模式代码改掉(不现实)
2.把webpack打包时候的严格模式禁用掉
在.barbelrc中添加 "ignore": ["./src/lib/mui/js/mui.min.js"]
5. 在滑动时发出的警告：在style中添加touch-action:pan-y;(none也行)
6. 刚进入图片页面分享的时候，不能滑动的问题：
当组件中的DOM结构被渲染好，并放到页面中后，会执行mounted()函数
因此需要等DOM元素加载完毕，该滑动条的初始化放在mounted中。
如果要操作元素，最好在mounted中
7. 当滑动条调试OK后，发现tabbar无法正常工作了。这个时候，我们需要把每个tabbar按钮样式中的类名'mui-tab-item'，重新改一下名字
8. 获取所有分类，并渲染图片列表

## 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们使用Mint-ui提供的组件'lazy-load'
2. 根绝'lazy-load'的使用文档，使用
3. 渲染图片列表数据