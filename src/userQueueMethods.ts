//export const UserQueueCollection = new Mongo.Collection('user_queue');
//export const UserQueueHistoryCollection = new Mongo.Collection('user_queue_history');
import {MongoInterface} from "./mongoInterface";
import {Observable} from "rxjs";

export class UserQueueMethods {
    mongoInterface :MongoInterface;
    constructor(){
        this.mongoInterface = new MongoInterface();
    }
    /*userQueueUpdate(actions: any[], transferRecord?:any,transferExtraData?:any) {
        //console.log("call userQueue.update", JSON.stringify( data))
        if (1!=1) {//Необходимо делать запрос AUTH_SERV
            throw new Error('unauthorized-call');
        }
        if (!actions) return "NOTHING_TO_ADD"
        console.log("actions",actions.length, "transferRecord",transferRecord, "transferExtraData",transferExtraData);
        let extraInfo:any={}
        if (!!transferExtraData) extraInfo.client=transferExtraData
        extraInfo.server={uploadTimestamp:new Date()}

        if(process.env.SERVER_NAME != undefined && process.env.SERVER_NAME != null && process.env.SERVER_NAME != ""){
            extraInfo.server.serverName = process.env.SERVER_NAME;
        }
        
        actions.forEach((action=>{
        //console.log("userQueue.update",JSON.stringify(action))
            delete action["serverExecution"]
            delete action["extraInfo"]
            //if (!!action.extraInfo)   action.extraInfo=Object.assign(action.extraInfo,transferExtraData)
            //else action.extraInfo=transferExtraData
        this.mongoInterface.UpsertCollection('user_queue',{id:action.id}, {
            // Modifier
            $set: action,
            $setOnInsert:{extraInfo:extraInfo}
        }).subscribe((res)=>{
            console.log(res);
            if(res=='success') return "ADDED_TO_QUEUE"
            else return "FAILED_ADDING_TO_QUEUE"
        })

        }))

    }*/
    userQueueUpdateV2(data:{actions: any[], transferRecord?:any,transferExtraData?:any}) {
        //console.log("call userQueue.update", JSON.stringify( data))
        if (1!=1) {
            throw new Error('unauthorized-call');
        }
        setTimeout(()=>this.uploadQueue(data),100);
        console.log("SEND ADDED_TO_QUEUE")
        return "ADDED_TO_QUEUE"
    }
    ping(){
        return "pong"
    }
    /*isUserActionDone(userActionId:string){
        let res: any = {};
        let userQueueActionDone = UserQueueCollection.findOne({$and: [{id:userActionId["userActionId"],serverExecution:{"$exists":true}}]});
        res.result = !!userQueueActionDone;  
        return res;
    }*/

    uploadQueue=(data:{actions: any[], transferRecord?:any,transferExtraData?:any})=> {
        let actions=data.actions;
        let transferRecord=data.transferRecord;
        let transferExtraData=data.transferExtraData;
        if (!actions) {
            console.log("NOTHING_TO_ADD");
            return "NOTHING_TO_ADD"
        }
        console.time("uploadQueue timer")
        //console.log("actions",actions.length, "transferRecord",transferRecord, "transferExtraData",transferExtraData);
        let extraInfo:any={}
        if (!!transferExtraData) extraInfo.client=transferExtraData
        extraInfo.server={uploadTimestamp:new Date()}
        if(process.env.SERVER_NAME != undefined && process.env.SERVER_NAME != null && process.env.SERVER_NAME != ""){
            extraInfo.server.serverName = process.env.SERVER_NAME;
        }

        let  arrObs:Observable<any>[]=[];

        actions.forEach((action=>{
            //console.log("userQueue.update",JSON.stringify(action))
            delete action["serverExecution"]
            delete action["extraInfo"]
            //if (!!action.extraInfo)   action.extraInfo=Object.assign(action.extraInfo,transferExtraData)
            //else action.extraInfo=transferExtraData
            arrObs.push(this.mongoInterface.UpsertCollection('user_queue',{id:action.id}, {
                // Modifier
                $set: action,
                $setOnInsert:{extraInfo:extraInfo}
            }))/*.subscribe((x)=>{
                //if(x=="success")
                console.log("UserQueueuUpload:"+x);
            })*/
        }))
        let o = Observable.merge(...arrObs)
            .publishReplay(1);
        o.connect();
        o.refCount().subscribe(
            (x)=>{console.log("UserQueueuUpload:"+x);},
            (err)=>{console.log(err)},
            ()=>{console.timeEnd("uploadQueue timer")}
            )
    }

}


