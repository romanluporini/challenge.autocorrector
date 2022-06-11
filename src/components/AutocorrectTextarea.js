import React, { useCallback, useRef} from "react";

const correctionsObj = {
  realy: "really",
  wweird: "weird",
};

const getWordCorrected = word => {
  if (Object.keys(correctionsObj)?.length) {
    const wordCorrected = correctionsObj[word];
    if (!wordCorrected) return;
    return wordCorrected;
  }
};

const getTextCorrected = (refInput, currentWord, wordCorrected) =>
  refInput.current.value.replace(currentWord, wordCorrected);

const evaluateWord = refInput => {
  const lastWordTyped = refInput.current.value.split(" ").pop();
  const wordCorrected = getWordCorrected(lastWordTyped, correctionsObj);
  if (wordCorrected)
    refInput.current.value = getTextCorrected(
      refInput,
      lastWordTyped,
      wordCorrected
    );
};

export const AutocorrectTextarea = () => {
  const textArea = useRef(null);

  const handleCorrector = useCallback(({ key }) => {
    if (key === " ") evaluateWord(textArea);
  }, []);

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
