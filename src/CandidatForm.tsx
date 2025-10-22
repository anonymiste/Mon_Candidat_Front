// CandidatForm.tsx
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Candidat } from './type';

type CandidatData = Omit<Candidat, 'id'>;

interface CandidatFormProps {
  candidat?: Candidat; // Optionnel pour la création
  onSubmit: (data: Candidat | CandidatData) => void;
  onCancel: () => void;
}

export default function CandidatForm({
  candidat,
  onSubmit,
  onCancel,
}: CandidatFormProps) {
  const [formData, setFormData] = useState<CandidatData>({
    nom: candidat?.nom || '',
    prenom: candidat?.prenom || '',
    nationalite: candidat?.nationalite || '',
    age: candidat?.age || 18,
    poids: candidat?.poids || 60,
    taille: candidat?.taille || 170,
    short_description: candidat?.short_description || '',
    full_description: candidat?.full_description || '',
    photo_path: candidat?.photo_path || 'https://i.pravatar.cc/300',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.nationalite || !formData.short_description || !formData.full_description) {
      alert('Veuillez remplir tous les champs marqués d\'une étoile (*)');
      return;
    }
    // Si c'est une modification, on inclut l'ID
    onSubmit(candidat ? { ...formData, id: candidat.id } : formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {candidat ? 'Modifier le candidat' : 'Nouveau candidat'}
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
              Prénom *
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
              Nom *
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Nationalité */}
          <div>
            <label htmlFor="nationalite" className="block text-sm font-medium text-gray-700 mb-2">
              Nationalité *
            </label>
            <input
              id="nationalite"
              name="nationalite"
              type="text"
              value={formData.nationalite}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Âge */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Âge *
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              min="18"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Poids */}
          <div>
            <label htmlFor="poids" className="block text-sm font-medium text-gray-700 mb-2">
              Poids (kg)
            </label>
            <input
              id="poids"
              name="poids"
              type="number"
              value={formData.poids}
              onChange={handleChange}
              min="30"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Taille */}
          <div>
            <label htmlFor="taille" className="block text-sm font-medium text-gray-700 mb-2">
              Taille (cm)
            </label>
            <input
              id="taille"
              name="taille"
              type="number"
              value={formData.taille}
              onChange={handleChange}
              min="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* URL Photo */}
        <div>
          <label htmlFor="photo_path" className="block text-sm font-medium text-gray-700 mb-2">
            URL Photo de profil
          </label>
          <input
            id="photo_path"
            name="photo_path"
            type="url"
            value={formData.photo_path}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Description courte */}
        <div>
          <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
            Description courte *
          </label>
          <input
            id="short_description"
            name="short_description"
            type="text"
            value={formData.short_description}
            onChange={handleChange}
            maxLength={100}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.short_description.length}/100 caractères
          </p>
        </div>

        {/* Description complète */}
        <div>
          <label htmlFor="full_description" className="block text-sm font-medium text-gray-700 mb-2">
            Description complète *
          </label>
          <textarea
            id="full_description"
            name="full_description"
            value={formData.full_description}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            {candidat ? 'Mettre à jour' : 'Créer'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}