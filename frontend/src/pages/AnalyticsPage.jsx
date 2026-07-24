import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/api';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AnalyticsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics().then(res => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-center font-mono text-ocean-cyan">Loading Business Intelligence Charts...</div>;

  const { pollutionTrend, coralHealthMonthly, speciesGrowth, droneMissionsCompleted } = data;

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Plastics,OilSlicks,GhostNets\n" +
      pollutionTrend.map(e => `${e.month},${e.plastics},${e.oilSlicks},${e.ghostNets}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "oceaneye-analytics-report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-card border border-ocean-cyan/20">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-ocean-cyan" />
            <h1 className="text-2xl font-bold font-heading text-white">Historical Analytics & KPI Intelligence</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated multi-year trends for pollution reduction, coral index stability, and species census counts.
          </p>
        </div>

        <Button onClick={handleExportCSV} variant="secondary" size="sm" icon={Download}>
          Export Monthly Report (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pollution Reduction Trend (Area Chart) */}
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-3">
          <h3 className="font-heading font-bold text-white text-base">Pollution Volume Trends (Plastics vs Ghost Nets)</h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pollutionTrend}>
                <defs>
                  <linearGradient id="colorPlastics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#47B5FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#47B5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#041C32', borderColor: '#47B5FF', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="plastics" stroke="#47B5FF" fillOpacity={1} fill="url(#colorPlastics)" name="Plastic kg" />
                <Area type="monotone" dataKey="ghostNets" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} name="Ghost Nets" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coral Health Monthly Line Chart */}
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-3">
          <h3 className="font-heading font-bold text-white text-base">Coral Health Index vs Bleaching Risk</h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coralHealthMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#041C32', borderColor: '#22C55E', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="index" stroke="#22C55E" strokeWidth={3} name="Health Index %" />
                <Line type="monotone" dataKey="bleachingRisk" stroke="#F59E0B" strokeWidth={2} name="Bleaching Risk %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Species Population Growth Bar Chart */}
        <div className="glass-panel p-6 rounded-card border border-ocean-cyan/20 space-y-3 lg:col-span-2">
          <h3 className="font-heading font-bold text-white text-base">Multi-Year Marine Mammal Population Growth (2022 - 2026)</h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speciesGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#041C32', borderColor: '#47B5FF', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="blueWhales" fill="#1363DF" name="Blue Whales" />
                <Bar dataKey="seaTurtles" fill="#47B5FF" name="Sea Turtles" />
                <Bar dataKey="mantaRays" fill="#7FD4D4" name="Manta Rays" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
