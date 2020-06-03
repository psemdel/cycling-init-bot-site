import { Subscription } from 'rxjs/Subscription';

export class FileUploadModel {
      author: number;
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}