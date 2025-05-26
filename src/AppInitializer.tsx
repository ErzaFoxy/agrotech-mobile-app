import React, { useEffect } from 'react';
import { useGlobalLoader } from './context/globalLoaderContext';

export const AppInitializer: React.FC<{ onReady: () => void }> = ({ onReady }) => {
    const { startTransition } = useGlobalLoader();

    useEffect(() => {
        startTransition();
        const timeout = setTimeout(() => {
            onReady();
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return null;
};