const lightModeButton = document.getElementById('lightModeButton');
const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;

const updateThemeIndicator = (theme) => {
  if (theme === 'light') {
    lightModeButton.style.backgroundColor = '#00438b';
    darkModeButton.style.backgroundColor = '';
  } else {
    lightModeButton.style.backgroundColor = '';
    darkModeButton.style.backgroundColor = '#333';
  }
};

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  body.classList.add(currentTheme);
  updateThemeIndicator(currentTheme);
} else {
  body.classList.add('light');
  localStorage.setItem('theme', 'light');
  updateThemeIndicator('light');
}

lightModeButton.addEventListener('click', () => {
  body.classList.remove('dark');
  body.classList.add('light');
  localStorage.setItem('theme', 'light');
  updateThemeIndicator('light');
});

darkModeButton.addEventListener('click', () => {
  body.classList.remove('light');
  body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  updateThemeIndicator('dark');
});
