export const breakpoints = {
  mobile: "320px",
  mobileLg: "540px",
  mobileMd: "640px",
  tablet: "768px",
  desktopSm: "900px",
  desktop: "1024px",
  desktopMd: "1200px",
  desktopLg: "1440px",
} as const;

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  mobileLg: `@media (max-width: ${breakpoints.mobileLg})`,
  mobileMd: `@media (max-width: ${breakpoints.mobileMd})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktopSm: `@media (max-width: ${breakpoints.desktopSm})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  desktopMd: `@media (max-width: ${breakpoints.desktopMd})`,
  desktopLg: `@media (max-width: ${breakpoints.desktopLg})`,
} as const;

export default breakpoints;
