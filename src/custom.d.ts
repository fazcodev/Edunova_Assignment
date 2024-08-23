// custom.d.ts

// Declare module for SVG imports
declare module '*.svg' {
  const content: string;
  export default content;
}

// Declare module for other image types if needed
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
