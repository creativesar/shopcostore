# Marketplace Technical Foundation
## SHOP.CO Inventory Control

This schema defines the structure for the inventory document in our system.

| Field               | Type         | Description                                                                 |
|---------------------|--------------|-----------------------------------------------------------------------------|
| `product`           | Reference    | A reference to the `product` document.                                      |
| `sku`               | String       | The Stock Keeping Unit (SKU) for the product.                               |
| `stock`             | Number       | The quantity of stock available for the product.                            |
| `warehouseLocation` | String       | The location of the product in the warehouse.                               |
| `lowStockThreshold` | Number       | The stock level at which the admin will be notified if stock falls below it. |
| `status`            | String       | The stock status of the product. Options: `inStock`, `outOfStock`, `lowStock`. |
| `updatedAt`         | DateTime     | The timestamp for the last update of the inventory record.                 |
