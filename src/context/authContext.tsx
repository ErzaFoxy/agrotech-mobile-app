
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirebaseAuth } from '../services/auth';
import { onAuthStateChanged, User } from 'firebase/auth';

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({ user: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    // Подписка на изменения авторизации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // При размонтировании — отписываемся
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);