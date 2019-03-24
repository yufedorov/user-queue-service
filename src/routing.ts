import {UserQueueMethods} from "./userQueueMethods";
import {Observable} from "rxjs";

export class Routing{
    methods: UserQueueMethods;
    constructor(){
        this.methods = new UserQueueMethods();
    }

    userQueueUpdateV2=(entryData,res)=>{
        //console.log(entryData.body[0])
        if(!!entryData.body[0])
        {
            let result=this.methods.userQueueUpdateV2(entryData.body[0]);
            res.json(result);
        }else{
            res.status(500).json('Incorrect request body');
        }
    }

}