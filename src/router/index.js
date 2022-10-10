import {createRouter, createWebHashHistory} from 'vue-router'
const routes = [
  { path:'/',component:  ()=> import('@/views/index/index') ,meta:{title:'首页'} },
  { path:'/group/:type',component:  ()=> import('@/views/group/index') ,meta:{title:'分类列表'} },
  { path:'/timestamp',component:  ()=> import('@/views/timestamp/index') ,meta:{title:'时间戳转换'} },
  { path:'/code/sql2json',component:()=> import('@/views/sql2json/index') ,meta:{title:'SQL2JSON'} },
  { path:'/game/snark',component:()=> import('@/views/game/snark/index') ,meta:{title:'贪吃蛇'} },
  { path:'/game/a2048',component:()=> import('@/views/game/a2048/index') ,meta:{title:'2048小游戏'} },
  { path:'/game/chess',component:()=> import('@/views/game/chess/index') ,meta:{title:'中国象棋'} },
  { path:'/game/cube',component:()=> import('@/views/game/cube/index') ,meta:{title:'3D魔方'} },
  { path:'/game/fly',component:()=> import('@/views/game/fly/index') ,meta:{title:'盲打高手打飞字'} },
  { path:'/game/ninja',component:()=> import('@/views/game/ninja/index') ,meta:{title:'水果忍者-切水果'} },
  { path:'/eve/buyback/yuxuan',component:()=> import('@/views/gameutil/eve/buyback/yuxuan/index') ,meta:{title:'雨轩EVE物品回购'} },
]

const router = createRouter({
  routes,
  history:createWebHashHistory()
})
router.beforeEach(to => {
  document.title = '雨轩工具站-' + (to.meta.title || '首页')
})

export default router