'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  AlertTriangle, 
  Plus,
  Edit,
  Eye,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { mockSpareParts } from '../data/mockData';
import { SparePart } from '../types';
import PartForm from './forms/PartForm';

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedPart, setSelectedPart] = useState<SparePart | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPartForm, setShowPartForm] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePart | null>(null);

  // Filtrage des pièces
  const filteredParts = mockSpareParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || 
                         (statusFilter === 'LOW_STOCK' && part.currentStock <= part.minStock) ||
                         (statusFilter === 'IN_STOCK' && part.currentStock > part.minStock) ||
                         (statusFilter === 'OUT_OF_STOCK' && part.currentStock === 0);
    
    const matchesCategory = categoryFilter === 'ALL' || part.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Statistiques
  const totalParts = mockSpareParts.length;
  const lowStockParts = mockSpareParts.filter(part => part.currentStock <= part.minStock);
  const outOfStockParts = mockSpareParts.filter(part => part.currentStock === 0);
  const totalValue = mockSpareParts.reduce((sum, part) => sum + (part.currentStock * part.unitCost), 0);

  const categories = Array.from(new Set(mockSpareParts.map(part => part.category)));

  const getStockStatus = (part: SparePart) => {
    if (part.currentStock === 0) return { status: 'Rupture', color: 'text-red-600 bg-red-100' };
    if (part.currentStock <= part.minStock) return { status: 'Stock faible', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'En stock', color: 'text-green-600 bg-green-100' };
  };

  const openModal = (part: SparePart) => {
    setSelectedPart(part);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPart(null);
    setIsModalOpen(false);
  };

  // Gestion des pièces
  const handleCreatePart = () => {
    setEditingPart(null);
    setShowPartForm(true);
  };

  const handleEditPart = (part: SparePart) => {
    setEditingPart(part);
    setShowPartForm(true);
    setIsModalOpen(false);
  };

  const handleSubmitPart = async (partData: Partial<SparePart>) => {
    console.log('Nouvelle pièce:', partData);
    // Ici, on sauvegarderait normalement dans une base de données
    alert('Pièce sauvegardée avec succès !');
    setShowPartForm(false);
    setEditingPart(null);
  };

  const closePartForm = () => {
    setShowPartForm(false);
    setEditingPart(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Stocks</h1>
          <p className="mt-1 text-gray-600">
            Suivi des pièces de rechange et consommables
          </p>
        </div>
        <button 
          onClick={handleCreatePart}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une pièce
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pièces</p>
              <p className="text-2xl font-bold text-gray-900">{totalParts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock Faible</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockParts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ruptures</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockParts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valeur Stock</p>
              <p className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString('fr-FR')} FCFA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une pièce..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filtrer par statut"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="IN_STOCK">En stock</option>
            <option value="LOW_STOCK">Stock faible</option>
            <option value="OUT_OF_STOCK">Rupture</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filtrer par catégorie"
          >
            <option value="ALL">Toutes catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="flex items-center text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm">{filteredParts.length} résultat(s)</span>
          </div>
        </div>
      </div>

      {/* Alertes de stock */}
      {(lowStockParts.length > 0 || outOfStockParts.length > 0) && (
        <div className="space-y-4">
          {outOfStockParts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-red-800 font-semibold">Pièces en rupture de stock</h3>
              </div>
              <div className="mt-2 space-y-1">
                {outOfStockParts.slice(0, 3).map(part => (
                  <div key={part.id} className="text-red-700 text-sm">
                    • {part.name} ({part.partNumber})
                  </div>
                ))}
                {outOfStockParts.length > 3 && (
                  <div className="text-red-700 text-sm">
                    ... et {outOfStockParts.length - 3} autres
                  </div>
                )}
              </div>
            </div>
          )}

          {lowStockParts.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-yellow-800 font-semibold">Pièces avec stock faible</h3>
              </div>
              <div className="mt-2 space-y-1">
                {lowStockParts.slice(0, 3).map(part => (
                  <div key={part.id} className="text-yellow-700 text-sm">
                    • {part.name}: {part.currentStock} / min {part.minStock}
                  </div>
                ))}
                {lowStockParts.length > 3 && (
                  <div className="text-yellow-700 text-sm">
                    ... et {lowStockParts.length - 3} autres
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Liste des pièces */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pièce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix Unitaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParts.map((part) => {
                const stockStatus = getStockStatus(part);
                const totalValue = part.currentStock * part.unitCost;

                return (
                  <tr key={part.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{part.name}</div>
                        <div className="text-sm text-gray-500">{part.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {part.partNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {part.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {part.currentStock} / min {part.minStock}
                      </div>
                      <div className="text-sm text-gray-500">{part.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {part.unitCost.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {totalValue.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => openModal(part)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleEditPart(part)}
                        title="Modifier cette pièce"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détails */}
      {isModalOpen && selectedPart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Détails de la pièce
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
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Référence</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.partNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fournisseur</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.supplier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock actuel</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.currentStock} {selectedPart.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock minimum</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.minStock} {selectedPart.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix unitaire</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.unitCost.toLocaleString('fr-FR')} FCFA</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valeur totale</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {(selectedPart.currentStock * selectedPart.unitCost).toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>

              {selectedPart.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPart.description}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  onClick={() => selectedPart && handleEditPart(selectedPart)}
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire de pièce */}
      <PartForm
        isOpen={showPartForm}
        onClose={closePartForm}
        onSubmit={handleSubmitPart}
        part={editingPart || undefined}
      />
    </div>
  );
}
