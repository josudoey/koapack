var koa = require("koa");
var compose = require('koa-compose');

function c2k(mw) {
  var middleware = [mw].map(function (middleware) {
    return function* (next) {
      const req = this.req;
      const res = this.res;
      yield new Promise(function (resolve, reject) {
        middleware(req, res, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      yield * next;
    }
  });

  return function* () {
    var oldStatus = this.res.statusCode;
    this.res.statusCode = 200;
    yield compose(middleware);
    this.res.statusCode = oldStatus;
  }
}

var app = koa();
contentBase = __dirname + "/src/www";
app.use(require('koa-static')(contentBase));

var path = require("path");
var publicPath = "/assets/";
var config = require("./webpack.config");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var compiler = webpack(config);
app.use(c2k(webpackDevMiddleware(compiler, {
  contentBase: contentBase,
  hot: true,
  inline: true,
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})))

app.listen(8080, function () {
  console.log("listen")
})

