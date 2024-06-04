// import { pgTable, serial, text, varchar, integer, primaryKey, dateTime } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";


import { pgTable, serial, PgColumn, text, integer, boolean, primaryKey, decimal,date } from 'drizzle-orm/pg-core';
import { datetime } from "drizzle-orm/mysql-core";

// Define the tables
export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  street_address_1: text('street_address_1').notNull(),
  street_address_2: text('street_address_2'),
  zip_code: text('zip_code').notNull(),
  delivery_instructions: text('delivery_instructions'),
  user_id: integer('user_id').notNull().references(() => users.id),
  city_id: integer('city_id').notNull().references(() => city.id),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const city = pgTable('city', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  state_id: integer('state_id').notNull().references(() => state.id),
});

export const comment = pgTable('comment', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').notNull().references(() => orders.id),
  user_id: integer('user_id').notNull().references(() => users.id),
  comment_text: text('comment_text').notNull(),
  is_complaint: boolean('is_complaint').notNull(),
  is_praise: boolean('is_praise').notNull(),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const driver = pgTable('driver', {
  id: serial('id').primaryKey(),
  car_make: text('car_make').notNull(),
  car_model: text('car_model').notNull(),
  car_year: integer('car_year').notNull(),
  user_id: integer('user_id').notNull().references(() => users.id),
  online: boolean('online').notNull(),
  delivering: boolean('delivering').notNull(),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const menu_item = pgTable('menu_item', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id),
  category_id: integer('category_id').notNull().references(() => category.id),
  description: text('description').notNull(),
  ingredients: text('ingredients').notNull(),
  price: decimal('price').notNull(),
  active: boolean('active').notNull(),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const order_menu_item = pgTable('order_menu_item', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').notNull().references(() => orders.id),
  menu_item_id: integer('menu_item_id').notNull().references(() => menu_item.id),
  quantity: integer('quantity').notNull(),
  item_price: decimal('item_price').notNull(),
  price: decimal('price').notNull(),
  comment: text('comment'),
});

export const order_status = pgTable('order_status', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').notNull().references(() => orders.id),
  status_catalog_id: integer('status_catalog_id').notNull().references(() => status_catalog.id),
  created_at: date('created_at').notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id),
  estimated_delivery_time: date('estimated_delivery_time').notNull(),
  actual_delivery_time: date('actual_delivery_time'),
  delivery_address_id: integer('delivery_address_id').notNull().references(() => address.id),
  user_id: integer('user_id').notNull().references(() => users.id),
  driver_id: integer('driver_id').notNull().references(() => driver.id),
  price: decimal('price').notNull(),
  discount: decimal('discount'),
  final_price: decimal('final_price').notNull(),
  comment: text('comment'),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const restaurant = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  street_address: text('street_address').notNull(),
  zip_code: text('zip_code').notNull(),
  city_id: integer('city_id').notNull().references(() => city.id),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const state = pgTable('state', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
});

export const status_catalog = pgTable('status_catalog', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact_phone: text('contact_phone').notNull(),
  phone_verified: boolean('phone_verified').notNull(),
  email: text('email').notNull(),
  email_verified: boolean('email_verified').notNull(),
  confirmation_code: text('confirmation_code').notNull(),
  password: text('password').notNull(),
  created_at: date('created_at').notNull(),
  updated_at: date('updated_at').notNull(),
});

export const restaurant_owner = pgTable('restaurant_owner', {
  id: serial('id').primaryKey(),
  restaurant_id: integer('restaurant_id').notNull().references(() => restaurant.id),
  owner_id: integer('owner_id').notNull().references(() => users.id),
});

