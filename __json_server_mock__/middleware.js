module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log("进来1");
    if (req.body.username === "admin" && req.body.password === "123456") {
      console.log("进来2");
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};
