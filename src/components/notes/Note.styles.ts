import { StyleSheet, Platform, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  // --- СТИЛИ КАРТОЧКИ (NoteCard) ---
  card: {
    backgroundColor: "rgba(104, 141, 125, 0.51)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  dateText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 15,
  },
  lineText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 4,
  },
  highlight: {
    color: "#FFDC00",
    fontWeight: 300
  },
  resultText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 15,
  },

  // --- СТИЛИ СПИСКА (NoteList) ---
  wrapper: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 0,
    paddingBottom: 20,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loginPrompt: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    width: '40%',
    backgroundColor: "#E6CE38",
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
