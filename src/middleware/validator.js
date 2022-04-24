const { validationResult } = require('express-validator');

// 并行检查
module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // 必须return， 否则next()执行完后，洋葱圈回来继续执行
    }
    
    return res.status(422).json({ errors: {body: errors.array()} });
  };
};