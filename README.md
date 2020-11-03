# Tracker README.md


Tracker is an app for tracking your periods! You can create an account, add, save,  
and delete past periods, and view previous inputs in our UX friendly calendar!

# Code Stack:

We used a Node/Express/PostgreSQL backend with a React front end environment.

# Routes for client/server communication


| Route  | Request Type   | Request body   | Response body  | Description / Notes   |
|---|---|---|---|---|
| '/'  | GET | n/a   | Serve client index file  |   |
| '/api/login'  | POST  | *Body* {username: 'string', password: 'string'}  | {token: jwt, username: 'string', *optional* [error: 'The user does not exist' or 'The password was incorrect']}  | This function needs more error handling on client side. Determine if valid jwt and username are sent back before moving on to the request for all period dates. The most recent patch update (11/2/20) has a temporary fix that is still buggy.  |
| '/api/signup'  | POST  | *Body*  {username: 'string', password: 'string', email: 'string'}  | {token: jwt, username: 'string'}  | *Note* The username is used to set the 'user' property on state. The jwt should be added to local storage on the client side to be sent with all future requests. The passwords are encrypted using bcrypt before adding to database.   |
| '/api/period'  | POST  | *Body* {token: jwt, startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD'}  | {token: jwt (refreshed), periods: [{start_date: 'ISO STRING', end_date: 'ISO STRING'}, {...}]  | Note - JWT's have the username stored in the payload. JWTs expire after 4 hours, so we refresh each time the user does an action. Server side verifies and decodes the JWT to get the username.  |
| '/api/getallperiods'  | POST  | {token: jwt}  | {periods: [{start_date: 'ISO STRING', end_date: 'ISO STRING'}, {...}]}  | Note: This is invoked after a set Timeout after the login. This populates the state with initial period array so that the calendar can render correctly. This was very buggy and needs additional error handling. Ex -- validate jwt before sending post request. Make sure state clears && get all periods does not run if login was unsuccessful, etc.  |
| 'api/period'  | DELETE  | {token: jwt, startDate: 'YYYY-MM-DD'  | {periods: [{start_date: 'ISO_STRING', end_date: 'ISO STRING'}, {...}]}  |   |

# File structure, dev environment, webpack

* \__tests__
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
* Server

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
         
# Fixes, features, and overhauls 

*These are things we haven't implemented yet but would love to see*

1. Fixes
- [ ] Improve error handling on logins. What happens if the user isn't found? Password incorrect? Are we reaching the catch handler on the promises in App? Make sure that state is reset after unsuccessful login attempts. The state should reset to its initial value, except the information related to current date which only populates once on component did mount. Make sure the local storage clears after user logs out or signs in unsuccessfully. 'undefined' should NEVER be stored in local storage as a token.
- [ ] If there is an error in the getUserPeriods(){} function in App.jsx, *do not* update the period array in state. This throws errors if the period array is reset to undefined instead of an empty array. An error in the getUserPeriods probably means there is an invalid jwt, and the local storage should be cleared, state reset, and user sent back to login.
- [  ] If this.state.period is undefined, main should not attempt to render. Error is currently thrown if this happens, and entire page crashes. If this happens at any point, the local storage should be deleted, user sent back to login, and state cleared.

2. Features, large and small
- [ ] Highlight the current date in a different color or with a different border. 
- [ ] Display auxiliary days (before and after each month) in light gray to distinguish between those dates and current month.
- [ ] Fix the border radius on the edges of the calendar to avoid having to have a border inside a border and keep border radius consistent at 0.3em.
- [ ] Add a route to check to see if the JWT exists already, and send the client the username. Create a fetch request from App to send the jwt from local storage to the server upon an app refresh so the user doesn't have to log in again. 
- [ ] Display *future* data in a different color than past/current data. Any period dates entered that are past today's date should be highlighted in a different color.
- [ ] **large** Create a detailed display for a single day. Create a way for the user to get to that day display from the month calendar. Allow the user to input notes / read notes from the day display. Display a star in the monthly calendar if a note exists on that day.
- [ ] **large ish** Add descriptive analytics, hopefully on a separate page. This could be days since last period, average length of cycles, etc. Feel free to add graphs! *Bonus* Allow user to opt out of these analytics.

3. Overhauls
-  [ ] **Issue**: This app has too much information stored in one component. Passing down state is a huge problem and is difficult to debug. This app needs to be redone as a Redux App.
