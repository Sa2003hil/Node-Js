﻿# Node JS with Express Basic to Advance 

This Node.js repository is a modern, efficient, and well-documented application that provides a robust foundation for building scalable web applications, APIs, or backend services. Leveraging the power of Node.js, this project offers a flexible architecture, advanced features, and best practices to streamline your development process.

## Table of Contents

1. [Introduction](#introduction)
2. [About Node.js](#about-nodejs)
3. [Features](#features)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

Begin with a clear and comprehensive introduction to your project. Describe its purpose, its key features, and who the target audience is.

## About Node.js

Node.js is an open-source, server-side JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser. It's built on the V8 JavaScript engine from Google, which is known for its speed and performance. Node.js was created by Ryan Dahl in 2009 and has since gained widespread popularity in web development.

## Features

- **Asynchronous and Non-blocking:** Utilizes the event-driven, non-blocking I/O model of Node.js for optimal performance and scalability.
- **Express.js Integration:** Seamlessly integrates the popular Express.js framework for routing, middleware, and more.
- **RESTful API Development:** Simplifies REST API development with easy-to-configure routes and controllers.
- **Database Integration:** Provides support for multiple databases, including MongoDB and PostgreSQL, via well-structured data models.
- **Authentication and Authorization:** Implements user authentication and role-based authorization for secure access control.
- **WebSocket Support:** Includes WebSocket capabilities for real-time communication and interactive features.
- **Error Handling:** Implements robust error handling, validation, and logging to ensure reliable application behavior.
- **Testing and Test Coverage:** Incorporates testing suites and code coverage tools for quality assurance.
- **Scalability:** Designed to be easily scalable to handle increased workloads and traffic.


## Getting Started

**What we do from Day1 to DayN**


 ## Day 1 : Building HTTP server

 **Point 1:** 
 
 Firstly, we make a server using http module of node js and listen it on port 3000 basically learned about node js syntax and how to make a server in node js. It is always recommended to use non blocking code in node js because it is single threaded and if we use blocking code then it will block the event loop and our server will not work properly

**Point 2:** 

Then we make log file using fs module of node js and append the log in log file whenever a user hit the server

 **Point 3:** 
 
 Then we make a switch case for different routes and send response according to the route hit by the user

```js
// imporing http module
import http from 'http'
import fs from 'fs'

/*
-> creating server

const myServer = http.createServer((req, res) => {
  console.log('server started')
  console.log(req.headers) // to get headers
  res.end('Hello from the server')
})
*/

// creating server and create log file when server started
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New Request Received\n`
  fs.appendFile('log.txt', log, (err, data) => {
    switch (req.url) {
      case '/':
        res.end('Home Page')
        break
      case '/about':
        res.end('About Page')
        break
      case '/contact':
        res.end('Contact Page')
        break
      default:
        res.writeHead(404, {
          'Content-type': 'text/html'
        })
    }
    res.end('Hello from the server')
  })
})

// listening to server
myServer.listen(8000, () => {
  console.log('server started')
})

```
## Day 2 : Handling URL's in NodeJS

**Point 1:** 

About Url's
![Url](/1_Server//Assets/image.png)

**Url path**

![Alt text](/1_Server/Assets/image-1.png)

**Url Nested path**

![Alt text](/1_Server/Assets/image-2.png)


**URL Query Parameters** : Query parameters are a defined set of parameters attached to the end of a url. 
Like this:  
![Alt text](/1_Server/Assets/image-3.png)

Here the _query parameters_ started after **'?'** and we can start another query parameter after **'&'**

**# Points to REMEMBER**

1. The HTTP module doesn't parse the **req.url** automatically we have to install npm package **url** to parse the url
```bash
npm i url
```
2. After installing if we run the server by entering url : http://localhost:8000/about?myname=sahil    it will parse the url automatically

![Alt text](/1_Server//Assets/image-4.png)

3. Now if want to know how variables are declared in the query parameters then we have to use **url.parse(req.url, true)** and it will give us an object of query parameters

Now as you can see in the image query object is also shown showing the parse values of query parameters

![Alt text](/1_Server/Assets/image-6.png)
 -
**CODE :**
    
    Using url.pathname allows you to work with the path of the URL separately, which can be useful for routing and handling different requests on your server 
1.  Here we learn how to parse the url and get the query parameters from the url 


```js
// importing http module
import http from 'http'
import fs from 'fs'
import url from 'url'

// creating server and create a log file when the server is started
const myServer = http.createServer((req, res) => {
  if (req.url == '/favicon.ico') {
    return res.end()
  }
  const log = `${Date.now()} : ${req.url} New Request Received\n`
  const myUrl = url.parse(req.url, true)
  console.log(myUrl)
  fs.appendFile('log.txt', log, (err, data) => {
    switch (myUrl.pathname) {
      case '/':
        res.end('Home Page')
        break
      case '/about':
        const username = myUrl.query.myname
        res.end(`HI , ${username}`)
        break
      case '/contact':
        res.end('Contact Page')
        break
      default:
        res.writeHead(404, {
          'Content-type': 'text/html'
        })
        res.end('404 Not Found')
    }
  })
})

// listening to the server
myServer.listen(8000, () => {
  console.log('server started')
})


```

### ***Conclusion for Day 2:*** 

_The basic functionality of the server is to accept the req and then parse the url (to know what acctualy user wants) then collect the data from the database accroding to the parsed url and then send the response to the user_

![Alt text](/1_Server//Assets/image8.png)



## Day 3 : HTTP Methods in NodeJS

**Point 1:**

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.

- **GET :** _[Default method]_
![Alt text](/1_Server//Assets/image10.png)

- **POST :**

  _Like Login Pages or Forms uses Post method to send data to the server_
![Alt text](/1_Server//Assets/image11.png)

- **PUT :**

  If we want to upload any file on the server like if i want to upload a image on the server then we use PUT method

- **PATCH :**

    If we want to updata any existing data on the server then we use PATCH method like if we want to update any user data then we use PATCH method like name of the existing user

- **DELETE :**

    If we want to delete any data from the server then we use DELETE method like if we want to delete any user from the database then we use DELETE method
---

# Getting With Express Js

### Day 4 : Introduction to Express JS

- Express.js is a popular framework for Node.js because it simplifies web development, provides a robust set of features, and has a strong community and ecosystem. It's well-suited for building web applications, RESTful APIs, and microservices in a scalable and efficient manner. 

-  Node.js is a powerful runtime for building server-side applications, but it's relatively low-level. Express.js simplifies the process of building web applications on top of Node.js, providing a higher-level API for common web development tasks.

```bash
# install express js
npm i express
```

**CODE :**

```js
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Home')
})

app.get('/about', (req, res) => {
  res.send(`Hello from ${req.query.name} your age is ${req.query.age} `)
})


// so we dont need http module here it is already included in express internally
app.listen(8000, () => {
  console.log('server started')
})

```
## Conclusion
_from this we can conclude that by using express we can reduce the code and it is easy to use and understand it have many inbuilt functions which we can use to make our code more efficient_

and also we don't need url module here so we can remove it
```bash
# uninstall url module
npm uninstall url
```

## Day 5 : How Versioning Works in NodeJS?
- Here '**^**' means **install all Recommended and minnor Fixes Automatically**

![Alt text](/1_Server/Assets/image13.png)


- Here '**~**' means **install all minnor Fixes only automatically**


![Alt text](/1_Server/Assets/image14.png)

## Day 6 : What is REST API?

If you are an **Backend Developer** then this particular topic is very important for you to understand because in today's world every application is using REST API to communicate with the server and to get the data from the server


**1. What is RESTFULL API ?**

---



## Day 7 : Building REST API's using Node and Express.js

```js

// app.mjs
import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }
const app = express()
const PORT = 8001

// ROUTES

/*

creating a route for getting all users✅

Important NOTE:
Server is basically a hybrid server , means humara server aisa hona chahiye ki vo
browser ko bhi support kare and another mobile apps ko bhi support kare.

'/users' --> returning JSON

means any user do GET req on 

'/users' ---> render HTML document
'/api/users' ---> return JSON (mobile apps)

Basically we are making an Hybrid server which can support both browser and mobile apps.this is a good practice to do.

*/
app.get('/api/users', (req, res) => {
  return res.json(users)
})

// if a user do GET req on '/users' then we will render HTML document✅

app.get('/users', (req, res) => {
  const html = `
  <ul>${users.map(user => `<li>${user.last_name}</li>`).join('')}</ul>
  `
  res.send(html)
})

// Dynamic Path Routing ✅

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id == id)
  res.json(user)
})

// POST req ✅
app.post('/api/users', (req, res) => {
  // TODO : create a new user
  return res.json({ message: 'User created' })
})

// PUT req ✅
app.patch('/api/users/:id', (req, res) => {
  // TODO : Edit the user
  return res.json({ message: 'User created' })
})

// DELETE req ✅
app.post('/api/users/:id', (req, res) => {
  // TODO : delete the user
  return res.json({ message: 'User created' })
})

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})

```


_**Task**_

```bash
Here We are going to make an REST API - (Basically JSON based API)

Important NOTE:
Server is basically a hybrid server , means humara server aisa hona chahiye ki vo
browser ko bhi support kare and another mobile apps ko bhi support kare.

'/users' --> returning JSON

means any user do GET req on 

'/users' ---> render HTML document
'/api/users' ---> return JSON (mobile apps)

Basically we are making an Hybrid server which can support both browser and mobile apps.This is a good practice to do.

GET /users - List all users ✅
GET /api/users - List all users ✅
_________________________________

* Dynamic Path Parameter ✅

GET /api/user/1 - GET the user with id 1
GET /api/user/2 - GET the user with id 2
_________________________________

POST /api/users - Create new users



__________________________________
PATCH /api/user/id - Edit the user with id 1..n


__________________________________
DELETE /api/users/id - Delete the user with id 1..n


__________________________________
to do all these things firstly we want a data here we don't have any data   

```


- **_Here we can see that there is a repetition of code in '/api/users/:id' format so we can use app.route() method to remove this repetition of code_**


### Dynamic Path Routing Optimised way ✅

![Alt text](/RestAPIPro/Assets/image.png)

Now if we want to make a POST request 

            **TO BE CONTINUED**

# Express JS

### [[ Chapter Notes ]] 
 
- **ExpressJS** is *de-facto* Node framework - and used in most Node applications which are used as web server.
- You can install express `npm install express`
- Express has few level of methods :
	- Application methods : e.g. app.use()
	- Request methods
	- Response methods
	- Middleware methods
	- Router methods

- **Response** methods (**res** is our response objects)
	- **res.send()** - for sending HTML
	- **res.sendFile(**) - for sending File
	- **res.json** - for sending JSON 
	- **res.sendStatus(404)** - for sending HTTP status only
	
- **HTTP Request** Types we generally use :
	- GET
	- POST
	- PUT
	- DELETE
	- PATCH
 - API / Endpoints / Routes are used inter-changeably but they are related to server paths.

- **Middle-ware** : Modifies the request before it reaches the next middleware or endpoints.
- Sequence of middleware is very important, as first middleware is first traversed by request.
- Middle-wares can be used for many use cases, like loggers, authentication, parsing data etc.
- Middle-ware can be :
	- Application level : server.use(**middleware**) 
	- Router level : server.get('/', **middleware**, (req,res)=>{})
	- Built-in middleware : **express.json()** [ for parsing body data], **express.static()**[for static hosting]
	- External Middle-wares - like **morgan**

- **Request** properties (**req** is our request object)
	- **req.ip** - IP address of client
	- **req.method** - HTTP method of request
	- **req.hostname** - like google.com / localhost
	- **req.query** - for capturing query parameters from URL e.g. localhost:8080 ? **query=value**
	- **req.body** -for capturing request body data (but its needs a middleware for body data decoding)
	-  **req.params** - for capturing URL parameters for route path like `/products/:id` 

- **Static Hosting** : we can make 1 or more folders as static hosted using **express.static** middleware.
	`server.use(express.static(< directory >))`
Static hosting is like sharing a folder/directory and making its file readable as it is.
Note : `index.html` is default file which would be read in a static hosted folder, if you don't mention any file name.

3 major ways of sending data from client to server via request are :

**1. Send data via URL in Query String**

This is easiest method to send data and mostly used in GET request.

When you have URL with  `?name=Youstart&subject=express`  at end, it translates in a query string. In query string each key,value pair is separated by  `=`  and between 2 such pairs we put  `&`.

To read such data in express you can use  `req.query`  :
```javascript
server.get("/demo",function(req,res){
    console.log(req.query) // prints all data in request object
    res.send(req.query);  // send back same data in response object
})
```

-  **Assignment 1** : 

Make above server with API endpoint  `/demo`  as shown above :

1.  Try to call this API in your browser  `http://localhost:8080/demo?name=Youstart`  - this will return a response of  `req.query`  JSON object
    
2.  Create 3 query parameters  `name`,  `age`,  `subject`  with some values. Check the final output of  `req.query`  - can you find all data on server side. Can you send it back to client via  `res`  object.
    

**2. Send data via Request Params**

In this method you can have a URL with url path like  `/Youstart/express`  at end it translates in a param string. In param part string each value is separated by  `/`. As you can see that URL only contains  `value`  not the  `key`  part of data.  `key`  part is decided by the endpoint definition at express server

server.get("/demo/:name/:subject",function(req,res){
    console.log(req.params) // prints all data in request object
    res.send(req.query);  // send back same data in response object
})

So sequence of values matter in this case. As values sent from client are matched with  `name`  and  `subject`  params of URL later.

-  **Assignment 2** : 

Make above server with API endpoint  `/demo`  as shown above :

1.  Try to call this API in your browser  `http://localhost:8080/demo/Youstart/Express`  - this will return a response of  `req.params`  JSON object
    
2.  Create 3 URL params  `name`,  `age`,  `subject`  . Call the URL and check the final output of  `req.params`  - can you find all data on server side. Can you send it back to client via  `res`  object.
    

**3. Send data via Request Body**

Final method of sending data is via body part of request. We can send data directly to body using URL. We have to either use one of these methods

1.  Use a HTML Form and make  `method`  value as  `POST`. This will make all name=value pair to go via body of request.
    
2.  Use special browsers like POSTMAN to change the body directly. (We will see this example in next classes)
    
```js
server.post("/demo",function(req,res){
    console.log(req.body) // prints all data in request object
    res.send(req.body);  // send back same data in response object
})
```


### Related Links/Videos

1. [Middleware Explanation video](https://www.youtube.com/watch?v=qkMJL0FwiyE)
2. [List of useful 3rd party middleware for Express](https://expressjs.com/en/resources/middleware.html)
3. [List of HTTP response status](https://www.restapitutorial.com/httpstatuscodes.html) 

----

**Middlewares**
Middleware in Express are functions that are executed during the request-response lifecycle of an Express server.


- Code done in MiddlewarePRO folder given below :-



```js
import express from 'express'
import fs from 'fs'
const app = express()
import morgan from 'morgan' // this is the 3rd- party middleware for making Logs

app.use(morgan('dev'))
// Middleware - authentication
app.use(express.json()) // body parser
app.use(express.static('public')) // this will help to serve the static files like html, css, js, images, etc.

// This is the Auth middlewaere for checking the password
const auth = (req, res, next) => {
  //   console.log(req.query)
  if (req.body.password == '1234') {
    next()
  } else {
    res.sendStatus(401)
  }
}
/*
Points to remember :-
 1. we can use this middleware for all the routes in one go 
 
 Syntax:-  app.use(auth)

 2. we can use this middleware for a specific route

  Syntax:- app.use('/signIn', auth, (req, res) => {
    res.json({ message: 'Welcome to the Login Page' })
  })

*/

// Example of using middleware for a specific route
app.use('/signIn', auth, (req, res) => {
  //   console.log('A new request received at ' + Date.now())
  //   res.send('Hello World')
  res.json({ message: 'Welcome to the Login Page' })
})

app.get('/api/users', (req, res) => {
  //   console.log('users')
  res.json({ message: 'Got a GET request at /users' })
})

// 1. Send data via URL in Query String
app.get('/api/new', (req, res) => {
  console.log(req.query)
  res.send(req.query)
})

// 2. Send data via URL in Path Parameters ( Send data via Request Params )
app.get('/api/demo/:name/:subject', (req, res) => {
  console.log(req.params) // Access route parameters
  res.json({ params: req.params }) // Send route parameters in response
})

// 3. Send data via Request Body
app.post('/api/latestdata', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.post('/api/users', (req, res) => {
  res.json({ message: 'Got a POST request' })
})

// Listen to port 8000
// app.listen(8000, () => {
//   console.log('server started')
// })

// Listen to port 8000 using env variable
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})



```

## MongoDB Server - Installation and Setup

- MongoDB is a NoSQL database, which means it is a non-relational database. It is a document-oriented database, which means it stores data in the form of documents. It is an open-source database and is free to use.

Steps:

1. Import mongoose 
2. Firstly we have to install mongoose using npm
  ```bash
  npm i mongoose
  ```
  - then we have to import mongoose in our code
    ```js
    import mongoose from 'mongoose'
    ```
3. Connect to MongoDB server

  ```js
  // Connection to MongoDB
// this return the promise
mongoose
  .connect('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error', err))
  ```
  - here we are connecting to the MongoDB server and we are using the promise to connect to the server in the given url we have to paste the url of the MongoDB server
  ```bash
    # open the terminal and type
    mongosh 
    # here a connecting to url will be shown copy that url and paste it in the code
  ```
  ![Alt text](/5_MongoDB/assets/image.png)

  - then we have to create a database in the MongoDB server
  ```bash
    # open the terminal and type
    use youtube-app-1
  ```


### Code for MongoDB Server

```js
// MongoDB is a NoSQL database which is used to store the data in the form of JSON objects
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const PORT = 8001

// Connection to MongoDB
// this return the promise
mongoose
  .connect('mongodb://127.0.0.1:27017/youtube-app-1')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error', err))

// Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true // email should be unique for every user
    },
    gender: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String
    }
  },
  { timestamps: true }
)

// Model
const User = mongoose.model('User', userSchema) // this is also a collection name in the database MongoDB

// MIDDLEWARES - Plugins (body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// GET req ✅ : get all users

app.get('/users', async (req, res) => {
  const allDBUsers = await User.find({})
  const html = `
 <ul> 
 ${allDBUsers.map(user => `<li>${user.firstName}- ${user.email}</li>`).join('')}
 </ul>
  `
  res.send(html)
})

// POST req ✅ : create a new user
app.post('/api/users', async (req, res) => {
  const body = req.body
  // check if all the fields are present
  if (
    !body.first_Name ||
    !body.last_Name ||
    !body.email ||
    !body.gender ||
    !body.job_Title
  ) {
    return res.status(404).json({ message: 'All fields are required' })
  }

  const result = await User.create({
    firstName: body.first_Name,
    lastName: body.last_Name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_Title
  })

  console.log('Result', result)

  return res.status(201).json({ message: 'User created' })
})

// Dynamic Path Routing Optimised way ✅

app.get('/api/users', async (req, res) => {
  const allDBusers = await User.find({})
  return res.json(allDBusers)
})

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!User) return res.status(404).json({ message: 'User not found' })
    return res.json(user)
  })
  .patch(async (req, res) => {
    // TODO : Edit the user with id

    await User.findByIdAndUpdate(req.params.id, { lastName: 'Dhiman' })
    res.status(201).json({ message: 'User updated' })
  })
  .delete(async (req, res) => {
    // TODO : delete the user with id
    await User.findByIdAndDelete(req.params.id)
    return res.json({ message: 'User deleted' })
  })

// listening to the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`)
})

```

### Prerequisites

List the software, libraries, and tools that users need to have installed before using your project.

- Node.js (>=12.0.0)
- NPM (>=6.0.0)

### Installation

A step-by-step guide to help users install your project. Be sure to provide clear and concise instructions.

1. Clone the repository:

   ```bash
   git clone https://github.com/sa2003hil/Node js.git

   # go to the directory
   cd your-project
