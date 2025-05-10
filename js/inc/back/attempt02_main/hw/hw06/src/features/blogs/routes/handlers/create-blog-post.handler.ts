import express from "express";
import { postsService } from "../../../posts/application/posts.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { PostCreateInput } from "../../../posts/routes/input/post-create.input";
import { mapToPostOutput } from "../../../posts/routes/mappers/map-to-post-output";
import { blogsService } from "../../application/blogs.service";

export const createBlogPostHandler = async (
  req: express.Request<{ id: string }, {}, PostCreateInput>,
  res: express.Response
) => {
  const blogId = req.params.id;
  const body = req.body;
  const dto = { ...body, blogId };
  const createdPostId = await postsService.create(dto);
  const createdPost = await postsService.findByIdOrFail(createdPostId);
  const blog = await blogsService.findByIdOrFail(blogId);
  const postOutput = mapToPostOutput(createdPost, blog);
  res.status(HttpStatus.Created).json(postOutput);
};
