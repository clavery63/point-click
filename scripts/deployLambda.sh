#!/usr/bin/env bash

cd src/lambdas
zip -r PointClickLambda.zip .
aws lambda update-function-code --function-name pointClickCreate --zip-file fileb://PointClickLambda.zip
aws lambda update-function-code --function-name pointClickUpdate --zip-file fileb://PointClickLambda.zip
aws lambda update-function-code --function-name pointClickVerifyPw --zip-file fileb://PointClickLambda.zip
rm PointClickLambda.zip
cd ../..
