import { IAddMess } from "../actions/messAction"


export interface IMessage {
  text: string,
  id: number
  name: string
  time: Date
  color: string
}

type ActionType = IAddMess

const messageList = (state = [], action: ActionType): IMessage[] => {
  switch(action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          text: action.payload.text,
          id: action.id,
          name: action.payload.name,
          time: action.payload.time,
          color: action.payload.color
        }
      ]
    default: return state
  }
}

export default messageList