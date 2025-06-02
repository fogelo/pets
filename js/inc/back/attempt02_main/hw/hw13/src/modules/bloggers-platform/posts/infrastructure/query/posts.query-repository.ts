import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModelType } from '../../domain/post.entity';
import { NotFoundException } from '@nestjs/common';
import {
  Blog,
  BlogDocument,
  BlogModelType,
} from 'src/modules/bloggers-platform/blogs/domain/blog.entity';
import { PostViewDto } from '../../api/view-dto/posts.view-dto';
import { GetPostsQueryParams } from '../../api/input-dto/get-posts-query-params.input-dto';
import { FilterQuery } from 'mongoose';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { SortDirection } from 'src/core/dto/base.query-params.input-dto';
import { PostsSortBy } from '../../api/input-dto/posts-sort-by';

export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    @InjectModel(Blog.name) private BlogModel: BlogModelType,
  ) {}
  async getById(id: string) {
    const post = await this.PostModel.findOne({ _id: id, deletedAt: null });
    if (!post) {
      throw new NotFoundException('post not found');
    }

    const blog = await this.BlogModel.findOne({
      _id: post.blogId,
      deletedAt: null,
    });
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return PostViewDto.mapToView(post, blog);
  }
  async getAll(
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const filter: FilterQuery<Post> = {
      deletedAt: null,
    };

    const posts = await this.PostModel.find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize)
      .exec();

    const totalCount = await this.PostModel.countDocuments(filter);

    const postViewDtos: PostViewDto[] = [];
    for (const post of posts) {
      const blog = await this.BlogModel.findOne({
        _id: post.blogId,
        deletedAt: null,
      });
      if (blog) {
        postViewDtos.push(PostViewDto.mapToView(post, blog));
      }
    }

    return PaginatedViewDto.mapToView<PostViewDto[]>({
      items: postViewDtos,
      page: query.pageNumber,
      pagesCount: Math.ceil(totalCount / query.pageSize),
      pageSize: query.pageSize,
      totalCount,
    });
  }
  async getPostsByBlogId(
    blogId: string,
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const blog = await this.BlogModel.findOne({
      _id: blogId,
      deletedAt: null,
    });
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    const filter: FilterQuery<Post> = {
      blogId,
      deletedAt: null,
    };

    const posts = await this.PostModel.find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize)
      .exec();

    const totalCount = await this.PostModel.countDocuments(filter);

    const postViewDtos: PostViewDto[] = [];
    for (const post of posts) {
      const blog = await this.BlogModel.findOne({
        _id: post.blogId,
        deletedAt: null,
      });
      if (blog) {
        postViewDtos.push(PostViewDto.mapToView(post, blog));
      }
    }

    return PaginatedViewDto.mapToView<PostViewDto[]>({
      items: postViewDtos,
      page: query.pageNumber,
      pagesCount: Math.ceil(totalCount / query.pageSize),
      pageSize: query.pageSize,
      totalCount,
    });
  }
  async getAllPosts(query: GetPostsQueryParams): Promise<any> {
    const filter: FilterQuery<Post> = {
      deletedAt: null,
    };

    const pipeline: any[] = [
      { $match: filter },

      // добавляем временное поле с ObjectId(), чтобы найти по id
      {
        $addFields: {
          blogObjectId: { $toObjectId: '$blogId' },
        },
      },
      // джойн к блогам
      {
        $lookup: {
          from: 'blogs',
          localField: 'blogObjectId',
          foreignField: '_id',
          as: 'blogData',
        },
      },
      { $unwind: '$blogData' },
    ];

    const posts = await this.PostModel.aggregate<
      PostDocument & { blogData: BlogDocument }
    >(pipeline).exec();

    // добавление в pipline сортировки
    const direction = query.sortDirection === SortDirection.Asc ? 1 : -1;
    if (query.sortBy === PostsSortBy.BlogName) {
      pipeline.push({ $sort: { 'blogData.name': direction } });
    } else {
      pipeline.push({ $sort: { [query.sortBy]: direction } });
    }

    // добавление в pipline пагинации
    pipeline.push({ $skip: query.calculateSkip() }, { $limit: query.pageSize });

    const totalCount = await this.PostModel.countDocuments(filter);

    const postViewDtos: PostViewDto[] = posts.map((post) =>
      PostViewDto.mapToView(post, post.blogData),
    );

    return PaginatedViewDto.mapToView<PostViewDto[]>({
      items: postViewDtos,
      page: query.pageNumber,
      pagesCount: Math.ceil(totalCount / query.pageSize),
      pageSize: query.pageSize,
      totalCount,
    });
    return posts;
  }
}
