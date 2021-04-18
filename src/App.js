import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import List from './components/List/List'
import Pagination from './components/Pagination/Pagination'

function App() {
  const [pageNum, setPageNum] = useState(2)
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
