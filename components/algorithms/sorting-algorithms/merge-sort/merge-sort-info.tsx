import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import Info from "@/components/shared/info";

const MergeSortInfo = () => {
  const pseudocode = (
    <Prism component="pre" className="language-markup" style={dracula}>
      {`mergeSort(array of numbers)
  if length(array) = 1
    stop recursion and return array

  divide the array in 2
    leftArray = from 0 to middle index 
    rightArray = from middle index to length(array)
  
  apply recursion
    leftArray = mergeSort(leftArray)
    rightArray = mergeSort(rightArray)
  
  merge both sorted halves and return the result
`}
    </Prism>
  );

  const codePY = (
    <Prism language="python" style={dracula}>
      {`def merge(leftArray, rightArray):
    # create the sorted array
    sortedArray = []
    
    # loop while there are elements in leftArray and rightArray
    while len(leftArray) > 0 and len(rightArray) > 0:
        # check if leftArray first item is < rightArray first item
        if leftArray[0] < rightArray[0]:
            # add leftArray first item to sortedArray
            sortedArray.append(leftArray[0])
            # remove item from leftArray
            leftArray.pop(0)
        else:
            # add rightArray first item to sortedArray
            sortedArray.append(rightArray[0])
            # remove item from rightArray
            rightArray.pop(0)

    # return sortedArray + items left in leftArray + items left in rightArray
    return sortedArray + leftArray + rightArray


def merge_sort(array):
    # save array's length
    N = len(array)
    # save array's middle index
    mid = N // 2

    # base case - array's length is equal to 1
    if N == 1:
        return array

    # divides the array in 2
    leftArray = array[:mid]
    rightArray = array[mid:]

    # recursive step
    leftArray = mergeSort(leftArray)
    rightArray = mergeSort(rightArray)

    # helper function call
    return merge(leftArray, rightArray)

`}
    </Prism>
  );

  const codeJS = (
    <Prism language="javascript" style={dracula}>
      {`function merge(leftArray, rightArray) {
  // create the sorted array
  let sortedArray = [];
  
  // loop while there are elements in leftArray and rightArray
  while (leftArray.length > 0 && rightArray.length > 0) {
    // check if leftArray first item is < rightArray first item
    if (leftArray[0] < rightArray[0]) {
      // add leftArray first item to sortedArray
      sortedArray.push(leftArray[0]);
      // remove item from leftArray
      leftArray.shift();
    } else {
      // add rightArray first item to sortedArray
      sortedArray.push(rightArray[0]);
      // remove item from rightArray
      rightArray.shift();
    }
  }

  // return sortedArray + items left in leftArray + items left in rightArray
  return sortedArray.concat(leftArray).concat(rightArray);
}
      
      
function mergeSort(array) {
  // save array's length
  const N = array.length;
  // save array's middle index
  const mid = N / 2;

  // base case - array's length is equal to 1
  if (N === 1) return array;

  // divides the array in 2
  let leftArray = array.slice(0, mid);
  let rightArray = array.slice(mid, N);
  
  // recursive step
  leftArray = mergesort(leftArray);
  rightArray = mergesort(rightArray);
  
  // helper function call
  return merge(leftArray, rightArray);
}`}
    </Prism>
  );

  const codeTS = (
    <Prism language="typescript" style={dracula}>
      {`function merge(leftArray: number[], rightArray: number[]): number[] {
  // create the sorted array
  let sortedArray: number[] = [];
  
  // loop while there are elements in leftArray and rightArray
  while (leftArray.length > 0 && rightArray.length > 0) {
    // check if leftArray first item is < rightArray first item
    if (leftArray[0] < rightArray[0]) {
      // add leftArray first item to sortedArray
      sortedArray.push(leftArray[0]);
      // remove item from leftArray
      leftArray.shift();
    } else {
      // add rightArray first item to sortedArray
      sortedArray.push(rightArray[0]);
      // remove item from rightArray
      rightArray.shift();
    }
  }

  // return sortedArray + items left in leftArray + items left in rightArray
  return sortedArray.concat(leftArray).concat(rightArray);
}
      
      
function mergeSort(array: number[]): number[] {
  // save array's length
  const N = array.length;
  // save array's middle index
  const mid = N / 2;

  // base case - array's length is equal to 1
  if (N === 1) return array;

  // divides the array in 2
  let leftArray = array.slice(0, mid);
  let rightArray = array.slice(mid, N);
  
  // recursive step
  leftArray = mergesort(leftArray);
  rightArray = mergesort(rightArray);
  
  // helper function call
  return merge(leftArray, rightArray);
}`}
    </Prism>
  );

  return (
    <Info
      heading="Merge Sort"
      pseudocode={pseudocode}
      codePY={codePY}
      codeJS={codeJS}
      codeTS={codeTS}
    />
  );
};

export default MergeSortInfo;
