import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  mapContainer: {
    width: "85%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 15,
    marginTop: '6%',
  },
  map: {
    flex: 1,
  },
  infoBox: {
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    width: "90%",
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
  city: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
  textError: {
    color: "#fff",
    fontSize: 15,
    marginVertical: 7,
    textAlign: 'center'
  },
});
