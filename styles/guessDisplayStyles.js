import { StyleSheet } from 'react-native'

export const guessDisplayStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  guessBox: {
    borderWidth: 4,
    borderColor: '#4ECDC4',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: '#F0FFFE',
    shadowColor: '#4ECDC4',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
    minWidth: 200,
  },
  guessNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: '#4ECDC4',
    textAlign: 'center',
    letterSpacing: 2,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pulseRing: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
  },
})
