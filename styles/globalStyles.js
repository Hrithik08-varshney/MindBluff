import { StyleSheet } from 'react-native';

// Color Palette
export const colors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#ec4899',
  accent: '#f59e0b',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f97316',
  
  // Grays
  white: '#ffffff',
  lightGray: '#f3f4f6',
  gray: '#d1d5db',
  darkGray: '#6b7280',
  charcoal: '#1f2937',
  black: '#000000',
  
  // Semi-transparent
  overlay: 'rgba(0, 0, 0, 0.7)',
};

// Typography
export const typography = {
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
    color: colors.charcoal,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    color: colors.charcoal,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: colors.darkGray,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.charcoal,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.darkGray,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.charcoal,
  },
  small: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.darkGray,
  },
  smallBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.charcoal,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  full: 50,
};

// Global Styles
export const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Spacing & Layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text Styles
  heroTitle: typography.heroTitle,
  title: typography.title,
  subtitle: typography.subtitle,
  heading: typography.heading,
  body: typography.body,
  bodyBold: typography.bodyBold,
  small: typography.small,
  smallBold: typography.smallBold,

  // Common Patterns
  marginSmall: { marginVertical: spacing.sm },
  marginMedium: { marginVertical: spacing.md },
  marginLarge: { marginVertical: spacing.lg },
  
  paddingSmall: { padding: spacing.sm },
  paddingMedium: { padding: spacing.md },
  paddingLarge: { padding: spacing.lg },

  // Shadow
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  
  shadowMedium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
});

// Component-specific Styles
export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    ...globalStyles.shadow,
  },
  
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  
  primaryButtonPressed: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 0.97 }],
  },
  
  secondaryButton: {
    backgroundColor: colors.lightGray,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    minHeight: 50,
  },
  
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  
  dangerButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
    ...globalStyles.shadow,
  },
  
  dangerButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});

export const inputStyles = StyleSheet.create({
  inputContainer: {
    marginVertical: spacing.md,
  },
  
  input: {
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 18,
    color: colors.charcoal,
    backgroundColor: colors.white,
    minHeight: 55,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  
  inputError: {
    borderColor: colors.danger,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  
  errorText: {
    fontSize: 14,
    color: colors.danger,
    marginTop: spacing.sm,
    fontWeight: '500',
  },
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...globalStyles.shadowMedium,
  },
  
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.charcoal,
  },
  
  cardContent: {
    minHeight: 100,
    justifyContent: 'center',
  },
});
