import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";
import image from "./img/project.jpg";

function App() {
  const [text, setText] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [savedText1, setSavedText1] = useState("");
  const [connected1, setConnected1] = useState(false);
  const [savedText2, setSavedText2] = useState("");
  const [connected2, setConnected2] = useState(false);

  let { ethereum } = window;
  let contract1 = null;
  let contract2 = null;

  if (ethereum) {
    let abi = [
      "function changeText(string)",
      "function text() view returns (string)"
    ];
    let address1 = "0x1C3dd5c848102ac51E1c47434a00eFbEd1F177C4";
    let address2 = "0x1C3dd5c848102ac51E1c47434a00eFbEd1F177C4";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract1 = new ethers.Contract(address1, abi, signer);
    contract2 = new ethers.Contract(address2, abi, signer);
  }

  const saveAddress = (company) => {
    axios.post(`http://localhost:8000/api/address/${company}`, { address: publicAddress })
      .then(response => {
        console.log(`Address saved successfully for ${company}`);
        // Update state or perform any additional logic as needed
      })
      .catch(error => console.error(`Error saving address for ${company}:`, error));
  };

  return (
    <div className="App">
      <div className="startup" style={{ backgroundImage: `url(${image})` }}>
        <h1>GreenHeart Foundation</h1>
        <p className="startup-description">
          {/* ... (Your existing text) */}
        </p>
        <button
          onClick={() => {
            if (contract1 && !connected1) {
              ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
                setConnected1(true);
              });
            }
          }}
        >
          {!connected1 ? "Connect wallet" : "Connected"}
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (contract1 && connected1) {
              contract1.changeText(text).then(() => {
                setText("");
              });
            }
          }}
        >
          <input
            type="number"
            min="0"
            placeholder="Enter amount in ETH"
            onInput={(e) => (e.target.value = Math.abs(e.target.value))}
            onChange={(e) => setText(e.currentTarget.value)}
            value={text}
          />
          <input type="submit" value="Submit!" />
        </form>
        {/* New input for public address */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAddress("GreenHeart");
          }}
        >
          <input
            type="text"
            placeholder="Enter your public address"
            onChange={(e) => setPublicAddress(e.currentTarget.value)}
            value={publicAddress}
          />
          <button type="submit">Save Address for GreenHeart</button>
        </form>
      </div>

      <div className="startup">
        <h1>HopeBuilders International</h1>
        <p className="startup-description">
          {/* ... (Your existing text) */}
        </p>
        <button
          onClick={() => {
            if (contract2 && !connected2) {
              ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
                setConnected2(true);
              });
            }
          }}
        >
          {!connected2 ? "Connect wallet" : "Connected"}
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (contract2 && connected2) {
              contract2.changeText(text).then(() => {
                setText("");
              });
            }
          }}
        >
          <input
            type="number"
            min="0"
            placeholder="Enter amount in ETH"
            onInput={(e) => (e.target.value = Math.abs(e.target.value))}
            onChange={(e) => setText(e.currentTarget.value)}
            value={text}
          />
          <input type="submit" value="Submit!" />
        </form>
        {/* New input for public address */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAddress("HopeBuilders");
          }}
        >
          <input
            type="text"
            placeholder="Enter your public address"
            onChange={(e) => setPublicAddress(e.currentTarget.value)}
            value={publicAddress}
          />
          <button type="submit">Save Address for HopeBuilders</button>
        </form>
      </div>

      <footer className="footer-distributed" id="contact">
        {/* ... (Your existing footer) */}
      </footer>
    </div>
  );
}

export default App;
