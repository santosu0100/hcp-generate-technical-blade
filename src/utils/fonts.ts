import { Font } from '@react-pdf/renderer';

// Registrar fonte Poppins para todo o documento
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrFJA.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLCz7V1s.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLBT5V1s.ttf',
      fontWeight: 'ultrabold',
    },
  ],
});

export const POPPINS_FONT = 'Poppins';
