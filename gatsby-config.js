/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Rishi Rajasekaran`,
    titleTemplate: "%s",
    description:
      "The homepage of Rishi Rajasekaran, UC Santa Cruz Graduate Student",
    url: "https://rrajasek.com",
    image: "/assets/img/me_circle.jpg",
    twitterUsername: "@rishrajasek",
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
  ],
}
