import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserNotes, Note } from '../../services/notes';
import { NoteCard } from './NoteCard';
import { useAuth } from '../../context/authContext';
import { useNavigation } from '../../navigation/hooks';
import { formCultureUA as ua } from '../../translations';
import { styles } from './Note.styles';
import SvgNoteIcon from '../../../assets/note-icon.svg';
import { useNoteRefresh } from '../../context/noteRefreshContext';


export const NoteList: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const navigation = useNavigation();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { subscribe } = useNoteRefresh();

    const fetchNotes = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userNotes = await getUserNotes(user.uid);
            setNotes(userNotes);
            setError(false);
        } catch (err) {
            console.error('🔥 Error loading notes:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;
        fetchNotes();
        return subscribe(fetchNotes); // отписка при размонтировании
    }, [user]);

    const isAnyLoading = authLoading || loading;

    if (isAnyLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F6C200" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loginPrompt}>{ua.loginPromptTxt}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>{ua.loginBtn}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loginPrompt}>{ua.errorNotesTxt}</Text>
                <TouchableOpacity style={styles.button} onPress={fetchNotes}>
                    <Text style={styles.buttonText}>{ua.retryBtn}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <SvgNoteIcon width={50} height={50} style={styles.icon} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator
                persistentScrollbar
                scrollEnabled
            >
                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};