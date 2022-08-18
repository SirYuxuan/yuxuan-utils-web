/**
 * 解析建表sql信息成一个对象
 * @param sql 格式:
 CREATE TABLE `blog_info` (
 `blogId` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章编号',
 `updateTime` varchar(100) DEFAULT NULL COMMENT '更新时间',
 `inputUserId` varchar(100) DEFAULT NULL COMMENT '录入人',
 PRIMARY KEY (`blogId`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='博客内容表'
 * @returns {{field_array: [], table_name: string, table_annotation: string}}
 */
export function analysis_create_sql(sql) {
  sql=sql.trim().replaceAll(/\d+,\d/g,'0')
  let sql_big=sql.toUpperCase()//大写sql，用来定位，取值还是取原sql
  let table_name=sql.substring(sql_big.indexOf('TABLE')+5,sql_big.indexOf('(')).trim()//表名
  if(table_name.startsWith('`')){
    table_name=table_name.substring(1,table_name.length-1)
  }
  let table_annotation=analysis_sql_annotation(sql.substring(sql_big.lastIndexOf('COMMENT')))//表注释
  let field_sql=cut_start_end_out(sql,'(',')').split(',')
  let field_array=[]//表字段
  let primaryKey=''
  field_sql.forEach(e=> {
    e = e.trim().toUpperCase()
    if (e.startsWith('PRIMARY')&&e.indexOf('KEY')>=0){
      primaryKey=e
    }
  })
  field_sql.forEach(e=>{
    e=e.trim()
    if(e.toUpperCase().startsWith('PRIMARY KEY'))return
    let obj={}//字段对象
    //字段名
    if(e.startsWith('`')){
      e=e.substring(1)
      obj.name=e.substring(0,e.indexOf('`'))
    }else{
      obj.name=e.substring(0,e.indexOf(' '))
    }
    e=e.substring(e.indexOf(obj.name)+obj.name.length+1).trim()
    //字段注释
    let e_big=e.toUpperCase()
    let p=e_big.indexOf('COMMENT')
    if(p>-1){
      obj.annotation=analysis_sql_annotation(e.substring(p))
      e=e.substring(0,p).trim()
    }else{
      obj.annotation=obj.name
    }
    //字段类型
    p=e.indexOf(')')
    if(p>-1){
      obj.type=e.substring(0,p+1)
    }else if(e.indexOf(' ')<0){
      obj.type=e
    }else{
      obj.type=e.substring(0,e.indexOf(' '))
    }
    //主键
    obj.primaryKey=primaryKey.indexOf(obj.name.toUpperCase())>=0
    field_array[field_array.length]=obj
  })

  return {
    table_name,
    table_annotation,
    field_array
  }
}

/**
 * 从一段SQL语句中解析出注释，sql格式如下：
 * @param sql  格式   COMMENT='注释'
 * @returns {string}
 */
function analysis_sql_annotation(sql){
  return sql.substring(sql.indexOf('\'')+1,sql.lastIndexOf('\''))
}

/**
 * 截取字符串中间的内容
 * @param code   需要截取的内容
 * @param start   开始截取点（不包含）
 * @param end    结束截取点（不包含）
 * @returns {string}
 */
function cut_start_end_out(code,start,end){
  let start_p=0
  let end_p=code.length
  if(start!=null){
    start_p=code.indexOf(start)
    if(start_p<0){
      start_p=0
    }
    start_p=start_p+start.length
  }
  if(end!=null){
    end_p=code.lastIndexOf(end)
    if(end_p<0){
      end_p=code.length
    }
  }
  return code.substring(start_p,end_p)
}