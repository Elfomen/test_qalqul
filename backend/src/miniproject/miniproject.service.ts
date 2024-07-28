import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MiniProject } from './miniproject.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDTO } from './dto/create-document.dto';

@Injectable()
export class MiniprojectService {
  constructor(
    @InjectRepository(MiniProject)
    private miniProjectRepo: Repository<MiniProject>,
  ) {}

  async getDocument(id: number) {
    return await this.miniProjectRepo.findOneBy({ id });
  }

  async getDocuments() {
    return await this.miniProjectRepo.find();
  }

  async updateDocumentContent(id: number, data: string) {
    const document = await this.miniProjectRepo.findOneBy({ id });

    if (!document) throw new NotFoundException('Document not found');

    document.data = data;

    const saved = await this.miniProjectRepo.save(document);

    return saved.data;
  }

  async updateDocumentName(id: number, newName: string) {
    const document = await this.miniProjectRepo.findOneBy({ id });

    if (document) {
      document.name = newName;
      const saved = await this.miniProjectRepo.save(document);

      return saved;
    }

    throw new NotFoundException('Document not found');
  }

  async deleteDocument(id: number) {
    return await this.miniProjectRepo.delete({ id });
  }

  async createDocument(data: CreateDocumentDTO) {
    const document = new MiniProject();
    document.name = data.name;
    document.data = '{}';
    document.createdOn = new Date();
    document.updatedOn = new Date();
    const saved = await this.miniProjectRepo.save(document);

    return saved;
  }
}
