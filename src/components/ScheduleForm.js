import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    company: '',
    eventType: 'interview',
    date: '',
    time: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'ScheduleFair'), formData);
      // Reset form
      setFormData({ company: '', eventType: 'interview', date: '', time: '', location: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
    </form>
  );
}