import { } from 'jasmine';
import * as assert from 'assert';
import { expect } from 'chai';
import { } from 'mocha';
import { mongoUnitStart, mongoUnitStop } from '../src/test/MongoUnit'
import { MongoInterface } from '../src/mongoInterface'
import {httpPort, httpServer} from "../src/app";
import * as supertest from 'supertest';
import {Observable} from "rxjs";
const ps = require('ps-node')
let request = supertest.agent(httpServer);
let mongoInterface;

//const dataFolder = process.cwd()+'\\node_modules\\mongo-unit\\.mongo-unit'

describe(`Проверка тестов`, function () {

    after(function (done) {
        console.log('\n-------After all-------');
        httpServer.close();
        mongoInterface.mongoClient.close();
        mongoUnitStop().subscribe(()=>{
            done();
            process.exit();//только так удалось стопнуть тест
        });
    });
    this.timeout(60000);
    before((done) => {
        console.log('-------Before all-------')
        mongoUnitStart().filter((done) => done).take(1).subscribe((flag)=>{

            let onListening=()=> {
                var addr = httpServer.address();
                var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
                console.log("QUEUE_SERV: Rewrite for Test, Listening on " + bind+"\n");
                done();
            }
            httpServer.on("listening",onListening);
            httpServer.listen(httpPort);

        })
    })
    let strActions = [{"id":"f2be2231-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"userobjectaction","actionName":"userObjectAction.create","username":"abondarev","creationDate":"2018-12-18T10:30:32.659Z","args":["abondarevf2be2230-02af-11e9-8ad0-61b0d69e1ff1","event","2018-12-18T10:30:32.659Z","46dD5z62GkcXwYYbf","checklist",2,{"type":"open"}],"clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:32.689Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:32.719Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:32.720Z"},"executionEndAt":"2018-12-18T10:30:32.720Z","actionResult":{"resultState":"success","message":"OK","data":"abondarevf2be2230-02af-11e9-8ad0-61b0d69e1ff1"}},"nextId":"f54a7260-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f54a7260-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:36.934Z","args":["abondarev1e07dce0-0203-11e9-a195-f50ac6b45416","Y",null,"2018-12-18T10:30:36.934Z"],"previousId":"f2be2231-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:36.942Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:36.944Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:36.963Z"},"executionEndAt":"2018-12-18T10:30:36.963Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e07dce0-0203-11e9-a195-f50ac6b45416"}},"nextId":"f5c6f560-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f5c6f560-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:37.750Z","args":["abondarev1e0803f0-0203-11e9-a195-f50ac6b45416","Y",null,"2018-12-18T10:30:37.750Z"],"previousId":"f54a7260-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:37.775Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:37.791Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:37.808Z"},"executionEndAt":"2018-12-18T10:30:37.808Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e0803f0-0203-11e9-a195-f50ac6b45416"}},"nextId":"f68bcc00-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f68bcc00-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:39.040Z","args":["abondarev1e096381-0203-11e9-a195-f50ac6b45416","Y",null,"2018-12-18T10:30:39.040Z"],"previousId":"f5c6f560-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:39.052Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:39.056Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:39.070Z"},"executionEndAt":"2018-12-18T10:30:39.070Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e096381-0203-11e9-a195-f50ac6b45416"}},"nextId":"f6f207e0-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f6f207e0-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:39.710Z","args":["abondarev1e09b1a0-0203-11e9-a195-f50ac6b45416","Y",null,"2018-12-18T10:30:39.710Z"],"previousId":"f68bcc00-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:39.728Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:39.731Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:39.745Z"},"executionEndAt":"2018-12-18T10:30:39.745Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e09b1a0-0203-11e9-a195-f50ac6b45416"}},"nextId":"f7b30df0-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f7b30df0-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:40.975Z","args":["abondarev1e09d8b0-0203-11e9-a195-f50ac6b45416","N",null,"2018-12-18T10:30:40.975Z"],"previousId":"f6f207e0-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:40.989Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:40.992Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:41.009Z"},"executionEndAt":"2018-12-18T10:30:41.009Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e09d8b0-0203-11e9-a195-f50ac6b45416"}},"nextId":"f86d5d40-02af-11e9-8ad0-61b0d69e1ff1"},{"id":"f86d5d40-02af-11e9-8ad0-61b0d69e1ff1","stackInfo":{"actionPriority":0,"actionStackName":"monitorDomain:deviceId:true","isClient":true,"stackname":"deviceId","executorId":"monitorDomain"},"objectName":"checkresult","actionName":"checkresult.setValue","username":"abondarev","creationDate":"2018-12-18T10:30:42.196Z","args":["abondarev1e09d8b2-0203-11e9-a195-f50ac6b45416","N",null,"2018-12-18T10:30:42.196Z"],"previousId":"f7b30df0-02af-11e9-8ad0-61b0d69e1ff1","clientExecution":{"countRunned":1,"executionBeginAt":"2018-12-18T10:30:42.207Z","beforeCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:42.210Z"},"afterCallbackResult":{"result":{"resultState":"success"},"timestamp":"2018-12-18T10:30:42.224Z"},"executionEndAt":"2018-12-18T10:30:42.224Z","actionResult":{"resultState":"success","message":"OK","data":"abondarev1e09d8b2-0203-11e9-a195-f50ac6b45416"}}}]
    let strTransferExtraData = '{"clientUploadTimestamp":"2018-12-18T10:34:17.793Z","uploadAppVersion":"undefined"}'

   it('Отправляем actions', (done) => {
        console.log('-------Begin test-------\n');
        request.post('/api/user_queue/userQueue.update.v2')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send([{
                actions: strActions,
                transferExtraData:strTransferExtraData,
                transferRecord:'x'
        }])//.set('Accept', 'application/json')
            .end((err,res)=>{
                if(res.status==200&&
                    res.body=='ADDED_TO_QUEUE')done();
            });
    });

let func=(f)=>{
    mongoInterface.find('user_queue',{}).subscribe((res)=>{
        if(res.status=="success"){
            if(res.output.length==0 || strActions.length>res.output.length){
                let obs=Observable.interval(1000).subscribe((c) => {
                    func(f);
                    obs.unsubscribe();
                })
            }
            else {
                //console.log(res.output);
                strActions.forEach((action)=>{
                    let el=res.output.find(el=> el.id==action.id);
                    delete el._id;
                    delete el.extraInfo;
                    expect(action.actionName).to.be.equal(el.actionName);//типы данных не совпадают поэтому такая проста проверка
                })
                f();
            }
        }else{}
    })
}


    it('Проверяем что upsert прошёл', (done) => {
        mongoInterface = new MongoInterface();
        func(done);
    });


    /*it('Стопаем все mongo', (done) => {
        makeSureOtherMongoProcessesKilled(dataFolder).then(()=>{
            done();
        })
    });

    function makeSureOtherMongoProcessesKilled(dataFolder) {
        return new Promise((resolve, reject) => {
            console.log(dataFolder);
            ps.lookup({
                psargs: ['-A'],
                command: 'mongod',
                arguments: dataFolder
            }, (err, resultList) => {
                if (err) {
                    console.log('ps-node error', err)
                    return reject(err)
                }
                console.log('KILL PID:  COMMAND:  ARGUMENTS: ')
                console.log(resultList)
                resultList.forEach(process => {
                    if (process) {
                        console.log('KILL PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments)
                        ps.kill(process.pid)
                    }
                });
                return resolve()
            })
        })
    }
*/
});