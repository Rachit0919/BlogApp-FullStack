# Debugging Log

## Current Status
- Frontend is reporting `net::ERR_FAILED` for requests to `/api/v1/users/login`.
- Backend logs *do not* show `Incoming request`, `Inside getCurrentUser`, or `Inside getAllPosts` logs, even after updating CORS to `http://localhost:5181`.
- Backend server is running on port 8000.
- Frontend server is running on port 5181.

## Steps Taken So Far
1. Added `console.log` statements to `index.js` to monitor database connection status. (Backend server restarted)
2. Added `console.log` to `app.js` to log incoming requests. (Backend server restarted)
3. Added `console.log` to `getCurrentUser` in `user.controller.js` to inspect `req.user`. (Backend server restarted)
4. Added `console.log` to `getAllPosts` in `blog.controller.js` to confirm execution and inspect fetched data. (Backend server restarted)
5. Updated CORS origin in `app.js` to `http://localhost:5180`. (Backend server restarted)
6. Verified that `verifyJWT` middleware was previously being hit, but now no requests are reaching the backend at all.
7. Directly accessed `/api/v1/users/current-user` using `curl`, which resulted in an "Unauthorized request" error, confirming backend responsiveness and `auth.middleware.js` being hit.
8. Identified `d:/12MegaBlog/Blog_App/src/services/authService.js` as the primary authentication service file.
9. Added `console.log` statements within the `getCurrentUser` function in `d:/12MegaBlog/Blog_App/src/services/authService.js` to inspect the request options, especially headers and `credentials`.
10. Restarted frontend server, which is now running on port 5181.
11. Updated CORS origin in `app.js` to `http://localhost:5181` and restarted the backend server.
12. User reported `net::ERR_FAILED http://localhost:8000/api/v1/users/login` from the browser's network tab.

## Next Steps
1. Examine the frontend's `Login.jsx` component to understand how it initiates the login request.
2. Add logging to the `Login.jsx` component to inspect the data being sent and the request options.
3. Update this `debugging_log.md` with findings and next actions.