// custom.d.ts

// Declare module for SVG imports
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}