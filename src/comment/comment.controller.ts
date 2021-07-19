import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentDto } from "../dto/CommentDto";

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService
  ) {
  }

  @Get('all')
  getAll() {
    return this.commentService.getAll();
  }

  @Post()
  write(@Headers('token') token: string, @Body() comment: CommentDto) {
    return this.commentService.write(token, comment);
  }
}
