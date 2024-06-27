import { createTheme, type ThemeOptions, type Theme } from '@mui/material/styles';
import type { Shadows } from "@mui/material";
import type { LinkProps } from '@mui/material/Link';

import LinkBehavior from './LinkBehavior';

export const getDefaultTheme = (): ThemeOptions => {
  return {
    typography: {
      fontFamily: `'Roboto', sans-serif`,
      h4: {
        fontFamily: `'DM Sans Variable', sans-serif`,
      },
      h5: {
        fontFamily: `'DM Sans Variable', sans-serif`,
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#40CAA1',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2D2AA5',
      },
    },
    shadows: [...createTheme({}).shadows.map((shadow, i) => (
      i === 1 ? '0 6px 16px rgba(0,0,0,0.12)' : shadow
    ))] as Shadows,
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
          underline: 'hover',
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            '& .MuiInputLabel-root': {
              position: 'static',
              transform: 'none',
              fontWeight: 500,
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
            },
            '& .MuiInputLabel-shrink': {
              transform: 'none',
            },
            '& .MuiInputBase-root': {
              marginTop: theme.spacing(1),
            },
          }),
        },
      },
    },
    
  }
}

const defaultTheme = createTheme(getDefaultTheme());

export default defaultTheme;