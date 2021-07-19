import { Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {
  }

  @Post('/:id')
  addLike(@Param('id') travelId: number, @Headers('token') token: string) {
    return this.likeService.like(Number(travelId), token);
  }

  @Get()
  isLiked(@Param('id') travelId: number, @Headers('token') token: string) {
    return this.likeService.isLiked(travelId, token);
  }
}
