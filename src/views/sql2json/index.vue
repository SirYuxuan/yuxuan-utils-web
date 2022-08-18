<template>
  <div>
    <Input v-model="sql" type="textarea" :rows="10" placeholder="input sql..." />
    <Button class="convert" type="primary" @click="convert">转换</Button>
    <Button class="convert" type="success" @click="copy" style="margin-left: 10px">复制</Button>
    <Input v-model="json" type="textarea" :rows="20" readonly  />
  </div>
</template>
<style>
.convert{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<script>
import {analysis_create_sql} from '@/utils/sqlParse'
import {formatToHump,formatJson} from '@/utils/str'

export default {
  name: 'index',
  data(){
    return{
      sql: '',
      json: ''
    }
  },
  methods:{
    copy(){
      this.$Copy({
        text: this.json
      })
    },
    convert(){
      let obj = analysis_create_sql(this.sql)
      if(obj.field_array){
        let json = {}
        obj.field_array.forEach(item=>{
          json[formatToHump(item['name'])] = item['annotation']
        })
        this.json = formatJson(JSON.stringify(json))
      }
    }
  }
}
</script>

<style scoped>

</style>