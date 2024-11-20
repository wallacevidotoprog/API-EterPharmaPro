import { AppServer } from "./Class/AppClass";
import { OperationsDbClass } from "./Class/OperationsDbClass";
import { IPosition } from "./Interface/db/IPosition";
import { IUsers } from "./Interface/db/IUsers";

const app = new AppServer();
app.StartServer();




//teste
// const newPos: IUsers = {
//  name:'wallace',
//  email:'wallace@gmail.com',
//  pass:'123',
//  stats:true
// };


// const operationsDb = new OperationsDbClass<IUsers>("users");
// const optI= operationsDb.INSERT(newPos);
// newPos.phone="1772413"
// const optU= operationsDb.UPDATE(newPos,{id:1});
// const optD= operationsDb.DELETE(newPos);
// const optG= operationsDb.GET(newPos);
// const optGA= operationsDb.GETALL();

// console.log(optI);
// console.log(optU);
// console.log(optD);
// console.log(optG);
// console.log(optGA);
