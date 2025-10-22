// CandidatsList.tsx
import { Search, Eye, Edit, Trash2, Users } from 'lucide-react';
import type { Candidat } from './type';

interface CandidatsListProps {
  candidats: Candidat[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onView: (candidat: Candidat) => void;
  onEdit: (candidat: Candidat) => void;
  onDelete: (id: number) => void;
}

export default function CandidatsList({
  candidats,
  searchTerm,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
}: CandidatsListProps) {
  return (
    <div>
      {/* Barre de recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un candidat (Nom, Prénom, Nationalité)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grille de candidats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidats.map((candidat) => (
          <div
            key={candidat.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-64 overflow-hidden bg-gray-200">
              <img
                src={candidat.photo_path}
                alt={`${candidat.prenom} ${candidat.nom}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {candidat.prenom} {candidat.nom}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                  {candidat.nationalite}
                </span>
                <span>{candidat.age} ans</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {candidat.short_description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onView(candidat)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir
                </button>
                <button
                  onClick={() => onEdit(candidat)}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(candidat.id!)}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun candidat n'est trouvé */}
      {candidats.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucun candidat trouvé</p>
        </div>
      )}
    </div>
  );
}