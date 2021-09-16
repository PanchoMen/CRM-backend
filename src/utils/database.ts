import mongoose from 'mongoose';
import { Db } from 'mongodb';

interface dbConfig {
  URI: string,
  USER: string;
  PASSWORD: string,
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
    };

    mongoose.connect(url)
    .then(() => {
      const connection = mongoose.connection;
      connection.on('error', function (err) {
        console.error('DB error: ', err);
      });

      connection.once('open', function () {
        this.database = connection.db;
        console.log('Connection to DB successfull');
      });
    })
    .catch(error => {
      console.error('Error connecting to DB', error);
    });
  }  

  async close() {
    mongoose.connection.close()
    .catch(error => {
      this.database = undefined;
      console.error('Error closing the DB', error);
    });
  }

  collection<T>(collectionName: string) {
    return this.database!.collection<T>(collectionName);
  }
}

export {dbConfig, DB};