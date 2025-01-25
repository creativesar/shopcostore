# Marketplace Technical Foundation
## SHOP.CO User Control

This schema defines the structure for the user document in our system.

| Field               | Type         | Description                                                                  |
|---------------------|--------------|------------------------------------------------------------------------------|
| `name`              | String       | The full name of the user.                                                   |
| `email`             | String       | The email address of the user, must be a valid email format.                 |
| `password`          | String       | The password of the user (hidden for security purposes).                     |
| `phone`             | String       | The phone number of the user. Must be between 10-15 digits.                  |
| `address`           | Object       | The user's address, including street, city, state, zip code, and country.    |
| `orderHistory`      | Array        | An array of references to the `order` documents representing the user's order history. |
| `wishlist`          | Array        | An array of references to the `product` documents representing the user's wishlist. |
| `role`              | String       | The role of the user. Options: `customer`, `admin`, `seller`.                |
| `createdAt`         | DateTime     | The date and time when the user was created.                                 |
