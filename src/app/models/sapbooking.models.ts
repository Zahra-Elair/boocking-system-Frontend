import { Time } from "@angular/common";

export class SAPBooking {
	id:number;
	
	persNum:number;

	name:string;

	status:number;

  act:string;
	
 team:string;
	
	 date:Date;
	
	 recCost:string;
	
	 wbs:string;
	
	 costCenter:string;
	
	 shortText:string;

	 hours:Float32Array;
	
	creaton:string;
	
	 timeOfEnt:Time;

	 lastChange:string;
	
	 timeOfLast:Time ;
	
     document:string ;
	
	createdBy:string ;
}