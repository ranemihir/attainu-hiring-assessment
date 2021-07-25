# AttainU Instructor Hiring Assessment

- Used Babel to compile ES6 javascript
- Used Mongoose to connect to mongo db.
- Used `jsonwebtoken` package to implement JWT authentication.

## Run

- Step 1: `npm run install`
- Step 2: `npm run start`

Note: I have comitted the .env file (which is not a good practice) so that one can directly run the above commands and start the server.

## Routes

- `POST /login/admin` -> Provide `username` and `password` to login as an admin.
  
- `POST /login/student` -> Provide `username` and `password` to login as a student.
  
- `POST /posts/0/create` -> create a new post with `data` propery with not exceeding 255 characters.
  
- `GET /posts/:id` -> get a post by proviidng its `id`.
  
- `POST /posts/:id/update` -> update a post by providing its `id`.

## MongoDB Schema using Mongoose

```javascript
Post Schema

const postSchema = new mongoose.Schema({
 data: {
  type: String,
  trim: true,
  default: null,
  maxlength: POST_MAX_LENGTH
 }
});
```

```javascript
# User Schema

const userSchema = new mongoose.Schema({
 username: {
  type: String
 },
 encryptedPassword: {
  type: String
 },
 token: {
  type: String
 },
 role: {
  type: String,
  enum: ['STUDENT', 'ADMIN'],
  default: 'STUDENT'
 }
});
```