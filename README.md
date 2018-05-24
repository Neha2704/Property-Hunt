Property-hunt:
Front end - HTML and CSS
Back end - Express and MongoDB

Following back-end functions are implemented successfully, using http requests:

// LOGIN
// LOGOUT
// SIGNUP
// ADD A NEW PROPERTY
// VIEW PROFILE INFO
// VIEW AVAILABLE PROPERTIES: TENANT
// VIEW OWNER PROPERTIES: OWNER
// RAISE AN INTEREST IN PARTICULAR PROPERTY: TENANT
// DELETE A PROPERTY: OWNER
// RENT A PROPERTY: OWNER
// RAISE A COMPLAINT: TENANT 
// RESOLVE A COMPLAINT: OWNER

Three schemas for owner, tenant and property objects are defined.
Passwords are stored using bcrypt.
The username is saved in a session variable for login-persistence.
All relevant object variables across all collections are updated with each request.

Few sample inputs are provided in inputs.txt.
