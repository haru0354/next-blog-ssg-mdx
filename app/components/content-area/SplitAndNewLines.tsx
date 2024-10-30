import React from "react";

type SplitAndNewLinesProps = {
  text: string;
};

const SplitAndNewLines: React.FC<SplitAndNewLinesProps> = ({ text }) => {
  return text.split("\n").map((line, index) => {
    return (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    );
  });
};

export default SplitAndNewLines;
