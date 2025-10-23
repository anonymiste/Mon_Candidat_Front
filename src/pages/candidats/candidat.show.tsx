import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import type { Candidat } from '../../data/models/candidat.model';
import { candidatApi } from '../../api/candidats/candidatApi';
import Loader from '../../components/loadind/loader';
import Notification from '../../components/notification/notification';
import '../candidat.show.css';

export default function CandidatShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState<Candidat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidat = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await candidatApi.read(parseInt(id));
        setCandidat(data);
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
        setError('Impossible de charger les données du candidat');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidat();
  }, [id]);

  const handleDelete = async () => {
    if (!candidat || !window.confirm('Êtes-vous sûr de vouloir supprimer ce candidat ? Cette action est irréversible.')) {
      return;
    }

    try {
      await candidatApi.destroy(candidat.id);
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du candidat');
    }
  };

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !candidat) {
    return (
      <div className="candidat-show-container">
        <div className="error-state">
          <Notification message={error || "Candidat non trouvé"} />
          <Link to="/candidates" className="btn btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const goToBack = () => {
    navigate(-1);
  }

  return (
    <div className="candidat-show-container">
      <header className="show-header">
        <div className="header-actions">
          <button onClick={goToBack} className="btn btn-back">
            ← Retour
          </button>
          <div className="action-buttons">
            <Link 
              to={`/candidates/${candidat.id}/edit`} 
              className="btn btn-edit"
            >
              Modifier
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-delete"
            >
              Supprimer
            </button>
          </div>
        </div>
      </header>

      <div className="candidat-profile">
        <div className="profile-header">
          <div className="photo-section">
            {candidat.photo_path ? (
              <img 
                src={candidat.photo_path} 
                alt={`${candidat.prenom} ${candidat.nom}`}
                className="profile-photo"
              />
            ) : (
              <div className="profile-avatar">
                {getInitials(candidat.nom, candidat.prenom)}
              </div>
            )}
          </div>

          <div className="basic-info">
            <h1 className="profile-name">
              {candidat.prenom} {candidat.nom}
            </h1>
            <div className="profile-meta">
              <span className="nationalite-badge">
                {candidat.nationalite}
              </span>
              <span className="age-info">
                {candidat.age} ans
              </span>
            </div>
            {candidat.short_description && (
              <p className="profile-tagline">
                {candidat.short_description}
              </p>
            )}
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-card">
            <h3 className="detail-title">📏 Caractéristiques Physiques</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Taille</span>
                <span className="detail-value">{candidat.taille} cm</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Poids</span>
                <span className="detail-value">{candidat.poids} kg</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Âge</span>
                <span className="detail-value">{candidat.age} ans</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3 className="detail-title">👤 Informations Personnelles</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Nom</span>
                <span className="detail-value">{candidat.nom}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Prénom</span>
                <span className="detail-value">{candidat.prenom}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nationalité</span>
                <span className="detail-value">{candidat.nationalite}</span>
              </div>
            </div>
          </div>

          {candidat.full_description && (
            <div className="detail-card full-width">
              <h3 className="detail-title">📝 Description Complète</h3>
              <div className="description-content">
                <p>{candidat.full_description}</p>
              </div>
            </div>
          )}

          <div className="detail-card">
            <h3 className="detail-title">📊 Métadonnées</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ID</span>
                <span className="detail-value">#{candidat.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Créé le</span>
                <span className="detail-value">{formatDate(candidat.created_at)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Modifié le</span>
                <span className="detail-value">{formatDate(candidat.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}