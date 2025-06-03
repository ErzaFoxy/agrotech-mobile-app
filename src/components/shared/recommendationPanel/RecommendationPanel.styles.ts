import { StyleSheet, Platform, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const iconSize = screenWidth * 0.155;

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
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    height: iconSize,
    width: iconSize,
  },
});
