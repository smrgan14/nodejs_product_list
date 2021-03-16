NODEJS - SHOPPING LIST APP

This is a mini application that allows you to create products on a list.
We use Node.js and MariaDb to save data.

NOTES: We use Postamn for tesing app routes.

How to run:

Before you run application just check that you have Docker installed since app has been containerized.

docker-compose up --build -d

Auth
- For AUTH we use JWT
- When a user logs on to the system, he gets his token
- The resulting token is used in  Headers (POSTMAN) in: Authorization {user token value}

Create (register) user:

Method: POST

http://localhost:2000/user/register

body:

{
	"firstName":"firstName",
	"lastName":"lastName",
	"email": "test.test@gmail.com",
	"password": "test.1234"
}

-----------------------------------------------------------------------------------------------------------------------

LogIn user:

localhost:2000/user/login

Method: POST

body:

{
	"email": "test.test@gmail.com",
	"password": "test.1234"
}

-----------------------------------------------------------------------------------------------------------------------

Change user password:

localhost:2000/user/change/password

Method: PATCH

body:

{
	"currentPassword": "hara.123",
	"newPassword":"haris123"
}

-----------------------------------------------------------------------------------------------------------------------

Add Product:

localhost:2000/product/add

Method: POST

body:

{
	"name": "Product1"
}

-----------------------------------------------------------------------------------------------------------------------

Update Product:

localhost:2000/product/update/:id

Method: PUT

body:

{
	"name":"Product1"
}

-----------------------------------------------------------------------------------------------------------------------

Create Product List:

localhost:2000/product/list/add

Method: POST

body:

{
	"name": "List1",
	"products": [
		{
			"name": "Product1",
			"quantity": 14
		},
		{
			"name": "Product2",
			"quantity": 15
		}
	]
	
}

-----------------------------------------------------------------------------------------------------------------------

Update product list:

localhost:2000/product/list/update/:id

Method: PUT

body:

{
	"name":"List1",
	"products": [
		{
			"productId":1,
			"name": "Product-test-1",
			"quantity": 10
		}
	]
	
}

-----------------------------------------------------------------------------------------------------------------------

Create report:

localhost:2000/product/list/report?dateFrom={dateFrom}&dateTo={dateTo}

Method: GET

