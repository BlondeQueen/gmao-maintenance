'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  Plus,
  Clock,
  User,
  AlertCircle,
  Settings
} from 'lucide-react';
import { mockMaintenanceRecords, mockEquipments } from '../data/mockData';
import { MaintenanceType, Priority } from '../types';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: MaintenanceType;
  priority: Priority;
  status: string;
  technician: string;
  equipmentName: string;
}

export default function CalendarManagement() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [technicianFilter, setTechnicianFilter] = useState<string>('ALL');

  // Conversion des données de maintenance en événements de calendrier
  const events: CalendarEvent[] = mockMaintenanceRecords.map(record => {
    const equipment = mockEquipments.find(eq => eq.id === record.equipmentId);
    return {
      id: record.id,
      title: `${record.type} - ${equipment?.name || 'Équipement inconnu'}`,
      start: record.scheduledDate,
      end: addDays(record.scheduledDate, record.duration / 24),
      type: record.type,
      priority: record.priority,
      status: record.status,
      technician: record.technician,
      equipmentName: equipment?.name || 'Équipement inconnu'
    };
  });

  // Filtrage des événements
  const filteredEvents = events.filter(event => {
    const matchesType = typeFilter === 'ALL' || event.type === typeFilter;
    const matchesPriority = priorityFilter === 'ALL' || event.priority === priorityFilter;
    const matchesTechnician = technicianFilter === 'ALL' || event.technician === technicianFilter;
    
    return matchesType && matchesPriority && matchesTechnician;
  });

  // Obtenir les dates de la semaine actuelle
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Obtenir les événements d'une date donnée
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(event.start, date));
  };

  // Navigation dans le calendrier
  const navigateWeek = (direction: 'prev' | 'next') => {
    const days = direction === 'prev' ? -7 : 7;
    setCurrentDate(prev => addDays(prev, days));
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Ouverture de la modale
  const openEventModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // Couleurs selon le type de maintenance
  const getEventColor = (type: MaintenanceType, priority: Priority) => {
    const baseColors = {
      PREVENTIVE: 'bg-blue-100 border-blue-300 text-blue-800',
      CORRECTIVE: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      PREDICTIVE: 'bg-green-100 border-green-300 text-green-800',
      EMERGENCY: 'bg-red-100 border-red-300 text-red-800',
      INSPECTION: 'bg-purple-100 border-purple-300 text-purple-800'
    };

    if (priority === 'CRITICAL') {
      return 'bg-red-200 border-red-400 text-red-900';
    }

    return baseColors[type] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  // Statistiques
  const todayEvents = getEventsForDate(new Date());
  const weekEvents = filteredEvents.filter(event => 
    event.start >= weekStart && event.start <= weekEnd
  );
  const criticalEvents = weekEvents.filter(event => event.priority === 'CRITICAL');
  const emergencyEvents = weekEvents.filter(event => event.type === 'EMERGENCY');

  // Liste des techniciens uniques
  const technicians = Array.from(new Set(events.map(event => event.technician)));

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planning de Maintenance</h1>
          <p className="mt-1 text-gray-600">
            Planification et suivi des interventions
          </p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle intervention
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aujourd&apos;hui</p>
              <p className="text-2xl font-bold text-gray-900">{todayEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cette semaine</p>
              <p className="text-2xl font-bold text-gray-900">{weekEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critiques</p>
              <p className="text-2xl font-bold text-gray-900">{criticalEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgences</p>
              <p className="text-2xl font-bold text-gray-900">{emergencyEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles du calendrier */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Semaine précédente"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={navigateToday}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Aujourd&apos;hui
              </button>
              <button 
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Semaine suivante"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(weekStart, 'dd MMMM', { locale: fr })} - {format(weekEnd, 'dd MMMM yyyy', { locale: fr })}
            </h2>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filtrer par type"
            >
              <option value="ALL">Tous types</option>
              <option value="PREVENTIVE">Préventive</option>
              <option value="CORRECTIVE">Corrective</option>
              <option value="PREDICTIVE">Prédictive</option>
              <option value="EMERGENCY">Urgence</option>
              <option value="INSPECTION">Inspection</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filtrer par priorité"
            >
              <option value="ALL">Toutes priorités</option>
              <option value="LOW">Faible</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="HIGH">Élevée</option>
              <option value="CRITICAL">Critique</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
              aria-label="Filtrer par technicien"
            >
              <option value="ALL">Tous techniciens</option>
              {technicians.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>

            <div className="flex items-center text-gray-600 text-sm">
              <Filter className="h-4 w-4 mr-1" />
              {filteredEvents.length} événement(s)
            </div>
          </div>
        </div>
      </div>

      {/* Vue calendrier hebdomadaire */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {weekDays.map((day, index) => (
            <div key={index} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-sm font-medium text-gray-900">
                {format(day, 'EEEE', { locale: fr })}
              </div>
              <div className={`text-lg font-bold mt-1 ${
                isToday(day) ? 'text-blue-600' : 'text-gray-700'
              }`}>
                {format(day, 'dd')}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 min-h-96">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            
            return (
              <div key={index} className="border-r border-gray-200 last:border-r-0 p-2 space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openEventModal(event)}
                    className={`p-2 rounded border-l-4 cursor-pointer hover:shadow-md transition-shadow ${getEventColor(event.type, event.priority)}`}
                  >
                    <div className="text-xs font-semibold truncate">
                      {event.title}
                    </div>
                    <div className="text-xs opacity-75 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {event.technician}
                    </div>
                    {event.priority === 'CRITICAL' && (
                      <div className="text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Critique
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de détails d'événement */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Détails de l&apos;intervention
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Équipement</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedEvent.equipmentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedEvent.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priorité</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedEvent.priority}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Statut</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedEvent.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technicien</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedEvent.technician}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date planifiée</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(selectedEvent.start, 'dd/MM/yyyy HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
