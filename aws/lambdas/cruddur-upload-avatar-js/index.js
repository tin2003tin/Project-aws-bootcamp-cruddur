const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const handler = async (event) => {
  console.log(event);

  // Return CORS headers for preflight check
  if (event.routeKey === "OPTIONS /{proxy+}") {
    console.log(JSON.stringify({ step: 'preflight', message: 'preflight CORS check' }));
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*, Authorization",
        "Access-Control-Allow-Origin": "https://3000-tin2003tin-awsbootcampc-tqe5yhnm052.ws-us107.gitpod.io/",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
      }
    };
  } else {
    const token = event.headers.authorization.split(' ')[1];
    console.log(JSON.stringify({ step: 'presignedurl', access_token: token }));

    const body = JSON.parse(event.body);
    const extension = body.extension;

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, null, { ignoreExpiration: true });
    } catch (error) {
      console.error("Error decoding token:", error);
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" })
      };
    }

    const cognitoUserUuid = decodedToken.sub;

    const s3 = new AWS.S3();
    const bucketName = process.env.UPLOADS_BUCKET_NAME;
    const objectKey = `${cognitoUserUuid}.${extension}`;

    console.log(JSON.stringify({ objectKey }));

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 60 * 5,
      ContentType: 'application/octet-stream', // Set the content type based on your requirements
    };

    const url = s3.getSignedUrl('putObject', params);

    const responseBody = { url };
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*, Authorization",
        "Access-Control-Allow-Origin": "https://3000-tin2003tin-awsbootcampc-tqe5yhnm052.ws-us107.gitpod.io/",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
      },
      body: JSON.stringify(responseBody)
    };
  }
};

// Export the handler for use in AWS Lambda
module.exports = { handler };
