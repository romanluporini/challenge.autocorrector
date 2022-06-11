import React, { useCallback, useEffect, useRef, useState } from "react";

const correctionsObj = {
  realy: "really",
  wierd: "weird",
};

const getWordCorrected = (word, correctionsObj = {}) => {
  if (Object.keys(correctionsObj)?.length) {
    const wordCorrected = correctionsObj[word];
    if (!wordCorrected) return;
    return wordCorrected;
  }
};

const getTextCorrected = (refInput, currentWord, wordCorrected) =>
  refInput.current.value.replace(currentWord, wordCorrected);

const deleteCharacter = prev => {
  if (prev.length) return prev.slice(0, prev.length - 1);
  return "";
};

const addCharacter = (prev, key) => prev + key;

const evaluateWord = (
  currentWord,
  correctionsObj,
  inputRef,
  setCurrentWord
) => {
  const wordCorrected = getWordCorrected(currentWord, correctionsObj);
  if (wordCorrected)
    inputRef.current.value = getTextCorrected(
      inputRef,
      currentWord,
      wordCorrected
    );
  setCurrentWord("");
};

export const AutocorrectTextarea = () => {
  const [currentWord, setCurrentWord] = useState("");
  const textArea = useRef(null);

  const handleCorrector = useCallback(
    ({ key }) => {
      if (key === " ")
        evaluateWord(currentWord, correctionsObj, textArea, setCurrentWord);
      else if (key === "Backspace") setCurrentWord(deleteCharacter);
      else setCurrentWord(prev => addCharacter(prev, key));
    },
    [currentWord]
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Enter some text</h3>
      <textarea
        ref={textArea}
        data-testid="textarea"
        rows={10}
        cols={80}
        onKeyDown={handleCorrector}
      />
    </div>
  );
};
