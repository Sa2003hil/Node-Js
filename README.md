# Node JS with Express Basic to Advance 

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
![Url](/Server/Assets/image.png)

**Url path**

![Alt text](./Server/Assets/image-1.png)

**Url Nested path**

![Alt text](./Server/Assets/image-2.png)


**URL Query Parameters** : Query parameters are a defined set of parameters attached to the end of a url. 
Like this:  
![Alt text](/Server/Assets/image-3.png)

Here the _query parameters_ started after **'?'** and we can start another query parameter after **'&'**

**# Points to REMEMBER**

1. The HTTP module doesn't parse the **req.url** automatically we have to install npm package **url** to parse the url
```bash
npm i url
```
2. After installing if we run the server by entering url : http://localhost:8000/about?myname=sahil    it will parse the url automatically

![Alt text](/Server/Assets/image-4.png)

3. Now if want to know how variables are declared in the query parameters then we have to use **url.parse(req.url, true)** and it will give us an object of query parameters

Now as you can see in the image query object is also shown showing the parse values of query parameters

![Alt text](/Server/Assets/image-6.png)
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

![Alt text](/Server/Assets/image8.png)



## Day 3 : HTTP Methods in NodeJS

**Point 1:**

HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.

- **GET :** _[Default method]_
![Alt text](/Server/Assets/image10.png)

- **POST :**

  _Like Login Pages or Forms uses Post method to send data to the server_
![Alt text](/Server/Assets/image11.png)

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
