import React from "react"
import Layout from '../components/layout';
import {graphql} from "gatsby";

function PostItem({
    node
}) {
    const { frontmatter } = node
    return (
        <div className="col-lg-8">
            <h2><a href={frontmatter.slug}>{frontmatter.title}</a></h2>
            <small className="small post-meta">
                <p>
                <strong>Keywords:</strong> <span dangerouslySetInnerHTML={{ __html: `${frontmatter.categories.split(" ").join("&nbsp;&middot;&nbsp;")}`}}></span> &nbsp;|&nbsp; <strong>Published:</strong> <time dateTime={frontmatter.date} className="time">{frontmatter.date} </time>
                    <br />
                    {node.excerpt}
                </p>
            </small>
        </div>
    )
}

function PostList({ edges }) {
    
    const Posts = edges
        .map(edge => {
            
            const { node } = edge
        
            return (<section id="post-list" className="pt-25 pb-80">
                <div className="container">
                    <div className="row">
                            <PostItem node={node} />
                    </div>
                </div>
                </section>)
        }); 
    return (<ul>{Posts}</ul>);
}

export default function BlogPage({
    data: {
        allMarkdownRemark: { edges },
    }
}) {
    return (
        <Layout>
            <section id="heading" className="about-area gray-bg pt-125 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Posts</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <p>Here is a list of my musings which I have written on a variety of topics. I've selectively transferred a few posts from my old blog as a way to keep my content curation clean</p>
                        </div>
                    </div>
                </div>
            </section>
            <PostList edges={edges}/>
        </Layout>
    )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            categories
          }
        }
      }
    }
  }
`