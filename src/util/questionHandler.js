function splitQuestion(rawString) {
  const regex = /(?=[A-I])/g;
  const optionArray = rawString.split(regex);

  return optionArray;
}

function convertToValidQuestion(question) {
  const optionArray = splitQuestion(question.question);
  
  return {
    question: optionArray[0],
    options: optionArray.slice(1),
    answer: question.answer,
  };
}

export {
  convertToValidQuestion,
}