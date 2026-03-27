export interface Order {
  key: string;
  orderId: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  items: number;
  status: string;
  payment: string;
}

export interface Inquiry {
  key: string;
  date: string;
  name: string;
  company: string;
  email: string;
  product: string;
  status: string;
  rep: string;
}
