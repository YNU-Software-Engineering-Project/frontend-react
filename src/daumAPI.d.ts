declare global {
  interface Window {
      daum: {
          Postcode: new (options: {
              oncomplete: (data: {
                  zonecode: string;
                  roadAddress: string;
                  jibunAddress: string;
                  [key: string]: any;
              }) => void;
          }) => {
              open: () => void;
          };
      };
  }
}

export {};