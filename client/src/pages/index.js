import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    {data.allMetadataJson.edges.map(({ node }) => (
      <>
        <p>{node.author}</p>
        <p>{node.attrUrl}</p>
        <p>{node.path.relativePath}</p>
        <Img fixed={node.path.childImageSharp.fixed} />
      </>
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allMetadataJson {
      edges {
        node {
          author
          attrUrl
          path {
            relativePath
            childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
