# FREE AWS Cloud Project Bootcamp
chmod u+x bin/db-connect





docker build \
--build-arg REACT_APP_BACKEND_URL="http://crudduralb-645155669.ap-southeast-1.elb.amazonaws.com:4567" \
--build-arg REACT_APP_AWS_PROJECT_REGION="$AWS_DEFAULT_REGION" \
--build-arg REACT_APP_AWS_COGNITO_REGION="$AWS_DEFAULT_REGION" \
--build-arg REACT_APP_AWS_USER_POOLS_ID="ap-southeast-1_WE4vXvD0r" \
--build-arg REACT_APP_CLIENT_ID="4n4sr008trjhg3h56q234vhbaf" \
-t frontend-react-js \
-f Dockerfile.prod \
.