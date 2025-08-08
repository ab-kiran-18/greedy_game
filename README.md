# Greedy Game

A Next.js project with shadcn/ui, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 15** - React framework for production
- 🎨 **shadcn/ui** - Beautiful and accessible components
- 🎯 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode Support** - Built-in dark mode

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd greedy_game
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles with shadcn/ui variables
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # React components
│   └── ui/             # shadcn/ui components
│       └── button.tsx  # Button component
└── lib/                # Utility functions
    └── utils.ts        # shadcn/ui utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

To add new shadcn/ui components, you can use the CLI:

```bash
npx shadcn@latest add <component-name>
```

For example:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

## Customization

### Colors
The project uses CSS variables for theming. You can customize colors in `src/app/globals.css`.

### Components
All shadcn/ui components are in `src/components/ui/` and can be customized as needed.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is open source and available under the [MIT License](LICENSE).
