import React from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/layout';

export default function PostTemplate({ data }) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark

    return (
        <Layout>
            <article>
                <section id="heading" className="about-area gray-bg pt-100 pb-10">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 col-md-12">
                                <h1>{ frontmatter.title }</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                Keywords: <span dangerouslySetInnerHTML={{ __html: `${frontmatter.categories.split(" ").join("&nbsp;&middot;&nbsp;")}`}}></span> 
                            </div>
                            <div className="col-sm-4">
                            Published: <time dateTime={frontmatter.date} className="time">{frontmatter.date} </time>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="content" className="pt-25 pb-130">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12" dangerouslySetInnerHTML={{ __html : html }} />
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              slug
              title
              categories
            }
        }
    }
`