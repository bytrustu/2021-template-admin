import React, { FC, memo, ReactElement } from 'react'

interface IContentsProps {
  children: ReactElement | ReactElement[]
}

const Contents: FC<IContentsProps> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default memo(Contents)
