import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import {addMess} from '../redux/actions/messAction'
import { useEffect, useMemo } from 'react'
import { loadUsers, userDisconnect } from '../redux/actions/userAction'

const useSocket = (name: string, room: string,) => {
  const dispatch = useDispatch()
  const socket = useMemo(() => io(), [])

  useEffect(() => {
    let muteList = []
    // joinRoom socket
    socket.emit('joinRoom', {name, room})

    socket.on('joinRoom', users => {
      dispatch(loadUsers(users))
    })

    // leaveRoom
    socket.on('leaveRoom', ({id}) => {
      socket.emit('mute', id, 'delete')
      dispatch(userDisconnect(id))
    })

    // Message socket
    socket.on('mess', (mess) => {
      const {
        text,
        name,
        messColor,
        ownerId
      } = mess
  
      if (!muteList.includes(ownerId)) {
        dispatch(addMess(text, name, messColor))
      }
    })

    // Mute
    socket.on('mute', muteL => {
      muteList = muteL
    })
  }, [])

  const muteClick = (id: string, options: string) => {
    socket.emit('mute', id, options)
  }

  const sendMessClick = (text: string) => {
    if (text !== '') {
      socket.emit('mess', {mess: text, name})
    }
  }

  return {
    sendMessClick,
    logInUserId: socket.id,
    muteClick
  }
}

export default useSocket