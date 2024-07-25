# User Stories

## Users

### Sign Up '/sign-up'
* As an unregistered and unauthorized user, I can sign up for the website using a sign-up form
    * When on sign up page:
        * I can enter my email, username, password
        * The website logs me in upon sign up completion

    * Upon invalid data
        * The forms shows/explains the validations I failed to pass
        * validations include: username length; password length; email format

### Log in '/log-in'
* As a registered and unauthorized user, I log in using my credentials using a log-in modal form
    * when on '/log-in' modal form, I can enter my email/username and password.
    * upon a successful log in, I am directed to the homepage and have access to all the website's functionality
    * when invalid data is entered, the form indicates validations failed to pass
        * validations include: username length; password length; matching credentials


### Demo User
* A user can access the website Demo on the log in page/modal form
* all features and functionalities are enabled for the Demo user
* upon sign out, all changes the demo user has made are not saved


### Profile Page
#### "/:username"
* Shows banner, profile picture, username, and collection of album(s) the user has bought

#### "/:username/wishlist"
* Shows banner, profile picture, username, and collection of album(s) in the user's wishlist

#### "/:username/following"
* !!! shows the list of artists the user is following !!!


## Products

### Albums

#### '/albums'
* can see a list of available items

#### '/albums/:albumId'
* shows item details including title, artist, cover image, tracks, description, release date, and tag(s).

* !!! There is a review(s) block at the bottom where users can read, create, update, and delete reviews !!!
* !!! You can add album to wishlist/shopping-cart !!!


### Shopping-Cart
#### '/cart'
* shows a list of items the user is intending to purchase
* shows the album cover, album title, price, and subtotal

#### '/checkout'
* transaction page to purchase all items in user's cart
* upon successful transaction, the items get added to user's collection
