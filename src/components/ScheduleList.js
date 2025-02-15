import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'ScheduleFair'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(data);
    });
    return () => unsubscribe();
  }, []);

  // Add filtering logic here

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedules.map(schedule => (
        <div key={schedule.id} className="p-4 border rounded">
          <h3 className="text-xl font-bold">{schedule.company}</h3>
          <p>{schedule.eventType}</p>
          <p>{schedule.date} {schedule.time}</p>
          <p>{schedule.location}</p>
        </div>
      ))}
    </div>
  );
}