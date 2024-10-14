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
  DeleteImageData,
  DeleteImageError,
  GetImageData,
  GetImageError,
  ViewDocumentData,
  ViewImageData,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class File<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags profile-file-controller
   * @name GetImage
   * @summary 프로필 이미지 불러오기
   * @request GET:/file/{fileName}
   * @response `200` `GetImageData` 프로필 이미지 불러오기 성공
   * @response `400` `CustomException` 존재하지 않는 이미지 또는 잘못된 요청
   */
  getImage = (fileName: string, params: RequestParams = {}) =>
    this.request<GetImageData, GetImageError>({
      path: `/file/${fileName}`,
      method: 'GET',
      format: 'blob',
      ...params,
    });
  /**
   * No description
   *
   * @tags profile-file-controller
   * @name DeleteImage
   * @summary 프로필 이미지 삭제하기
   * @request DELETE:/file/{fileName}
   * @secure
   * @response `200` `DeleteImageData` 프로필 이미지 삭제 성공
   * @response `400` `CustomException` 존재하지 않는 이미지 또는 잘못된 요청
   */
  deleteImage = (fileName: string, params: RequestParams = {}) =>
    this.request<DeleteImageData, DeleteImageError>({
      path: `/file/${fileName}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-file-controller
   * @name ViewDocument
   * @request GET:/file/view/project_document/{file_name}
   * @response `200` `ViewDocumentData` OK
   */
  viewDocument = (fileName: string, params: RequestParams = {}) =>
    this.request<ViewDocumentData, any>({
      path: `/file/view/project_document/${fileName}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags funding-file-controller
   * @name ViewImage
   * @request GET:/file/view/funding_image/{file_name}
   * @response `200` `ViewImageData` OK
   */
  viewImage = (fileName: string, params: RequestParams = {}) =>
    this.request<ViewImageData, any>({
      path: `/file/view/funding_image/${fileName}`,
      method: 'GET',
      ...params,
    });
}
