export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  availability: {
    days: string[];
    hours: string;
  };
  image: string;
  rating: number;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  symptoms: string;
}