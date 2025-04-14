import {useState} from "react";
import {convertToObj} from "../util/binaryConverter";
import {BINARY_CONFIG} from "../constants/adStringGenerator";
import {base64ToBinary} from "../util/base64Converter";
import {convertBase64URLtoBase64} from "../util/base64URLConverter";

export const DecodeAdPreferencesString = () => {
  const [error, setError] = useState(null);
  const [base64URL, setBase64URL] = useState(null);
  const [base64, setBase64] = useState(null);
  const [binary, setBinary] = useState(null);
  const [decodedData, setDecodedData] = useState("");

  const decode = () => {
    setBase64("");
    setBinary("");
    setDecodedData("");

    try {
      const base64result = convertBase64URLtoBase64(base64URL);
      setBase64(base64result)
      const binaryResult = base64ToBinary(base64result);
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
      <label>Base64URL: <input style={{width: "500px"}} onChange={e => setBase64URL(e.target.value)}/></label>
      {error && <div style={{color: "red"}}>{error}</div>}
      <button onClick={decode}>Decode</button><br/><br/><br/>
      <div style={{wordWrap: "break-word"}}>Base64: {base64}</div><br/><br/>
      <div style={{wordWrap: "break-word"}}>Binary: {binary}</div><br/><br/>
      <textarea cols="80" rows="8" readOnly defaultValue={decodedData ? JSON.stringify(decodedData) : ""} />
    </div>
  );
}
