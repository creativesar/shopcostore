export default {
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
    },
    {
      name: 'sku',
      title: 'SKU (Stock Keeping Unit)',
      type: 'string',
    },
    {
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
    },
    {
      name: 'warehouseLocation',
      title: 'Warehouse Location',
      type: 'string',
    },
    {
      name: 'lowStockThreshold',
      title: 'Low Stock Threshold',
      type: 'number',
      description: 'Notify admin when stock is below this level.',
    },
    {
      name: 'status',
      title: 'Stock Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Stock', value: 'inStock' },
          { title: 'Out of Stock', value: 'outOfStock' },
          { title: 'Low Stock', value: 'lowStock' },
        ],
      },
    },
    {
      name: 'updatedAt',
      title: 'Last Updated At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today',
      },
      initialValue: () => new Date().toISOString(),
    },
  ],
};
