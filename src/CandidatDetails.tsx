// CandidatDetails.tsx
import { Edit, Trash2 } from 'lucide-react';
import type { Candidat } from './type';

interface CandidatDetailsProps {
  candidat: Candidat;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CandidatDetails({
  candidat,
  onEdit,
  onDelete,
}: CandidatDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Photo et infos rapides */}
        <div className="h-96 md:h-auto bg-gray-200">
          <img
            src={candidat.photo_path}
            alt={`${candidat.prenom} ${candidat.nom}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {candidat.prenom} {candidat.nom}
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Nationalité:</span>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded">
                {candidat.nationalite}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Âge:</span>
              <span className="text-gray-600">{candidat.age} ans</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Taille:</span>
              <span className="text-gray-600">{candidat.taille} cm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Poids:</span>
              <span className="text-gray-600">{candidat.poids} kg</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Résumé</h3>
            <p className="text-gray-600 italic">{candidat.short_description}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Modifier
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Description complète */}
      <div className="p-8 bg-gray-50">
        <h3 className="font-semibold text-gray-800 text-xl mb-4">
          Biographie complète
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {candidat.full_description}
        </p>
      </div>
    </div>
  );
}