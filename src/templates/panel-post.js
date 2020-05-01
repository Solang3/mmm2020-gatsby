import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const PanelPostTemplate = ({ data, pageContext, location }) => {
  const panel = this.props.data.contentfulPanelVirtual
  const siteTitle = data.site.siteMetadata.title
  const siteAuthor = data.site.siteMetadata.author.name
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={panel.frontmatter.titulo}
        //description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {panel.frontmatter.titulo}
          </h1>
          <h3>
            {siteAuthor}
          </h3>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {panel.frontmatter.exponente}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: panel.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.titulo}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.titulo} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default PanelPostTemplate

export const pageQuery = graphql`
  query PanelPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    contentfulPanelVirtual ( slug: { eq: $slug }) {
      titulo
      exponente
    }
  }
`
