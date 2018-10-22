import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const HeaderWrapper = styled.header`
  display: flex;
  margin: 0 auto;
  max-width: 1296px;
  padding: 2rem 1.0875rem 2rem;
  width: 100%;
`

const ImageWrapper = styled.div`
  width: 25%;
`

const CopyWrapper = styled.div`
  width: 75%;
  padding: 1rem 4rem;
`

const HeaderImage = styled(Img)`
  border-radius: 43% 57% 41% 59% / 60% 41% 59% 40%;
`

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <HeaderWrapper>
        <ImageWrapper>
          <HeaderImage fluid={data.logo.childImageSharp.fluid} />
        </ImageWrapper>
        <CopyWrapper>
          <h1>Unbokeh</h1>
          <p>
            Hazy blurred backgrounds for design, inspiration, and wicked
            wallpapers.
          </p>
          <p>Hand-picked with new photos every week.</p>
          <p>
            Sourced from{' '}
            <a
              target="_blank"
              href="https://unsplash.com?utm_source=unbokeh&utm_medium=referral"
            >
              Unsplash
            </a>{' '}
            &amp; created by{' '}
            <a target="_blank" href="https://ericnmurphy.com/">
              Eric Murphy
            </a>
            .
          </p>
        </CopyWrapper>
      </HeaderWrapper>
    )}
  />
)

export default Header
