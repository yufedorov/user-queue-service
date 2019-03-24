import * as mongoUnit from 'mongo-unit';
const mongoose = require('mongoose');
import {BehaviorSubject, Observable} from 'rxjs/Rx';
const Schema = mongoose.Schema

function dao(url) {
    mongoose.connect(url, { useNewUrlParser: true })

    const userQueueSchema = new Schema({
        id : String
        /*
        _id : String,
        id : String,
        actionName : String,
        args : [
            {
                id : String,
                clientDate : String
            }
        ],
        clientExecution : {
            countRunned : Number,
            executionBeginAt : String,
            beforeCallbackResult : {
                result : {
                    resultState : String
                },
                timestamp : String
            },
            afterCallbackResult : {
                result : {
                    resultStat : String
                },
                timestamp : String
            },
            executionEndAt : String,
            actionResult : {
                resultState : String,
                message : String,
                data : String
            }
        },
        creationDate : String,
        extraInfo : {
            client : {
                clientUploadTimestamp : String,
                uploadAppVersion : String
            },
            server : {
                uploadTimestamp : Date
            }
        },
        objectName : String,
        previousId : String,
        stackInfo : {
            actionPriority : Number,
            actionStackName : String,
            isClient : Boolean,
            stackname : String,
            executorId : String
        },
        username : String*/

    })


    return {
        user_queue:  mongoose.model('user_queue', userQueueSchema)
    }
}

const data={
    "user_queue": [{
        "id":"111"
    }]
}

let daoUT;
let initDone$: BehaviorSubject<boolean> = new BehaviorSubject(false)
export let mongoUnitStart=()=>
{
    console.log('MONGO_UNIT: mongoUnitStart');
    let mo :mongoUnit.MongodOptions={
        dbpath:'node_modules/mongo-unit/.mongo-unit',
        port:27012,
        verbose:false,
        dbName:'test_db'
    }

    let promise = mongoUnit.start(mo)
        .then(url => {
            console.log('MONGO_UNIT: url = ' + url);
            daoUT = dao(url);
        })
        .then(() => {
            mongoUnit.load(data);
        }).then(()=>{
            daoUT.user_queue.find().then((queues)=>{
                //console.log(queues)   -- возвращается [] наверное неверные данные для схемы
                initDone$.next(true);
            })
        }).catch((err)=>{
            console.log(err.code);
            initDone$.error(true);
        })
    return initDone$;
}

export let mongoUnitStop=():Observable<boolean>=>
{
    return Observable.create((observer)=> {
        //this.mongoose.disconnect();
        mongoUnit.drop().catch(((e) => {
            console.log(e)
        })).then(() => {
            //observer.next(true)

            mongoUnit.stop().then(() => {
                observer.next(true);
                console.log('Server stopped');
            })

        })
    })
}


/*initDone$.filter((done) => done).take(1).subscribe(()=>{
    console.log('InitDone');
    mongoUnit.drop().then(()=>{
        console.log('BD dropped');
        mongoUnit.stop().then(()=>{
            console.log('Server stopped');
        })
    })
})*/