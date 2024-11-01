import { useDoctorStore } from '@/stores/doctor.store';
import { DoctorCard } from './doctor-card';
import { motion } from 'framer-motion';

export function DoctorGrid() {
  const { recommendedDoctors } = useDoctorStore();

  const handleBookAppointment = (doctorId: string) => {
    // TODO: Implement appointment booking
    console.log('Booking appointment with doctor:', doctorId);
  };

  if (recommendedDoctors.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Recommended Doctors
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>
    </motion.div>
  );
}