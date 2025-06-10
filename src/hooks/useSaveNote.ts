
import { useAuth } from '../context/authContext';
import { useNoteRefresh } from '../context/noteRefreshContext';
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

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const useSaveNote = () => {
  const { user } = useAuth();
  const { refreshNotes } = useNoteRefresh();

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
      refreshNotes();

      setIsSaved(true);
      timeoutId = setTimeout(() => {
        resetForm();
        setIsSaved(false);
      }, 2000);
    } catch (error) {
      console.error('🔥 ERROR in Firestore save:', error);
      setError(ua.savedError);
    }
  };

  return { saveNote, cancelNoteTimeout: () => timeoutId && clearTimeout(timeoutId)  };
};