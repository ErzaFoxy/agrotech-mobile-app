import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 15,
    marginTop: 'auto',
  },
  title: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 12,
  },
  iconWrapper: {
    marginRight: '3%',
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    height: 60,
  },
});
