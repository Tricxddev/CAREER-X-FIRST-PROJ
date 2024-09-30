Fitness Tracker API
This collection provides sets of API endpoints in this project for user management, tracking workout progress, and logging daily meals. It supports user authentication, profile updates, and nutritional tracking for personalized fitness plans.

Authorization:
Some API here uses JWT-based authentication. Include the token in the Authorization header as Bearer to access protected endpoints.

Base URL:
https://career-x-fitness-app-proj.onrender.com/API/
Please set the environment variables for {{baseUrl}} and {{authToken}} before using some of this collection.

Endpoint Categories:
Authentication: Handles user login, registration, and JWT issuance.
User Management: Includes endpoints for creating, updating, and deleting user profiles.

User Profile: Create, update, and view user profiles.
Workout /Exercise Management: Users can log workouts, track progress, and view workout history.
Nutritional Tracking: Enables users to log meals, view nutritional intake, and calculate daily calories.

Response Format:
All responses are returned in JSON format. Successful requests return a 200 OK status along with relevant data. In case of errors, the API returns standardized error messages with appropriate status codes (e.g., 400 Bad Request, 401 Unauthorized).

If a request fails, the API will return a response with an error message and an appropriate HTTP status code. Common error codes include:

400 Bad Request: Invalid input parameters.
401 Unauthorized: Missing or invalid authentication token.

404 Not Found: Resource not found.
500Internal Server Error: Unexpected server issue.

Getting Started:

Sign up via the /signup endpoint.

Log in with /login to receive a JWT token.

Use the JWT token to make authorized requests to other endpoints.
