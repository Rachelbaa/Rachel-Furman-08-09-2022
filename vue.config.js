const { defineConfig } = require('@vue/cli-service')
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/Rachel-Furman-08-09-2022/'
//     : '/'
// }

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Rachel-Furman-08-09-2022/'
    : '/'
  ,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/setup/_mixins.scss";
          @import "./src/styles/setup/_typography.scss";
          @import "./src/styles/setup/_variables.scss";
        `,
      },
    },
  },
});

