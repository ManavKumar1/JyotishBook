export interface User {
  id: string;
  name: string;
  mobile: number;
  dob: string;
  tob?: string;
  pob: string;
  bio?: string;
  reference?: string;
  notes?: string;
  createdAt: string;

  kundali?: {
    lagnaSign: string;
    houses: {
      house1: string;
      house2: string;
      house3: string;
      house4: string;
      house5: string;
      house6: string;
      house7: string;
      house8: string;
      house9: string;
      house10: string;
      house11: string;
      house12: string;
    };
  };
}
