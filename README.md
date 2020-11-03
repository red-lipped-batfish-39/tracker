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

# Components and State

Currently, the app has one stateful component (App in App.jsx). The component tree is below.

* App
    * Profile
      * Login
      * Signup
      * Logout
    * Main
      * Month
       * Day Labels
       * Week (5)
         * Day (7)
         
