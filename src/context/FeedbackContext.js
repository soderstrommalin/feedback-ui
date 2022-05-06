import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
export const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      rating: 10,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  const handleEdit = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete feedback?')) {
      setFeedback(feedback.filter((f) => f.id !== id))
    }
  }

  const handleAdd = (newFeedback) => {
    newFeedback.id = uuid()
    setFeedback([newFeedback, ...feedback])
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        handleDelete,
        handleAdd,
        handleEdit,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
