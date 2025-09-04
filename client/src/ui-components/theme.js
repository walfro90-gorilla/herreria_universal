export const theme = {
  colors: {
    primary: '#2c3e50',
    secondary: '#3498db',
    accent: '#e74c3c',
    background: '#ecf0f1',
    text: '#2c3e50',
    textLight: '#ffffff',
    border: '#bdc3c7',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px',
  },
  fonts: {
    primary: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    heading: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%',
  },
};

export const lightTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#ffffff',
    text: '#2c3e50',
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#2c3e50',
    text: '#ecf0f1',
  },
};

export default theme;