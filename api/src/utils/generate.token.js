const jwt = require("jsonwebtoken");

exports.generateTokens = (payload) => {
  // Generate access token
  const accessToken = jwt.sign({ id: payload }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXP,
  });

  // Generate refresh token
  const refreshToken = jwt.sign(
    { id: payload },
    process.env.REFRESH_JWT_SECRETE,
    {
      expiresIn: process.env.JWT_EXP,
    }
  );

  // Calculate access token expiration time (1 day)
  const accessTokenExpiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

  return { accessToken, accessTokenExpiresIn, refreshToken };
};
