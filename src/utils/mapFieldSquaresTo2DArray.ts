import { FieldSquare } from "@prisma/client";
  export const mapFieldSquaresTo2DArray = (fieldSquares: FieldSquare[]): FieldSquare[][] => {
    // Find the maximum values of locationX and locationY
    if(fieldSquares.length === 0){
      return [];
    }
    const maxX = Math.max(...fieldSquares.map((square) => square.locationX));
    const maxY = Math.max(...fieldSquares.map((square) => square.locationY));
  
    // Create a 2D array to store the field squares
    const fieldSquaresArray: FieldSquare[][] = Array(maxY + 1)
      .fill(null)
      .map(() => Array(maxX + 1).fill(null));
  
    // Populate the 2D array with field squares
    fieldSquares.forEach((square) => {
      const row = maxY - square.locationY; // Reverse the row index
      fieldSquaresArray[row][square.locationX] = square;
    });
  
    // Remove null columns
    const filteredFieldSquaresArray: FieldSquare[][] = [];
    for (let i = 0; i < fieldSquaresArray.length; i++) {
      const row = fieldSquaresArray[i];
      const filteredRow = row.filter((square) => square !== null);
      if (filteredRow.length > 0) {
        filteredFieldSquaresArray.push(filteredRow);
      }
    }
  
    return filteredFieldSquaresArray;
  };
