# Tracker README.md


Tracker is an app for tracking your periods! You can create an account, add, save,  
and delete past periods, and view previous inputs in our UX friendly calendar!

# Code Stack:

We used a Node/Express/PostgreSQL backend with a React front end environment.

# Routes for client/server communication


| Route  | Request Type   | Request body   | Response body  | Description / Notes   |
|---|---|---|---|---|
| '/'  | GET | n/a   | Serve client index file  |   |
| '/api/login'  | POST  | *Body* {username: 'string', password: 'string'}  | {token: jwt, username: 'string', *optional* [error: 'The user does not exist' or 'The password was incorrect'  | This function needs more error handling on client side. Determine if valid jwt and username are sent back before moving on to the request for all period dates. The most recent patch update (11/2/20) has a temporary fix that is still buggy.  |
| '/api/signup'  | POST  | *Body*  {username: 'string', password: 'string', email: 'string'}  | {token: jwt, username: 'string'}  | *Note* The username is used to set the 'user' property on state. The jwt should be added to local storage on the client side to be sent with all future requests. The passwords are encrypted using bcrypt before adding to database.   |
