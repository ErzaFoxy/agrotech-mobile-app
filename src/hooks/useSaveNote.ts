
import { useAuth } from '../context/authContext';
import { saveNoteToFirestore } from '../services/notes';
import { formCultureUA as ua } from '../translations';
import { useNavigation } from '../navigation/hooks';

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

  const navigation = useNavigation();

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

      setIsSaved(true);
      timeoutId = setTimeout(() => {
        resetForm();
        setIsSaved(false);
        navigation.navigate('Profile');
      }, 3000);
    } catch (error) {
      console.error('🔥 ERROR in Firestore save:', error);
      setError(ua.savedError);
    }
  };

  return { saveNote, cancelNoteTimeout: () => timeoutId && clearTimeout(timeoutId)  };
};