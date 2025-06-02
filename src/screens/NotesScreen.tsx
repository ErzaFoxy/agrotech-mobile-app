import React from "react";
import { View } from "react-native";

import { NoteList } from "../components/notes/NoteList";

export const NotesScreen = () => {

    return (
         <View style={{flex: 1}}>
            <NoteList/>
        </View>
    )

}
