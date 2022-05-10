const admin = require("../config/firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      // console.log("==> decodeValue: ", decodeValue);
      // console.log("==> uID: ", decodeValue.uid);

      // console.log("decodeValue",decodeValue);
      console.log("req.user: ", decodeValue.name);
      console.log("req.uid: ", decodeValue.uid);
      console.log("req.email: ", decodeValue.email);

      if (decodeValue) {
        req.user = decodeValue.name ?? decodeValue.email; 
        req.uid = decodeValue.uid;
        req.email = decodeValue.email;
        return next();
      }


      return res.status(500).json({ message: "Unauthorise" });
    } catch (error) {
      // console.log("Middleware error: ", error);
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new Middleware();
