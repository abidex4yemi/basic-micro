import tinycolor from 'tinycolor2';

const listItemOverride = (override) => ({
  root: {
    '&$selected': {
      backgroundColor: tinycolor(override.color.primary)
        .darken(8)
        .toHexString(),
      color: '#fff',
      '&:focus': {
        backgroundColor: tinycolor(override.color.primary)
          .lighten(override.lightenRate)
          .toHexString(),
        color: '#fff',
      },
    },
  },
  button: {
    '&:hover, &:focus': {
      backgroundColor: '#F3F5FF',
    },
  },
});

export default listItemOverride;
