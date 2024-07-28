import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MiniprojectService } from './miniproject.service';
import { CreateDocumentDTO } from './dto/create-document.dto';

@Controller('miniproject')
export class MiniprojectController {
  constructor(private miniProjectService: MiniprojectService) {}

  @Post('/document')
  createDocument(@Body() data: CreateDocumentDTO) {
    return this.miniProjectService.createDocument(data);
  }

  @Put('/document/:id')
  updateDocument(
    @Body() { newName }: { newName: string },
    @Param('id') id: number,
  ) {
    return this.miniProjectService.updateDocumentName(id, newName);
  }

  @Delete('/document/:id')
  deleteDocument(@Param('id') id: number) {
    return this.miniProjectService.deleteDocument(id);
  }

  @Get('/documents')
  getDocuments() {
    return this.miniProjectService.getDocuments();
  }
}
