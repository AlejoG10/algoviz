import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import Info from "@/components/shared/info";

const InsertionSortInfo = () => {
  const pseudocode = (
    <Prism component="pre" className="language-markup" style={dracula}>
      {`insertionSort(array of numbers)
  for i = 1 to i = length(array) - 1
    j = i

    while j > 0 and array[j] < array[j - 1]
        swap array[j] and array[j-1]
        j = j - 1
`}
    </Prism>
  );

  const codePY = (
    <Prism language="python" style={dracula}>
      {`def insertion_sort(arr):
    # save array's length
    N = len(arr)

    for i in range(1, N):
        # assign a pointer to the start of the loop
        j = i

        # loop while the pointer is > 0 and the previous item is greater than it
        while j > 0 and arr[j] < arr[j - 1]:
            # swap the pointer item with it's left item
            arr[j], arr[j-1] = arr[j-1], arr[j]
            # decrease the pointer
            j -= 1
`}
    </Prism>
  );

  const codeJS = (
    <Prism language="javascript" style={dracula}>
      {`function insertionSort(array) {
    // save array's length
    const N = array.length;

    for (let i = 1; i < N; i++) {
        // assign a pointer to the start of the loop
        let j = i;

        // loop while the pointer is > 0 and the previous item is greater than it
        while (j > 0 && array[j] < array[j - 1]) {
            // swap the pointer item with it's left item
            [array[j], array[j-1]] = [array[j-1], array[j]];
            // decrease the pointer
            j--;
        }
    }
}`}
    </Prism>
  );

  const codeTS = (
    <Prism language="typescript" style={dracula}>
      {`function insertionSort(array: number[]): void {
    // save array's length
    const N = array.length;

    for (let i = 1; i < N; i++) {
        // assign a pointer to the start of the loop
        let j = i;

        // loop while the pointer is > 0 and the previous item is greater than it
        while (j > 0 && array[j] < array[j - 1]) {
            // swap the pointer item with it's left item
            [array[j], array[j-1]] = [array[j-1], array[j]];
            // decrease the pointer
            j--;
        }
    }
}`}
    </Prism>
  );

  return (
    <Info
      heading="Insertion Sort"
      pseudocode={pseudocode}
      codePY={codePY}
      codeJS={codeJS}
      codeTS={codeTS}
    />
  );
};

export default InsertionSortInfo;
