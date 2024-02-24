const useNode = () => {
  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      if (tree.depth > 3) {
        return
      }
      const temp = tree.items
      temp.push({
        id: new Date().getTime(),
        name: item,
        items: [],
        marked: false,
        depth: tree.depth + 1,
        timestamp: new Date(),
      })
      tree.items = temp

      return tree
    }

    let latestNode = []
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item)
    })

    return { ...tree, items: latestNode }
  }

  const editNode = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value
      return tree
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, value)
    })

    return { ...tree }
  }

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i]
      if (currentItem.id === id) {
        tree.items.splice(i, 1)
        return tree
      } else {
        deleteNode(currentItem, id)
      }
    }
    return tree
  }
  const markNode = (tree, id) => {
    if (tree.id === id) {
      tree.marked = !tree.marked
      return tree
    }

    tree.items.map((item) => {
      return markNode(item, id)
    })

    return { ...tree }
  }
  const sortByLatest = (tree, set) => {
    if (!tree.items || tree.items.length === 0) {
      return tree
    }
    const test = [...tree.items]
    test.sort((a, b) => {
      return Number(b.timestamp.getTime()) - Number(a.timestamp.getTime())
    })
    test.forEach((item) => {
      return sortByLatest(item)
    })
    tree.items = test
    return { ...tree }
  }
  const sortByReplies = (tree, setItems) => {
    if (!tree.items || tree.items.length === 0) {
      return tree
    }
    const test = tree.items.sort((a, b) => {
      return b.items.length - a.items.length
    })
    test.forEach((item) => {
      return sortByLatest(item)
    })
    tree.items = test
    return { ...tree }
  }

  return {
    insertNode,
    editNode,
    deleteNode,
    markNode,
    sortByLatest,
    sortByReplies,
  }
}

export default useNode
