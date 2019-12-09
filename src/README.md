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

## 实现了点击图片跳转到图片详细页面
1. 在改造li成router-link时，需要使用tag标签指定渲染为哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图功能
1. 使用插件vue-preview 缩略图插件
2. 获取到所有的图片列表，然后使用v-for 指令渲染数据
3. 注意img标签上的class不能去掉
4. 注意，每个图片数据对象中，必须有w和h属性

## 绘制 商品列表页面基本结构并美化

## 尝试在手机上，去进行项目的预览和测试
1. 保证自己的手机可以正常运行
2. 保证手机和开发项目的电脑处于同一个wifi环境下，也就是说手机可以访问到电脑的ip
3. 打开自己的项目中  package.json文件，在dev脚本中，添加一个--host指令
把当前电脑的wifi ip地址，设置为--host的指令值
+ 如何查自己电脑所处的wifi ip呢，在cmd终端运行`ipconfig`，查看无线网的ip地址

## 加载商品列表中数据并实现加载更多
1. 定义方法getGoodsList来获取数据this.$http.get().then()
2. 在页面初始化之前，调用created方法this.getGoodsList()获取数据
3. 渲染，v-for循环goods-item，注意:key唯一绑定
4. 用mintui组件给一个button按钮，
<mt-button type='danger' size='large' >加载更多</mt-button>
5.因为加载更多是第一页的数据不动，然后继续展示第二页内容，所以是第二页数据拼接第一页的数据，所以在点击加载更多时，getGoodsList内数据应该是拼接而成。this.goodslist = this.goodslist.concat(res.body.message)

## 点击进入图片详情
1. 创建GoodsInfo.vue 然后路由三部曲
在把div改成router-link时，注意绑定to的时候，因为要拼接id，所以要绑定属性即:to=" '/home/goods/info' + item.id "，字符串拼接用''，标签都是用""
最后给它加上标签tag="div"
2. 上面的是普通标签跳转，现在用编程时导航(借助router实例方法,写JS代码)
方法：给div绑定一个点击事件@click="goDetail(item.id)"
因为要拼接id所以要给传参数
this.$router.push('/home/goodsinfo/'+item.id)
this.$router.push({path:'/home/goodsinfo/'+item.id})
this.$router.push({name:"goodsinfo",params:{id})

注意:this.$route 是路由参数对象，所有路由中的参数params.query都属于它
this.$router 是一个路由导航对象，可以用js实现路由的前进后退和跳转url

## 抽离轮播图组件
1. id:this.$route.params.id将路由参数对象中的id挂载到data上，方便调用
2. 分析:因为商品详情页面中的轮播图与缩略图中都有轮播图，抽离出来谁用谁调用即可，方便简洁
3. 新建一个swiper.vue组件，lunbotuList应该是父组件向子组件传值来设置
4. 在父组件import，components,<调用>swiper :lunbotuList="lunbotuList"
5. 注意。在mint-ui组件中，它只有item.img,没有item.src,虽然拿到的数据里
是src，所以我不直接赋值，先循环轮播图数组里的每一项，为item添加img属性
res.body.message.forEach(item=>{item.img=item.src})

## numbox值改变立即把购买数量传递给父组件
1. 无论加，减，还是直接输入都属于changed，绑定这个事件然后子向父传值

## 同步商品的勾选状态同步到store中
## 实现数量和总价的自动计算
1. 因为商品件数和总价会随着商品的数量和勾选框的改变而改变，因此需要把他俩都
定义成getters，因为只有getters引入了所有的商品，只要有所改变，变可以重新计算件数和总价(getters只负责向外提供数据)
2. 怎么计算？循环store中的所有商品，然后进行判断，如果selected为true，可以把件数加起来，总价加起来就好了
3. 在getters中定义一个方法getGoodsCountAndAmount(state){}
4. 最后在shopcar组件中调用{{$stroe.getters.getGoodsCountAndAmount.count}}

## 返回按钮的功能
1. 在mintui中找到返回按钮，返回按钮在App中，header里
2. 因为默认的是'/'，所以要自己设置，把router-link改成span，绑定点击事件
3. 然后用this.$router.go(-1)跳转到上一级，但是到主页后就不应该继续跳了
也不改显示返回这个按钮了，因此可以设置在主页时将其隐藏
4. 方法：watch监听url地址，到主页home时,令span标签v-show="flag"
5. 注意，假如我在某个页面，重新点了下刷新。页面刚进入时，没有触发路由改变
但是我默认的是falg:false，因此要在created时候，判断下：
三元表达式this.flag = this.$routh.path ==='/home'?false:true

## 将项目托管到Apach并Gzip压缩
## 使用ngrok 把本机的网站端口映射到外网