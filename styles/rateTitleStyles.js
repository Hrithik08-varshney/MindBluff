import { StyleSheet } from 'react-native'

export const rateTitleStyles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  titleWrapper: {
    borderWidth: 3,
    borderColor: '#FF6B6B',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFF5F5',
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B6B',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  glowBorder: {
    borderWidth: 2,
    borderColor: '#FFD93D',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
    fontSize: 24,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
})
