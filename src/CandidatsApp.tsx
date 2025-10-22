// CandidatsApp.tsx
import { useState } from 'react';
import CandidatsList from './CandidatsList'; // Import des sous-composants
import CandidatForm from './CandidatForm';
import CandidatDetails from './CandidatDetails';
import { Users, Plus, X } from 'lucide-react';
import type { Candidat } from './type';


type View = 'list' | 'create' | 'edit' | 'show';
type CandidatData = Omit<Candidat, 'id'>;

export default function CandidatsApp() {
  const [view, setView] = useState<View>('list');
  const [candidats, setCandidats] = useState<Candidat[]>();
  const [selectedCandidat, setSelectedCandidat] = useState<Candidat | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Logique de filtrage
  const filteredCandidats = candidats!.filter(c =>
    c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nationalite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logique de création
  const handleCreate = (newCandidatData: CandidatData) => {
    const candidat = {
      ...newCandidatData,
      id: Math.max(...candidats!.map(c => c.id!), 0) + 1 // Génération d'ID simple
    };
    setCandidats([...candidats!, candidat]);
    setView('list');
  };

  // Logique de modification
  const handleUpdate = (updatedCandidat: Candidat) => {
    setCandidats(candidats!.map(c =>
      c.id === updatedCandidat.id ? updatedCandidat : c
    ));
    setView('list');
  };

  // Logique de suppression
  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce candidat ?')) {
      setCandidats(candidats!.filter(c => c.id !== id));
      // S'assurer qu'après suppression on revient à la liste
      if (selectedCandidat?.id === id) {
        setSelectedCandidat(null);
        setView('list');
      }
    }
  };

  // Affichage du composant principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* En-tête de l'application */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Gestion des Candidats
              </h1>
            </div>
            
            {/* Bouton d'action dynamique (Créer ou Retour) */}
            {view === 'list' ? (
              <button
                onClick={() => setView('create')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nouveau Candidat
              </button>
            ) : (
              <button
                onClick={() => setView('list')}
                className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
                Retour
              </button>
            )}
          </div>
        </div>

        {/* Rendu conditionnel des vues */}
        {view === 'list' && (
          <CandidatsList
            candidats={filteredCandidats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onView={(c) => { setSelectedCandidat(c); setView('show'); }}
            onEdit={(c) => { setSelectedCandidat(c); setView('edit'); }}
            onDelete={handleDelete}
          />
        )}
        
        {view === 'create' && (
          <CandidatForm
            onSubmit={handleCreate}
            onCancel={() => setView('list')}
          />
        )}
        
        {view === 'edit' && selectedCandidat && (
          <CandidatForm
            candidat={selectedCandidat}
            onSubmit={handleUpdate}
            onCancel={() => setView('list')}
          />
        )}
        
        {view === 'show' && selectedCandidat && (
          <CandidatDetails
            candidat={selectedCandidat}
            onEdit={() => { setView('edit'); }}
            onDelete={() => { handleDelete(selectedCandidat.id!); setView('list'); }}
          />
        )}
      </div>
    </div>
  );
}