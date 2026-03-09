export const theme = {
  bg: '#1a1410',
  bgCard: '#211c17',
  bgHover: '#2a231c',
  accent: '#B8860B',
  accentLight: '#D4A520',
  textPrimary: '#F5E6C8',
  textSecondary: '#C4A882',
  textMuted: '#8A7560',
  border: 'rgba(184,134,11,0.2)',
  borderHover: 'rgba(184,134,11,0.5)',
}

export const fonts = {
  heading: "'VTCDuBoisBold', 'Georgia', serif",
  body: "'VTCDuBoisRegular', 'Georgia', serif",
  mono: "'Courier New', monospace",
}

export const globalStyles = `
  @font-face {
    font-family: 'VTCDuBoisBold';
    src: url('/fonts/VTCDuBois-Bold.ttf') format('truetype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'VTCDuBoisRegular';
    src: url('/fonts/VTCDuBois-Regular.ttf') format('truetype');
    font-weight: normal;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #1a1410;
    color: #F5E6C8;
    font-family: 'VTCDuBoisRegular', Georgia, serif;
    min-height: 100vh;
  }
  a { color: #D4A520; text-decoration: none; }
  a:hover { text-decoration: underline; }
`
