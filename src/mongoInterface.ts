import {BehaviorSubject, Observable} from "rxjs";
import * as MongoClient from "mongodb";

export class MongoInterface{
    mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27012/test_db";//'mongodb://127.0.0.1:27017/test';//"mongodb://karadag.borlas.ru:27137/nsrTest";//
    mongoClient: MongoClient.MongoClient

    MongoClientConnect(){
        //console.log('QUEUE_SERV: Connect to Mongo');
        return Observable.create((observer)=> {
            if (!this.mongoClient || !this.mongoClient.isConnected()) {
                MongoClient.connect(this.mongoUrl,{ useNewUrlParser: true }, (err, client) => {
                    if (err) {
                        //console.log('QUEUE_SERV: Error connect to Mongo!!!',err);
                        observer.error(err)}
                    this.mongoClient = client;
                    observer.next()
                })
            } else {
                observer.next()
            }
        })
    }



    public UpsertCollection(collection:string,filter:Object,update:Object):Observable<any>{
        return Observable.create((observer)=>{
            let res=[];
            let obs=this.MongoClientConnect();
            obs.subscribe(()=>{
                let db=this.mongoClient.db();
                db.collection(collection).updateOne(filter, update, { upsert: true }, (err, arg) => {
                    if (err) throw err;
                    if (arg.result.ok=1) {
                        //console.log('MONGO_INT: Insert session' + JSON.stringify(filter) + JSON.stringify(update));
                        observer.next((<any>filter).id);
                    }else{
                        observer.next('fail');
                    }
                })
            },
                (err)=>{
                console.log('QUEUE_SERV:Upsert->'+err);
            })
        })
    }

    public find(collection:string,query):Observable<any>{
        return Observable.create((observer)=>{
            let obs=this.MongoClientConnect();
            obs.subscribe(()=>{
                console.log('QUEUE_SERV:find->success');
                let db=this.mongoClient.db();
                db.collection(collection).find(query).toArray((err, args) => {
                    let res={
                        status:'success',
                        output:[]
                    };
                    if (err) res.status='fail';
                    else {
                        res.output=args;
                    }
                    observer.next(res);
                })
            },(err)=>{
                console.log('QUEUE_SERV:find->error');
                let res={
                    status:'false',
                    output:[]
                };
                observer.next(res);

            })
        })
    }


}