import {db} from "./drizzle/db";
import { eq,gt,like } from "drizzle-orm";
// import { ProfilesTable, UsersTable } from "./drizzle/schema";
// import { TIUser, TSUser, TIProfile, TSProfile } from "./drizzle/schema";

//query the database
// const getUsers = async (): Promise<TIUser[] | null> => {
//     return await db.query.UsersTable.findMany();
// }

// import { drizzle } from './drizzle/db';
import { Pool } from 'pg';
import * as schema from './drizzle/schema';

const pool = new Pool({
  connectionString: 'postgresql://postgres:@cye005@localhost:5432/restaurant_management',
});

const db = drizzle(pool);

async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS address (
      id SERIAL PRIMARY KEY,
      street_address_1 TEXT NOT NULL,
      street_address_2 TEXT,
      zip_code TEXT NOT NULL,
      delivery_instructions TEXT,
      user_id INT NOT NULL REFERENCES users(id),
      city_id INT NOT NULL REFERENCES city(id),
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS category (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS city (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      state_id INT NOT NULL REFERENCES state(id)
    )`,
    `CREATE TABLE IF NOT EXISTS comment (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id),
      user_id INT NOT NULL REFERENCES users(id),
      comment_text TEXT NOT NULL,
      is_complaint BOOLEAN NOT NULL,
      is_praise BOOLEAN NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS driver (
      id SERIAL PRIMARY KEY,
      car_make TEXT NOT NULL,
      car_model TEXT NOT NULL,
      car_year INT NOT NULL,
      user_id INT NOT NULL REFERENCES users(id),
      online BOOLEAN NOT NULL,
      delivering BOOLEAN NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS menu_item (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      restaurant_id INT NOT NULL REFERENCES restaurant(id),
      category_id INT NOT NULL REFERENCES category(id),
      description TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      price DECIMAL NOT NULL,
      active BOOLEAN NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS order_menu_item (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id),
      menu_item_id INT NOT NULL REFERENCES menu_item(id),
      quantity INT NOT NULL,
      item_price DECIMAL NOT NULL,
      price DECIMAL NOT NULL,
      comment TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS order_status (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id),
      status_catalog_id INT NOT NULL REFERENCES status_catalog(id),
      created_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      restaurant_id INT NOT NULL REFERENCES restaurant(id),
      estimated_delivery_time TIMESTAMP NOT NULL,
      actual_delivery_time TIMESTAMP,
      delivery_address_id INT NOT NULL REFERENCES address(id),
      user_id INT NOT NULL REFERENCES users(id),
      driver_id INT NOT NULL REFERENCES driver(id),
      price DECIMAL NOT NULL,
      discount DECIMAL,
      final_price DECIMAL NOT NULL,
      comment TEXT,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS restaurant (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      street_address TEXT NOT NULL,
      zip_code TEXT NOT NULL,
      city_id INT NOT NULL REFERENCES city(id),
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS state (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS status_catalog (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      contact_phone TEXT NOT NULL,
      phone_verified BOOLEAN NOT NULL,
      email TEXT NOT NULL,
      email_verified BOOLEAN NOT NULL,
      confirmation_code TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS restaurant_owner (
      id SERIAL PRIMARY KEY,
      restaurant_id INT NOT NULL REFERENCES restaurant(id),
      owner_id INT NOT NULL REFERENCES users(id)
    )`,
  ];

  for (const query of queries) {
    await db.execute(query);
  }

  console.log('All tables created successfully');
}

createTables().catch((error) => {
  console.error('Error creating tables:', error);
});