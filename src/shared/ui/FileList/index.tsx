import Link from 'next/link';

import { FileType } from '@/entities/file/model/file';

interface FileListProps {
  files: FileType[] | [];
  onRemove?: (fileId: number | string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold mb-2">첨부 파일 목록</h3>
      {files.map((file) => (
        <div className="flex justify-between items-center py-1 border-b border-gray-100" key={file.id}>
          <Link href={file.uri} className="text-sm text-gray-700 truncate max-w-[80%]">{file.originalName}</Link>
          {onRemove ? <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(file.id);
            }}
            className="text-xs text-red-500 hover:text-red-700 ml-2 cursor-pointer"
          >
            삭제
          </button> : null}
        </div>
      ))}
    </div>
  );
};

export default FileList;
