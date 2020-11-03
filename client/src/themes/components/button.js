const buttonOverride = (override) => ({
  root: {
    letterSpacing: '2px',
    fontWeight: 'bold',
    border: '1px solid #000',
    '&:hover': {
      borderColor: override.color.primary,
      '@media (hover: none)': {
        backgroundColor: '#f4f4f4',
      },
    },
  },
  containedPrimary: {
    background: override.color.primary,
    '&:hover': {
      backgroundColor: '#f4f4f4',
      color: override.color.primary,
      '@media (hover: none)': {
        backgroundColor: '#f4f4f4',
      },
    },
  },
});

export default buttonOverride;
