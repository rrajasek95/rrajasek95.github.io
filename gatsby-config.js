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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          }
        ]
      }
    },
  ],
}
