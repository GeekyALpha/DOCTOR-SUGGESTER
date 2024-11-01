import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDoctorStore } from '@/stores/doctor.store';
import { Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

export function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState('');
  const { analyzeSymptoms, isLoading } = useDoctorStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    await analyzeSymptoms(symptoms);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-white p-6 shadow-lg"
    >
      <div className="mb-4 flex items-center space-x-2">
        <Stethoscope className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Symptom Analyzer</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="symptoms"
            className="block text-sm font-medium text-gray-700"
          >
            Describe your symptoms
          </label>
          <textarea
            id="symptoms"
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Please describe your symptoms in detail..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading || !symptoms.trim()}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </Button>
      </form>
    </motion.div>
  );
}