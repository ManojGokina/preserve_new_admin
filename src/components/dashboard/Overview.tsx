import React, { useState, useEffect } from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp, Activity, Calendar, Clock, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay, parseISO } from 'date-fns';

const stats = [
  { name: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
  { name: 'Total Orders', value: '456', icon: ShoppingCart, change: '+8%', changeType: 'increase' },
  { name: 'Revenue', value: '$12,345', icon: DollarSign, change: '+23%', changeType: 'increase' },
  { name: 'Growth', value: '89%', icon: TrendingUp, change: '-4%', changeType: 'decrease' },
];

const initialEvents = [
  { id: 1, title: 'Team Meeting', time: '10:00', duration: '1 hour', attendees: 5, date: '2024-03-20' },
  { id: 2, title: 'Client Call', time: '14:00', duration: '30 mins', attendees: 3, date: '2024-03-20' },
  { id: 3, title: 'Project Review', time: '16:00', duration: '1.5 hours', attendees: 8, date: '2024-03-21' },
  { id: 4, title: 'Design Workshop', time: '11:00', duration: '2 hours', attendees: 6, date: '2024-03-22' },
  { id: 5, title: 'Weekly Sync', time: '09:30', duration: '1 hour', attendees: 4, date: '2024-03-23' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Created new account', time: '2 minutes ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '5 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face' },
  { id: 3, user: 'Mike Johnson', action: 'Uploaded document', time: '10 minutes ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
];

function Overview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '09:00',
    duration: '1 hour',
    attendees: 1,
    date: format(selectedDate, 'yyyy-MM-dd')
  });

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handlePreviousWeek = () => {
    setSelectedDate(subDays(selectedDate, 7));
  };

  const handleNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleTimeClick = () => {
    setShowTimePicker(!showTimePicker);
    setShowDatePicker(false);
  };

  const handleNewEvent = () => {
    setShowNewEventModal(true);
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const handleCreateEvent = () => {
    const newId = Math.max(...events.map(e => e.id)) + 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setShowNewEventModal(false);
    setNewEvent({
      title: '',
      time: '09:00',
      duration: '1 hour',
      attendees: 1,
      date: format(selectedDate, 'yyyy-MM-dd')
    });
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleNewEvent}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
          >
            <Plus className="h-5 w-5" />
            <span>New Event</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowTimePicker(false);
              }}
              className={`px-4 py-2 rounded-lg transition-colors border border-white/10 ${
                showDatePicker ? 'bg-white/20 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Calendar className="h-5 w-5" />
            </button>
            {showDatePicker && (
              <div className="absolute right-0 mt-2 p-4 rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 z-50 min-w-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePreviousWeek} className="p-1 hover:bg-white/10 rounded-lg">
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <span className="text-white font-medium">
                    {format(weekStart, 'MMMM yyyy')}
                  </span>
                  <button onClick={handleNextWeek} className="p-1 hover:bg-white/10 rounded-lg">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-white/70 text-sm py-1">
                      {day}
                    </div>
                  ))}
                  {weekDays.map(date => (
                    <button
                      key={date.toString()}
                      onClick={() => handleDateClick(date)}
                      className={`p-2 rounded-lg text-center transition-colors ${
                        isToday(date)
                          ? 'bg-white/20 text-white'
                          : isSameDay(date, selectedDate)
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">{format(date, 'd')}</span>
                      {getDayEvents(date).length > 0 && (
                        <div className="mt-1 h-1 w-1 rounded-full bg-sky-400 mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={handleTimeClick}
              className={`px-4 py-2 rounded-lg transition-colors border border-white/10 ${
                showTimePicker ? 'bg-white/20 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Clock className="h-5 w-5" />
            </button>
            {showTimePicker && (
              <div className="absolute right-0 mt-2 p-4 rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 z-50 min-w-[200px]">
                <div className="space-y-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-3 py-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    >
                      {`${i.toString().padStart(2, '0')}:00`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.name}
            className="overflow-hidden rounded-lg backdrop-blur-lg bg-white/10 px-4 py-5 shadow-lg border border-white/10 hover:bg-white/20 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-white/70" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white/70 truncate">{stat.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-white">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className={`flex items-center text-sm ${
                stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Events */}
        <div className="rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/10">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-white">Today's Schedule</h3>
              <Calendar className="h-5 w-5 text-white/70" />
            </div>
            <div className="space-y-4">
              {getDayEvents(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-sky-400 transition-colors">
                      {event.title}
                    </p>
                    <p className="text-sm text-white/70">
                      {event.time} • {event.duration}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-white/50">
                    <Users className="h-4 w-4 mr-1" />
                    {event.attendees}
                  </div>
                </div>
              ))}
              {getDayEvents(selectedDate).length === 0 && (
                <p className="text-center text-white/50 py-4">No events scheduled for today</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/10">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-white">Recent Activity</h3>
              <Activity className="h-5 w-5 text-white/70" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <img
                    src={activity.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {activity.user}
                    </p>
                    <p className="text-sm text-white/70 truncate">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-sm text-white/50">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">New Event</h2>
              <button
                onClick={() => setShowNewEventModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Duration
                </label>
                <select
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="30 mins">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Attendees
                </label>
                <input
                  type="number"
                  min="1"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({ ...newEvent, attendees: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowNewEventModal(false)}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;