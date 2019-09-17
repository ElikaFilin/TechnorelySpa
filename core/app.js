var createError = require('http-errors');
const generate = require('./ssh')();
const app = require('./init');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const fileLocation = path.resolve(__dirname, config.ssh.keyName);
generate.next();
generate.next();
if (fs.existsSync(fileLocation))
{
  const jwt = require('./jwt');
  var indexRouter = require('../routes');
  var apiRouter = require('../routes/api');

  const xhr =(req,res,next)=>{
    if (req.xhr || req.originalUrl=='/'||req.originalUrl.indexOf('/js/')!==-1 || req.method == 'OPTIONS'){
      next()
    } else {
      res.redirect('/');
    }
  };

  app.use('/',[xhr], indexRouter);
  app.use('/api',[xhr,jwt.getAndVerify],apiRouter);

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
}

module.exports = app;



