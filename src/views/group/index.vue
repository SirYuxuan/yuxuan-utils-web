<template>
  <div>
    <Grid :col="2">
      <GridItem v-for="item in groupList" :key="item.path">
        <div class="title clearfix">
          <router-link :to="item.path">
            <div class="blockM floatL marginL6">{{ item.title }}</div>
          </router-link>
          <div class="blockS floatL tag blue marginL6">最新</div>
          <div class="blockS floatL tag orange marginL6">推荐</div>
        </div>
        <div class="article clearfix indexPreviewBg">
          <div class="row blockM2 floatL limit">
            {{ item.describe }}
          </div>
          <div class="row blockM floatL" style="margin-top: 5px;width: 100%">
            <div class="blockM floatL appDetailType2"><span :class="['iconfont',item.groupIcon]"></span> {{ item.group }}</div>
            <div class="blockM floatL appDetailType3"><span class="iconfont icon-label"></span> {{ item.tag.join(', ') }}
            </div>
          </div>
        </div>

      </GridItem>
    </Grid>
  </div>
</template>

<script>
import data from '@/utils/data'

export default {
  name: 'index',
  data() {
    return {
    }
  },
  computed:{
    groupList(){
      let type = this.$route.params.type
      return data.filter(item => item.groupPath === type)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.appDetailType3 {
  color: #999999;
}
.appDetailType2 {
  width: 120px;
  color: #999999;
}
.blockM,.blockM2 {
  min-height: 26px;
  line-height: 26px;
}
.indexPreviewBg {
  background: #f7f8fa;
  padding: 4px 12px;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.article {
  color: #666666;
}
.blockM2.limit {
  max-width: 100%;
  max-height: 52px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.blockS.tag {
  font-size: 12px;
  padding: 0 5px;
  display: inline-block;
  vertical-align: middle;
  line-height: 16px;
  border-radius: 2px;
  margin-top: 4px;
}

.tag.orange {
  color: #FF7200;
  border: 1px solid #FF7200;
}

.tag.blue {
  color: #00a4ff;
  border: 1px solid #00a4ff;
}

.marginL6 {
  margin-left: 5px;
}

.floatL {
  float: left;
  position: relative;
}

.title, .title a {
  font-size: 18px;
  color: #333333;
  margin-bottom: 5px;
}
</style>