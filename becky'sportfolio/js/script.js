// Wait until the DOM is fully loaded before running any scripts
document.addEventListener("DOMContentLoaded", function () {

  // --- Scroll to Top Button Logic ---
  const topBtn = document.getElementById("top");

  // Only run if the #top button exists
  if (topBtn) {
    // Show the button when user scrolls more than 100px down
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    // Smooth scroll to top when the button is clicked
    topBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- Quiz Submission Logic ---
  const quizForm = document.getElementById("quiz");

  if (quizForm) {
    const submitButton = document.querySelector(".quiz-button");

    submitButton.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default form submission behavior

      // Correct answers
      const answers = {
        q1: "a",
        q2: "d",
        q3: "c",
        q4: "ASCII",
        q5: ["a", "b", "c"],
      };

      let score = 0;
      let feedback = '';
      const quiz = e.target.closest('form'); // Get the form element

      // Get selected answers for multiple choice questions
      const q1 = quiz.querySelector('input[name="q1"]:checked');
      const q2 = quiz.querySelector('input[name="q2"]:checked');
      const q3 = quiz.querySelector('input[name="q3"]:checked');

      // Check if all required multiple choice questions are answered
      if (!q1 || !q2 || !q3) {
        alert("Please make sure to answer all the questions!");
        return;
      }

      // Get and validate text input answer
      const q4 = quiz.querySelector('input[name="q4"]').value.trim();
      if (!q4) {
        alert("Please fill in the blank!");
        return;
      }

      // Get selected checkboxes for multiple-answer question
      const q5box = [...quiz.querySelectorAll('input[name="q5"]:checked')];
      if (q5box.length === 0) {
        alert("Please select at least one correct answer!");
        return;
      }

      // Check and give feedback for each question
      if (q1.value === answers.q1) score++;
      feedback += `Question 1: You selected ${q1.value}, the correct answer is ${answers.q1}. ${q1.value === answers.q1 ? "Correct!" : "Incorrect!"}<br/>`;

      if (q2.value === answers.q2) score++;
      feedback += `Question 2: You selected ${q2.value}, the correct answer is ${answers.q2}. ${q2.value === answers.q2 ? "Correct!" : "Incorrect!"}<br/>`;

      if (q3.value === answers.q3) score++;
      feedback += `Question 3: You selected ${q3.value}, the correct answer is ${answers.q3}. ${q3.value === answers.q3 ? "Correct!" : "Incorrect!"}<br/>`;

      if (q4.toUpperCase() === answers.q4) score++;
      feedback += `Question 4: You typed "${q4}", the correct answer is ${answers.q4}. ${q4.toUpperCase() === answers.q4 ? "Correct!" : "Incorrect!"}<br/>`;

      // Compare sets of selected checkbox values to correct answers
      const q5check1 = new Set(q5box.map(cb => cb.value.toLowerCase()));
      const q5check2 = new Set(answers.q5);
      const q5answer = q5check1.size === q5check2.size && [...q5check1].every(val => q5check2.has(val));

      if (q5answer) score++;
      feedback += `Question 5: You selected ${[...q5check1].join(', ')}, the correct answer is ${[...q5check2].join(', ')}. ${q5answer ? "Correct!" : "Incorrect!"}<br/>`;

      // Display the result and feedback
      const avg = (score / 5) * 100;
      document.getElementById('result').innerHTML = `<strong>You got ${score} out of 5 questions.
      <br/> Average score: ${avg.toFixed(2)}%.<br/>
      Result: ${score >= 3 ? 'Pass!' : 'Fail :('}<br/>
      ${feedback}</strong>`;

      // Show restart button and set up reset logic
      document.getElementById('result').classList.add('show');
      const restartBtn = document.getElementById('restart');
      restartBtn.style.display = 'block';

      restartBtn.addEventListener('click', function () {
        quiz.reset(); // Clear all quiz inputs
        restartBtn.style.display = 'none'; // Hide restart button
        document.getElementById('result').innerHTML = ''; // Clear feedback
      });
    });
  }

});
