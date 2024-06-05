// import { pgTable, serial, text, integer, boolean, decimal, timestamp } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';



// Define the tables
import { pgTable, serial, text, integer, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User table definition
export const users = pgTable('users', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // User name
  contactPhone: text('contact_phone').notNull(), // Contact phone number
  phoneVerified: boolean('phone_verified').notNull(), // Whether phone is verified
  email: text('email').notNull(), // Email address
  emailVerified: boolean('email_verified').notNull(), // Whether email is verified
  confirmationCode: text('confirmation_code').notNull(), // Confirmation code
  password: text('password').notNull(), // Password
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// Address table definition
export const address = pgTable('address', {
  id: serial('id').primaryKey(), // Primary key
  streetAddress1: text('street_address_1').notNull(), // Street address line 1
  streetAddress2: text('street_address_2'), // Street address line 2
  zipCode: text('zip_code').notNull(), // Zip code
  deliveryInstructions: text('delivery_instructions'), // Delivery instructions
  userId: integer('user_id').notNull().references(() => users.id), // Foreign key to users table
  cityId: integer('city_id').notNull().references(() => city.id), // Foreign key to city table
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// Category table definition
export const category = pgTable('category', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // Category name
});

// City table definition
export const city = pgTable('city', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // City name
  stateId: integer('state_id').notNull().references(() => state.id), // Foreign key to state table
});

// Comment table definition
export const comment = pgTable('comment', {
  id: serial('id').primaryKey(), // Primary key
  orderId: integer('order_id').notNull().references(() => orders.id), // Foreign key to orders table
  userId: integer('user_id').notNull().references(() => users.id), // Foreign key to users table
  commentText: text('comment_text').notNull(), // Comment text
  isComplaint: boolean('is_complaint').notNull(), // Whether it's a complaint
  isPraise: boolean('is_praise').notNull(), // Whether it's a praise
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// Driver table definition
export const driver = pgTable('driver', {
  id: serial('id').primaryKey(), // Primary key
  carMake: text('car_make').notNull(), // Car make
  carModel: text('car_model').notNull(), // Car model
  carYear: integer('car_year').notNull(), // Car year
  userId: integer('user_id').notNull().references(() => users.id), // Foreign key to users table
  online: boolean('online').notNull(), // Whether the driver is online
  delivering: boolean('delivering').notNull(), // Whether the driver is delivering
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// MenuItem table definition
export const menuItem = pgTable('menu_item', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // Menu item name
  restaurantId: integer('restaurant_id').notNull().references(() => restaurant.id), // Foreign key to restaurant table
  categoryId: integer('category_id').notNull().references(() => category.id), // Foreign key to category table
  description: text('description').notNull(), // Description
  ingredients: text('ingredients').notNull(), // Ingredients
  price: decimal('price').notNull(), // Price
  active: boolean('active').notNull(), // Whether the item is active
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// OrderMenuItem table definition
export const orderMenuItem = pgTable('order_menu_item', {
  id: serial('id').primaryKey(), // Primary key
  orderId: integer('order_id').notNull().references(() => orders.id), // Foreign key to orders table
  menuItemId: integer('menu_item_id').notNull().references(() => menuItem.id), // Foreign key to menu item table
  quantity: integer('quantity').notNull(), // Quantity
  itemPrice: decimal('item_price').notNull(), // Item price
  price: decimal('price').notNull(), // Price
  comment: text('comment'), // Comment
});

// OrderStatus table definition
export const orderStatus = pgTable('order_status', {
  id: serial('id').primaryKey(), // Primary key
  orderId: integer('order_id').notNull().references(() => orders.id), // Foreign key to orders table
  statusCatalogId: integer('status_catalog_id').notNull().references(() => statusCatalog.id), // Foreign key to status catalog table
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
});

// Orders table definition
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(), // Primary key
  restaurantId: integer('restaurant_id').notNull().references(() => restaurant.id), // Foreign key to restaurant table
  estimatedDeliveryTime: timestamp('estimated_delivery_time').notNull(), // Estimated delivery time
  actualDeliveryTime: timestamp('actual_delivery_time'), // Actual delivery time
  deliveryAddressId: integer('delivery_address_id').notNull().references(() => address.id), // Foreign key to address table
  userId: integer('user_id').notNull().references(() => users.id), // Foreign key to users table
  driverId: integer('driver_id').notNull().references(() => driver.id), // Foreign key to driver table
  price: decimal('price').notNull(), // Price
  discount: decimal('discount'), // Discount
  finalPrice: decimal('final_price').notNull(), // Final price
  comment: text('comment'), // Comment
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// Restaurant table definition
export const restaurant = pgTable('restaurant', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // Restaurant name
  streetAddress: text('street_address').notNull(), // Street address
  zipCode: text('zip_code').notNull(), // Zip code
  cityId: integer('city_id').notNull().references(() => city.id), // Foreign key to city table
  createdAt: timestamp('created_at').notNull(), // Creation timestamp
  updatedAt: timestamp('updated_at').notNull(), // Update timestamp
});

// State table definition
export const state = pgTable('state', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // State name
  code: text('code').notNull(), // State code
});

// StatusCatalog table definition
export const statusCatalog = pgTable('status_catalog', {
  id: serial('id').primaryKey(), // Primary key
  name: text('name').notNull(), // Status name
});

// RestaurantOwner table definition
export const restaurantOwner = pgTable('restaurant_owner', {
  id: serial('id').primaryKey(), // Primary key
  restaurantId: integer('restaurant_id').notNull().references(() => restaurant.id), // Foreign key to restaurant table
  ownerId: integer('owner_id').notNull().references(() => users.id), // Foreign key to users table
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  address: many(address), // One user can have many addresses
  comments: many(comment), // One user can have many comments
  drivers: many(driver), // One user can be associated with many drivers
  orders: many(orders), // One user can have many orders
  restaurantOwners: many(restaurantOwner), // One user can own many restaurants
}));

export const addressRelations = relations(address, ({ one }) => ({
  user: one(users, { fields: [address.userId], references: [users.id] }), // One address belongs to one user
  city: one(city, { fields: [address.cityId], references: [city.id] }), // One address belongs to one city
}));

export const categoryRelations = relations(category, ({ many }) => ({
  menuItems: many(menuItem), // One category can have many menu items
}));

export const cityRelations = relations(city, ({ one, many }) => ({
  state: one(state, { fields: [city.stateId], references: [state.id] }), // One city belongs to one state
  addresses: many(address), // One city can have many addresses
  restaurants: many(restaurant), // One city can have many restaurants
}));

export const commentRelations = relations(comment, ({ one }) => ({
  order: one(orders, { fields: [comment.orderId], references: [orders.id] }), // One comment belongs to one order
  user: one(users, { fields: [comment.userId], references: [users.id] }), // One comment belongs to one user
}));

export const driverRelations = relations(driver, ({ one, many }) => ({
  user: one(users, { fields: [driver.userId], references: [users.id] }), // One driver is associated with one user
  orders: many(orders), // One driver can have many orders
}));

export const menuItemRelations = relations(menuItem, ({ one, many }) => ({
  restaurant: one(restaurant, { fields: [menuItem.restaurantId], references: [restaurant.id] }), // One menu item belongs to one restaurant
  category: one(category, { fields: [menuItem.categoryId], references: [category.id] }), // One menu item belongs to one category
  orderMenuItems: many(orderMenuItem), // One menu item can be part of many order menu items
}));

export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
  order: one(orders, { fields: [orderMenuItem.orderId], references: [orders.id] }), // One order menu item belongs to one order
  menuItem: one(menuItem, { fields: [orderMenuItem.menuItemId], references: [menuItem.id] }), // One order menu item belongs to one menu item
}));

export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
  order: one(orders, { fields: [orderStatus.orderId], references: [orders.id] }), // One order status belongs to one order
  statusCatalog: one(statusCatalog, { fields: [orderStatus.statusCatalogId], references: [statusCatalog.id] }), // One order status belongs to one status catalog
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  restaurant: one(restaurant, { fields: [orders.restaurantId], references: [restaurant.id] }), // One order belongs to one restaurant
  address: one(address, { fields: [orders.deliveryAddressId], references: [address.id] }), // One order is delivered to one address
  user: one(users, { fields: [orders.userId], references: [users.id] }), // One order belongs to one user
  driver: one(driver, { fields: [orders.driverId], references: [driver.id] }), // One order is delivered by one driver
  orderMenuItems: many(orderMenuItem), // One order can have many order menu items
  orderStatuses: many(orderStatus), // One order can have many statuses
}));

export const restaurantRelations = relations(restaurant, ({ one, many }) => ({
  city: one(city, { fields: [restaurant.cityId], references: [city.id] }), // One restaurant belongs to one city
  menuItems: many(menuItem), // One restaurant can have many menu items
  orders: many(orders), // One restaurant can have many orders
  restaurantOwners: many(restaurantOwner), // One restaurant can have many owners
}));

export const stateRelations = relations(state, ({ many }) => ({
  cities: many(city), // One state can have many cities
}));

export const statusCatalogRelations = relations(statusCatalog, ({ many }) => ({
  orderStatuses: many(orderStatus), // One status catalog can have many order statuses
}));

export const restaurantOwnerRelations = relations(restaurantOwner, ({ one }) => ({
  restaurant: one(restaurant, { fields: [restaurantOwner.restaurantId], references: [restaurant.id] }), // One restaurant owner owns one restaurant
  user: one(users, { fields: [restaurantOwner.ownerId], references: [users.id] }), // One restaurant owner is one user
}));


export type  TIAddress = typeof address.$inferInsert;
export type  TSAddress = typeof address.$inferSelect;
export type TICategory = typeof category.$inferInsert;
export type TSCategory = typeof category.$inferSelect;
export type TICity = typeof city.$inferInsert;
export type TSCity = typeof city.$inferSelect;
export type TIComment = typeof comment.$inferInsert;
export type TSComment = typeof comment.$inferSelect;
// export type TIDriver = typeof driver.$inferInsert;
// export type TSDriver = typeof driver.$inferSelect;
// export type TIMenu_item = typeof menu_item.$inferInsert;
// export type TSMenu_item = typeof menu_item.$inferSelect;
// export type TSOrder_menu_item = typeof order_menu_item.$inferSelect;
// export type TIOrder_menu_item = typeof order_menu_item.$inferInsert;
// export type TIOrder_status= typeof order_status.$inferInsert;
// export type TSOrder_status= typeof order_status.$inferSelect;
// export type TIorders= typeof orders.$inferInsert;
// export type TSorders= typeof orders.$inferSelect;
// export type TIrestaurant= typeof restaurant.$inferInsert;
// export type TSrestaurant= typeof restaurant.$inferSelect;
// export type TIstate= typeof state.$inferInsert;
// export type TSstate= typeof state.$inferSelect;
// export type TIstatus_catalog= typeof status_catalog.$inferInsert;
// export type TSstatus_catalog= typeof status_catalog.$inferSelect;
// export type TIusers= typeof users.$inferInsert;
// export type TSusers= typeof users.$inferSelect;
// export type Tirestaurant_owner= typeof restaurant_owner.$inferInsert;
// export type TSrestaurant_owner= typeof restaurant_owner.$inferSelect;










