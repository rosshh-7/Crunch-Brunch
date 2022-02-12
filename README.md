# Web Programming (CS 546) Final Project
## Overview
This is the repository for the final project for Web Programming (CS 546) at Stevens Institute of Technology.

This project aims to create a system to help users to order brunch from Everyday Brunch Restaurant. The website allows users to register first and then log in and search for their favourite brunch items from the restaurant’s menu. Further, the user can also place an order online using the website and receive an order confirmation on his/her specified email. The system also allows users to add reviews of their orders.

## Dependencies
* Node dependencies are handled by npm -- simply run `npm install` in the project directory, and the Node packages used in the project will be automatically installed.
* Be sure that Mongodb is Running

## Steps to Run
1. Run MongoDB on your machine.
2. In Node.js command prompt, go to the project directory.
3. Install node dependencies by running `npm install`.
4. If you would like to prepopulate the site with accounts/item entries, run `npm run seed` before continuing to the next step.
5. Start the application by running `npm start`.
6. On your web browser, go to `http://localhost:3000/` to access the website.

## Instructions to use the website
Please use the username given below for "USER" login 
* Username: AkshayS
* Password: AkshaySPW

Please use the username given below for "ADMIN" login 
* Username: admin
* Password: admin123

You can create a user by using signup page and then also you can login to the system.

For making payment "SUCCESSFUL", please use the card number given below
* Card Number: 4242 4242 4242 4242


For making payment "FAIL", please use the card number given below
* Card Number: 4000 0000 0000 0002
* Expiry date - any future date
* cvc-any random 3 digit number

For the email functionality, sometimes you may not get an email because load mailer API will throw an error and google blocks it for suspicious activity from third party application even though we have enabled less secure apps. 

So, please use the credentials given below.
* username: sudronikbusiness@gmail.com
* password: 8454949819

Food items are dependent on the categories so, please add the categories before food items.

## Contributors
* Roshan Badgujar
* Haoyu Li
* Akshay Sahasrabuddhe
* Tanay Tadas
* Yongxiang Zhang
