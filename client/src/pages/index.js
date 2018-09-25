import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    {data.allMetadataJson.edges.map(({ node }) => (
      <p>{node.author}</p>
    ))}
    {data.allFile.edges.map(({ node }) => (
      <Img fluid={node.childImageSharp.fluid} />
    ))}
  </Layout>
)

export default IndexPage

export const imageQuery = graphql`
  query {
    allFile(filter: { extension: { eq: "jpg" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMetadataJson {
      edges {
        node {
          author
          attrUrl
          path {
            id
          }
        }
      }
    }
  }
`
