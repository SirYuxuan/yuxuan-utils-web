<template>
  <div class="layout">
    <div class="header"></div>
    <div class="main" id="main">
      <div id="header">
        <div class="title clearFix"><img src="//bder.work/img/bder-0.2.png" class="floatL">
          <div class="floatL marginL6"><a href="#" >雨轩工具站</a></div>
        </div>
        <div class="navTitle"><a href="/#/">首页</a></div>
        <div class="navTitle" v-for="item in groupList" :key="item.title">
          <router-link :to="item.path">{{item.title}}</router-link>
        </div>
        <div class="navTitle"><a href="https://www.yuxuan66.com/" target="_blank">我的博客</a></div>
      </div>
      <div id="curNav">
        当前位置：
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem v-for="item in breadcrumbNav" :key="item.title" :to="item.path">{{ item.title }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Row>
        <div class="left-nav">
          <div >
            <div v-if="!details" id="indexSliderPanel">
              <swiper
                  class="swiper-container"
                  :navigation="{
               nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
                  :pagination="{ clickable: true }"
                  :autoplay="{ autoplay: true }"
                  loop
              >

                <swiper-slide class="swiper-slide" v-for="(item, i) in imgs" :key="i">
                  <img :src="item" style="width: 100%" alt=""/>
                </swiper-slide>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-scrollbar"></div>
              </swiper>
            </div>
            <Card dis-hover v-if="details">
              <template #title>{{utilData.title}}</template>
              {{utilData.describe}}
            </Card>
            <Card dis-hover v-if="details" style="margin-top: 20px">
              <template #title>所属标签</template>
              <Tag v-for="item in utilData.tag" :key="item" style="margin-right: 6px">{{item}}</Tag>
            </Card>
            <Card dis-hover v-if="false">
              <template #title>我的收藏</template>
              暂未实现
            </Card>
            <Card style="margin-top: 20px" dis-hover>
              <template #title>最近使用</template>
              <router-link class="appCap" v-for="item in utilsHis" :to="item.path" :key="item.path">{{item.title}}</router-link>
            </Card>

            <Card style="margin-top: 20px" dis-hover>
              <template #title>热门工具</template>
              <router-link class="appCap" v-for="item in utilsHot" :to="item.path" :key="item.path">{{item.title}}</router-link>
            </Card>
          </div>
          </div>
        <div id="corePanel">
          <div class="content">
            <router-view />
          </div>
        </div>
      </Row>

    </div>
  </div>

</template>

<script>
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper'
import data from '@/utils/data'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  components: {
    Swiper,
    SwiperSlide
  },
  computed:{
    utilsHot(){
      return this.utils.filter(item=>item.type === 'hot')
    },
    utilsHis(){
      return []
    },
    groupList(){
      let group = {}
      this.utils.filter(item=>{
        if(!group[item.group]){
          group[item.group] = item.groupPath
        }
      })
      let result = []
      for (const groupKey in group) {
        result.push({
          title: groupKey,
          path: '/group/'+group[groupKey]
        })
      }
      return result
    }
  },
  data() {
    return {
      utilData:{},
      utils: data,
      details: false,
      breadcrumbNav:[],
      imgs: [
        require('./assets/zzcc.jpg'),
        require('./assets/xbw.jpg'),
      ],
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  setup(){
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    }
  },
  created() {
    const $router = useRouter()
    $router.beforeEach((to,form,next) => {
      let type = to.params.type
      if(to.fullPath === '/' ){
        this.details = false
        this.breadcrumbNav = []
      }else if(to.fullPath.indexOf('/group') !== -1){
        this.details = false
        let groupList = this.utils.filter(item=>item.groupPath === type)
        this.breadcrumbNav = [
          {
            title: groupList[0].group,
            path: ''
          }
        ]

      }else{
        this.details = true
        this.utilData = this.utils.filter(item=>item.path === to.fullPath)[0]
        this.breadcrumbNav = [
          {
            title:this.utilData.group,
            path: '/group/' + this.utilData.groupPath,
          },
          {
            title: this.utilData.title,
            path: ''
          }
        ]
      }
      next()
    })
  }

}
</script>

<style scoped>
#corePanel {
  float: left;
  width: calc(100% - 325px);
  margin-left: 20px;
  /* height: 600px; */
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #E5E8ED;
  box-shadow: 0 2px 4px 0 rgb(3 27 78 / 6%);
}
#corePanel .content {
  padding: 16px;
  color: #666666;
}
.appCap:hover{ text-decoration: none; color: #00a4ff; border-color: #00a4ff; }
.appCap {
  transition: 0.2s linear;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 100%;
  height: 30px;
  border-radius: 15px;
  font-size: 12px;
  line-height: 28px;
  color: #666666;
  border: 1px solid #dddddd;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
:deep(.swiper-pagination) .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: #fff;
  }
:deep(.swiper-pagination-bullet) {
  background: #000 none repeat scroll 0 0;
}
.swiper-button-next{
  margin-right: -10px;
}
.swiper-button-prev{
  margin-left: -10px;
}
.swiper-button-next,.swiper-button-prev{
  background: rgba(0, 0, 0, 0.3);
  height: 35px;
  margin-top: -20px;
  transition: 0.2s linear;
}
.swiper-button-next:hover,.swiper-button-prev:hover{
  background: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.8);
}
.swiper-button-next:after, .swiper-button-prev:after{
  font-size: 14px;

}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
:deep(.swiper-pagination-horizontal.swiper-pagination-bullets) .swiper-pagination-bullet {
  margin: 0 8px;
}
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  transition: 0.2s linear;
  color: rgba(255, 255, 255, 0.5);
}
.left-nav{
  float: left;
  width: 300px;
}
#indexSliderPanel {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  background: white;
}

* {
  margin: 0;
  padding: 0;
}
.ivu-breadcrumb{
  display: inline-block;
}
#header {
  width: 100%;
  height: 40px;
}
#curNav {
  margin-top: 6px;
  margin-bottom: 6px;
  color: #333333;
  font-size: 12px;
}
#header .title {
  font-size: 20px;
  float: left;
  margin-top: 5px;
}
#header .navTitle {
  font-size: 14px;
  float: left;
  margin-top: 10px;
  margin-left: 25px;
  color: #666666;
}
.header {
  width: 100%;
  height: 40px;
  position: absolute;
  z-index: -99999;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 2px 0 rgb(207 216 221 / 70%);
  -moz-box-shadow: 0 2px 2px 0 rgba(207, 216, 221, .7);
  box-shadow: 0 2px 2px 0 rgb(207 216 221 / 70%);
}

.main {
  width: 7.35rem;
  margin: 0 auto;
  min-height: 877px;
}
#header .title a {
  color: #333333;
  font-weight: bold;
}
a:link, a:visited, a:active {
  color: #666;
  text-decoration: none;
}
#header .navTitle a:hover {
  color: #333333;
  text-decoration: underline;
}
.floatL {
  float: left;
  position: relative;
}
.marginL6 {
  margin-left: 5px;
}
#header .title img {
  margin-top: 2px;
}

</style>