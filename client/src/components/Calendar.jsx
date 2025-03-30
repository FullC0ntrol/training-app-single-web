import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();

  // Przykładowe eventy
  const events = [
    {
      title: 'Klata + Triceps',
      start: new Date(),
      color: '#f97316', // orange-500
      extendedProps: {
        icon: '💪'
      }
    },
    {
      title: 'Nogi + Biceps',
      start: new Date(Date.now() + 86400000),
      color: '#3b82f6', // blue-500
      extendedProps: {
        icon: '🦵'
      }
    }
  ];

  const handleEventClick = (info) => {
    alert(`Wybrano trening: ${info.event.title}`);
  };

  const handleDateClick = (arg) => {
    alert(`Wybrano datę: ${arg.dateStr}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-white"
    >
      {/* Nagłówek i przycisk powrotu */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={() => navigate(-1)}
          className="text-sky-400 hover:text-orange-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft className="w-6 h-6" />
        </motion.button>
        <motion.h1
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Kalendarz Treningów
        </motion.h1>
        <div className="w-6"></div> {/* Spacer dla równowagi */}
      </div>

      {/* Kontener kalendarza */}
      <motion.div
        className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          height="auto"
          eventContent={(eventInfo) => (
            <div className="flex items-center p-1">
              <span className="mr-2">{eventInfo.event.extendedProps.icon}</span>
              <span>{eventInfo.event.title}</span>
            </div>
          )}
          themeSystem="standard"
          eventClassNames="hover:shadow-lg transition-shadow"
          dayHeaderClassNames="text-orange-400"
          buttonText={{
            today: 'Dziś',
            month: 'Miesiąc',
            week: 'Tydzień'
          }}
          locale="pl"
          firstDay={1} // Poniedziałek jako pierwszy dzień tygodnia
        />
      </motion.div>

      {/* Stopka informacyjna */}
      <motion.div
        className="mt-6 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Kliknij na dzień, aby dodać trening
      </motion.div>
    </motion.div>
  );
};

export default Calendar;