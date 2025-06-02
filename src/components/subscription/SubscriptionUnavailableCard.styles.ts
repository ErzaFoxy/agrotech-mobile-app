import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    paddingBottom: 30,
    width: "100%",
    marginBottom: 24,
    position: "relative",
    backgroundColor: "rgba(104, 141, 125, 0.51)",
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
  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 20,
    bottom: 15,
  },
  button: {
    backgroundColor: "#E6CE38",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
