import mongoose from 'mongoose';
import { Db } from 'mongodb';

interface dbConfig {
  URI: string | undefined,
  USER: string | undefined;
  PASSWORD: string | undefined,
}

class DB {
  private config: dbConfig;
  private database : Db | undefined;

  constructor(config: dbConfig){
   this.config = config;
  }

  async connect() {
    const url = `mongodb://${this.config.USER}:${this.config.PASSWORD}@${this.config.URI}`;
    const options = {
      useUnifiedTopology: true
    } as mongoose.ConnectOptions;

    mongoose.connect(url, options)
    .then(() => {
      const connection = mongoose.connection;
      this.database = connection.db;
      console.log('Connection to DB successfull');
      
      connection.on('error', function (err) {
        console.error('DB error: ', err);
      });
    })
    .catch(err => {
      console.error('Error connecting to DB', err);
    });
  }  

  async close() {
    mongoose.connection.close()
    .catch(err => {
      this.database = undefined;
      console.error('Error closing the DB', err);
    });
  }

  collection<T>(collectionName: string) {
    return this.database!.collection<T>(collectionName);
  }
}

export { DB };
export type { dbConfig };
