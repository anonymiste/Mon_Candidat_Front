import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import Loader from "../../components/loadind/loader";
import { Link, useNavigate } from "react-router";
import type { Candidat } from "../../data/models/candidat.model";
import { candidatApi } from "../../api/candidats/candidatApi";
import Notification from "../../components/notification/notification";
import '../candidat.liste.css';

export default function CandidatListe() {
  const [candidats, setCandidats] = useState<Array<Candidat>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getAllCandidats = async () => {
    try {
      const data = await candidatApi.getAll();
      setCandidats(data);
    } catch (error) {
      console.log(`error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowCandidat = async (candidatId: number) => {

    try {
      setIsLoading(true);
      navigate(`/candidates/${candidatId}/show`);
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      alert('Erreur lors de la récupération du candidat');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCandidat = async (candidatId: number) => {
    navigate(`/candidates/${candidatId}/edit`);
  };

  useEffect(() => {
    getAllCandidats();
  }, []);

  return (
    <div className="candidat-liste-container">
      <header className="liste-header">
        <h1>Liste des Candidats</h1>
        <Link to="/candidates/create" className="btn-create">
          + Nouveau Candidat
        </Link>
      </header>

      {isLoading ? (
        <Loader />
      ) : candidats.length === 0 ? (
        <div className="empty-state">
          <Notification message="Aucun candidat trouvé" />
          <Link to="/candidates/create" className="btn-create-empty">
            Créer le premier candidat
          </Link>
        </div>
      ) : (
        <div className="candidats-grid">
          {candidats.map((candidat) => (
            <Card 
              key={candidat.id} 
              candidat={candidat}
              onEdit={handleEditCandidat}
              onRead={handleShowCandidat}
            />
          ))}
        </div>
      )}
    </div>
  );
}