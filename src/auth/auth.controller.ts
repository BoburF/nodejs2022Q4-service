import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

@Controller("auth")
export class AuthController {
  @Post("signup")
  sign(){

  }
}