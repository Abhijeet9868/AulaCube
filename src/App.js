import { useState } from 'react'
import Comment from './components/Comment'
import Action from './components/Action'
import useNode from './hooks/useNode'
import './styles.css'

const comments = {
  id: 1,
  items: [],
  depth: 1,
}
const App = () => {
  const [commentsData, setCommentsData] = useState(comments)

  const {
    insertNode,
    editNode,
    deleteNode,
    markNode,
    sortByLatest,
    sortByReplies,
  } = useNode()

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item)
    console.log(commentsData)
    setCommentsData(finalStructure)
  }

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value)
    setCommentsData(finalStructure)
  }

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId)
    const temp = { ...finalStructure }
    setCommentsData(temp)
  }
  const handleMarkNode = (folderId) => {
    const finalStructure = markNode(commentsData, folderId)
    setCommentsData(finalStructure)
  }
  const handleSortByLatest = () => {
    const finalStructure = sortByLatest(commentsData)
    setCommentsData(finalStructure)
  }
  const handleSortByReplies = () => {
    const finalStructure = sortByReplies(commentsData)
    setCommentsData(finalStructure)
  }

  return (
    <div className='App'>
      <Action
        className='reply comment'
        type='SORT BY LATEST'
        handleClick={handleSortByLatest}
      ></Action>
      <Action
        className='reply comment'
        type='SORT BY REPLIES'
        handleClick={handleSortByReplies}
      ></Action>
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        handleMarkNode={handleMarkNode}
        handleSortByLatest={handleSortByLatest}
        handleSortByReplies={handleSortByReplies}
        key={commentsData.id}
        comment={commentsData}
      />
    </div>
  )
}

export default App
