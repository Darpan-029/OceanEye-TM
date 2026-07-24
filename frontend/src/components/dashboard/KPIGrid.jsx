import React from 'react';
import { KPICard } from '../common/KPICard';
import { Radio, AlertTriangle, Activity, Droplets, ShieldAlert, Fish } from 'lucide-react';

export const KPIGrid = ({ kpis = {} }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Active Drone Fleet"
        value={kpis.activeDrones || 18}
        delta={kpis.activeDronesDelta || "+2 Today"}
        isPositive={true}
        icon={Radio}
        subtitle="AUV & ROV probes deployed"
        sparkline={[12, 14, 15, 16, 16, 18]}
      />
      <KPICard
        title="Pollution Hotspots"
        value={kpis.pollutionHotspots || 142}
        delta={kpis.pollutionHotspotsDelta || "-8% this week"}
        isPositive={true}
        icon={AlertTriangle}
        subtitle="Active plastic & debris targets"
        sparkline={[180, 165, 155, 148, 142]}
      />
      <KPICard
        title="Coral Health Index"
        value={`${kpis.coralHealthIndex || 84.2}%`}
        delta={kpis.coralHealthDelta || "+1.4% vs last mo"}
        isPositive={true}
        icon={Activity}
        subtitle="Monitored reef sanctuaries"
        sparkline={[80, 81, 82, 83.5, 84.2]}
      />
      <KPICard
        title="Environmental Risk"
        value={kpis.environmentalRisk || "Low-Mod"}
        delta={`Index ${kpis.riskIndexScore || 32}/100`}
        isPositive={true}
        icon={ShieldAlert}
        subtitle="Predictive threat engine"
        sparkline={[45, 40, 38, 35, 32]}
      />
    </div>
  );
};
