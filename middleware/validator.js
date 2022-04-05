const { validationResult } = require('express-validator');

// 并行检查
module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    // 错误消息的api没有详细定义，可能存在bug
    res.status(422).json({ errors: {body: errors.array()} });
  };
};