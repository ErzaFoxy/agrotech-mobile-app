import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#688D7D',
    zIndex: 999,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flowerWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20.5,
    marginTop: -18,
  },
  leaves: {
    position: 'absolute',
    bottom: '44%',
    alignSelf: 'center',
  },
});
