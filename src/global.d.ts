declare module '*.module.css' {
  const content: { [key: string]: string };
  export = content;
}
declare module '*.css' {
  const content: { [key: string]: string };
  export default content;
}

    const content: { [key: string]: string };
    export = content;
  }
  declare module '*.png' {
    const value: string;
    export default value;
  }
