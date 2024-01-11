import { Module } from '@nestjs/common';
import { SetupModule } from './setup/setup.module';

import { UserModule } from './modules/user/user.module';
import { CollectionModule } from './modules/collection/collection.module';
import { HistoryModule } from './modules/history/history.module';
import { ComicModule } from './modules/comic/comic.module';
import { ComicChapterModule } from './modules/comic-chapter/comic-chapter.module';
import { ComicChapterContentModule } from './modules/comic-chapter-content/comic-chapter-content.module';

@Module({
  imports: [
    SetupModule,
    UserModule,
    // CollectionModule,
    // HistoryModule,
    // ComicModule,
    // ComicChapterModule,
    // ComicChapterContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
