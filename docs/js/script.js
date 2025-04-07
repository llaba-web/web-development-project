document.getElementById("quiz").addEventListener("submit", function(e) {
  e.preventDefault();

  //answer key
  const answers = {
    q1: "a",
    q2: "d",
    q3: "c",
    q4: "ASCII",
    q5: ["a", "b", "c"],
  };

  //defining key variables
  let score = 0;
  let feedback = '';
  const quiz = e.target;

  //checking answers 1-5 and adding warning messages
  const q1 = quiz.querySelector('input[name="q1"]:checked');
  const q2 = quiz.querySelector('input[name="q2"]:checked');
  const q3 = quiz.querySelector('input[name="q3"]:checked');
  //default warning message
  if (!q1 || !q2 || !q3) {
    alert("Please make sure to put in an answer!");
    return;
  }

  const q4 = quiz.querySelector('input[name="q4"]').value.trim();
  if (!q4) {
    alert("Please fill in the blank!");
    return;
  }

  const q5box = [...quiz.querySelectorAll('input[name="q5"]:checked')];
  if (q5box.length === 0) {
    alert("Please select the correct answer(s)!");
    return;
  }

  //checking answers for question 1
  if (q1.value === answers.q1) score++;
  feedback += `Question 1: You selected ${q1.value}, the correct answer is ${answers.q1}.<br/>`;

  //checking answers for question 2
  if (q2.value === answers.q2) score++;
  feedback += `Question 2: You selected ${q2.value}, the correct answer is ${answers.q2}.<br/>`;

  //checking answers for question 3
  if (q3.value === answers.q3) score++;
  feedback += `Question 3: You selected ${q3.value}, the correct answer is ${answers.q3}.<br/>`;

  //checking answers for question 4
  if (q4.toUpperCase() === answers.q4) score++;
  feedback += `Question 4: You typed "${q4}", the correct answer is ${answers.q4}.<br/>`;

  // checking answers for question 5
  const q5check1 = new Set(q5box.map(cb => cb.value.toLowerCase()));
  const q5check2 = new Set(answers.q5);

  const q5answer = q5check1.size === q5check2.size && [...q5check1].every(val => q5check2.has(val));

  if (q5answer) score++;
  feedback += `Question 5: You selected ${[...q5check1].join(', ')}, the correct answer is
    ${[...q5check2].join(', ')}.<br/>`;

  // calculate and display
  const avg =(score / 5) * 100;

  document.getElementById('result').innerHTML = ` <strong>You got ${score} out of 5 questions.
    <br/> Average score: ${avg.toFixed(2)}%.<br/>
    Result: ${score >= 3 ? 'Pass !' : 'Fail :('}<br/>
    ${feedback}`;


  //restart button
  document.getElementById('restart').style.display = 'block';
  document.getElementById('restart').addEventListener('click', function(){
    location.reload();
  });
});
