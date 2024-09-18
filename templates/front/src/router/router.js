import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import caipinfenleiList from '../pages/caipinfenlei/list'
import caipinfenleiDetail from '../pages/caipinfenlei/detail'
import caipinfenleiAdd from '../pages/caipinfenlei/add'
import caipinxinxiList from '../pages/caipinxinxi/list'
import caipinxinxiDetail from '../pages/caipinxinxi/detail'
import caipinxinxiAdd from '../pages/caipinxinxi/add'
import canzhuoxinxiList from '../pages/canzhuoxinxi/list'
import canzhuoxinxiDetail from '../pages/canzhuoxinxi/detail'
import canzhuoxinxiAdd from '../pages/canzhuoxinxi/add'
import canzhuoyudingList from '../pages/canzhuoyuding/list'
import canzhuoyudingDetail from '../pages/canzhuoyuding/detail'
import canzhuoyudingAdd from '../pages/canzhuoyuding/add'
import jinhuoxinxiList from '../pages/jinhuoxinxi/list'
import jinhuoxinxiDetail from '../pages/jinhuoxinxi/detail'
import jinhuoxinxiAdd from '../pages/jinhuoxinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import discusscaipinxinxiList from '../pages/discusscaipinxinxi/list'
import discusscaipinxinxiDetail from '../pages/discusscaipinxinxi/detail'
import discusscaipinxinxiAdd from '../pages/discusscaipinxinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'caipinfenlei',
					component: caipinfenleiList
				},
				{
					path: 'caipinfenleiDetail',
					component: caipinfenleiDetail
				},
				{
					path: 'caipinfenleiAdd',
					component: caipinfenleiAdd
				},
				{
					path: 'caipinxinxi',
					component: caipinxinxiList
				},
				{
					path: 'caipinxinxiDetail',
					component: caipinxinxiDetail
				},
				{
					path: 'caipinxinxiAdd',
					component: caipinxinxiAdd
				},
				{
					path: 'canzhuoxinxi',
					component: canzhuoxinxiList
				},
				{
					path: 'canzhuoxinxiDetail',
					component: canzhuoxinxiDetail
				},
				{
					path: 'canzhuoxinxiAdd',
					component: canzhuoxinxiAdd
				},
				{
					path: 'canzhuoyuding',
					component: canzhuoyudingList
				},
				{
					path: 'canzhuoyudingDetail',
					component: canzhuoyudingDetail
				},
				{
					path: 'canzhuoyudingAdd',
					component: canzhuoyudingAdd
				},
				{
					path: 'jinhuoxinxi',
					component: jinhuoxinxiList
				},
				{
					path: 'jinhuoxinxiDetail',
					component: jinhuoxinxiDetail
				},
				{
					path: 'jinhuoxinxiAdd',
					component: jinhuoxinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'discusscaipinxinxi',
					component: discusscaipinxinxiList
				},
				{
					path: 'discusscaipinxinxiDetail',
					component: discusscaipinxinxiDetail
				},
				{
					path: 'discusscaipinxinxiAdd',
					component: discusscaipinxinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
