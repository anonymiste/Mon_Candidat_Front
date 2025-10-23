export type Candidat = {
    id: number;
    nom: string;
    prenom: string;
    nationalite: string;
    age: number;
    poids: number; 
    taille: number; 
    short_description: string;
    full_description: string;
    photo_path: string;
    created_at: Date;
    updated_at: Date;
}

export type CandidatFormData = {
    nom: string;
    prenom: string;
    nationalite: string;
    age: number;
    poids: number; 
    taille: number; 
    short_description: string;
    full_description: string;
    photo_path: string;
}

export type CandidatSubmitData = Omit<CandidatFormData, 'photo_path'> & {
  photo?: File; 
  photo_path?: string; 
};