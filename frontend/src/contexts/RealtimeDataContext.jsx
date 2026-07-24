import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDashboard, fetchDrones, fetchAlerts } from '../services/api';

const RealtimeDataContext = createContext();

export const RealtimeDataProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [drones, setDrones] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastTick, setLastTick] = useState(new Date());

  // Initial fetch
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [dashRes, droneRes, alertRes] = await Promise.all([
          fetchDashboard(),
          fetchDrones(),
          fetchAlerts()
        ]);
        setDashboardData(dashRes);
        setDrones(droneRes);
        setAlerts(alertRes);
      } catch (err) {
        console.error("Error fetching initial telemetry data", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Background real-time simulator interval (Every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastTick(new Date());

      // Simulate telemetry drift for active drones
      setDrones(prevDrones =>
        prevDrones.map(drone => {
          if (drone.status !== 'ACTIVE') return drone;
          
          // Random slight battery drain and depth drift
          const batteryDrain = Math.random() > 0.6 ? 1 : 0;
          const depthDrift = Math.floor(Math.random() * 5) - 2;
          const speedVar = Number((drone.speed + (Math.random() * 0.4 - 0.2)).toFixed(1));

          return {
            ...drone,
            battery: Math.max(5, drone.battery - batteryDrain),
            depth: Math.max(10, drone.depth + depthDrift),
            speed: Math.max(0.5, Math.min(8.0, speedVar))
          };
        })
      );

      // Periodically append a simulated live event feed item
      setDashboardData(prev => {
        if (!prev || !prev.liveFeed) return prev;
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        const randomEvents = [
          { type: 'DRONE_TELEMETRY', title: 'Drone DR-001 pinged telemetry', sector: 'Sector SEC-B4', confidence: '99.1%', severity: 'INFO' },
          { type: 'CORAL_SCAN', title: 'Reef temperature stable at 27.8°C', sector: 'Sector SEC-A2', confidence: '94.2%', severity: 'INFO' },
          { type: 'VISION_AI', title: 'Surface plastic debris cluster analyzed', sector: 'Sector SEC-B4', confidence: '91.8%', severity: 'WARNING' },
          { type: 'SPECIES_TRACK', title: 'Sea turtle tag signal acquired', sector: 'Sector SEC-A2', confidence: '97.5%', severity: 'INFO' }
        ];

        const newEvent = {
          id: `EV-${Math.floor(Math.random() * 9000) + 1000}`,
          time: timeStr,
          ...randomEvents[Math.floor(Math.random() * randomEvents.length)]
        };

        return {
          ...prev,
          liveFeed: [newEvent, ...prev.liveFeed.slice(0, 7)]
        };
      });

    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RealtimeDataContext.Provider value={{ dashboardData, drones, alerts, loading, lastTick }}>
      {children}
    </RealtimeDataContext.Provider>
  );
};

export const useRealtimeData = () => useContext(RealtimeDataContext);
