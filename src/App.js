import { useState, useEffect } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import List from './components/List/List'
import Pagination from './components/Pagination/Pagination'

const initialState = 2

function App() {

  const [pageNum, setPageNum] = useState(initialState)

  useEffect(() => {
    //sets hystory when app mounts first time, used replaceState so its first item in history
    window.history.replaceState({ page_num: initialState }, '', initialState)
  }, [])

  return (
    <div className="App">
      <Header />
      <List
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
      <Pagination
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </div>
  );
}

export default App
