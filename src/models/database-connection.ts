import mysql from "mysql2/promise";
import DBConfig from "../configs/db-config.json";
import fs from "fs";

const caCertificate = fs.readFileSync(DBConfig.ssl.ca).toString();

class DatabaseConnection {
  private static connectionPool = mysql.createPool({
    ...DBConfig,
    ssl: {
      // Provide the minimal SSL configuration
      rejectUnauthorized: false,
      ca: caCertificate,
      // Specify the list of allowed ciphers
      ciphers: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384"
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
