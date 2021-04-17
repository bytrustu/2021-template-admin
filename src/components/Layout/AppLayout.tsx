import React, { FC, ReactElement } from 'react'
import S from './Style'

interface IAppLayoutProps {
  children: ReactElement | ReactElement[]
}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  return <S.AppLayout>{children}</S.AppLayout>
}

export default React.memo(AppLayout)
