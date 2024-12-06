export const Token = {
  ACCESSTOKENKEY: 'Authorization',
  TOKENTYPE: 'Bearer',

  // 토큰을 저장함.
  set setToken(token: string) {
    localStorage.setItem(Token.ACCESSTOKENKEY, `${Token.TOKENTYPE} ${token}`);
  },

  // 로컬 스토리지에서 토큰 값을 가져옴
  get getToken() {
    return localStorage.getItem(Token.ACCESSTOKENKEY);
  },

  /*
    로그인이 필요한 api에 대해서 params 매계변수를 생성해줌.
    예시) 
    await api
        .sendEmailToken(data, Token.getHeaderParms)
        .then(response => {
        // 로그인 성공
        console.log(response);
        })
        .catch(error => {
        // 로그인 실패
        console.error(error);
        });
    };
  */
  get getHeaderParms() {
    return {
      headers: {
        [`${Token.ACCESSTOKENKEY}`]: Token.getToken,
      },
    };
  },

  // 토큰을 삭제
  removeToken() {
    localStorage.removeItem(Token.ACCESSTOKENKEY);
  },
};
