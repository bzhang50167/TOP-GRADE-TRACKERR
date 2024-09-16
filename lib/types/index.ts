export type RequestBody = {
    description:string;
    address:string;
    clientName:string;
    clientEmail:string;
    clientPhone:string;
    userId:number;
    scheduledDate: Date;
    jobId:number;
    id:number;
    warranty?:number;
}

export interface Job {
    id: number;
    description: string;
    address: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    userId: number;
    scheduledDate: string;
    warranty: number;
  }
