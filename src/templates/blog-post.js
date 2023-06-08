import * as React from "react"
import { Link, graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"
import { marked } from "marked"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Disqus } from "gatsby-plugin-disqus"

const BlogPostTemplate = ({
  data: { previous, next, site, appwritePosts: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  let disqusConfig = {
    url: location.href,
    identifier: post.id,
    title: post.title,
  }
  const body = marked(post.body, {breaks: true, gfm: true})

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <script src={withPrefix("script.js")} type="text/javascript" />
      </Helmet>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <small className="umutwe">➖ {post.umutwe}</small>
          <h1 itemProp="headline" id="title">
            {post.title}
          </h1>
          <p>
            <small className="umunsi">
              <b>{post.umunsi}</b>
            </small>{" "}
            - {post._created_at}
          </p>
          <div class="s9-class-container"></div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: body }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Disqus config={disqusConfig} />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { appwritePosts: post } }) => {
  return (
    <Seo
      title={post.title}
      description={post.description || post.excerpt}
      icyigisho={post.icyigisho}
      umwaka={post.umwaka}
      igihembwe={post.igihembwe}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    appwritePosts (id: {eq: $id}) {
      id
      slug
      title
      description
      icyigisho
      umwaka
      igihembwe
      umunsi
      umutwe
      body
    }
    
    previous: appwritePosts(id: {eq: $previousPostId}){
      id
      title
      slug
    }
    next: appwritePosts(id: {eq: $nextPostId}){
      id
      title
      slug
    }
  }
`
