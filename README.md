# SIM Skripsi

This project is built using Vite and React. Vite is a fast build tool that provides a modern development environment, while React is a JavaScript library for building user interfaces.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/faizakailani/website-sim-skripsi.git
cd website-sim-skripsi
npm install
```

## Development

To start the development server, run:

```bash
npm run dev
```

This will start Vite's development server and open the project in your default web browser. Any changes you make to the source code will be hot-reloaded.

## Build

To create a production build of the project, run:

```bash
npm run build
```

This will generate a `dist` directory containing the optimized production files.

## Deployment

You can deploy the contents of the `dist` directory to any static hosting service. If you are using a platform like Vercel or Netlify, you can directly link your repository, and the platform will take care of the build and deployment steps for you.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

1. Fork the repository.
2. Create a new branch (`git checkout -b 'feature-branch'`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin 'feature-branch'`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
