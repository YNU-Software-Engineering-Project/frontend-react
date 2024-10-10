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

import {
  ChangeFundingStateData,
  ChangeFundingStateError,
  ChangeUserStateData,
  ChangeUserStateError,
  GetAdminSummaryData,
  GetFundingByStateData,
  GetFundingByStateError,
  GetFundingStateCountData,
  GetFundingStateCountError,
  GetUserList1Data,
  GetUserList1Error,
  GetUserListData,
  GetUserListError,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Admin<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags admin-controller
   * @name GetUserList1
   * @summary 특정 회원 조회
   * @request GET:/admin/user/{userId}
   * @secure
   * @response `200` `GetUserList1Data` 특정 회원 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getUserList1 = (userId: number, params: RequestParams = {}) =>
    this.request<GetUserList1Data, GetUserList1Error>({
      path: `/admin/user/${userId}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name ChangeUserState
   * @summary 회원 상태 변경
   * @request PATCH:/admin/user/{userId}
   * @secure
   * @response `200` `ChangeUserStateData` 회원 상태 변경 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  changeUserState = (
    userId: number,
    query: {
      /** 회원 상태 (USER: 일반 회원, SUSPENDED: 정지 회원) */
      role: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChangeUserStateData, ChangeUserStateError>({
      path: `/admin/user/${userId}`,
      method: 'PATCH',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name ChangeFundingState
   * @summary 펀딩 상태 변경
   * @request PATCH:/admin/funding/{fundingId}
   * @secure
   * @response `200` `ChangeFundingStateData` 펀딩 상태 변경 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  changeFundingState = (
    fundingId: number,
    query: {
      /** 펀딩 상태 (DRAFT: 작성 중, REVIEW: 심사 대기, REVIEW_COMPLETED: 심사 완료, ONGOING: 진행 중, CLOSED: 종료) */
      state: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChangeFundingStateData, ChangeFundingStateError>({
      path: `/admin/funding/${fundingId}`,
      method: 'PATCH',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name GetUserList
   * @summary 회원 명단 조회
   * @request GET:/admin/users
   * @secure
   * @response `200` `GetUserListData` 회원 명단 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getUserList = (
    query?: {
      /**
       *         noAsc: 번호 오름차순, noDesc: 번호 내림차순,
       *         idAsc: 아이디 오름차순, idDesc: 아이디 내림차순,
       *         nicknameAsc: 닉네임 오름차순, nicknameDesc: 닉네임 내림차순,
       *         emailAsc: 이메일 오름차순, emailAsc: 이메일 내림차순,
       *         phoneNumAsc: 전화번호 오름차순, phoneNumDesc: 전화번호 내림차순,
       *         adAsc: 주소 오름차순, adDesc: 주소 내림차순,
       *         latest: 최근 가입 순, oldest: 가입 오래된 순
       * @default "latest"
       */
      sort?: string;
      /** 아이디로 회원 검색 */
      id?: string;
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
    this.request<GetUserListData, GetUserListError>({
      path: `/admin/users`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-summary-controller
   * @name GetAdminSummary
   * @summary 관리자 요약 페이지 불러오기
   * @request GET:/admin/summary
   * @response `200` `GetAdminSummaryData` 요약 요소들 불러오기 성공
   */
  getAdminSummary = (params: RequestParams = {}) =>
    this.request<GetAdminSummaryData, any>({
      path: `/admin/summary`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name GetFundingByState
   * @summary 펀딩 상태에 따른 게시물 리스트 조회
   * @request GET:/admin/fundings
   * @secure
   * @response `200` `GetFundingByStateData` 펀딩 상태에 따른 게시물 리스트 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getFundingByState = (
    query: {
      /** 검색어 */
      keyword?: string;
      /** 펀딩 상태 (REVIEW: 심사 대기, REVIEW_COMPLETED: 심사 완료, ONGOING: 진행 중) */
      state: string;
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
    this.request<GetFundingByStateData, GetFundingByStateError>({
      path: `/admin/fundings`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-controller
   * @name GetFundingStateCount
   * @summary 펀딩 상태에 따른 게시물 수 조회
   * @request GET:/admin/fundings/state
   * @secure
   * @response `200` `GetFundingStateCountData` 펀딩 상태에 따른 게시물 수 조회 성공
   * @response `400` `ResponseDto` 접근 권한 없음 또는 잘못된 요청
   */
  getFundingStateCount = (params: RequestParams = {}) =>
    this.request<GetFundingStateCountData, GetFundingStateCountError>({
      path: `/admin/fundings/state`,
      method: 'GET',
      secure: true,
      ...params,
    });
}
