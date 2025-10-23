import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { CandidatFormData, CandidatSubmitData } from '../../data/models/candidat.model';
import { candidatApi } from '../../api/candidats/candidatApi';
import CandidatForm from '../../components/form/form';
import Loader from '../../components/loadind/loader';
import Notification from '../../components/notification/notification';
import '../candidat.show.css';

const CandidatEdit: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState<CandidatFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const getCandidat = async () => {
      setIsLoading(true);
      try {
        setError(null);
        if (params.id) {
          const data = await candidatApi.read(parseInt(params.id));
          setCandidat(data);
        }
      } catch (err) {
        console.error('Erreur lors du chargement:', err);
        setError('Impossible de charger les données du candidat');
      } finally {
        setIsLoading(false);
      }
    };

    getCandidat();
  }, [params.id]);

  const handleSubmit = async (submitData: CandidatSubmitData) => {
    try {
      setIsSubmitting(true);
      
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
        formData.append('photo_path', submitData.photo_path || '');

        
        if (submitData.photo) {
          formData.append('photo', submitData.photo);
        }

        let response;
        if (params.id) {
          response = await candidatApi.update(parseInt(params.id), formData);
        } else {
          response = await candidatApi.create(formData);
        }

        console.log('Candidat sauvegardé avec fichier:', response);
      } else {
        let response;
        if (params.id) {
          response = await candidatApi.update(parseInt(params.id), submitData);
        } else {
          response = await candidatApi.create(submitData);
        }

        console.log('Candidat sauvegardé sans fichier:', response);
      }
      
      setNotification({
        message: params.id 
          ? 'Candidat mis à jour avec succès!' 
          : 'Candidat créé avec succès!',
        type: 'success'
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err: any) {
      console.error('Erreur:', err);
      
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
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
          message: err.response?.data?.message || 'Erreur lors de la sauvegarde du candidat',
          type: 'error'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Les modifications non sauvegardées seront perdues. Continuer ?')) {
      navigate('/candidates');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const goToBack = () => {
    navigate(-1);
  }

  return (
    <div className="candidat-edit-page candidat-show-container">
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
        candidat={candidat}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CandidatEdit;