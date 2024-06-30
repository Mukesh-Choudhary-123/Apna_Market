// middlewares.cjs

module.exports = (req, res, next) => {
  const _send = res.send;

  res.send = function (data) {
    if (req.method === "GET") {
      data = JSON.stringify({
        Data: JSON.parse(data),
        TotalCount: this.getHeader("X-Total-Count"),
      });
    }

    _send.call(this, data);
  };

  next();
};
