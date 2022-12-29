import { getDoc, doc } from 'firebase/firestore';
import db from '../firestoreConfig.js'
import { useState, useEffect } from 'react'

const useFetchData = () => {
  console.log("useFetchData HOOK called")
  const [data, setData] = useState([])

  const fetchData = async () => {
    const docRef = doc(db, "trendsAgg", "recentTrends")
    const docSnap = await getDoc(docRef)
    setData(docSnap.data().last500)
  }

  useEffect(() => {
    console.log("useFetchDATA - useEffect called")
    fetchData()
  }, [])
  return data
}

export default useFetchData
