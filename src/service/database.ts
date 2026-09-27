import * as SQLite from 'expo-sqlite';
import { Product } from '../types/product';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('shop.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL
      );
    `);
  }
  return db;
};

export const getProducts = async (): Promise<Product[]> => {
  const database = await initDatabase();
  const rows = await database.getAllAsync<Product>('SELECT * FROM products ORDER BY id DESC');
  return rows;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<number> => {
  const database = await initDatabase();
  const result = await database.runAsync(
    'INSERT INTO products (title, price, description) VALUES (?, ?, ?)',
    [product.title, product.price, product.description]
  );
  return result.lastInsertRowId;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const database = await initDatabase();
  await database.runAsync('DELETE FROM products WHERE id = ?', [id]);
};