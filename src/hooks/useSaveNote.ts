
import { useAuth } from '../context/authContext';
import { saveNoteToFirestore } from '../services/notes';
import { formCultureUA as ua } from '../translations';

interface Params {
  culture: string;
  region: string;
  inputValue: string;
  result: number;
  mode: 'area' | 'culture';
  resetForm: () => void;
  setError: (text: string) => void;
  setIsSaved: (value: boolean) => void;
  openAuthModal: () => void;
}

export const useSaveNote = () => {
  const { user } = useAuth();

  const saveNote = async ({
    culture,
    region,
    inputValue,
    result,
    mode,
    resetForm,
    setError,
    setIsSaved,
    openAuthModal
  }: Params) => {
    if (!user) {
      console.log('🔒 Not authorized');
      openAuthModal();
      return;
    }

    try {
      await saveNoteToFirestore({
        culture,
        region,
        inputValue,
        result,
        mode,
        userId: user.uid,
      });

      setIsSaved(true);
      setTimeout(() => {
        resetForm();
        setIsSaved(false);
      }, 3000);
    } catch (error) {
      console.error('🔥 ERROR in Firestore save:', error);
      setError(ua.savedError);
    }
  };

  return { saveNote };
};