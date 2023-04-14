import mysql from "mysql2/promise";
import DBConfig from "../configs/db-config.json";
import fs from "fs";
import path from "path";

class DatabaseConnection {
  private static connectionPool = mysql.createPool({
    ...DBConfig,
    ssl: {
      // Include the server's SSL certificate
      ca: fs.readFileSync(path.join(__dirname, '../configs/ca-certificate.crt')),
      rejectUnauthorized: true,
    },
  });

  static async create(): Promise<mysql.PoolConnection | undefined> {
    let conn: mysql.PoolConnection;
    try {
      // Acquire a database connection and return it to the caller
      return await DatabaseConnection.connectionPool.getConnection(); // Note: manually release the connection after use.
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}

export default DatabaseConnection;
