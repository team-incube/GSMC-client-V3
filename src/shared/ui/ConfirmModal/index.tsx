import Button from '@/shared/ui/Button';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <ModalWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-h3 font-bold text-gray-900">{title}</h2>
          <p className="text-body1 text-gray-700">{message}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="border" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="active" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
