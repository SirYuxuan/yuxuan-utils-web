<template>
  <div id="con">
    <iframe id="bi_iframe"  @load="adjustIframe" class="iframe" src="/game/ninja/index.html" scrolling='no' frameborder="0"  width="100%" height="100%"/>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods:{
    adjustIframe() {
      let ifm = document.getElementById('bi_iframe')
      ifm.height = document.documentElement.clientHeight
      ifm.width = document.documentElement.clientWidth
    }
  },
  mounted(){
    /**
     * iframe-宽高自适应显示
     */
    const oIframe = document.getElementById('bi_iframe')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.height = (Number(deviceHeight)-150) + 'px'
  },

}
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: hidden;
}
</style>