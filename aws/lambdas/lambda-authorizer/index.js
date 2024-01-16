"use strict";

const { CognitoJwtVerifier } = require("aws-jwt-verify");

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.CLIENT_ID,
});

exports.handler = async (event) => {
  
  console.log("request:", JSON.stringify(event, undefined, 2));

  const jwt = event.headers.authorization;
  if (!jwt) {
    console.error("Authorization header is missing");
    return {
      isAuthorized: false,
      errorMessage: "Authorization header is missing",
    };
  }

  const token = jwt.split(" ")[1];
  console.log(token);

  try {
    const payload = await jwtVerifier.verify(token);
    console.log("Access allowed. JWT payload:", payload);
    return {
      isAuthorized: true,
    };
  } catch (err) {
    console.error("Access forbidden:", err.message);
    return {
      isAuthorized: false,
      errorMessage: `Access forbidden: ${err.message}`,
    };
  }
};
