# Tracker README.md


Tracker is an app for tracking your periods! You can create an account, add, save,  
and delete past periods, and view previous inputs in our UX friendly calendar!

# Code Stack:

We used a Node/Express/PostgreSQL backend with a React front end environment.

# Routes for client/server communication


Route
Request Type
Request body and/or params
Response body and/or redirects
‘/’
get


Serve client index file

//optional  refresh
{token: jwt, username: username}
‘/api/login’
post
BODY: {username: username, password: password}

HEADER: specify json
{token: jwt OR null, username: username OR null, error: “The user does not exist” OR “The password was incorrect”}

**JWT
//if error then output error in object only
//if no error return username and jwt


Options {expires --- ??? }
Payload {username: username}
‘/api/signup’
post
BODY {username: username, password: password, email: email}


{token: jwt, username: username}

**JWT

Options {expires --- ??? }
Payload {username: username}
‘/api/period’
post
BODY 
{token: jwt, startDate: “MM-DD-YYYY”, endDate: “MM-DD-YYYY” }
//maybe refresh token?

{token:jwt,
periods: [{
startDate: MM-DD-YYY, endDate: MM-DD-YYYY
}, {...}, {...}]}
‘/api/getallperiods 

***this will run on load after signup completes
post
BODY 
{token: jwt}
{periods: [{
startDate: MM-DD-YYY, endDate: MM-DD-YYYY
}, {...}, {...}]}
/api/period
delete
{token: jwt,
startDate: YYYY-MM-DD}


{periods: [{
startDate: MM-DD-YYY, endDate: MM-DD-YYYY
}, {...}, {...}]}


