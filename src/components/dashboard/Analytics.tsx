import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react';

const metrics = [
  { name: 'Active Users', value: '2,345', change: '+15%', trend: 'up' },
  { name: 'Average Session', value: '4m 32s', change: '-8%', trend: 'down' },
  { name: 'Bounce Rate', value: '24.8%', change: '+2%', trend: 'up' },
  { name: 'Total Sessions', value: '12,543', change: '+25%', trend: 'up' },
];

function Analytics() {
  const [timeRange, setTimeRange] = useState('7');
  
  const handleExport = () => {
    console.log('Exporting analytics data...');
    // In a real app, this would trigger data export
  };

  const handleMetricClick = (metric: typeof metrics[0]) => {
    console.log(`Viewing detailed analytics for ${metric.name}`);
    // In a real app, this would show detailed metrics
  };

  const handleChartClick = (chartType: string) => {
    console.log(`Interacting with ${chartType} chart`);
    // In a real app, this would handle chart interactions
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
          >
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <button
            key={metric.name}
            onClick={() => handleMetricClick(metric)}
            className="rounded-lg backdrop-blur-lg bg-white/10 p-4 border border-white/10 hover:bg-white/20 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">{metric.name}</span>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
              <p className={`ml-2 text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <button
          onClick={() => handleChartClick('User Activity')}
          className="rounded-lg backdrop-blur-lg bg-white/10 p-6 border border-white/10 hover:bg-white/20 transition-colors text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">User Activity</h3>
            <Activity className="h-5 w-5 text-white/70" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <LineChart className="h-48 w-48 text-white/30" />
            <p className="text-white/50">Activity graph will be displayed here</p>
          </div>
        </button>

        <button
          onClick={() => handleChartClick('Traffic Sources')}
          className="rounded-lg backdrop-blur-lg bg-white/10 p-6 border border-white/10 hover:bg-white/20 transition-colors text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Traffic Sources</h3>
            <PieChart className="h-5 w-5 text-white/70" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <BarChart className="h-48 w-48 text-white/30" />
            <p className="text-white/50">Traffic sources chart will be displayed here</p>
          </div>
        </button>
      </div>

      <div className="rounded-lg backdrop-blur-lg bg-white/10 p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Real-time Users</h3>
          <Users className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-4">
          {['Dashboard', 'Analytics', 'Settings'].map((page) => (
            <button
              key={page}
              onClick={() => console.log(`Viewing ${page} users`)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-white">{page}</span>
              </div>
              <span className="text-white/70">
                {Math.floor(Math.random() * 50)} users
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;