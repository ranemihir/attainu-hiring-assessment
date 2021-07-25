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
// Post Schema

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
// User Schema

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

## Screenshots

I used `Postman` to test all the endpoints and here are the screenshots:

### User

![Login as an 'Admin' User](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/create_admin.png)

![Login as an 'Student' User](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/student_login.png)

![Error message on Student User is not authorised to create/update/delete ](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/user_not_authorised.png)

![Incorrect Password Error](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/incorrect_password.png)

![Invalid token Error](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/invalid_token.png)

### Post

![Create a Post](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/create_post.png)

![Retrieve a Post](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/get_post.png)

![Invalid Post id Error](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/invalid_post_id.png)

![Update a Post](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/update_post.png)

![Delete a Post](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/post_delete.png)

![Post exceeds length of 255 characters](https://github.com/ranemihir/attainu-hiring-assessment/blob/main/screenshots/post_exceeds_length_255.png)

Note: All the Screenshots are stored in the scrrenshots directory inside root.
