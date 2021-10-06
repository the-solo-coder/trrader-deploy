let config = require("config");
let jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;

      if(token && isCustomAuth){
          decodedData = jwt.verify(token, config.get("jwtSecret"));
          req.userId = decodedData?.id;
      }else {
          decodedData = jwt.decode(token);
          req.userId = decodedData?.sub;
      }

      next();
  } catch (err) {
      console.log(err);
  }
}

module.exports = auth;
