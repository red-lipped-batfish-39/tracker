# Tracker README.md


Tracker is an app for tracking your periods! You can create an account, add, save,  
and delete past periods, and view previous inputs in our UX friendly calendar!

# Code Stack:

We used a Node/Express/PostgreSQL backend with a React front end environment.

# Routes for client/server communication


| Route  | Request Type   | Request body   | Response body  | Description / Notes   |
|---|---|---|---|---|
| '/'  | GET | n/a   | Serve client index file  |   |
| '/api/login'  | POST  | *Body* {username: 'string', password: 'string'}  | {token: jwt, username: 'string', *optional* [error: 'The user does not exist' or 'The password was incorrect'  |   |
|   |   |   |   |   |
