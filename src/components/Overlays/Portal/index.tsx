import React, { FC } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode;
  container?: HTMLElement;
}

const Portal: FC<Props> = ({
 children,
 container,
}) => {

  let containerEl: HTMLElement

  if (container) {
    containerEl = container
  } else {
    containerEl = document.createElement('div')
    document.body.appendChild(containerEl)
  }

  containerEl.className = 'ui-portal'

  return ReactDOM.createPortal(children, containerEl)
}

export default Portal
