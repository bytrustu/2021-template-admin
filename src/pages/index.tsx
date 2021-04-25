import React, { useCallback, useEffect, useState } from 'react'
import { increment, decrement, incrementByAmount } from '../stores/reducers/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import { OverlaidPortal } from 'src/overlays'
import Modal, { create } from 'src/overlays/Modal'

const index = () => {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.counter.value)

  const handleModalShow = useCallback(() => {
    console.log(1)
    create(
      document.body,
      <Modal
        title={<span>타이틀</span>}
        subTitle={<>타이틀</>}
        cancelAttributes={() => {}}
        closeable={false}
        hideScroll={false}
        noSSR={false}
        removeContentPadding={false}
        scrollbarWidth={10}
        zIndex={1000}
        cancelText='취소'
        successText='확인'
        className=''
      >
        <div>모달 테스트1</div>
        <button type='button' onClick={handleModalShow}>
          열기
        </button>
      </Modal>,
    )
  }, [])
  const onClickHandler = useCallback(() => {
    dispatch(increment())
  }, [])

  return (
    <>
      <button type='button' onClick={handleModalShow}>
        생성
      </button>
    </>
  )
}

export default index
