'use client';

import Button from '@/shared/ui/Button';
import ImageUploader from '@/shared/ui/ImageUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';

export default function ProjectForm() {
  return (
    <form className="flex flex-col gap-16">
      <div className="flex flex-col gap-6">
        <Input name="title" placeholder="주제를 입력해주세요" label="주제" />
        <Textarea name="content" placeholder="내용을 입력해주세요" label="내용" />
        <ImageUploader label="이미지" placeholder="파일첨부" />
      </div>
      <div className="flex flex-col gap-[10px]">
        <Button variant="border">임시저장</Button>
        <Button>작성 완료</Button>
      </div>
    </form>
  );
}
