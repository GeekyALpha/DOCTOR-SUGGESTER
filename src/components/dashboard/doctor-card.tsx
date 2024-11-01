import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/lib/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <div className="relative h-48">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{doctor.specialty}</p>
        <div className="mt-2 flex items-center">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>{doctor.experience} years of experience</p>
          <p>Available: {doctor.availability.days.join(', ')}</p>
          <p>Hours: {doctor.availability.hours}</p>
          <p className="font-semibold">
            Consultation Fee: ${doctor.consultationFee}
          </p>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => onBookAppointment(doctor.id)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </motion.div>
  );
}