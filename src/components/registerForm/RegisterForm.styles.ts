import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(104, 141, 125, 0.51)",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    ...(Platform.OS === "android"
      ? {
          borderWidth: 1,
          borderColor: "rgba(104, 141, 125, 0.51)", // псевдо-стеклянная рамка
        }
      : {}),
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: "#F6C944",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
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
  error: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 8,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  successMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    textAlign: "center",
    marginVertical: 20,
  },
});
