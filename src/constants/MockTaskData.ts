const MOCK_PROBLEM_STATEMENT_HTML = (
`<h2>Sum of Even Numbers</h2>

<p>
  Given a list of integers, write a function <strong>sum_even(numbers)</strong>
  that returns the sum of all even numbers in the list.
</p>

<h3>Requirements</h3>
<ul>
  <li><strong>Input:</strong> A list/array of integers.</li>
  <li><strong>Output:</strong> An integer representing the sum of all even values.</li>
  <li>If the list contains no even numbers, return <code>0</code>.</li>
</ul>

<h3>Example</h3>
<p><strong>Input:</strong> [3, 8, 5, 12, 7]</p>
<p><strong>Output:</strong> 20</p>
<p><strong>Explanation:</strong> 8 + 12 = 20</p>`);


const MOCK_CODE_SNIPPET = (
`function sum_even(numbers) {
  let sum = 0;

  for (let num of numbers) {
      if (num % 2 === 0) {
          sum += num;
      }
  }

  return sum;
}`);

export function getMockTaskData() {
  return {
    totalTasks: 1,
    taskIndex: 0,
    taskID: 'mock_task_id',
    problemStatementHTML: MOCK_PROBLEM_STATEMENT_HTML,
    codeSnippet: MOCK_CODE_SNIPPET,
  };
}