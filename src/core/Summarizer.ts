// import { ReplaySubject } from 'rxjs';
// import { FileCreated } from './watcher/Events';

// const fileCreated$ = new ReplaySubject<FileCreated>();

// const onCreate = (fileCreated$: ReplaySubject<FileCreated>, fileInfo: FileInfo): FileCreated => {
//   filesCreated$.next(fileInfo);
// };

// export const watchFiles = (watcher: FileSystemWatcher, globPattern: string) => {
//   FileSystemWatcher.createFileSystemWatcher(globPattern, onCreate, onUpdate, onDelete);
// };
