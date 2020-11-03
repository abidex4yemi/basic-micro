import { createMuiTheme } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';

import buttonOverride from './components/button';
import outlineInputOverride from './components/outlineInput';
import menuOverride from './components/menu';
import backdropOverride from './components/backdrop';
import selectOverride from './components/select';
import listItemOverride from './components/listItem';
import touchRippleOverride from './components/touchRipple';
import tableRowOverride from './components/tableRow';
import tableCellOverride from './components/tableCell';
import typographyOverride from './base/typography';
import containerOverride from './components/container';

const primary = '#000';
const white = '#ffffff';
const warning = '#ffc107';
const success = '#28a745';
const info = '#9013FE';
const danger = '#dc3545';
const secondary = '#677294';
const cardinal = '#DC004E';
const lightenRate = 7.5;
const darkenRate = 15;

const overrides = {
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(8).toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: white,
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    text: {
      primary: primary,
      secondary: secondary,
      hint: secondary,
    },
    common: {
      primary,
      secondary,
      white,
      cardinal,
      danger,
    },
  },
  typography: typographyOverride({ color: { success }, darkenRate }),
  overrides: {
    MuiButton: buttonOverride({ color: { primary } }),
    MuiOutlinedInput: outlineInputOverride(),
    MuiBackdrop: backdropOverride(),
    MuiMenu: menuOverride(),
    MuiSelect: selectOverride(),
    MuiListItem: listItemOverride({ color: { primary }, lightenRate }),
    MuiTouchRipple: touchRippleOverride(),
    MuiTableRow: tableRowOverride(),
    MuiTableCell: tableCellOverride(),
    MuiContainer: containerOverride(),
  },
};

export default createMuiTheme(overrides);
