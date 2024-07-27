# `Music Camp`

## Database Schema Design

![db schema](<./images/schemaV3.png>)

`https://dbdiagram.io/d/Music-Camp-v3-66a2c1788b4bb5230e612a14`

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "bio": "",
        "website": "",
        "spotify": "",
        "instagram": "",
        "facebook": "",
        "artistImageUrl": "",
        "headerImageUrl": "",
        "backgroundImageUrl": "",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    }
    ```

- Successful Response when there is no logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "password",
      "bio": "",
      "website": "",
      "spotify": "",
      "instagram": "",
      "facebook": "",
      "artistImageUrl": "",
      "headerImageUrl": "",
      "backgroundImageUrl": ""
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## ALBUMS

### Get all Albums

Returns all the albums.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Albums": [
        {
          "id": 1,
          "userId": 1,
          "title": "The Dark Side of the Moon",
          "productTypeId": 1,
          "coverImageUrl": "www.image.com",
          "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
          "producer": "Capitol Records",
          "tags": ["Stoner Rock", "Classic Rock"],
          "price": 9.99,
          "stock": 123,
          "type": "CD",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all Albums owned by the Current User

Returns all the albums owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Albums": [
        {
          "id": 1,
          "userId": 1,
          "title": "The Dark Side of the Moon",
          "productTypeId": 1,
          "coverImageUrl": "www.image.com",
          "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
          "producer": "Capitol Records",
          "tags": ["Stoner Rock", "Classic Rock"],
          "price": 9.99,
          "stock": 123,
          "type": "CD",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get details of a album from an id

Returns the details of a album specified by its id.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "The Dark Side of the Moon",
      "productTypeId": 1,
      "coverImageUrl": "www.image.com",
      "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
      "producer": "Capitol Records",
      "tags": ["Stoner Rock", "Classic Rock"],
      "price": 9.99,
      "stock": 123,
      "type": "CD",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "numReviews": 5,
      "AvgRating": 4.5,
      "purchases": [
        {
          "id": 1,
          "userId": 2,
          "quantity": 1
        },
        {
          "id": 2,
          "userId": 3,
          "quantity": 1
        }
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

### Create a album

Creates and returns a new album.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "The Dark Side of the Moon",
      "productTypeId": 1,
      "coverImageUrl": "www.image.com",
      "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
      "producer": "Capitol Records",
      "tags": ["Stoner Rock", "Classic Rock"],
      "price": 9.99,
      "stock": 123,
      "type": "CD"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "The Dark Side of the Moon",
      "productTypeId": 1,
      "coverImageUrl": "www.image.com",
      "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
      "producer": "Capitol Records",
      "tags": ["Stoner Rock", "Classic Rock"],
      "price": 9.99,
      "stock": 123,
      "type": "CD",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Required",
        "productTypeId": "Required",
        "coverImageUrl": "Required",
        "description": "Required",
        "producer": "Required",
        "tags": "Required",
        "price": "Required",
        "stock": "Required",
        "type": "Required"
      }
    }
    ```

### Edit a album

Updates and returns an existing album.

- Require Authentication: true
- Require proper authorization: album must belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "The Dark Side of the Moon",
      "productTypeId": 1,
      "coverImageUrl": "www.image.com",
      "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
      "producer": "Capitol Records",
      "tags": ["Stoner Rock", "Classic Rock"],
      "price": 9.99,
      "stock": 123,
      "type": "CD"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "The Dark Side of the Moon",
      "productTypeId": 1,
      "coverImageUrl": "www.image.com",
      "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
      "producer": "Capitol Records",
      "tags": ["Stoner Rock", "Classic Rock"],
      "price": 9.99,
      "stock": 123,
      "type": "CD",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Required",
        "productTypeId": "Required",
        "coverImageUrl": "Required",
        "description": "Required",
        "producer": "Required",
        "tags": "Required",
        "price": "Required",
        "stock": "Required",
        "type": "Required"
      }
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

### Delete a album

Deletes an existing album.

- Require Authentication: true
- Require proper authorization: album must belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "review": "This was an awesome album!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "album": {
            "title": "The Dark Side of the Moon",
            "productTypeId": 1,
            "coverImageUrl": "www.image.com",
            "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
            "producer": "Capitol Records",
            "tags": ["Stoner Rock", "Classic Rock"],
            "price": 9.99,
            "stock": 123,
            "type": "CD"
          }
        }
      ]
    }
    ```

### Get all Reviews by a album's id

Returns all the reviews that belong to a album specified by id.

- Require Authentication: false
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "review": "This was an awesome album!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          }
        }
      ]
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

### Create a Review for a album based on the album's id

Create and return a new review for a album specified by id.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome album!",
      "stars": 5
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": 1,
      "review": "This was an awesome album!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

- Error response: Review from the current user already exists for the album

  - Status Code: 500
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already has a review for this album"
    }
    ```

### Edit a Review

Update and return an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "review": "This was an awesome album!",
      "stars": 5
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": 1,
      "review": "This was an awesome album!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5"
      }
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

- Require Authentication: true
- Require proper authorization: Review must belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

- Error response: Couldn't find a Review with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

## PURCHASES

### Get all of the Current User's purchases

Return all the purchases that the current user has made.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "purchases": [
        {
          "album": {
            "title": "The Dark Side of the Moon",
            "productTypeId": 1,
            "coverImageUrl": "www.image.com",
            "description": "The Dark Side of the Moon is the eighth studio album by the English rock band Pink Floyd",
            "producer": "Capitol Records",
            "tags": ["Stoner Rock", "Classic Rock"],
            "price": 9.99,
            "stock": 123,
            "type": "CD"
          },
          "userId": 2,
          "albumId": 1,
          "quantity": 2,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all purchases for a album based on the album's id

Return all the purchases for a album specified by id.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response: If you ARE NOT the owner of the album.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "purchases": [
        {
          "albumId": 1,
          "quantity": 420
        }
      ]
    }
    ```

- Successful Response: If you ARE the owner of the album.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "purchases": [
        {
          "User": {
            "id": 2,
            "firstName": "John",
            "lastName": "Smith"
          },
          "id": 1,
          "albumId": 1,
          "userId": 2,
          "quantity": 2,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

### Create a Purchase from a album based on the album's id

Create and return a new purchase from a album specified by id.

- Require Authentication: true
- Require proper authorization: album must NOT belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "quantity": 2
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "albumId": 1,
      "userId": 2,
      "quantity": 2,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Must enter quantity"
      }
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```

## WISHLIST

### Get all of the Current User's wishlist

Return all the wishlist that the current user has made.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "wishlist": [
        {
          "userId": 2,
          "albumId": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Create a Wishlist from a album based on the album's id

Create and return a new purchase from a album specified by id.

- Require Authentication: true
- Require proper authorization: album must NOT belong to the current user

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "albumId": 1,
      "userId": 2,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

## SHOPPING CART

### Get all of the Current User's shoppingCart

Return all the shoppingCart items that the current user has made.

- Require Authentication: true
- Request

  - Method: ?
  - URL: ?
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "ShoppingCart": [
        {
          "id": 1,
          "albumId": 1,
          "userId": 2,
          "quantity": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        },
        {
          "id": 2,
          "albumId": 2,
          "userId": 2,
          "quantity": 1,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Create a item for shoppingCart from a album based on the album's id

Create and return a new purchase from a album specified by id.

- Require Authentication: true
- Require proper authorization: album must NOT belong to the current user
- Request

  - Method: ?
  - URL: ?
  - Headers:
    - Content-Type: application/json

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "albumId": 1,
      "userId": 2,
      "quantity": 2,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Must enter quantity"
      }
    }
    ```

- Error response: Couldn't find a album with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "album couldn't be found"
    }
    ```
