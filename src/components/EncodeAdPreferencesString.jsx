import {BINARY_CONFIG, CHOICE_STATUS} from "../constants/adStringGenerator";
import {convertToBinary} from "../util/binaryConverter";
import {binaryToBase64} from "../util/base64Converter";
import {useState} from "react";

export const EncodeAdPreferencesString = () => {
  const defaultExample = {
    version: 1,
    timestamp: 1634755185,
    globalIBAChoiceStatus: CHOICE_STATUS.notExpressed,
    participants: [
      {participantId: Number('00430'), choiceStatus: CHOICE_STATUS.optOut},
      {participantId: Number('01192'), choiceStatus: CHOICE_STATUS.optOut},
      {participantId: Number('01266'), choiceStatus: CHOICE_STATUS.notExpressed},
      {participantId: Number('01280'), choiceStatus: CHOICE_STATUS.notExpressed},
      {participantId: Number('00174'), choiceStatus: CHOICE_STATUS.notExpressed},
      {participantId: Number('00241'), choiceStatus: CHOICE_STATUS.notExpressed},
      {participantId: Number('01289'), choiceStatus: CHOICE_STATUS.notExpressed},
      {participantId: Number('00406'), choiceStatus: CHOICE_STATUS.notExpressed},
    ],
    categories: [],
  };
  const [textAreaError, setTextAreaError] = useState(null);
  const [data, setData] = useState(JSON.stringify(defaultExample));
  const [binary, setBinary] = useState(null);
  const [base64, setBase64] = useState(null);

  const generateAdPreferencesString = (adStringPreferencesData) => {
    const binaryConvertedResult = convertToBinary(adStringPreferencesData, BINARY_CONFIG);
    setBinary(binaryConvertedResult);
    const base64 = binaryToBase64(binaryConvertedResult);
    setBase64(base64);
  }

  const validateUnexpectedKeys = (parsedJson) => {
    let unexpectedKeys = Object.keys(parsedJson).filter(key => !Object.keys(BINARY_CONFIG).includes(key));

    for (const key in parsedJson) {
      if (Array.isArray(parsedJson[key])) {
        const uniqueUnexpectedKeys = Object.keys(parsedJson[key].reduce(function(result, obj) {
          return Object.assign(result, obj);
        }, {})).filter(unexpectedKey => !Object.keys(BINARY_CONFIG[key]).includes(unexpectedKey));;

        unexpectedKeys = unexpectedKeys.concat(uniqueUnexpectedKeys);
      }
    }

    return unexpectedKeys;
  }

  const encode = () => {
    try {
      setBinary("");
      setBase64("");
      const parsedJson = JSON.parse(data);
      setTextAreaError(null); // Clear any previous errors

      const unexpectedKeys = validateUnexpectedKeys(parsedJson);

      if (unexpectedKeys.length > 0) {
        setTextAreaError(`Unexpected keys found: ${unexpectedKeys.join(', ')}`);
        return;
      }

      generateAdPreferencesString(parsedJson);
    } catch (error) {
      setTextAreaError(error.message);
    }
  };


  return (
    <div style={{backgroundColor: "#cbf5dd", padding: "20px"}}>
      <p>Encode ad preferences string</p>
      <div>
        <textarea
          cols="80"
          rows="8"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{borderColor: textAreaError ? "red" : "unset"}}
        />
        {textAreaError && <div style={{color: "red"}}>{textAreaError}</div>}
      </div>
      <div style={{marginTop: "50px"}}>
        <button onClick={encode}>Encode</button><br/><br/>
        <div style={{wordWrap: "break-word"}}>Binary: {binary}</div><br/><br/>
        <div style={{wordWrap: "break-word"}}>Base64: {base64}</div>
      </div>
    </div>
  );
}
