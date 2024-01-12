import { Request } from "express";

export enum Status {
  Ok_200 = 200,
  Created_201 = 201,
  NoContent_204 = 204,
  BadRequest_400 = 400,
  Unauthorized_401 = 401,
  NotFound_404 = 404,
}

export interface IError {
  errorsMessages: IErrorMessage[];
}
export interface IErrorMessage {
  message: string;
  field: string;
}

// посты
export interface PostViewModel {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

export interface PostInputModel {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

// Requset
export type RequestWithBody<B> = Request<{}, {}, B>;
export type RequestWithParams<P> = Request<P>;
export type RequestWithBodyAndParams<P, B> = Request<P, {}, B>;


