import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  data: string;
}
