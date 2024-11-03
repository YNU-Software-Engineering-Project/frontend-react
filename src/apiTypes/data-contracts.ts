/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SubmitFundingResponseDto {
  code?: string;
  message?: string;
}

export interface ResponseDto {
  code?: string;
  message?: string;
}

export interface FundingStoryRequestDto {
  /**
   * @minLength 0
   * @maxLength 20
   */
  title?: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  summary?: string;
}

export interface UploadImageResponseDto {
  code?: string;
  message?: string;
  url?: string;
  uuid_name?: string;
}

export interface MakeRewardRequestDto {
  amount?: string;
  /**
   * @minLength 0
   * @maxLength 30
   */
  reward_name?: string;
  /**
   * @minLength 0
   * @maxLength 300
   */
  reward_description?: string;
  quantity?: string;
}

export interface MakeRewardResponseDto {
  code?: string;
  message?: string;
  /** @format int64 */
  reward_id?: number;
}

export interface PolicyRewardRequestDto {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  reward_info?: string;
}

export interface PolicyRefundRequestDto {
  /**
   * @minLength 0
   * @maxLength 1000
   */
  refund_policy?: string;
}

export interface InsertTagRequestDto {
  /**
   * @minLength 0
   * @maxLength 10
   */
  tagName?: string;
}

export interface InsertTagResponseDto {
  code?: string;
  message?: string;
  /** @format int64 */
  tag_id?: number;
}

export interface FundingInfoRequestDto {
  category?: string;
  organizer_name?: string;
  organizer_email?: string;
  tax_email?: string;
  start_date?: string;
  end_date?: string;
  target_amount?: string;
}

export interface UploadInfoFileResponseDto {
  code?: string;
  message?: string;
  orginalName?: string;
  uuid_name?: string;
  url?: string;
}

export interface DeleteFileResponseDto {
  code?: string;
  message?: string;
}

export interface EmailSendTokenRequestDto {
  email: string;
}

export interface RegisterResponseDto {
  code?: string;
  message?: string;
  /** @format int64 */
  funding_id?: number;
}

export interface QuestionRequestDto {
  content?: string;
}

export interface PasswordResetRequestDto {
  email: string;
  /** @pattern ^010-\d{3,4}-\d{4}$ */
  phoneNumber: string;
}

export interface PasswordResetResponseDto {
  code?: string;
  message?: string;
}

export interface FundingLikeRequestDto {
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  fundingId?: number;
}

export interface CommentRequestDto {
  content?: string;
}

export interface SignUpRequestDto {
  email: string;
  /**
   * 비밀번호는 8~20자이며, 숫자, 대문자, 소문자, 특수문자를 포함해야 합니다.
   * @pattern ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).{8,20}$
   */
  password: string;
  passwordConfirm: string;
  /** @pattern ^010-\d{3,4}-\d{4}$ */
  phoneNumber: string;
  inviteCode?: string;
}

export interface SignUpResponseDto {
  code?: string;
  message?: string;
  accessToken?: string;
  role?: 'ADMIN' | 'USER' | 'SUSPENDED';
}

export interface LoginRequestDto {
  email: string;
  /**
   * 비밀번호는 8~20자이며, 숫자, 대문자, 소문자, 특수문자를 포함해야 합니다.
   * @pattern ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=\S+$).{8,20}$
   */
  password: string;
}

export interface PatchUserProfileRequestDto {
  nickname?: string;
  password?: string;
  confirmPassword?: string;
  /** 우편번호 */
  postalCode?: string;
  /** 도로명 주소 */
  roadAddress?: string;
  /** 지번 주소 */
  landLotAddress?: string;
  /** 상세 주소 */
  detailAddress?: string;
}

export interface PatchPhoneNumberRequestDto {
  /**
   * 휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.
   * @pattern ^010-\d{3,4}-\d{4}$
   */
  phoneNumber: string;
}

export interface CustomException {
  cause?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      className?: string;
      nativeMethod?: boolean;
    }[];
    message?: string;
    suppressed?: {
      stackTrace?: {
        classLoaderName?: string;
        moduleName?: string;
        moduleVersion?: string;
        methodName?: string;
        fileName?: string;
        /** @format int32 */
        lineNumber?: number;
        className?: string;
        nativeMethod?: boolean;
      }[];
      message?: string;
      localizedMessage?: string;
    }[];
    localizedMessage?: string;
  };
  stackTrace?: {
    classLoaderName?: string;
    moduleName?: string;
    moduleVersion?: string;
    methodName?: string;
    fileName?: string;
    /** @format int32 */
    lineNumber?: number;
    className?: string;
    nativeMethod?: boolean;
  }[];
  code?: string;
  message?: string;
  suppressed?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      className?: string;
      nativeMethod?: boolean;
    }[];
    message?: string;
    localizedMessage?: string;
  }[];
  localizedMessage?: string;
}

export interface GetUserProfileResponseDto {
  code?: string;
  message?: string;
  data?: UserProfileDataDto;
}

export interface UserProfileDataDto {
  profileImage?: string;
  nickname?: string;
  id?: string;
  phoneNumber?: string;
  schoolEmail?: string;
  /** 우편번호 */
  postalCode?: string;
  /** 도로명 주소 */
  roadAddress?: string;
  /** 지번 주소 */
  landLotAddress?: string;
  /** 상세 주소 */
  detailAddress?: string;
}

export interface FundingDataDto {
  /** @format int64 */
  fundingId?: number;
  /** 회원 프로필 이미지 */
  profileImage?: string;
  title?: string;
  /** 게시물 메인 이미지 */
  mainImage?: string;
  projectSummary?: string;
  tag?: string[];
  /** @format int32 */
  achievementRate?: number;
  state?: string;
  liked?: boolean;
}

export interface GetFundingListResponseDto {
  code?: string;
  message?: string;
  data?: FundingDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
}

export interface GetMyFundingListResponseDto {
  code?: string;
  message?: string;
  data?: ShortFundingDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  todayAmount?: number;
  /** @format int32 */
  todayLikes?: number;
}

export interface ShortFundingDataDto {
  /** @format int64 */
  fundingId?: number;
  title?: string;
  mainImage?: string;
  state?: string;
}

export interface GetFundingMainResponseDto {
  code?: string;
  message?: string;
  main_url?: string;
  funding_title?: string;
}

export interface GetProjectResponseDto {
  code?: string;
  message?: string;
  title?: string;
  main_url?: string;
  main_uuid?: string;
  image_url?: string[];
  image_uuid?: string[];
  summary?: string;
}

export interface GetMRewardResponseDto {
  code?: string;
  message?: string;
  amount?: string[];
  reward_name?: string[];
  reward_description?: string[];
  quantity?: string[];
  reward_id?: number[];
}

export interface GetPolicyResponseDto {
  code?: string;
  message?: string;
  refund_policy?: string;
  reward_info?: string;
}

export interface GetInfoResponseDto {
  code?: string;
  message?: string;
  category?: string;
  tag?: string[];
  tag_id?: number[];
  idCard_url?: string;
  idCard_uuid?: string;
  organizer_name?: string;
  organizer_email?: string;
  tax_email?: string;
  document_url?: string[];
  document_name?: string[];
  document_uuid?: string[];
  start_date?: string;
  end_date?: string;
  target_amount?: string;
}

export interface QuestionResponseDto {
  /** @format int64 */
  questionId?: number;
  content?: string;
  nickname?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format int32 */
  commentCount?: number;
}

export interface GetNotificationsResponseDto {
  code?: string;
  message?: string;
  data?: NotificationDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
}

export interface NotificationDataDto {
  /** @format int64 */
  notificationId?: number;
  message?: string;
  createdAt?: string;
}

export interface FundingDetailsResponseDto {
  rewardInfo?: string;
  refundPolicy?: string;
  /** @format int32 */
  targetAmount?: number;
  /** @format double */
  achievementRate?: number;
  /** @format int32 */
  remainingDays?: number;
  /** @format int64 */
  supporterCount?: number;
  story?: string;
  /** @format int32 */
  currentAmount?: number;
}

export interface RewardListResponseDto {
  /** @format int64 */
  rewardId?: number;
  /** @format int32 */
  amount?: number;
  rewardName?: string;
  rewardDescription?: string;
  /** @format int32 */
  quantity?: number;
}

export interface FundingSortResponseDto {
  /** @format int64 */
  fundingId?: number;
  profileImage?: string;
  title?: string;
  mainImage?: string;
  /** @format int32 */
  achievementRate?: number;
  /** @format date-time */
  createdAt?: string;
  current?: 'DRAFT' | 'REVIEW' | 'REVIEW_COMPLETED' | 'ONGOING' | 'CLOSED';
  details?: string;
  tag?: string[];
  likedByCurrentUser?: boolean;
}

export interface GetRewardListResponseDto {
  code?: string;
  message?: string;
  data?: RewardDataDto[];
  /** @format int32 */
  totalElements?: number;
}

export interface RewardDataDto {
  /** @format int32 */
  no?: number;
  rewardName?: string;
}

export interface FunderDataDto {
  createdAt?: string;
  id?: string;
  nickname?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  rewards?: string[];
}

export interface GetFunderListResponseDto {
  code?: string;
  message?: string;
  data?: FunderDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
}

export interface FundingDashboardResponseDto {
  /** @format int64 */
  fundingId?: number;
  title?: string;
  /** @format int32 */
  remainingDays?: number;
  /** @format int32 */
  todayVisitors?: number;
  /** @format int32 */
  totalVisitors?: number;
  /** @format double */
  todayPercentage?: number;
  /** @format int32 */
  todayLikes?: number;
  /** @format int32 */
  totalLikes?: number;
  /** @format double */
  totalPercentage?: number;
  /** @format int32 */
  currentAmount?: number;
  /** @format int32 */
  targetAmount?: number;
  /** @format double */
  fundingAchievementRate?: number;
}

export interface EmailVerificationResponseDto {
  code?: string;
  message?: string;
}

export interface CommentResponseDto {
  /** @format int64 */
  commentId?: number;
  content?: string;
  nickname?: string;
  /** @format date-time */
  createdAt?: string;
}

export interface GetUserListResponseDto {
  code?: string;
  message?: string;
  data?: UserDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
}

export interface UserDataDto {
  /** @format int32 */
  no?: number;
  /** @format int64 */
  userId?: number;
  id?: string;
  nickname?: string;
  schoolEmail?: string;
  address?: string;
  phoneNumber?: string;
  createdAt?: string;
}

export interface GetUserInfoResponseDto {
  code?: string;
  message?: string;
  data?: UserInfoDataDto;
}

export interface UserInfoDataDto {
  /** @format int64 */
  user_id?: number;
  id?: string;
  nickname?: string;
  schoolEmail?: string;
  phoneNumber?: string;
  /** 우편번호 */
  postalCode?: string;
  /** 도로명 주소 */
  roadAddress?: string;
  /** 지번 주소 */
  landLotAddress?: string;
  /** 상세 주소 */
  detailAddress?: string;
  role?: 'ADMIN' | 'USER' | 'SUSPENDED';
}

export interface AdminSummaryDto {
  /** @format int64 */
  totalUsers?: number;
  /** @format int64 */
  todayUsers?: number;
  /** @format double */
  averageFundingLikes?: number;
  /** @format double */
  averageFundingAmount?: number;
  /** @format int64 */
  totalFundings?: number;
  /** @format int64 */
  closedFundings?: number;
  /** @format double */
  successRate?: number;
  /** @format int64 */
  ongoingFundings?: number;
  /** @format int64 */
  successfulFundings?: number;
  /** @format int64 */
  failedFundings?: number;
}

export interface GetFundingByStateResponseDto {
  code?: string;
  message?: string;
  data?: ShortFundingDataDto[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
}

export interface FundingStateDto {
  /**
   * 심사 대기 게시물 수
   * @format int64
   */
  review?: number;
  /**
   * 심사 완료 게시물 수
   * @format int64
   */
  reviewCompleted?: number;
  /**
   * 진행 중인 게시물 수
   * @format int64
   */
  onGoing?: number;
}

export interface GetFundingStateCountResponseDto {
  code?: string;
  message?: string;
  data?: FundingStateDto;
}

export interface DeleteDataResponseDto {
  code?: string;
  message?: string;
}

export type SubmitFundingData = SubmitFundingResponseDto;

export type SubmitFundingError = ResponseDto;

export type ModifyProjectData = ResponseDto;

export type ModifyProjectError = ResponseDto;

export interface UploadMainPayload {
  /** @format binary */
  file: File;
}

export type UploadMainData = UploadImageResponseDto;

export type UploadMainError = ResponseDto;

export interface UploadImagesPayload {
  /** @format binary */
  file: File;
}

export type UploadImagesData = UploadImageResponseDto;

export type UploadImagesError = ResponseDto;

export type InsertRewardData = MakeRewardResponseDto;

export type InsertRewardError = ResponseDto;

export type InsertRewardIInfoData = ResponseDto;

export type InsertRewardIInfoError = ResponseDto;

export type InsertRefundPolicyData = ResponseDto;

export type InsertRefundPolicyError = ResponseDto;

export type InsertTagData = InsertTagResponseDto;

export type InsertTagError = ResponseDto;

export type ModifyInfoData = ResponseDto;

export type ModifyInfoError = ResponseDto;

export interface UploadIDcardPayload {
  /** @format binary */
  file: File;
}

export type UploadIDcardData = UploadInfoFileResponseDto;

export type UploadIDcardError = ResponseDto;

export interface UploadDocumentPayload {
  /** @format binary */
  file: File;
}

export type UploadDocumentData = UploadInfoFileResponseDto;

export type UploadDocumentError = ResponseDto;

export type GiveupFundingData = DeleteFileResponseDto;

export type GiveupFundingError = ResponseDto;

export type SendEmailTokenData = ResponseDto;

export type SendEmailTokenError = ResponseDto;

export type RegisterFundingData = RegisterResponseDto;

export type RegisterFundingError = ResponseDto;

export type GetQuestionsByFundingData = QuestionResponseDto[];

export type CreateQuestionData = string;

export type ResetPasswordData = ResponseDto;

export type ResetPasswordError = PasswordResetResponseDto;

export type ToggleFundingLikeData = ResponseDto;

export type GetCommentsByQuestionData = CommentResponseDto[];

export type CreateCommentData = string;

export type SignupData = SignUpResponseDto;

export type SignupError = ResponseDto;

// export type LoginData = LoginRequestDto;
export type LoginData = SignUpResponseDto;

export type LoginError = ResponseDto;

export interface ModifyProfilePayload {
  /** @format binary */
  profileImage?: File;
  userInfo: PatchUserProfileRequestDto;
}

export type ModifyProfileData = ResponseDto;

export type ModifyProfileError = ResponseDto;

export type ModifyPhoneNumberData = ResponseDto;

export type ModifyPhoneNumberError = ResponseDto;

export type GetUserList1Data = GetUserInfoResponseDto;

export type GetUserList1Error = ResponseDto;

export type ChangeUserStateData = ResponseDto;

export type ChangeUserStateError = ResponseDto;

export type ChangeFundingStateData = ResponseDto;

export type ChangeFundingStateError = ResponseDto;

/** @format binary */
export type GetImageData = File;

export type GetImageError = CustomException;

export type DeleteImageData = ResponseDto;

export type DeleteImageError = CustomException;

/** @format binary */
export type ViewDocumentData = File;

/** @format binary */
export type ViewImageData = File;

export type GetUserProfileData = GetUserProfileResponseDto;

export type GetUserProfileError = ResponseDto;

export type GetWishListData = GetFundingListResponseDto;

export type GetWishListError = ResponseDto;

export type GetPledgeListData = GetFundingListResponseDto;

export type GetPledgeListError = ResponseDto;

export type GetMyFundingListData = GetMyFundingListResponseDto;

export type GetMyFundingListError = ResponseDto;

export type GetFundingMainData = GetFundingMainResponseDto;

export type GetFundingMainError = ResponseDto;

export type GetProjectData = GetProjectResponseDto;

export type GetProjectError = ResponseDto;

export type GetRewardData = GetMRewardResponseDto;

export type GetRewardError = ResponseDto;

export type GetPolicyData = GetPolicyResponseDto;

export type GetPolicyError = ResponseDto;

export type GetInfoData = GetInfoResponseDto;

export type GetInfoError = ResponseDto;

export type RegisterData = ResponseDto;

export type RegisterError = ResponseDto;

export type GetNotificationsData = GetNotificationsResponseDto;

export type GetNotificationsError = ResponseDto;

export type DeleteNotificationsData = ResponseDto;

export type DeleteNotificationsError = ResponseDto;

export type SearchFundingData = GetFundingListResponseDto;

export type SearchFundingError = ResponseDto;

export type GetFundingStoryData = FundingDetailsResponseDto;

export type GetFundingStoryError = ResponseDto;

export type GetRewardInfoData = FundingDetailsResponseDto;

export type GetRewardInfoError = ResponseDto;

export type GetRewordsByFundingIdData = RewardListResponseDto;

export type GetRewordsByFundingIdError = ResponseDto;

export type GetfundPolicyData = FundingDetailsResponseDto;

export type GetfundPolicyError = ResponseDto;

export type GetTop3PopularFundingsData = FundingSortResponseDto[];

export type GetSmallFundingsData = FundingSortResponseDto[];

export type GetNewFundingsData = FundingSortResponseDto[];

export type GetHighAchievementFundingsData = FundingSortResponseDto[];

export type GetRewardListData = GetRewardListResponseDto;

export type GetRewardListError = ResponseDto;

export type GetFunderListData = GetFunderListResponseDto;

export type GetFunderListError = ResponseDto;

export type GetFundingDashboardData = FundingDashboardResponseDto;

export type GetFundingDashboardError = ResponseDto;

export type ConfirmEmailData = EmailVerificationResponseDto;

export type ConfirmEmailError = ResponseDto;

export type GetUserListData = GetUserListResponseDto;

export type GetUserListError = ResponseDto;

export type GetAdminSummaryData = AdminSummaryDto;

export type GetFundingByStateData = GetFundingByStateResponseDto;

export type GetFundingByStateError = ResponseDto;

export type GetFundingStateCountData = GetFundingStateCountResponseDto;

export type GetFundingStateCountError = ResponseDto;

export type DeleteMainData = DeleteFileResponseDto;

export type DeleteMainError = ResponseDto;

export type DeleteIDcardData = DeleteFileResponseDto;

export type DeleteIDcardError = ResponseDto;

export type DeleteImageResult = DeleteFileResponseDto;

export type DeleteImageFail = ResponseDto;

export type DeleteRewardData = DeleteDataResponseDto;

export type DeleteRewardError = ResponseDto;

export type DeleteTagData = DeleteDataResponseDto;

export type DeleteTagError = ResponseDto;

export type DeleteDocumentData = DeleteFileResponseDto;

export type DeleteDocumentError = ResponseDto;

export type DeleteQuestionData = string;

export type DeleteNotificationData = ResponseDto;

export type DeleteNotificationError = ResponseDto;

export type DeleteCommentData = string;
