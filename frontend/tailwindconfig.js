module.exports = {
    darkMode: ['class'],
    theme: {
      extend: {
        colors: {
          gradientFrom: 'var(--gradient-from, #4caf50)', // Default to green-400
          gradientTo: 'var(--gradient-to, #2196f3)' // Default to blue-500
        },
        backgroundImage: {
          'gradient-section': 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))',
        },
      },
    },
  }