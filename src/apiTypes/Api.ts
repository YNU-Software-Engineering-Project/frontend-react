import {
  CommentRequestDto,
  ConfirmEmailData,
  ConfirmEmailError,
  CreateCommentData,
  CreateQuestionData,
  DeleteCommentData,
  DeleteDocumentData,
  DeleteDocumentError,
  DeleteIDcardData,
  DeleteIDcardError,
  DeleteImageFail,
  DeleteImageResult,
  DeleteMainData,
  DeleteMainError,
  DeleteNotificationData,
  DeleteNotificationError,
  DeleteNotificationsData,
  DeleteNotificationsError,
  DeleteQuestionData,
  DeleteRewardData,
  DeleteRewardError,
  DeleteTagData,
  DeleteTagError,
  EmailSendTokenRequestDto,
  FundingInfoRequestDto,
  FundingLikeRequestDto,
  FundingStoryRequestDto,
  GetCommentsByQuestionData,
  GetFunderListData,
  GetFunderListError,
  GetFundingDashboardData,
  GetFundingDashboardError,
  GetFundingMainData,
  GetFundingMainError,
  GetFundingStoryData,
  GetFundingStoryError,
  GetfundPolicyData,
  GetfundPolicyError,
  GetHighAchievementFundingsData,
  GetInfoData,
  GetInfoError,
  GetMyFundingListData,
  GetMyFundingListError,
  GetNewFundingsData,
  GetNotificationsData,
  GetNotificationsError,
  GetPledgeListData,
  GetPledgeListError,
  GetPolicyData,
  GetPolicyError,
  GetProjectData,
  GetProjectError,
  GetQuestionsByFundingData,
  GetRewardData,
  GetRewardError,
  GetRewardInfoData,
  GetRewardInfoError,
  GetRewardListData,
  GetRewardListError,
  GetRewordsByFundingIdData,
  GetRewordsByFundingIdError,
  GetSmallFundingsData,
  GetTop3PopularFundingsData,
  GetUserProfileData,
  GetUserProfileError,
  GetWishListData,
  GetWishListError,
  GiveupFundingData,
  GiveupFundingError,
  InsertRefundPolicyData,
  InsertRefundPolicyError,
  InsertRewardData,
  InsertRewardError,
  InsertRewardIInfoData,
  InsertRewardIInfoError,
  InsertTagData,
  InsertTagError,
  InsertTagRequestDto,
  LoginData,
  LoginError,
  LoginRequestDto,
  MakeRewardRequestDto,
  ModifyInfoData,
  ModifyInfoError,
  ModifyPhoneNumberData,
  ModifyPhoneNumberError,
  ModifyProfileData,
  ModifyProfileError,
  ModifyProfilePayload,
  ModifyProjectData,
  ModifyProjectError,
  PasswordResetRequestDto,
  PatchPhoneNumberRequestDto,
  PolicyRefundRequestDto,
  PolicyRewardRequestDto,
  QuestionRequestDto,
  RegisterData,
  RegisterError,
  RegisterFundingData,
  RegisterFundingError,
  ResetPasswordData,
  ResetPasswordError,
  SearchFundingData,
  SearchFundingError,
  SendEmailTokenData,
  SendEmailTokenError,
  SignupData,
  SignupError,
  SignUpRequestDto,
  SubmitFundingData,
  SubmitFundingError,
  ToggleFundingLikeData,
  UploadDocumentData,
  UploadDocumentError,
  UploadDocumentPayload,
  UploadIDcardData,
  UploadIDcardError,
  UploadIDcardPayload,
  UploadImagesData,
  UploadImagesError,
  UploadImagesPayload,
  UploadMainData,
  UploadMainError,
  UploadMainPayload,
  GetChatRoomListDto, 
  GetChatRoomListError,
  GetChatMessagesResponse,
  GetChatMessagesError,
  ChatMessageRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name SubmitFunding
   * @summary 게시물 제출하기
   * @request POST:/api/user/fundings/{funding_id}/submit
   * @response `200` `SubmitFundingData` 게시물 상태변화 성공
   * @response `400` `ResponseDto` 제출할 funding_id가 존재하지 않을 때
   */
  submitFunding = (fundingId: number, params: RequestParams = {}) =>
    this.request<SubmitFundingData, SubmitFundingError>({
      path: `/api/user/fundings/${fundingId}/submit`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name ModifyProjnpmect
   * @summary 프로젝트 제목, 요약 작성
   * @request POST:/api/user/fundings/{funding_id}/story/modify
   * @response `200` `ModifyProjectData` 작성 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  modifyProject = (
    fundingId: number,
    data: FundingStoryRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ModifyProjectData, ModifyProjectError>({
      path: `/api/user/fundings/${fundingId}/story/modify`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name UploadMain
   * @summary 메인 사진 추가
   * @request POST:/api/user/fundings/{funding_id}/story/main
   * @response `200` `UploadMainData` 메인사진 추가 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 추가할 파일이 없을 때
   */
  uploadMain = (
    fundingId: number,
    data: UploadMainPayload,
    params: RequestParams = {},
  ) =>
    this.request<UploadMainData, UploadMainError>({
      path: `/api/user/fundings/${fundingId}/story/main`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name UploadImages
   * @summary 소개 사진 등록
   * @request POST:/api/user/fundings/{funding_id}/story/images
   * @response `200` `UploadImagesData` 하나의 사진 추가 성공
   * @response `400` `ResponseDto` - 존재하지 않는 funding_id - 추가할 파일이 없을 때 - 파일 형식이 맞지 않을 때
   */
  uploadImages = (
    fundingId: number,
    data: UploadImagesPayload,
    params: RequestParams = {},
  ) =>
    this.request<UploadImagesData, UploadImagesError>({
      path: `/api/user/fundings/${fundingId}/story/images`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name InsertReward
   * @summary 리워드 추가하기
   * @request POST:/api/user/fundings/{funding_id}/reward/insert
   * @response `200` `InsertRewardData` 리워드 추가 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 리워드내용을 다 작성하지 않았을 때
   */
  insertReward = (
    fundingId: number,
    data: MakeRewardRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InsertRewardData, InsertRewardError>({
      path: `/api/user/fundings/${fundingId}/reward/insert`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name InsertRewardIInfo
   * @summary 리워드정보 작성
   * @request POST:/api/user/fundings/{funding_id}/policy/reward
   * @response `200` `InsertRewardIInfoData` 리워드정보 작성 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  insertRewardIInfo = (
    fundingId: number,
    data: PolicyRewardRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InsertRewardIInfoData, InsertRewardIInfoError>({
      path: `/api/user/fundings/${fundingId}/policy/reward`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name InsertRefundPolicy
   * @summary 환불정책 작성
   * @request POST:/api/user/fundings/{funding_id}/policy/refund
   * @response `200` `InsertRefundPolicyData` 환불정책 작성 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  insertRefundPolicy = (
    fundingId: number,
    data: PolicyRefundRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InsertRefundPolicyData, InsertRefundPolicyError>({
      path: `/api/user/fundings/${fundingId}/policy/refund`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name InsertTag
   * @summary tag 추가하기
   * @request POST:/api/user/fundings/{funding_id}/info/tag
   * @response `200` `InsertTagData` tag 추가 성공
   * @response `400` `ResponseDto` - funding_id가 존재하지 않을 때 - 추가할 태그가 null일 때 - 태그를 5개 이상 추가했을 때
   */
  insertTag = (
    fundingId: number,
    data: InsertTagRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<InsertTagData, InsertTagError>({
      path: `/api/user/fundings/${fundingId}/info/tag`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name ModifyInfo
   * @summary 프로젝트정보 작성
   * @request POST:/api/user/fundings/{funding_id}/info/modify
   * @response `200` `ModifyInfoData` 작성 성공
   * @response `400` `ResponseDto` -funding_id가 존재하지 않는 경우 - 이메일 형식이 맞지 않는 경우 - 날짜 형식이 맞지 않는 경우
   */
  modifyInfo = (
    fundingId: number,
    data: FundingInfoRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ModifyInfoData, ModifyInfoError>({
      path: `/api/user/fundings/${fundingId}/info/modify`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name UploadIDcard
   * @summary 신분증 추가
   * @request POST:/api/user/fundings/{funding_id}/info/id_card
   * @response `200` `UploadIDcardData` 신분증 추가 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 추가할 파일이 없을 때
   */
  uploadIDcard = (
    fundingId: number,
    data: UploadIDcardPayload,
    params: RequestParams = {},
  ) =>
    this.request<UploadIDcardData, UploadIDcardError>({
      path: `/api/user/fundings/${fundingId}/info/id_card`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name UploadDocument
   * @summary 심사서류 추가
   * @request POST:/api/user/fundings/{funding_id}/info/document
   * @response `200` `UploadDocumentData` 심사서류 추가 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 추가할 파일이 없을 때
   */
  uploadDocument = (
    fundingId: number,
    data: UploadDocumentPayload,
    params: RequestParams = {},
  ) =>
    this.request<UploadDocumentData, UploadDocumentError>({
      path: `/api/user/fundings/${fundingId}/info/document`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name GiveupFunding
   * @summary 게시물 포기하기
   * @request POST:/api/user/fundings/{funding_id}/giveup
   * @response `200` `GiveupFundingData` 포기할 게시물 삭제 성공
   * @response `400` `ResponseDto` 삭제할 funding_id가 존재하지 않을 때
   */
  giveupFunding = (fundingId: number, params: RequestParams = {}) =>
    this.request<GiveupFundingData, GiveupFundingError>({
      path: `/api/user/fundings/${fundingId}/giveup`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SendEmailToken
   * @summary 학교 메일 인증 요청
   * @request POST:/api/user/email-verification
   * @secure
   * @response `200` `SendEmailTokenData` 이메일 인증 토큰 발송 성공
   * @response `400` `ResponseDto` 잘못된 요청 - 존재하지 않는 사용자 - 대학교 메일 주소(ac.kr)가 아닌 경우
   */
  sendEmailToken = (
    data: EmailSendTokenRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SendEmailTokenData, SendEmailTokenError>({
      path: `/api/user/email-verification`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags register-funding-controller
   * @name RegisterFunding
   * @summary 펀딩 게시물 생성
   * @request POST:/api/register/info
   * @response `200` `RegisterFundingData` 펀딩 게시물 생성 성공
   * @response `400` `ResponseDto` name, email, taxemail을 작성하지 않은 경우
   */
  registerFunding = (data: FundingInfoRequestDto, params: RequestParams = {}) =>
    this.request<RegisterFundingData, RegisterFundingError>({
      path: `/api/register/info`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name GetQuestionsByFunding
   * @summary 특정 펀딩의 질문들 조회
   * @request GET:/api/questions/funding/{fundingId}
   * @response `200` `GetQuestionsByFundingData` 질문 조회 성공
   */
  getQuestionsByFunding = (
    fundingId: number,
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetQuestionsByFundingData, any>({
      path: `/api/questions/funding/${fundingId}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name CreateQuestion
   * @summary 커뮤니티 질문 생성
   * @request POST:/api/questions/funding/{fundingId}
   * @response `200` `CreateQuestionData` 질문 생성 성공
   */
  createQuestion = (
    fundingId: number,
    data: QuestionRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateQuestionData, any>({
      path: `/api/questions/funding/${fundingId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags password-reset-controller
   * @name ResetPassword
   * @summary 임시 비밀번호 전송
   * @request POST:/api/password/reset
   * @response `200` `ResetPasswordData` 이메일 전송 성공
   * @response `400` `PasswordResetResponseDto` 존재하지 않는 사용자
   */
  resetPassword = (data: PasswordResetRequestDto, params: RequestParams = {}) =>
    this.request<ResetPasswordData, ResetPasswordError>({
      path: `/api/password/reset`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-like-controller
   * @name ToggleFundingLike
   * @request POST:/api/funding/like/toggle
   * @response `200` `ToggleFundingLikeData` OK
   */
  toggleFundingLike = (
    data: FundingLikeRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ToggleFundingLikeData, any>({
      path: `/api/funding/like/toggle`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags comment-controller
   * @name GetCommentsByQuestion
   * @summary 특정 질문의 댓글들 조회
   * @request GET:/api/comments/question/{questionId}
   * @response `200` `GetCommentsByQuestionData` 댓글 조회 성공
   */
  getCommentsByQuestion = (
    questionId: number,
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetCommentsByQuestionData, any>({
      path: `/api/comments/question/${questionId}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags comment-controller
   * @name CreateComment
   * @summary 커뮤니티 댓글 생성
   * @request POST:/api/comments/question/{questionId}
   * @response `200` `CreateCommentData` 댓글 생성 성공
   */
  createComment = (
    questionId: number,
    data: CommentRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateCommentData, any>({
      path: `/api/comments/question/${questionId}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Signup
   * @summary 회원가입
   * @request POST:/api/auth/signup
   * @response `200` `SignupData` 회원가입 성공
   * @response `400` `ResponseDto` 잘못된 요청, 이메일 중복 또는 비밀번호 불일치
   */
  signup = (data: SignUpRequestDto, params: RequestParams = {}) =>
    this.request<SignupData, SignupError>({
      path: `/api/auth/signup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth-controller
   * @name Login
   * @summary 로그인
   * @request POST:/api/auth/login
   * @response `200` `LoginData` 로그인 성공
   * @response `401` `ResponseDto` 잘못된 이메일 또는 비밀번호
   */
  login = (data: LoginRequestDto, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/api/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags SocialAuthController
   * @name kakaoLogin
   * @summary 소셜 로그인
   * @request POST:/api/auth/oauth/kakao
   * @response `200` `LoginData` 카카오 로그인 성공
   * @response `400` `ResponseDto` Login information mismatch
   */
  kakaoLogin = (code: string) =>
    this.request<LoginData, LoginError>({
      path: `/api/auth/oauth/kakao`,
      method: 'POST',
      query: { code },
    });
  naverLogin = (code: string, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/api/auth/oauth/naver`,
      method: 'POST',
      query: { code },
      ...params,
    });    
  goolgeLogin = (code: string, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/api/auth/oauth/google`,
      method: 'POST',
      query: { code },
      ...params,
    });  
  /**
   * No description
   *
   * @tags user-controller
   * @name ModifyProfile
   * @summary 사용자 프로필 수정
   * @request PATCH:/api/user/modify-profile
   * @secure
   * @response `200` `ModifyProfileData` 사용자 프로필 수정 성공
   * @response `400` `ResponseDto` 잘못된 요청 - 존재하지 않는 사용자 - 중복된 닉네임 - 비밀번호 불일치 - 새 비밀번호가 현재 비밀번호와 같음 - 주소란을 일부만 채운 경우 (주소란을 모두 비워두거나, 도로명 주소와 지번 주소 중 하나만 제외하고 모두 입력한 경우는 허용된다)
   */
  modifyProfile = (data: ModifyProfilePayload, params: RequestParams = {}) =>
    this.request<ModifyProfileData, ModifyProfileError>({
      path: `/api/user/modify-profile`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name ModifyPhoneNumber
   * @summary 사용자 전화번호 수정
   * @request PATCH:/api/user/modify-phone-number
   * @secure
   * @response `200` `ModifyPhoneNumberData` 전화번호 수정 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  modifyPhoneNumber = (
    data: PatchPhoneNumberRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ModifyPhoneNumberData, ModifyPhoneNumberError>({
      path: `/api/user/modify-phone-number`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name GetUserProfile
   * @summary 사용자 프로필 조회
   * @request GET:/api/user
   * @secure
   * @response `200` `GetUserProfileData` 사용자 프로필 조회 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  getUserProfile = (params: RequestParams = {}) =>
    this.request<GetUserProfileData, GetUserProfileError>({
      path: `/api/user`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name GetWishList
   * @summary 위시리스트 조회
   * @request GET:/api/user/wishlist
   * @secure
   * @response `200` `GetWishListData` 위시리스트 조회 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  getWishList = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 4
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetWishListData, GetWishListError>({
      path: `/api/user/wishlist`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name GetPledgeList
   * @summary 참여한 펀딩 리스트 조회
   * @request GET:/api/user/pledges
   * @secure
   * @response `200` `GetPledgeListData` 참여한 펀딩 리스트 조회 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  getPledgeList = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 4
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetPledgeListData, GetPledgeListError>({
      path: `/api/user/pledges`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name GetMyFundingList
   * @summary 내 펀딩 리스트 조회
   * @request GET:/api/user/fundings
   * @secure
   * @response `200` `GetMyFundingListData` 내 펀딩 리스트 조회 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  getMyFundingList = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 4
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetMyFundingListData, GetMyFundingListError>({
      path: `/api/user/fundings`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name GetFundingMain
   * @summary 메인 사진 보여주기
   * @request GET:/api/user/fundings/{funding_id}
   * @response `200` `GetFundingMainData` 보여주기 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  getFundingMain = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetFundingMainData, GetFundingMainError>({
      path: `/api/user/fundings/${fundingId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name GetProject
   * @summary 스토리작성 페이지 불러오기
   * @request GET:/api/user/fundings/{funding_id}/story
   * @response `200` `GetProjectData` 모든 정보 가져오기 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  getProject = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetProjectData, GetProjectError>({
      path: `/api/user/fundings/${fundingId}/story`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name GetReward
   * @summary 리워드설계 페이지 불러오기
   * @request GET:/api/user/fundings/{funding_id}/reward
   * @response `200` `GetRewardData` 모든 리워드 가져오기 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  getReward = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetRewardData, GetRewardError>({
      path: `/api/user/fundings/${fundingId}/reward`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name GetPolicy
   * @summary 정책페이지 불러오기
   * @request GET:/api/user/fundings/{funding_id}/policy
   * @response `200` `GetPolicyData` 정책 불러오기 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  getPolicy = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetPolicyData, GetPolicyError>({
      path: `/api/user/fundings/${fundingId}/policy`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name GetInfo
   * @summary 프로젝트정보작성 페이지 불러오기
   * @request GET:/api/user/fundings/{funding_id}/info
   * @response `200` `GetInfoData` 불러오기 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않을 때
   */
  getInfo = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetInfoData, GetInfoError>({
      path: `/api/user/fundings/${fundingId}/info`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags register-funding-controller
   * @name Register
   * @summary 학교 이메일을 가진 사람만 등록하기 가능
   * @request GET:/api/register
   * @response `200` `RegisterData` 학교이메일이 있는 경우
   * @response `400` `ResponseDto` 학교 이메일이 없는 경우
   */
  register = (params: RequestParams = {}) =>
    this.request<RegisterData, RegisterError>({
      path: `/api/register`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags notification-controller
   * @name GetNotifications
   * @summary 알림 목록 조회
   * @request GET:/api/notifications
   * @secure
   * @response `200` `GetNotificationsData` 알림 목록 조회 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  getNotifications = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetNotificationsData, GetNotificationsError>({
      path: `/api/notifications`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags notification-controller
   * @name DeleteNotifications
   * @summary 모든 알림 삭제
   * @request DELETE:/api/notifications
   * @secure
   * @response `200` `DeleteNotificationsData` 알림 삭제 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  deleteNotifications = (params: RequestParams = {}) =>
    this.request<DeleteNotificationsData, DeleteNotificationsError>({
      path: `/api/notifications`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-controller
   * @name SearchFunding
   * @summary 펀딩 게시물 정렬 및 검색
   * @request GET:/api/fundings
   * @response `200` `SearchFundingData` 펀딩 게시물 정렬 및 검색 성공
   * @response `400` `ResponseDto` 존재하지 않는 사용자 또는 잘못된 요청
   */
  searchFunding = (
    query?: {
      /** 검색어 */
      keyword?: string;
      /**
       *         latest: 최신순, oldest: 오래된 순,
       *         priceAsc: 가격 높은 순, priceDesc: 가격 낮은 순,
       *         achievementRateDesc: 달성률 높은 순, achievementRateAsc: 달성률 낮은 순,
       *         deadlineDesc: 마감임박순,
       *         likes: 추천순(좋아요 순)
       * @default "latest"
       */
      sort?: string;
      /**
       *         A0010 -> 캐릭터·굿즈, A0020  -> 홈·리빙, A0030 -> 사진,
       *         A0040 -> 게임, A0050 -> 키즈, A0060 -> 도서·전자책,
       *         A0070 -> 여행, A0080 -> 만화·웹툰, A0090 -> 스포츠·아웃도어,
       *         A0100 -> 테크·가전, A0110 -> 자동차, A0120 -> 패션,
       *         A0130 -> 아트, A0140 -> 소셜, A0150 -> 영화·음악,
       *         A0160 -> 반려동물, A0170 -> 디자인
       * @example "A0010,A0020"
       */
      categories?: string[];
      /**
       * 태그
       * @example "art,design"
       */
      tags?: string[];
      /**
       * 최소 달성률
       * @format int32
       * @default 0
       */
      minRate?: number;
      /**
       * 최대 달성률
       * @format int32
       * @default 100
       */
      maxRate?: number;
      /**
       * 종료된 펀딩 여부 (true: 종료된 펀딩도 포함)
       * @default false
       */
      isClosed?: boolean;
      /**
       * 좋아요한 펀딩 여부 (true: 좋아요한 펀딩도 포함)
       * @default false
       */
      isLiked?: boolean;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 6
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchFundingData, SearchFundingError>({
      path: `/api/fundings`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-details-controller
   * @name GetFundingStory
   * @summary 펀딩 스토리 조회
   * @request GET:/api/fundings/{funding_id}/story
   * @response `200` `GetFundingStoryData` 스토리 조회 성공
   * @response `404` `ResponseDto` 스토리를 찾을 수 없음
   */
  getFundingStory = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetFundingStoryData, GetFundingStoryError>({
      path: `/api/fundings/${fundingId}/story`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-details-controller
   * @name GetRewardInfo
   * @summary 펀딩 리워드 정보 조회
   * @request GET:/api/fundings/{funding_id}/rewards
   * @response `200` `GetRewardInfoData` 리워드 정보 조회 성공
   * @response `404` `ResponseDto` 펀딩을 찾을 수 없음
   */
  getRewardInfo = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetRewardInfoData, GetRewardInfoError>({
      path: `/api/fundings/${fundingId}/rewards`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-details-controller
   * @name GetRewordsByFundingId
   * @summary 펀딩 리워드 리스트 조회
   * @request GET:/api/fundings/{funding_id}/rewardsList
   * @response `200` `GetRewordsByFundingIdData` 리워드 리스트 조회 성공
   * @response `404` `ResponseDto` 펀딩을 찾을 수 없음
   */
  getRewordsByFundingId = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetRewordsByFundingIdData, GetRewordsByFundingIdError>({
      path: `/api/fundings/${fundingId}/rewardsList`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-details-controller
   * @name GetfundPolicy
   * @summary 펀딩 환불 정책 조회
   * @request GET:/api/fundings/{funding_id}/refund-policy
   * @response `200` `GetfundPolicyData` 환불 정책 조회 성공
   * @response `404` `ResponseDto` 펀딩을 찾을 수 없음
   */
  getfundPolicy = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetfundPolicyData, GetfundPolicyError>({
      path: `/api/fundings/${fundingId}/refund-policy`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-sort-controller
   * @name GetTop3PopularFundings
   * @summary 인기 펀딩 Top3 정렬
   * @request GET:/api/fundings/top3
   * @response `200` `GetTop3PopularFundingsData` 좋아요 많은 순으로 정렬
   */
  getTop3PopularFundings = (params: RequestParams = {}) =>
    this.request<GetTop3PopularFundingsData, any>({
      path: `/api/fundings/top3`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-sort-controller
   * @name GetSmallFundings
   * @summary 소액펀딩 정렬
   * @request GET:/api/fundings/small
   * @response `200` `GetSmallFundingsData` 목표 금액이 적은 순으로 정렬
   */
  getSmallFundings = (
    query: {
      /** @format int32 */
      page: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetSmallFundingsData, any>({
      path: `/api/fundings/small`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-sort-controller
   * @name GetNewFundings
   * @summary 신생펀딩 정렬
   * @request GET:/api/fundings/new
   * @response `200` `GetNewFundingsData` 최근 등록된 펀딩 순으로 정렬
   */
  getNewFundings = (
    query: {
      /** @format int32 */
      page: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetNewFundingsData, any>({
      path: `/api/fundings/new`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-sort-controller
   * @name GetHighAchievementFundings
   * @summary 목표달성률 정렬
   * @request GET:/api/fundings/achievement
   * @response `200` `GetHighAchievementFundingsData` (현재금액/목표금액)이 높은 순으로 정렬
   */
  getHighAchievementFundings = (params: RequestParams = {}) =>
    this.request<GetHighAchievementFundingsData, any>({
      path: `/api/fundings/achievement`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-board-controller
   * @name GetRewardList
   * @summary 펀딩 리워드 이름 목록 가져오기
   * @request GET:/api/funding/{fundingId}/rewards
   * @response `200` `GetRewardListData` 펀딩 리워드 이름 목록 가져오기 성공
   * @response `400` `ResponseDto` 존재하지 않는 게시물 또는 잘못된 요청
   */
  getRewardList = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetRewardListData, GetRewardListError>({
      path: `/api/funding/${fundingId}/rewards`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-board-controller
   * @name GetFunderList
   * @summary 후원자 명단 조회
   * @request GET:/api/funding/{fundingId}/funders
   * @secure
   * @response `200` `GetFunderListData` 후원자 명단 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getFunderList = (
    fundingId: number,
    query?: {
      /**
       *         latest: 최근 후원 순, oldest: 가입 오래된 순,
       *         idAsc: 아이디 오름차순, idDesc: 아이디 내림차순,
       *         nicknameAsc: 닉네임 오름차순, nicknameDesc: 닉네임 내림차순,
       *         emailAsc: 이메일 오름차순, emailAsc: 이메일 내림차순,
       *         adAsc: 주소 오름차순, adDesc: 주소 내림차순,
       *         phoneNumAsc: 전화번호 오름차순, phoneNumDesc: 전화번호 내림차순,
       * @default "latest"
       */
      sort?: string;
      /** 아이디로 검색 */
      id?: string;
      /**
       * 리워드 옵션 번호
       * @format int32
       * @example 0
       */
      rewardNo?: number;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 10
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetFunderListData, GetFunderListError>({
      path: `/api/funding/${fundingId}/funders`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-board-controller
   * @name GetFundingDashboard
   * @summary 펀딩 상황판 불러오기
   * @request GET:/api/funding/{fundingId}/dashboard
   * @secure
   * @response `200` `GetFundingDashboardData` 상황판 불러오기 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getFundingDashboard = (fundingId: number, params: RequestParams = {}) =>
    this.request<GetFundingDashboardData, GetFundingDashboardError>({
      path: `/api/funding/${fundingId}/dashboard`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags email-controller
   * @name ConfirmEmail
   * @summary 이메일 인증 확인
   * @request GET:/api/confirm-email
   * @response `200` `ConfirmEmailData` 이메일 인증 성공
   * @response `400` `ResponseDto` 잘못된 요청 - 존재하지 않는 사용자 - 유효하지 않은 토큰
   */
  confirmEmail = (
    query: {
      token: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ConfirmEmailData, ConfirmEmailError>({
      path: `/api/confirm-email`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name DeleteMain
   * @summary 메인사진 삭제
   * @request DELETE:/api/user/fundings/{funding_id}/story/del_main
   * @response `200` `DeleteMainData` 메인사진 삭제 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 삭제할 파일이 없을 때
   */
  deleteMain = (fundingId: number, params: RequestParams = {}) =>
    this.request<DeleteMainData, DeleteMainError>({
      path: `/api/user/fundings/${fundingId}/story/del_main`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name DeleteIDcard
   * @summary 신분증 삭제
   * @request DELETE:/api/user/fundings/{funding_id}/info/del_id_card
   * @response `200` `DeleteIDcardData` 신분증 삭제 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 삭제할 파일이 존재하지 않을 때
   */
  deleteIDcard = (fundingId: number, params: RequestParams = {}) =>
    this.request<DeleteIDcardData, DeleteIDcardError>({
      path: `/api/user/fundings/${fundingId}/info/del_id_card`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-story-controller
   * @name DeleteImage
   * @summary 소개사진 하나 삭제
   * @request DELETE:/api/user/fundings/story/image/{uuid_name}
   * @response `200` `DeleteImageResult` 소개사진 삭제 성공
   * @response `400` `ResponseDto` 파일이 존재하지 않을 때
   */
  deleteImage = (uuidName: string, params: RequestParams = {}) =>
    this.request<DeleteImageResult, DeleteImageFail>({
      path: `/api/user/fundings/story/image/${uuidName}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-reward-controller
   * @name DeleteReward
   * @summary 리워드 하나 삭제하기
   * @request DELETE:/api/user/fundings/reward/{reward_id}/delete
   * @response `200` `DeleteRewardData` 리워드 삭제 성공
   * @response `400` `ResponseDto` funding_id가 존재하지 않거나 삭제할 리워드 id가 존재하지 않을 때
   */
  deleteReward = (rewardId: number, params: RequestParams = {}) =>
    this.request<DeleteRewardData, DeleteRewardError>({
      path: `/api/user/fundings/reward/${rewardId}/delete`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name DeleteTag
   * @summary tag 삭제
   * @request DELETE:/api/user/fundings/info/{tag_id}/del_tag
   * @response `200` `DeleteTagData` tag 삭제 성공
   * @response `400` `ResponseDto` 삭제할 태그 id가 존재하지 않을 때
   */
  deleteTag = (tagId: number, params: RequestParams = {}) =>
    this.request<DeleteTagData, DeleteTagError>({
      path: `/api/user/fundings/info/${tagId}/del_tag`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-info-controller
   * @name DeleteDocument
   * @summary 심사서류 삭제
   * @request DELETE:/api/user/fundings/info/document/{uuid_name}
   * @response `200` `DeleteDocumentData` 심사서류 삭제 성공
   * @response `400` `ResponseDto` 삭제할 파일(uuid)이 존재하지 않을 때
   */
  deleteDocument = (uuidName: string, params: RequestParams = {}) =>
    this.request<DeleteDocumentData, DeleteDocumentError>({
      path: `/api/user/fundings/info/document/${uuidName}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags question-controller
   * @name DeleteQuestion
   * @summary 커뮤니티 질문 삭제
   * @request DELETE:/api/questions/{questionId}
   * @response `200` `DeleteQuestionData` 질문 삭제 성공
   */
  deleteQuestion = (questionId: number, params: RequestParams = {}) =>
    this.request<DeleteQuestionData, any>({
      path: `/api/questions/${questionId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags notification-controller
   * @name DeleteNotification
   * @summary 특정 알림 삭제
   * @request DELETE:/api/notifications/{notificationId}
   * @secure
   * @response `200` `DeleteNotificationData` 알림 삭제 성공
   * @response `404` `ResponseDto` 잘못된 요청 - 존재하지 않는 사용자 - 존재하지 않는 알림
   */
  deleteNotification = (notificationId: number, params: RequestParams = {}) =>
    this.request<DeleteNotificationData, DeleteNotificationError>({
      path: `/api/notifications/${notificationId}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags comment-controller
   * @name DeleteComment
   * @summary 커뮤니티 댓글 삭제
   * @request DELETE:/api/comments/{commentId}
   * @response `200` `DeleteCommentData` 댓글 삭제 성공
   */
  deleteComment = (commentId: number, params: RequestParams = {}) =>
    this.request<DeleteCommentData, any>({
      path: `/api/comments/${commentId}`,
      method: 'DELETE',
      ...params,
    });

  /**
   * No description
   * @name checkPermission
   * @summary 커뮤니티 댓글 삭제
   * @request get:/api/funding/{fundingId}/check-permission
   * @response `200` `true` 게시물에 대한 권한 확인
   */
  checkPermission = (fundingId: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/funding/${fundingId}/check-permission`,
      method: 'GET',
      ...params,
    });

  /**
   * No description
   * @name checkBeforePayment
   * @summary 결제버튼 누르기
   * @request post: /api/funding/pay
   * @response `200` `true` 게시물에 대한 권한 확인
   */
  checkBeforePayment = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/funding/pay`,
      method: 'POST',
      ...params,
    });

  /**
   * No description
   * @name paymentSucess
   * @summary 결제버튼 누르기
   * @request post: /api/funding/funding_Id/pay/success
   * @response `200` `true` 게시물에 대한 권한 확인
   */
  paymentSucess = (fundingId: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/funding/${fundingId}/pay/success`,
      type: ContentType.Json,
      method: 'POST',
      ...params,
    });

  /** 채팅 관련 api
   * No description
   *
   * @tags chat-room-controller
   * @name GetChatRoomList
   * @summary 채팅방 조회(사용자 - 관리자와의 채팅방을 가져옴, 관리자 - 메시지가 존재하는 사용자들에 대해 채팅방을 가져옴)
   * @request GET:/api/v1/rooms
   * @response `200` `GetChatRoomListDto` 채팅방 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getChatRoomList = (
    query?:{ page?: number; size?: number }, 
    params: RequestParams = {}
  ) =>
    this.request<GetChatRoomListDto, GetChatRoomListError>({
      path: `/api/v1/rooms`,
      method: 'GET',
      secure: true,
      query: query,
      ...params,
    });

/**
 * No description
 *
 * @tags chat-message-controller
 * @name GetChatMessages
 * @summary 특정 채팅방의 메시지 목록을 불러오기
 * @request GET:/api/v1/rooms/{chatRoomId}/messages
 * @response `200` `GetChatMessagesResponse` 특정 채팅방에 대한 메시지 가져오기 성공
 * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
 */
getChatMessages = (
  chatRoomId: number,
  query?:{
    page?: number; 
    size?: number;
  },
  params: RequestParams = {}
) =>
  this.request<GetChatMessagesResponse, GetChatMessagesError>({
    path: `/api/v1/rooms/${chatRoomId}/messages`,
    method: 'GET',
    secure: true,
    query: query,
    ...params,
  });

  private socket: WebSocket | null = null;
  private isWebSocketOpen = false;
  /**
   * No description
   *
   * @tags chat-controller
   * @name SendMessage
   * @summary 채팅방에 메시지를 전송
   * @request MESSAGE:/chat/rooms/{roomId}/send
   * @response `200` `ChatMessageResponse` 메시지 전송 성공
   */
  sendMessage = (roomId: number, chatMessageRequest: ChatMessageRequest) => {
    if (!this.socket || !this.isWebSocketOpen || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open(sendMessage error)');
    }

    // WebSocket으로 메시지 전송
    const message = {
      roomId,
      ...chatMessageRequest,
    };
    this.socket.send(JSON.stringify(message));
  };

  // WebSocket 초기화
  initializeWebSocket = () => {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket이 이미 연결되어 있습니다.');
      return;
    }
    
    
    try {
      this.socket = new WebSocket('ws://localhost:8080/chat');

      this.socket.onopen = () => {
        console.log('WebSocket 연결 성공(api)');
        this.isWebSocketOpen = true; 
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('새 메시지 수신:', message);
      };

      this.socket.onclose = () => {
        console.log('WebSocket 연결이 종료되었습니다');
        this.isWebSocketOpen = false;
        this.socket = null;
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket 에러:', error);
        this.isWebSocketOpen = false;
        this.socket = null;
      };
    } catch (error) {
      console.error('WebSocket 초기화 중 오류 발생:', error);
      this.socket = null;
    };
  };

  getWebSocketState() {
    // if (this.socket) {
    //   return this.socket.readyState;
    // }
    // return WebSocket.CLOSED;
    return this.isWebSocketOpen;
  };

  getSocket() {
    return this.socket;
  };
}
