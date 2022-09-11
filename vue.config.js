const { defineConfig } = require('@vue/cli-service')
module.exports =  defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/Rachel-Furman-08-09-2022/" : "/",
});
