import { Router } from "express";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { getBlogListHandler } from "./handlers/get-blog-list.handler";
import { getBlogPostListHandler } from "./handlers/get-blog-post-list.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { createBlogPostHandler } from "./handlers/create-blog-post.handler";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { blogValidation } from "./blog.input-dto.validation-middlewares";
import { paginationAndSortingValidation } from "../../../core/middlewares/query-pagination-sorting.validation-middleware";
import { BlogSortField } from "./input/blog-sort-field";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { PostSortField } from "../../posts/routes/input/post-sort-field";
import { createPostFromBlogValidation } from "../../posts/routes/post.input-dto.validation-middlewares";
import { superAdminGuardMiddleware } from "../../../core/middlewares/super-admin.guard-middleware";
import { query } from "express-validator";

export const blogsRouter: Router = Router({});

export const blogQueryValidation = [
  query("searchNameTerm").optional().isString(),
  // ... ваше paginationAndSortingValidation()
];

blogsRouter
  .get(
    "",
    blogQueryValidation,
    paginationAndSortingValidation(BlogSortField),
    inputValidationResultMiddleware,
    getBlogListHandler
  )
  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler)
  .post(
    "",
    superAdminGuardMiddleware,
    blogValidation(),
    inputValidationResultMiddleware,
    createBlogHandler
  )
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogValidation(),
    inputValidationResultMiddleware,
    updateBlogHandler
  )
  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler
  )
  .get(
    "/:id/posts",
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getBlogPostListHandler
  )
  .post(
    "/:id/posts",
    superAdminGuardMiddleware,
    idValidation,
    createPostFromBlogValidation(),
    inputValidationResultMiddleware,
    createBlogPostHandler
  );
