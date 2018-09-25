# Cobi Cerberus
Central hub for authentication for cobi applications.

#### Introduction.

Cobi cerberus will be the central point for all cobi application to build their authentication algorithms.  
The application does not use any password, it generates access token and refresh token on demand and these tokens will be sent to user by email of telephone number.  
Cerberus is an internal application, a central hub for handling authentication request from all applications.

`Application --> send login request --> access_token and refresh_token from Cerberus`  
`Application --> save refresh_token to session/or browser`  
`Client --> make API request to application --> check for valid token by Ceberus --> if not ---> using refresh_token to issue a new token`


### TODO:
- [ ] Add caching for user credential search.
- [ ] Add whitelist IP check for internal API call.
- [ ] And admin ui for internal user management.
