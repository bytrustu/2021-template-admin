import React, { useCallback } from 'react'
import { increment, decrement, incrementByAmount } from '../stores/reducers/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import { OverlaidPortal } from '../components/Overlays/OverlaidProtal'

const index = () => {

  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.counter.value )

  const onClickHandler = useCallback(() => {
    dispatch(increment())
  }, [])


  return (
    <OverlaidPortal opened>
      <div>
        {count}
        <button type='button' onClick={onClickHandler}>
          버튼
        </button>
      </div>
    </OverlaidPortal>

  )
}

export default index
