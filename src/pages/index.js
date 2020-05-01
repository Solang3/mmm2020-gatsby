import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulPanelVirtual.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <article key={node.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
            </header>
            <section>
              <p
                /* dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }} */
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPanelVirtual(sort: {fields: createdAt}) {
      edges {
        node {
          createdAt(formatString: "YYYY-MM-DD")
          slug
          imagen {
            file {
              url
            }
          }
          tema
          titulo
          exponente
          invitadosas
          childContentfulPanelVirtualAgendaRichTextNode {
            childContentfulRichText {
              html
            }
          }
          diaYHora(formatString: "hh:mm")
          zoomLink
        }
      }
    }
  }
`
