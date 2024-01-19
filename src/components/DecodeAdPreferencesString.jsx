import {useState} from "react";
import {convertToObj} from "../util/binaryConverter";
import {BINARY_CONFIG} from "../constants/adStringGenerator";
import {base64ToBinary} from "../util/base64Converter";

export const DecodeAdPreferencesString = () => {
  const [error, setError] = useState(null);
  const [base64, setBase64] = useState(null);
  const [binary, setBinary] = useState(null);
  const [decodedData, setDecodedData] = useState("");

  const decode = () => {
    setBinary("");
    setDecodedData("");

    try {
      const binaryResult = base64ToBinary(base64);
      setBinary(binaryResult);
      const result = convertToObj(binaryResult, BINARY_CONFIG);
      setDecodedData(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{backgroundColor: "#FFFFE0", padding: "20px"}}>
      <p>Decode ad preferences string:</p>
      <label>Base64: <input style={{width: "500px"}} onChange={e => setBase64(e.target.value)}/></label>
      {error && <div style={{color: "red"}}>{error}</div>}
      <button onClick={decode}>Decode</button><br/><br/>
      <div style={{wordWrap: "break-word"}}>Binary: {binary}</div><br/><br/>
      <textarea cols="80" rows="8" readOnly defaultValue={decodedData ? JSON.stringify(decodedData) : ""} />
    </div>
  );
}
