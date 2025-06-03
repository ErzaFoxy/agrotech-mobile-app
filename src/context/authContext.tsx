
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '../services/firebaseConfig';

// Создаём тип данных для контекста аутентификации
const AuthContext = createContext<{
  user: User | null;     // Текущий пользователь (null, если не вошёл)
  loading: boolean;      // Показывает, идёт ли проверка статуса пользователя
}>({ user: null, loading: true });

// Провайдер, который оборачивает всё приложение и следит за авторизацией
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);    // Храним текущего пользователя
  const [loading, setLoading] = useState(true);           // Показываем лоадер, пока идёт проверка

  useEffect(() => {
    // Слушаем изменения авторизации от Firebase (автоматически вызывается при входе/выходе)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    // Отписываемся при размонтировании компонента (чтобы не было утечек памяти)
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук, чтобы легко получать доступ к текущему пользователю и статусу загрузки
export const useAuth = () => useContext(AuthContext);