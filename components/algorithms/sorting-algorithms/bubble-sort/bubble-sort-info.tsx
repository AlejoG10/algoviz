import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import Info from "@/components/shared/info";

const BubbleSortInfo = () => {
  const pseudocode = (
    <Prism component="pre" className="language-markup" style={dracula}>
      {`bubbleSort(array of numbers)
  for i = 0 to i = length(array) - 2
    for j = 0 to j = length(array) - i - 2
      if array[j] > array[j+1]
        swap array[j] and array[j+1]
`}
    </Prism>
  );

  const codePY = (
    <Prism language="python" style={dracula}>
      {`def bubble_sort(arr):
    # Save array's length
    N = len(arr)
    
    for i in range(N - 1):
        for j in range(N - i - 1):
            # Check if left item is > than right item
            if arr[j] > arr[j + 1]:
                # Swap left item with right item
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
`}
    </Prism>
  );

  const codeJS = (
    <Prism language="javascript" style={dracula}>
      {`function bubbleSort(array) {
  // save array's length
  const N = array.length;
  
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      // check if left item is > than right item
      if (array[j] > array[j + 1]) {
        // swap left item with right item
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}`}
    </Prism>
  );

  const codeTS = (
    <Prism language="typescript" style={dracula}>
      {`function bubbleSort(array: number[]): void {
  // save array's length
  const N = array.length;
  
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      // check if left item is > than right item
      if (array[j] > array[j + 1]) {
        // swap left item with right item
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}`}
    </Prism>
  );

  return (
    <Info
      heading="Bubble Sort"
      pseudocode={pseudocode}
      codePY={codePY}
      codeJS={codeJS}
      codeTS={codeTS}
    />
  );
};

export default BubbleSortInfo;
