import { useEffect } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useState } from "react/cjs/react.development";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(
        quizRef,
        orderByKey(),
      );

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(quizQuery);

        if (snapshot.exists()) {
            setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    setTimeout(() => {
        fetchQuestions();
    }, 2000);
    
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
