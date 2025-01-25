export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Full Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'string',
        validation: (Rule) => Rule.required().email(),
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        hidden: true, // For security; passwords should ideally be hashed and not stored here directly
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        validation: (Rule) => Rule.regex(/^\d{10,15}$/, {
          name: 'phone', // Error name
          invert: false, // Do not allow invalid phone numbers
          message: 'Phone number must be between 10-15 digits',
        }),
      },
      {
        name: 'address',
        title: 'Address',
        type: 'object',
        fields: [
          { name: 'street', title: 'Street', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'state', title: 'State', type: 'string' },
          { name: 'zipCode', title: 'Zip Code', type: 'string' },
          { name: 'country', title: 'Country', type: 'string' },
        ],
      },
      {
        name: 'orderHistory',
        title: 'Order History',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'order' }] }],
      },
      {
        name: 'wishlist',
        title: 'Wishlist',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
      },
      {
        name: 'role',
        title: 'User Role',
        type: 'string',
        options: {
          list: ['customer', 'admin', 'seller'],
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'createdAt',
        title: 'Created At',
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
  