# Marketplace Technical Foundation
## SHOP.CO Product

This schema defines the structure for the product document in our system.

| Field               | Type         | Description                                                                   |
|---------------------|--------------|-------------------------------------------------------------------------------|
| `name`              | String       | The name of the product.                                                      |
| `slug`              | Slug         | The URL-friendly version of the product name, automatically generated from `name`. |
| `price`             | Number       | The price of the product.                                                     |
| `description`       | Text         | A detailed description of the product.                                        |
| `rating`            | Number       | The average rating of the product.                                            |
| `images`            | Array of Image | An array of images for the product.                                           |
| `colors`            | Array of String | An array of available colors for the product.                                |
| `sizes`             | Array of String | An array of available sizes for the product. Options: `Small`, `Medium`, `Large`, `X-Large`. |
| `category`          | Reference    | A reference to the `category` document, defining the product's associated category. |
| `tags`              | Array of String | Searchable tags associated with the product.                                 | 
