import { getDoc, doc } from 'firebase/firestore';
import db from '../firestoreConfig.js'
import { useState, useEffect } from 'react'

const useFetchData = () => {
  console.log("useFetchData HOOK called")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const docRef = doc(db, "trendsAgg", "recentTrends")
      const docSnap = await getDoc(docRef)
      setData(docSnap.data().last500)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log("useFetchDATA - useEffect called")
    fetchData()
  }, [])
  return { data, isLoading, error }
}

export default useFetchData
