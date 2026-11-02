// UniHealth Mobile App — UI/UX Pro Max Healthcare Design System Tokens
// Clinical Teal Palette, Figtree/Noto Sans Rhythm, Accessible Radii and Shadows

export const COLORS = {
  primary: '#0891B2',
  primaryDark: '#0E7490',
  primaryLight: '#22D3EE',
  primaryTint: '#ECFEFF',
  primaryBorder: '#CFFAFE',

  teal50: '#F0FDFA',
  teal100: '#CCFBF1',
  teal500: '#14B8A6',
  teal600: '#0D9488',

  success: '#16A34A',
  successLight: '#DCFCE7',
  successBorder: '#BBF7D0',

  warning: '#D97706',
  warningLight: '#FEF3C7',
  warningBorder: '#FDE68A',

  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  dangerBorder: '#FECACA',

  info: '#0284C7',
  infoLight: '#F0F9FF',
  infoBorder: '#BAE6FD',

  bg: '#F8FAFC',
  bgClinical: '#F0FDFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardAlt: '#F8FFFE',

  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  text: '#0F172A',
  textSecondary: '#334155',
  muted: '#64748B',
  mutedLight: '#94A3B8',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
  pill: 9999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  elevated: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
  },
  emergency: {
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 7,
  },
};

export const TYPOGRAPHY = {
  h1: { fontSize: 26, fontWeight: '700', lineHeight: 32, color: COLORS.text },
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26, color: COLORS.text },
  h3: { fontSize: 17, fontWeight: '600', lineHeight: 22, color: COLORS.text },
  h4: { fontSize: 15, fontWeight: '600', lineHeight: 20, color: COLORS.text },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20, color: COLORS.textSecondary },
  small: { fontSize: 12, fontWeight: '400', lineHeight: 16, color: COLORS.muted },
  caption: { fontSize: 11, fontWeight: '600', lineHeight: 14, textTransform: 'uppercase', letterSpacing: 0.5 },
  label: { fontSize: 13, fontWeight: '600', lineHeight: 18, color: COLORS.text },
};

export const MIN_TOUCH = 44; // WCAG AAA touch target guideline (minimum 44x44 dp)

export default {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
  TYPOGRAPHY,
  MIN_TOUCH,
};
