import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import Info from "@/components/shared/info";

const SelectionSortInfo = () => {
  const pseudocode = (
    <Prism component="pre" className="language-markup" style={dracula}>
      {`selectionSort(array of numbers)
  for i = 0 to i = length(array) - 2
    minIdx = i

    for j = i + 1 to j = length(array) - 1
      if array[j] < array[minIdx]:
        minIdx = j
    
    if minIdx is not i
        swap array[i] and array[minIdx]
`}
    </Prism>
  );

  const codePY = (
    <Prism language="python" style={dracula}>
      {`def selection_sort(arr):
    # save array's length
    N = len(arr)

    for i in range(N - 1):
        # assume first index item is the min
        minIdx = i
        
        for j in range(i + 1, N):
            # check if next item is < current min
            if arr[j] < arr[minIdx]:
                # save new min index
                minIdx = j
                
        # check if there was a change of min index
        if minIdx != i:
            # swap first index item of outer loop with min index item
            arr[i], arr[minIdx] = arr[minIdx], arr[i]
`}
    </Prism>
  );

  const codeJS = (
    <Prism language="javascript" style={dracula}>
      {`function selectionSort(array) {
    // save array's length
    const N = array.length;
    // create minIdx variable
    let minIdx;

    for (let i = 0; i < N - 1; i++) {
        // assume first index item is the min
        minIdx = i;

        for (let j = i + 1; j < N; j++) {
            // check if next item is < current min
            if (array[j] < array[minIdx]) {
                // save new min index
                minIdx = j;
            }
        }

        // check if there was a change of min index
        if (minIdx !== i) {
            // swap first index item of outer loop with min index item
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
    }
}`}
    </Prism>
  );

  const codeTS = (
    <Prism language="typescript" style={dracula}>
      {`function selectionSort(array: number[]): void {
    // save array's length
    const N = array.length;
    // create min index variable
    let minIdx: number;

    for (let i = 0; i < N - 1; i++) {
        // assume first index item is the min
        minIdx = i;

        for (let j = i + 1; j < N; j++) {
            // check if next item is < current min
            if (array[j] < array[minIdx]) {
                // save new min index
                minIdx = j;
            }
        }
        
        // check if there was a change of min index
        if (minIdx !== i) {
            // swap first index item of outer loop with min index item
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
    }
}`}
    </Prism>
  );

  return (
    <Info
      heading="Selection Sort"
      pseudocode={pseudocode}
      codePY={codePY}
      codeJS={codeJS}
      codeTS={codeTS}
    />
  );
};

export default SelectionSortInfo;
