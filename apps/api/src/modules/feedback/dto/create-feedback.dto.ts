import {
  IsString,
  IsEmail,
  IsEnum,
  MaxLength,
  Min,
  Max,
  Length,
  IsOptional,
  IsNotEmpty,
  Matches
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FeedbackCategory } from "./feedback-category.enum";

export class CreateFeedbackDto {
  @ApiPropertyOptional({ example: "Yash" })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @ApiPropertyOptional({ example: "yashvaddi@gmail.com" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ enum: FeedbackCategory })
  @IsEnum(FeedbackCategory)
  category: FeedbackCategory;

  @ApiProperty({ example: "Great experience" })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'Comment cannot be only whitespace' })
  @MaxLength(1000)
  comment: string;

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 5 })
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}
