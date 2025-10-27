/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Customizable color palette for workspaces
        workspace: {
          primary: 'var(--workspace-primary, #3b82f6)',
          secondary: 'var(--workspace-secondary, #8b5cf6)',
          accent: 'var(--workspace-accent, #10b981)',
          danger: 'var(--workspace-danger, #ef4444)',
          warning: 'var(--workspace-warning, #f59e0b)',
          success: 'var(--workspace-success, #10b981)',
        }
      },
      borderRadius: {
        workspace: 'var(--workspace-radius, 0.5rem)',
      },
    },
  },
  plugins: [],
}
