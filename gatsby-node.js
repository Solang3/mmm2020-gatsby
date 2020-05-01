const path = require(`path`)
//const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const panelPost = path.resolve(`./src/templates/panel-post.js`)
  const result = await graphql(
    `
    {
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const panels = result.data.allContentfulPanelVirtual.edges
 
  panels.forEach((panel, index) => {
    const previous = index === panels.length - 1 ? null : panels[index + 1].node
    const next = index === 0 ? null : panels[index - 1].node

    createPage({
      path: panel.node.slug,
      component: panelPost,
      context: {
        slug: panel.node.slug,
        previous,
        next,
      },
    })
  })
}

/* exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
} */
