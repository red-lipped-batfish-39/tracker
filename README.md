# Tracker README.md


Tracker is an app for tracking your periods! You can create an account, add, save,  
and delete past periods, and view previous inputs in our UX friendly calendar!

# Code Stack:

We used a Node/Express/PostgreSQL backend with a React front end environment.

# Setup & Running Code

- [ ] `npm install` installs all dependencies in the pacakge.json folder
- [ ] `npm run dev` runs development environment at http://localhost/8080 with a server proxy at http://localhost/3000
- [ ] `npm run build` creates build.js in a build folder
- [ ] `npm run start` can be run after npm run build

# Database tables & Environment variables

There are two tables - users and period_date.

Create your own database and store `PG_URI = 'your-pg-uri'` and `PG_PASSWORD = 'your-pg-password'` in an .env file. 

Create a secret key and store it in the .env file as well. `secret = 'your-key-here'`

```create table users (
user_id serial primary key,
username varchar(50) unique,
email varchar(250) unique,
password varchar(250))
with(
    oids = false
)
;


create table period_date(
  period_id serial primary key,
  start_date date,
  end_date date,
  user_id int not null,
  constraint user_id foreign key(user_id) references users(user_id)
  
)
with(
    oids = false
);
```

# Routes for client/server communication


| Route  | Request Type   | Request body   | Response body  | Description / Notes   |
|---|---|---|---|---|
| '/'  | GET | n/a   | Serve client index file  |   |
| '/api/login'  | POST  | *Body* {username: 'string', password: 'string'}  | {token: jwt, username: 'string', *optional* [error: 'The user does not exist' or 'The password was incorrect']}  | This function needs more error handling on client side. Determine if valid jwt and username are sent back before moving on to the request for all period dates. The most recent patch update (11/2/20) has a temporary fix that is still buggy.  |
| '/api/signup'  | POST  | *Body*  {username: 'string', password: 'string', email: 'string'}  | {token: jwt, username: 'string'}  | *Note* The username is used to set the 'user' property on state. The jwt should be added to local storage on the client side to be sent with all future requests. The passwords are encrypted using bcrypt before adding to database.   |
| '/api/period'  | POST  | *Body* {token: jwt, startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD'}  | {token: jwt (refreshed), periods: [{start_date: 'ISO STRING', end_date: 'ISO STRING'}, {...}]  | Note - JWT's have the username stored in the payload. JWTs expire after 4 hours, so we refresh each time the user does an action. Server side verifies and decodes the JWT to get the username.  |
| '/api/getallperiods'  | POST  | {token: jwt}  | {periods: [{start_date: 'ISO STRING', end_date: 'ISO STRING'}, {...}]}  | Note: This is invoked after a set Timeout after the login. This populates the state with initial period array so that the calendar can render correctly. This was very buggy and needs additional error handling. Ex -- validate jwt before sending post request. Make sure state clears && get all periods does not run if login was unsuccessful, etc.  |
| 'api/period'  | DELETE  | {token: jwt, startDate: 'YYYY-MM-DD'  | {periods: [{start_date: 'ISO_STRING', end_date: 'ISO STRING'}, {...}]}  | Return all periods after the delete  |

# File structure, dev environment, webpack

* client
    * component
      * day.jsx
      * dayLabel.jsx
      * login.jsx
      * logout.jsx
      * main.jsx
      * month.jsx
      * profile.jsx
      * signup.jsx
      * week.jsx
    * static
      * _variables.scss
      * styles.scss
    * index.html 
    * **index.js** This file is the entry point for webpack. 
* server
  * controllers
    * controller.js
  * models
    * **models.js** - postgreSQL was used, so this file exports a query model
  * routes
    * **api.js** - currently handles all requests from App
  * server.js
* .env **NOTE -- you have to make your own .env file with a PG_URI, PG_PASSWORD, and secret. Our db is not public** 
* serversetup.sql **NOTE -- use to create your own tables. See db section for more details.**
* webpack.config.js 
* package.json 

# Components and State

Currently, the app has one stateful component (App in App.jsx). The component tree is below.

* App
    * Profile
      * Login
      * Signup
      * Logout
    * Main
      * Month
       * DayLabel ( 7 )
       * Week (5)
         * Day (7)
       * buttonDisplay (Note - not a component, but toggles between delete and save depending on whether or not the user has clicked on a stored period)
       * button for Next Month & Previous Month (Not components)


# Fixes, features, and overhauls 

*These are things we haven't implemented yet but would love to see*

1. Fixes and Potential improvements
- [ ] Improve error handling on logins. What happens if the user isn't found? Password incorrect? Are we reaching the catch handler on the promises in App? Make sure that state is reset after unsuccessful login attempts. The state should reset to its initial value, except the information related to current date which only populates once on component did mount. Make sure the local storage clears after user logs out or signs in unsuccessfully. 'undefined' should NEVER be stored in local storage as a token.
- [ ] Improve error handling on signup. Send specific message back to the user if the username already exists or the email already exists.
- [ ] If there is an error in the getUserPeriods(){} function in App.jsx, *do not* update the period array in state. This throws errors if the period array is reset to undefined instead of an empty array. An error in the getUserPeriods probably means there is an invalid jwt, and the local storage should be cleared, state reset, and user sent back to login.
- [ ] If this.state.period is undefined, main should not attempt to render. Error is currently thrown if this happens, and entire page crashes. If this happens at any point, the local storage should be deleted, user sent back to login, and state cleared.
- [ ] Can you get today's date before component did mount? If so, you could get rid of the showMain property in state.
- [ ] Can you pass date objects through state? Currently, date objects are not passed but instead Date, Year, and Month are passed and new date objects are initialized in the components that use them.
- [ ] Can you filter the period [] array to only include the data for that month before passing it down from main? Would that actually improve the functionality in day.jsx that checks to see if the day would fall into a period range? How would that work with the 5 - week display instead of the month display?
- [ ] Is there a faster/more efficient way to generate a calendar than calculating the last Sunday that occured before the 1st of the month through recursion (See method in main.jsx).
- [ ] **large** Create a testing suite. The sky is the limit, but we would love to see tests that look at the controllers and the fetch requests, particularly to help with error handling. What happens if you send an error object back to the client? What happens if you send an empty {} to the server? What happens if you send an expired JWT? etc. After you've got that down, can you make sure that the toggling between login/signup/signout works? Does state reset? We installed jest and started to work on describes, but we didn't get far enough to put anything into our main branch. 
- [ ] Should passwords be stored in state during the login process? Does this cause uneccessary security issues? Can passwords be encrypted client side so that they are not sent as plain text to the server?

2. Features, large and small
- [ ] Highlight the current date in a different color or with a different border. 
- [ ] Display auxiliary days (before and after each month) in light gray to distinguish between those dates and current month.
- [ ] Fix the border radius on the edges of the calendar to avoid having to have a border inside a border and keep border radius consistent at 0.3em.
- [ ] Add a route to check to see if the JWT exists already, and send the client the username. Create a fetch request from App to send the jwt from local storage to the server upon an app refresh so the user doesn't have to log in again. 
- [ ] Display *future* data in a different color than past/current data. Any period dates entered that are past today's date should be highlighted in a different color.
- [ ] **large** Create a detailed display for a single day. Create a way for the user to get to that day display from the month calendar. Allow the user to input notes / read notes from the day display. Display a star in the monthly calendar if a note exists on that day.
- [ ] **large ish** Add descriptive analytics, hopefully on a separate page. This could be days since last period, average length of cycles, etc. Feel free to add graphs! *Bonus* Allow user to opt out of these analytics.


3. Overhauls
-  [ ] **Redux**: This app has too much information stored in one component. Passing down state is a huge problem and is difficult to debug. This app needs to be redone as a Redux App.
- [ ] **React Hooks**: This app has too much information stored in one component. (Oh that's the same issue!) Different idea - use react hooks to refactor current functionality.
- [ ] **React Router**: We rely on toggling between certain buttons and components based on properties in state. This can be difficult to debug. Look at *storedStart* as an example -- this is used to change the month component buttonDisplay and the day component onClick action, or look at *showMain* which changes only after the component first mounts and the date can be accessed. *task* is also used to toggle between login, signup, and logout. This may be able to be refactored with React Router.
