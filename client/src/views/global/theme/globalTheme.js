import { pink, purple } from '../../../services/color/muiColors';

export const globalTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: pink[500].main
    },
    secondary: {
      main: purple[500].main
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['"Fira Code"'].join(',')
  }
};
