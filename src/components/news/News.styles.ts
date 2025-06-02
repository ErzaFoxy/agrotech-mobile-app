import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  // --- СТИЛИ КАРТОЧКИ (NoteCard) ---
  card: {
    backgroundColor: "rgba(104, 141, 125, 0.51)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    ...(Platform.OS === "android"
      ? {
          borderWidth: 1,
          borderColor: "rgba(104, 141, 125, 0.51)",
        }
      : {}),
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 15,
    color: "#ffffffaa",
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "700",
    color: "#fff",
    marginTop: 15,
    marginBottom: 25,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },

  // --- СТИЛИ СПИСКА ---
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "transparent",
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: '7%',
  },
  scrollContent: {
    paddingBottom: 32,
  },
});
