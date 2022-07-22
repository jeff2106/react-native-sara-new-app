/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  gray_500: '#6b7280',
  gray_900: '#111827',
  gray_200: '#e5e7eb',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#ff9758',
  success: '#28a745',
  error: '#dc3545',
  accent: '#000',
  grayLight: '#f5f5f5',
  blue: '#334cb3',
  grayDash: '#94a4c3',
  grayDark: '#828894',
  graySection: '#cfd1d5',
  purple: '#534468',
  blueSky: '#5388f3',
  yellowSky: '#f4b637',
  green: '#34b880',
  blueLight: '#e6f0f5',
  blueGray: '#F4F6FB',
  blueDark: '#0E1A34',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}
