import React, { createContext, useContext, useCallback, useState } from 'react';

interface NoteRefreshContextType {
  // Метод, который можно вызвать, чтобы "оповестить" всех подписчиков на обновление
  refreshNotes: () => void;

  // Метод для подписки на эти обновления
  subscribe: (callback: () => void) => void;
}

// Создаём сам контекст. Изначально null, потому что создаётся вне провайдера
const NoteRefreshContext = createContext<NoteRefreshContextType | null>(null);

// Провайдер, который будет оборачивать всё приложение
export const NoteRefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Храним список всех подписчиков (компоненты, которые хотят перезапрашивать записи)
  const [callbacks, setCallbacks] = useState<(() => void)[]>([]);

  // Метод, который запускает ВСЕ подписанные коллбэки (обновляет все связанные компоненты)
  const refreshNotes = useCallback(() => {
    callbacks.forEach((cb) => cb()); // вызываем все коллбэки
  }, [callbacks]);

  // Метод для подписки: добавляет новый callback в список
  const subscribe = useCallback((callback: () => void) => {
    setCallbacks((prev) => [...prev, callback]);
    
    // Возвращаем функцию отписки
    return () => {
      setCallbacks((prev) => prev.filter((cb) => cb !== callback));
    };
  }, []);

  return (
    <NoteRefreshContext.Provider value={{ refreshNotes, subscribe }}>
      {children}
    </NoteRefreshContext.Provider>
  );
};

// Хук для использования контекста в любом компоненте
export const useNoteRefresh = (): NoteRefreshContextType => {
  const ctx = useContext(NoteRefreshContext);
  if (!ctx) throw new Error('useNoteRefresh must be used within NoteRefreshProvider');
  return ctx;
};