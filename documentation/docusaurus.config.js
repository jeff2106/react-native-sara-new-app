// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Le template React Native Sara',
  tagline: 'Simple, léger et évolutif.',
  url: 'https://github.com/jeff2106',
  baseUrl: '/react-native-sara-new-app',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'sara-jean-philippe',
  projectName: 'react-native-sara-new-app',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    async function myPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // eslint-disable-next-line global-require
          postcssOptions.plugins.push(require('tailwindcss'));
          // eslint-disable-next-line global-require
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/jeff2106',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/jeff2106',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '9PEYN0H12D',
        indexName: 'rnboilerplate',
        apiKey: '983439b6ebef49ed3394ecfa290f1c6a',
        contextualSearch: true,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
      title: 'React Native SARA',
        logo: {
          alt: 'React Native SARA',
          src: '',
        },
        items: [
          {
            type: 'doc',
            docId: 'Introduction',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/jeff2106',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation',
                to: '/docs/Installation',
              },
              {
                label: 'Theme',
                to: '/docs/Theme',
              },
              {
                label: 'Loading data at startup',
                to: '/docs/SplashScreenLoadingData',
              },
              {
                label: 'Redux toolkit',
                to: '/docs/ReduxStore',
              },
              {
                label: 'Internationalization',
                to: '/docs/AddALangTranslation',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/jeff2106/react-native-sara-new-app',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} React Native SARA, by sara jean philippe. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
