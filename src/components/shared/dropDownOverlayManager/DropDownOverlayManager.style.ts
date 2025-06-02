import { StyleSheet, Platform } from "react-native";

const common = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1,
  },
});

const defaultStyles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    backgroundColor: "#B8D088F2",
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === "ios" ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 6 : 0,
    zIndex: 9999,
    alignSelf: "flex-start",
    paddingVertical: 9,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
  selectedItemText: {
    color: "#f6c200",
  },
});

const menuStyles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    backgroundColor: "#B8D088",
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === "ios" ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === "android" ? 6 : 0,
    zIndex: 9999,
    alignSelf: "flex-start",
    paddingVertical: 9,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
    textShadowColor: "#0000004A",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  selectedItemText: {
    color: "#FFD86B",
  },
});

export const getDropdownStyles = (variant: "default" | "menu" = "default") => {
  return variant === "menu" ? menuStyles : defaultStyles;
};

export const baseStyles = common;
