import { create } from 'zustand';
import { Doctor } from '@/lib/types/doctor';

// Mock doctor data
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    experience: 10,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '9:00 AM - 5:00 PM',
    },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.8,
    consultationFee: 100,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    experience: 15,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: '10:00 AM - 6:00 PM',
    },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.9,
    consultationFee: 150,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: 8,
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      hours: '9:00 AM - 4:00 PM',
    },
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 4.7,
    consultationFee: 90,
  },
];

interface DoctorState {
  doctors: Doctor[];
  recommendedDoctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  analyzeSymptoms: (symptoms: string) => Promise<void>;
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useDoctorStore = create<DoctorState>((set) => ({
  doctors: mockDoctors,
  recommendedDoctors: [],
  isLoading: false,
  error: null,
  analyzeSymptoms: async (symptoms: string) => {
    set({ isLoading: true, error: null });
    try {
      await delay(1500); // Simulate API call
      
      // Mock symptom analysis logic
      const keywords = symptoms.toLowerCase();
      const recommended = mockDoctors.filter(doctor => {
        if (keywords.includes('heart') || keywords.includes('chest pain')) {
          return doctor.specialty === 'Cardiologist';
        }
        if (keywords.includes('child') || keywords.includes('baby')) {
          return doctor.specialty === 'Pediatrician';
        }
        return doctor.specialty === 'General Physician';
      });
      
      set({ recommendedDoctors: recommended, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },
}));