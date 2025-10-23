import React, { useState, useEffect } from 'react';
import type { CandidatFormData, CandidatSubmitData } from '../../data/models/candidat.model';
import './form.css';



interface CandidatFormProps {
  candidat?: CandidatFormData | null;
  onSubmit: (data: CandidatSubmitData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const CandidatForm: React.FC<CandidatFormProps> = ({ 
  candidat, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<CandidatFormData>({
    nom: '',
    prenom: '',
    nationalite: '',
    age: 18,
    poids: 60,
    taille: 170,
    short_description: '',
    full_description: '',
    photo_path: ''
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof CandidatFormData, string>>>({});

  useEffect(() => {
    if (candidat) {
      setFormData(candidat);
      if (candidat.photo_path) {
        setPhotoPreview(`http://127.0.0.1:8000/storage/${candidat.photo_path}`);
      }
    }
  }, [candidat]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'poids' || name === 'taille' 
        ? (value === '' ? 0 : Number(value)) 
        : value
    }));

    if (errors[name as keyof CandidatFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo_path: 'Veuillez sélectionner un fichier image'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo_path: 'L\'image ne doit pas dépasser 5MB'
        }));
        return;
      }

      setPhotoFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (errors.photo_path) {
        setErrors(prev => ({
          ...prev,
          photo_path: undefined
        }));
      }
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    if (!candidat?.photo_path) {
      setFormData(prev => ({ ...prev, photo_path: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CandidatFormData, string>> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }

    if (!formData.nationalite.trim()) {
      newErrors.nationalite = 'La nationalité est obligatoire';
    }

    if (formData.age < 16 || formData.age > 100) {
      newErrors.age = 'L\'âge doit être entre 16 et 100 ans';
    }

    if (formData.poids < 30 || formData.poids > 200) {
      newErrors.poids = 'Le poids doit être entre 30kg et 200kg';
    }

    if (formData.taille < 100 || formData.taille > 250) {
      newErrors.taille = 'La taille doit être entre 100cm et 250cm';
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = 'La description courte est obligatoire';
    } else if (formData.short_description.length > 200) {
      newErrors.short_description = 'La description courte ne doit pas dépasser 200 caractères';
    }

    if (!formData.full_description.trim()) {
      newErrors.full_description = 'La description complète est obligatoire';
    }

    if (!candidat && !photoFile) {
      newErrors.photo_path = 'La photo est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData: CandidatSubmitData = {
        nom: formData.nom,
        prenom: formData.prenom,
        nationalite: formData.nationalite,
        age: formData.age,
        poids: formData.poids,
        taille: formData.taille,
        short_description: formData.short_description,
        full_description: formData.full_description,
      };

      if (photoFile) {
        submitData.photo = photoFile;
      } else if (candidat?.photo_path) {
        submitData.photo_path = candidat.photo_path;
      }

      onSubmit(submitData);
    }
  };

  return (
    <div className="candidat-form">
      <h2 className="form-title">
        {candidat ? 'Modifier le candidat' : 'Créer un nouveau candidat'}
      </h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <h3 className="section-title">Informations Personnelles</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom" className="form-label">
                Nom *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`form-input ${errors.nom ? 'error' : ''}`}
                placeholder="Entrez le nom"
              />
              {errors.nom && <span className="error-message">{errors.nom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="prenom" className="form-label">
                Prénom *
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`form-input ${errors.prenom ? 'error' : ''}`}
                placeholder="Entrez le prénom"
              />
              {errors.prenom && <span className="error-message">{errors.prenom}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nationalite" className="form-label">
                Nationalité *
              </label>
              <input
                type="text"
                id="nationalite"
                name="nationalite"
                value={formData.nationalite}
                onChange={handleChange}
                className={`form-input ${errors.nationalite ? 'error' : ''}`}
                placeholder="Entrez la nationalité"
              />
              {errors.nationalite && (
                <span className="error-message">{errors.nationalite}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Âge *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="16"
                max="100"
                className={`form-input ${errors.age ? 'error' : ''}`}
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Caractéristiques Physiques</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="poids" className="form-label">
                Poids (kg) *
              </label>
              <input
                type="number"
                id="poids"
                name="poids"
                value={formData.poids}
                onChange={handleChange}
                min="30"
                max="200"
                step="0.1"
                className={`form-input ${errors.poids ? 'error' : ''}`}
              />
              {errors.poids && <span className="error-message">{errors.poids}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="taille" className="form-label">
                Taille (cm) *
              </label>
              <input
                type="number"
                id="taille"
                name="taille"
                value={formData.taille}
                onChange={handleChange}
                min="100"
                max="250"
                className={`form-input ${errors.taille ? 'error' : ''}`}
              />
              {errors.taille && <span className="error-message">{errors.taille}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Photo</h3>
          
          <div className="form-group">
            <label htmlFor="photo" className="form-label">
              Photo du candidat {!candidat && '*'}
            </label>
            
            {(photoPreview || `http://127.0.0.1:8000/storage/${candidat?.photo_path}`) && (
              <div className="photo-preview-container">
                <img 
                  src={photoPreview || `http://127.0.0.1:8000/storage/${candidat?.photo_path}` || ''} 
                  alt="Preview" 
                  className="photo-preview"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="btn-remove-photo"
                >
                  × Supprimer
                </button>
              </div>
            )}

            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className={`form-input-file ${errors.photo_path ? 'error' : ''}`}
            />
            <div className="file-hint">
              Formats acceptés: JPG, PNG, GIF • Max: 5MB
            </div>
            {errors.photo_path && (
              <span className="error-message">{errors.photo_path}</span>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Descriptions</h3>
          
          <div className="form-group">
            <label htmlFor="short_description" className="form-label">
              Description courte *
              <span className="char-count">
                {formData.short_description}
              </span>
            </label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              className={`form-textarea ${errors.short_description ? 'error' : ''}`}
              placeholder="Description concise (max 200 caractères)"
            />
            {errors.short_description && (
              <span className="error-message">{errors.short_description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="full_description" className="form-label">
              Description complète *
            </label>
            <textarea
              id="full_description"
              name="full_description"
              value={formData.full_description}
              onChange={handleChange}
              rows={6}
              className={`form-textarea ${errors.full_description ? 'error' : ''}`}
              placeholder="Description détaillée du candidat"
            />
            {errors.full_description && (
              <span className="error-message">{errors.full_description}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Enregistrement...' : (candidat ? 'Mettre à jour' : 'Créer le candidat')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidatForm;