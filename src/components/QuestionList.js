import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  let url = 'http://localhost:4000/questions'
  useEffect(() =>{
    fetch(url)
    .then((resp) => resp.json())
    .then((questions) => setQuestions(questions))
  },[])


  function handleDelete(deletedQuestion){
    const updateQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updateQuestions)
  }

  function handleAnswerChange(id, value){
    console.log(id)
    console.log(value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers:{
        "Content-Type" : "appplication/json",
      },
      body: JSON.stringify({value}),
    })
    .then((resp) => resp.json())
    .then((updatedAnswer) => handleUpdate(updatedAnswer))
  }

   function handleUpdate(newAnswer){
    console.log(newAnswer)
    const updatedAnswer = questions.map((question) => {
      console.log(question.id)
    })
    console.log(up)
    // let updatedAnswers = questions.map((answer) =>{
    //   if(answer.id === updatedAnswers.id){
    //     return newAnswer
    //   } else {
    //     return answer
    //   }
    // })
    // setQuestions(updatedAnswers)
  }

  const mappedQuestions = questions.map((question) =>(
    <QuestionItem 
    key={question.id}
    question={question}
    onDeleteQuestion={handleDelete}
    onQuestionChange={handleAnswerChange}
    />
    
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{mappedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
