import Modal from './Modal'

type Props = {
  open: boolean
  title?: string
  message: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({
  open,
  title = 'Confirmar',
  message,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          className="px-3 py-2 rounded-lg border"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-blue-600 text-white"
          onClick={onConfirm}
        >
          Sí, continuar
        </button>
      </div>
    </Modal>
  )
}
