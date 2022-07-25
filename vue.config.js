const { defineConfig } = require('@vue/cli-service')
const FileManagerPlugin = require('filemanager-webpack-plugin')
module.exports = defineConfig({
  configureWebpack:{
    plugins:[
      new FileManagerPlugin({
        events:{
          onEnd: {
            delete: [
              './dist/dist.zip',
            ],
            archive: [
              {source: './dist', destination: './dist/dist.zip'},
            ]
          }
        }
      })
    ]
  },
  transpileDependencies: true
})
