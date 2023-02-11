import { MongoClient as Mongo, Db } from "mongodb";
export declare const MongoClient: {
    client: Mongo;
    db: Db;
    connect(): Promise<void>;
};
