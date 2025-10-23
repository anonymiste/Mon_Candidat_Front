import type { Candidat } from "../../data/models/candidat.model";
import './card.css';

interface CardProps {
  candidat: Candidat;
  onEdit: (id: number) => void;
  onRead: (id: number) => void;
}

export default function Card({ candidat, onEdit, onRead: onRead }: CardProps) {
  const getInitials = (nom: string, prenom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  };

  const getAge = (age: number) => {
    return `${age} ans`;
  };

  const formatDescription = (description: string, maxLength: number = 80) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="candidat-card">
      <div className="card-header">
        {candidat.photo_path ? (
          <img 
            src={`http://127.0.0.1:8000/storage/${candidat.photo_path}`} 
            alt={`${candidat.prenom} ${candidat.nom}`}
            className="card-photo"
          />
        ) : (
          <div className="card-avatar">
            {getInitials(candidat.nom, candidat.prenom)}
          </div>
        )}
        
        <div className="card-basic-info">
          <h3 className="card-name">{candidat.prenom} {candidat.nom}</h3>
          <span className="card-nationalite">{candidat.nationalite}</span>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-row">
          <span className="detail-label">Âge:</span>
          <span className="detail-value">{getAge(candidat.age)}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Taille:</span>
          <span className="detail-value">{candidat.taille}cm</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Poids:</span>
          <span className="detail-value">{candidat.poids}kg</span>
        </div>
      </div>

      {candidat.short_description && (
        <div className="card-description">
          <p>{formatDescription(candidat.short_description)}</p>
        </div>
      )}

      <div className="card-actions">
        <button 
          onClick={() => onEdit(candidat.id)}
          className="btn-action btn-edit"
          title="Modifier"
        >
        Modifier
        </button>
        <button 
          onClick={() => onRead(candidat.id)}
          className="btn-action btn-read"
          title="Supprimer"
        >
        Details
        </button>
      </div>
    </div>
  );
}