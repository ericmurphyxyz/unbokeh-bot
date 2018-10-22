module.exports = {
  siteMetadata: {
    title: 'Unbokeh',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/unbokeh-icon.png',
      },
    },
    'gatsby-plugin-offline',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
  ],
}
