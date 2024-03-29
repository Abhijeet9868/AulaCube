import { useState, useRef, useEffect } from 'react'
import Action from './Action'
import { ReactComponent as DownArrow } from '../assets/down-arrow.svg'
import { ReactComponent as UpArrow } from '../assets/up-arrow.svg'
import { ReactComponent as StarUnmarked } from '../assets/star-mark.svg'
import { ReactComponent as StarMarked } from '../assets/star-marked.svg'

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  handleMarkNode,
  comment,
}) => {
  const [input, setInput] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [expand, setExpand] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [editMode])

  const handleNewComment = () => {
    setExpand(!expand)
    setShowInput(true)
  }

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText)
    } else {
      setExpand(true)

      handleInsertNode(comment.id, input)
      setShowInput(false)
      setInput('')
    }

    if (editMode) setEditMode(false)
  }

  const handleDelete = () => {
    handleDeleteNode(comment.id)
  }

  const handleMark = () => {
    handleMarkNode(comment.id)
  }

  return (
    <div>
      <div className={comment.id === 1 ? 'inputContainer' : 'commentContainer'}>
        {comment.id === 1 ? (
          <>
            <input
              type='text'
              className='inputContainer__input first_input'
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='type...'
            />

            <Action
              className='reply comment'
              type='COMMENT'
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: 'break-word' }}
            >
              {comment.name}
            </span>

            <div style={{ display: 'flex', marginTop: '5px' }}>
              {editMode ? (
                <>
                  <Action
                    className='reply'
                    type='SAVE'
                    handleClick={onAddComment}
                  />
                  <Action
                    className='reply'
                    type='CANCEL'
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name
                      setEditMode(false)
                    }}
                  />
                </>
              ) : (
                <>
                  {comment.depth < 4 ? (
                    <>
                      <Action
                        className='reply'
                        type={
                          <>
                            {expand ? (
                              <UpArrow width='10px' height='10px' />
                            ) : (
                              <DownArrow width='10px' height='10px' />
                            )}{' '}
                            REPLY
                          </>
                        }
                        handleClick={handleNewComment}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  <Action
                    className='reply'
                    type='EDIT'
                    handleClick={() => {
                      setEditMode(true)
                    }}
                  />
                  <Action
                    className='reply'
                    type='DELETE'
                    handleClick={handleDelete}
                  />
                  <Action
                    className='reply'
                    type={
                      <>
                        {comment.marked ? (
                          <StarMarked width='10px' height='10px' />
                        ) : (
                          <StarUnmarked width='10px' height='10px' />
                        )}{' '}
                      </>
                    }
                    handleClick={handleMark}
                  ></Action>
                </>
              )}
              <>{comment.timestamp.toLocaleTimeString()}</>
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
        {showInput && (
          <div className='inputContainer'>
            <input
              type='text'
              className='inputContainer__input'
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className='reply' type='REPLY' handleClick={onAddComment} />
            <Action
              className='reply'
              type='CANCEL'
              handleClick={() => {
                setShowInput(false)
                if (!comment?.items?.length) setExpand(false)
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              handleMarkNode={handleMarkNode}
              comment={cmnt}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Comment
