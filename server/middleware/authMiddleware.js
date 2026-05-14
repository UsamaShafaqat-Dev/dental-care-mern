const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // Check karna ke kya Header mein Token bheiija gaya hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // "Bearer [token]" mein se sirf token nikaalna
      token = req.headers.authorization.split(" ")[1];

      // Token ko verify karna (Secret key wahi honi chahiye jo login mein thi)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Agar token sahi hai, toh aglay kaam par janay ki ijazat dena
      req.user = decoded;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = { protect };
