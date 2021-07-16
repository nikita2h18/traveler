import { Controller, Headers, Param, Post } from "@nestjs/common";
import { LikeService } from "./like.service";

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {
  }

  @Post()
  addLike(@Param('id') travelId: number, @Headers('token') token: string) {
    return this.likeService.addLike(Number(travelId), token);
  }
}