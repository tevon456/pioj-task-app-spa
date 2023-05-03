import Box from "./Box";
import React from "react";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletS: "475px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

const Inner = styled(Box)`
  padding-bottom: var(--space-md);

  @media ${device.desktopL} {
    padding-top: var(--space-lg);
    padding-bottom: var(--space-lg);
    padding-left: var(--space-xxxl);
    padding-right: var(--space-xxxl);
  }

  @media ${device.desktop} {
    padding-top: var(--space-xxl);
    padding-bottom: var(--space-xxl);
    padding-left: var(--space-xxxl);
    padding-right: var(--space-xxxl);
  }

  @media ${device.laptop} {
    padding-top: var(--space-md);
    padding-bottom: var(--space-md);
    padding-left: var(--space-xxl);
    padding-right: var(--space-xxl);
  }

  @media ${device.tablet} {
    padding-top: var(--space-sm);
    padding-bottom: var(--space-sm);
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }

  @media ${device.mobileL} {
    padding-top: var(--space-xs);
    padding-bottom: var(--space-xs);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }
`;

/**
 * Used as section components.
 * @prop {string} className: css class
 */
function Section({ children, ...rest }) {
  return (
    <Inner as="section" {...rest}>
      {children}
    </Inner>
  );
}

export default Section;
