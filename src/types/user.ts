interface Address {
  line1: string;
  line2: string;
  postcode: string;
  region: string;
  city: string;
  country: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  age: number;
  location: {
    address: Address;
  };
  rating: number;
}
