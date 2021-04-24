import React, { FC, memo, useEffect } from 'react'
import styled from 'styled-components'

import Portal from 'src/components/Overlays/Portal'
import { isClient } from 'src/utils'

export interface OverlayProps {
  className?: string
  children: React.ReactNode
  dimmer?: boolean
  overlayColor?: string
  opened: boolean
  closeable?: boolean
  onClose?: () => void
  zIndex?: number
}

export const OverlaidPortal: FC<OverlayProps> = memo(
  ({
    className,
    children,
    dimmer = true,
    overlayColor = 'rgba(0, 0, 0, 0.72)',
    opened,
    closeable = true,
    onClose,
    zIndex = 3000,
  }) => {
    useEffect(() => {
      if (isClient() && dimmer) {
        document.body.style.overflow = opened ? 'hidden' : ''
      }
      return () => {
        if (isClient() && dimmer) {
          document.body.style.overflow = ''
        }
      }
    }, [opened, dimmer])

    if (!isClient()) {
      return null
    }

    if (!dimmer) {
      return <Portal container={document.body}>{children}</Portal>
    }

    return (
      <Portal container={document.body}>
        <Overlay
          className={className}
          zIndex={zIndex}
          overlayColor={overlayColor}
          dimmer={dimmer}
          visible={opened}
          onClick={closeable ? onClose : undefined}
        >
          {children}
        </Overlay>
      </Portal>
    )
  }
)

export const Overlay = styled.div<{ zIndex?: number; overlayColor: string; dimmer: boolean; visible: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.zIndex};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: ${(props) => (props.dimmer ? props.overlayColor : 'transparent')};
  opacity: ${(props) => (props.visible ? 'visible' : 'hidden')};
  overscroll-behavior: contain;
`
