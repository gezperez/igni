import { useEffect, useReducer } from 'react'
import useAnimate, { Interpolate } from './useAnimate'

type State = {
  active?: boolean
  entering: boolean
  exiting: boolean
}

type Action = {
  type: 'ENTERING' | 'EXITING' | 'FINISHED' | 'ABORTED'
  active?: boolean
}

const tweenReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ENTERING':
      return {
        ...state,
        entering: true,
      }

    case 'EXITING':
      return {
        ...state,
        exiting: true,
      }

    case 'FINISHED':
      return {
        ...state,
        active: action.active,
        entering: false,
        exiting: false,
      }

    case 'ABORTED':
      return {
        ...state,
        entering: false,
        exiting: false,
      }

    default:
      return state
  }
}
type UseTween = (value: boolean, duration?: number, useNativeDriver?: boolean) => [Interpolate, State]

const useTween: UseTween = (value, duration = 300, useNativeDriver?) => {
  const [interpolate, enter, exit] = useAnimate(duration, useNativeDriver, !!value)

  const [state, dispatch] = useReducer(tweenReducer, {
    active: !!value,
    entering: false,
    exiting: false,
  })

  useEffect(() => {
    dispatch({
      type: value ? 'ENTERING' : 'EXITING',
    })

    const animate = async (start: Function) => {
      const { finished } = await start()

      dispatch({
        type: finished ? 'FINISHED' : 'ABORTED',
        active: !!value,
      })
    }

    animate(value ? enter : exit)
  }, [value, enter, exit])

  return [interpolate, state]
}

export default useTween
