import { Module } from '@nestjs/common';
import { SetupModule } from './setup/setup.module';

import { UserModule } from './modules/app/user/user.module';
import { CollectionModule } from './modules/app/collection/collection.module';
import { HistoryModule } from './modules/app/history/history.module';
import { ComicModule } from './modules/app/comic/comic.module';
import { ComicChapterModule } from './modules/app/comic-chapter/comic-chapter.module';
import { ComicChapterContentModule } from './modules/app/comic-chapter-content/comic-chapter-content.module';

@Module({
  imports: [
    SetupModule,
    UserModule,
    // CollectionModule,
    // HistoryModule,
    ComicModule,
    // ComicChapterModule,
    // ComicChapterContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
