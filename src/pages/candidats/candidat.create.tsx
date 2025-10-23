import { useState } from "react";
import type { CandidatSubmitData } from "../../data/models/candidat.model";
import CandidatForm from "../../components/form/form";
import { useNavigate } from "react-router";
import { candidatApi } from "../../api/candidats/candidatApi";
import Notification from "../../components/notification/notification";

function CandidatCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (submitData: CandidatSubmitData) => {
    setIsLoading(true);
    
    try {
      const hasPhotoFile = submitData.photo && submitData.photo instanceof File;
      
      if (hasPhotoFile) {
        const formData = new FormData();
        
        formData.append('nom', submitData.nom || '');
        formData.append('prenom', submitData.prenom || '');
        formData.append('nationalite', submitData.nationalite || '');
        formData.append('age', (submitData.age || 0).toString());
        formData.append('poids', (submitData.poids || 0).toString());
        formData.append('taille', (submitData.taille || 0).toString());
        formData.append('short_description', submitData.short_description || '');
        formData.append('full_description', submitData.full_description || '');
        formData.append('photo_path', submitData.photo || '');
        
        if (submitData.photo) {
          formData.append('photo', submitData.photo);
        }

        await candidatApi.create(formData);
      } else {
        await candidatApi.create(submitData);
      }

      setNotification({
        message: 'Candidat créé avec succès!',
        type: 'success'
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error: any) {
      console.error('Erreur:', error);
      
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        let errorMessage = 'Erreurs de validation :\n';
        
        Object.entries(validationErrors).forEach(([field, messages]) => {
          errorMessage += `• ${field}: ${(messages as string[]).join(', ')}\n`;
        });
        
        setNotification({
          message: errorMessage,
          type: 'error'
        });
      } else {
        setNotification({
          message: error.response?.data?.message || 'Erreur lors de la création du candidat',
          type: 'error'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Les modifications seront perdues.')) {
      navigate(-1);
    }
  };

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className="app candidat-show-container">
      {notification && (
        <Notification 
          message={notification.message} 
        />
      )}
      <header className="show-header">
        <div className="header-actions">
          <button onClick={goToBack} className="btn btn-back">
            ← Retour
          </button>  
        </div>
      </header>
      
      <CandidatForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CandidatCreate;