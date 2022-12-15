const SpritesmithPlugin = require('webpack-spritesmith')
const path = require('path')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      config.plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: path.resolve(__dirname, 'src/assets/img'),
            glob: '*.png'
          },
          target: {
            image: path.resolve(__dirname, 'src/assets/sprite.png'),
            css: [
              [
                path.resolve(__dirname, 'src/assets/style/index.css'),
                {
                  format: 'function_based_template'
                }
              ]
            ]
          },
          apiOptions: {
            cssImageRef: '~@/assets/sprite.png'
          },
          customTemplates: {
            function_based_template: (data) => {
              const shared = '.ico { background-image: url(I) }'
                .replace('I', data.sprites[0].image)
              const perSprite = data.sprites.map(function (sprite) {
                return '.ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
                  .replace('N', sprite.name)
                  .replace('W', sprite.width)
                  .replace('H', sprite.height)
                  .replace('X', sprite.offset_x)
                  .replace('Y', sprite.offset_y)
              }).join('\n')

              return shared + '\n' + perSprite
            }
          }
        })
      )
    }
  }
}
