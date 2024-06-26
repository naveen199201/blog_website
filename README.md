# Blog Website

## Backend Setup

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/naveen199201/blog_website.git
$ cd blog_website/blog_backend
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ virtualenv2 --no-site-packages env
$ source env/bin/activate
```

Then install the dependencies:
a 
```sh
(env)$ pip install -r requirements.txt 
```
Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `virtualenv2`.

Once `pip` has finished downloading the dependencies:
```sh
(env)$ python manage.py runserver
```

## Frontend Setup
First thing to do is to install the required node modules
```sh
$ cd blog_website/blog_frontend
$ npm install
```
Start the app by using the following command
```sh
$ npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
