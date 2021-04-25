import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { OverlaidPortal } from 'src/overlays/OverlaidProtal'
import { isClient, isServer } from 'src/utils'

export interface ModalProps {
  title: React.ReactNode
  opener?: React.ReactElement<{ onClick: () => void }>
  zIndex: number
  children: React.ReactNode
  subTitle?: React.ReactNode
  successText?: string
  className?: string
  successAttributes?: any
  cancelText?: string
  cancelAttributes?: any
  closeable?: boolean
  hideScroll?: boolean
  noSSR?: boolean
  removeContentPadding: boolean
  modalStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  onOpen?: () => boolean | void
  onClose?: () => void
  onSuccess?: (close: () => void) => void
  onCancel?: (close: () => void) => void
  scrollbarWidth: number
}

const Modal: FC<ModalProps> = ({
  title,
  opener,
  zIndex,
  children,
  subTitle,
  successText,
  className,
  successAttributes,
  cancelText,
  cancelAttributes,
  closeable = false,
  hideScroll = false,
  noSSR = false,
  removeContentPadding,
  modalStyle,
  contentStyle,
  onOpen,
  onClose,
  onSuccess,
  onCancel,
  scrollbarWidth,
}) => {
  const [opened, setOpened] = useState(true)

  const disableBodyScroll = () => {
    if (isClient()) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    }
  }

  const enableBodyScroll = () => {
    if (isClient()) {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }

  const showModal = () => {
    if (!onOpen || onOpen() !== false) {
      setOpened(true)
    }
  }

  const hideModal = () => {
    setOpened(false)
    const modalEl = document.querySelectorAll('.ui-modal')
    if (modalEl.length > 0) {
      modalEl.forEach((el) => el?.parentElement?.removeChild(el))
    }
  }

  const blockPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  const handleCloseModal = () => {
    if (opener) {
      hideModal()
    }
    onClose ? onClose() : hideModal()
  }

  const handleCancelModal = () => {
    onCancel ? onCancel(hideModal) : hideModal()
  }

  const handleSuccessModal = () => {
    onSuccess ? onSuccess(hideModal) : hideModal()
  }

  if (isServer()) {
    return <></>
  }

  console.log(opened)

  return (
    opened && (
      <Dialog visible={opened} onClick={() => {}} style={modalStyle} className={className}>
        <DialogHead>
          <button type='button' onClick={hideModal}>
            버튼
          </button>
          <DialogTitle>{title}</DialogTitle>
          {/*{closeable && (*/}
          {/*  <IconButton icon={<Close />} onClick={handleCloseModal} fillColor={gray900} color='transparent' />*/}
          {/*)}*/}
        </DialogHead>
        {subTitle && <DialogSubTitle>{subTitle}</DialogSubTitle>}
        <DialogBody style={contentStyle} hideScroll={hideScroll} removeContentPadding={removeContentPadding}>
          {children}
        </DialogBody>
        <DialogFooter>
          {cancelText && (
            <DialogFooterButton onClick={handleCancelModal} {...cancelAttributes}>
              {cancelText}
            </DialogFooterButton>
          )}
          {successText && (
            <DialogFooterButton onClick={handleSuccessModal} {...successAttributes}>
              {successText}
            </DialogFooterButton>
          )}
        </DialogFooter>
      </Dialog>
    )
  )
}

export default Modal

export const create = async (container: HTMLElement = document.body, modalComponent: any) => {
  const containerElement = document.createElement('div')
  containerElement.className = 'ui-modal'
  container.appendChild(containerElement)
  await ReactDOM.render(modalComponent, containerElement)
}

const StyledOverlaidPortal = styled(OverlaidPortal)<{ opened: boolean }>`
  transition: ${(props) => !props.opened && 'visibility 0s linear 225ms,'} opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)
    1000ms;
`

const Dialog = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 32px;
  min-width: 720px;
  max-width: 1280px;
  min-height: 360px;
  max-height: 800px;
  border-radius: 8px;
  background-color: #fff;
  box-sizing: border-box;
`

const DialogHead = styled.div`
  flex: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`

const DialogTitle = styled.div`
  flex: auto;
  white-space: pre-line;
  word-break: break-all;
`

const DialogSubTitle = styled.div`
  flex: none;
  margin-bottom: 16px;
  word-break: break-all;
  color: #ddd;
`

const DialogBody = styled.div<{ hideScroll: boolean; removeContentPadding: boolean }>`
  flex: auto;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  ${(props) =>
    props.hideScroll &&
    `
    &::-webkit-scrollbar {
      display: none;
    }
  `}
  ${(props) =>
    props.removeContentPadding &&
    `
    margin-left: -32px;
    margin-right: -32px;
  `}
  overscroll-behavior: contain;
`

const DialogFooter = styled.div`
  flex: none;
  display: flex;
  flex-direction: row;
  margin: 0 -8px;
`

const DialogFooterButton = styled.button`
  flex: 1 0 auto;
  margin: 16px 8px 0;
`
