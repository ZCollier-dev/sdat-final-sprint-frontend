import React, { useState, useEffect } from 'react';
import api from '../api/client';

export default function HealthStatus() {
  const [apiStatus, setApiStatus] = useState('checking');
  const [dbStatus, setDbStatus] = useState('unknown');

  useEffect(() => {
    const checkHealth = async () => {
      // Check API status
      try {
        await api.get('/airports');
        setApiStatus('up');
      } catch {
        setApiStatus('down');
      }

      // Check DB status via Actuator
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '/api';
        const response = await fetch(`${baseUrl}/actuator/health`);

        if (response.ok) {
          const data = await response.json();
          const dbState = data?.components?.db?.status?.toLowerCase?.() || 'up';
          setDbStatus(dbState);
        } else {
          setDbStatus('unknown');
        }
      } catch {
        setDbStatus('unknown');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="row">
      <div className="badge">
        API:{' '}
        <b className={apiStatus === 'up' ? 'success' : 'danger'}>
          {apiStatus}
        </b>
      </div>
      <div className="badge">
        DB:{' '}
        <b
          className={
            dbStatus === 'up'
              ? 'success'
              : dbStatus === 'down'
              ? 'danger'
              : 'warning'
          }
        >
          {dbStatus}
        </b>
      </div>
    </div>
  );
}
