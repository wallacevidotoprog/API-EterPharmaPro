export interface IDeliveryReq {
    date: Date;
    motor_kilometers: number;
    order_delivery_id: string[];
    status_id: string;
    user_id: string;
  }