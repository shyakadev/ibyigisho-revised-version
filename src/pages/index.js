import * as React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allAppwritePosts.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No blog posts found. Add markdown posts to "content/blog".</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title || ''

          return (
            <li key={post.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    <b className="umunsi">{post.umunsi}</b> ➖{" "}
                    {post._created_at}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                  <Link to={post.slug} itemProp="url">
                    <button className="soma">Soma</button>
                  </Link>
                </section>
              </article>
              <hr />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Ibyigisho" />

export const pageQuery = graphql`
  {
    allAppwritePosts {
      totalCount
      nodes {
        _id
        slug
        title
        description
        umunsi
        _createdAt
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`
