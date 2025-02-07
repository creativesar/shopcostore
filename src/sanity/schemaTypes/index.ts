import { type SchemaTypeDefinition } from 'sanity'
import products from '../products'; 
import { customerSchema, orderItemSchema, orderSchema } from './schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,orderItemSchema,orderSchema,customerSchema],
}
