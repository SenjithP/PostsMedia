 **Key Features:**

- **User Authentication:**
    - Registration with redirection to login upon success
    - Login using registered credentials
    - Logout with redirection to login page
- **Post Interactions:**
    - Creation of new posts
    - Commenting on existing posts
    - Liking posts
    - Searching posts by description 

**Technology Stack:**

- **MERN:** MongoDB, Express.js, React.js, Node.js
- **HOSTING:** Amazon Web Services AWS

**Project Setup:**

1. **Install npm modules:**
    - `cd Client`
    - `npm install`
    - `cd Server`
    - `npm install`

**Running the Application:**

2. **Start the backend server:**
    - `cd Server`
    - `npm start`

3. **Start the frontend development server:**
    - `cd Client`
    - `npm run dev`

**Application Flow:**

1. **Registration:**
    - User creates a new account by providing required information.
    - Upon successful registration, the user is redirected to the login page.

2. **Login:**
    - User logs in using their registered credentials.

3. **Posting:**
    - User can create new text posts that become visible to other users.

4. **Commenting and Liking:**
    - Users can add comments and likes to existing posts.

5. **Post Search:**
    - Posts can be searched by description using an input field.

6. **Logout:**
    - User can log out of their account, which redirects them back to the login page.
