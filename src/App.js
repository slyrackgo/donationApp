import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
  
function App() {
  let [text, setText] = useState("");
  let [savedText1, setSavedText1] = useState("");
  let [connected1, setConnected1] = useState(false);
  let [savedText2, setSavedText2] = useState("");
  let [connected2, setConnected2] = useState(false);
  //Total shares of the user
  let [totalShares, setTotalShares] = useState(0);
  let [shares1, setShares1] = useState(0);
  let [shares2, setShares2] = useState(0);
  //startup vars
  let company1 = 'MetaInvest'
  let company2 = 'Eco-Friendly Homes'


  let { ethereum } = window;
  let contract1 = null;
  let contract2 = null;

  if (ethereum) {

    let abi = [
      "function changeText(string)",
      "function text() view returns (string)"
    ]
    let address1 = "0x1C3dd5c848102ac51E1c47434a00eFbEd1F177C4";
    let address2 = "0x1C3dd5c848102ac51E1c47434a00eFbEd1F177C4";
    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    contract1 = new ethers.Contract(address1, abi, signer);
    contract2 = new ethers.Contract(address2, abi, signer);
  }

  return (  
    <div className="App">
      <div className="startup">
        <h1>MetaInvest</h1>
        <h2>MetaInvest is a startup that helps people invest in startups with a cryptocurrency by providing easy-to-use tools and resources. 
        Our platform offers a range of investment options, from low-risk to high-risk, and is designed to help both novice and 
        experienced investors maximize their returns.</h2>


        <button onClick={() => {
          if (contract1 && !connected1) {
            ethereum.request({ method: 'eth_requestAccounts' })
              .then(accounts => {
                setConnected1(true);
              })
          }
        }}>{!connected1 ? 'Connect wallet' : 'Connected' }</button>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (contract1 && connected1) {
            contract1.changeText(text)
              .then(() => {
                setText("");
              });
          }
        }}>
          <input type="number" min="0" oninput="this.value = Math.abs(this.value)" placeholder="Enter amount in BNB" onChange={e => setText(e.currentTarget.value)} value={text} />
          <input type="submit" value="Submit!" />
        </form>

        <button onClick={() => {
          if (contract1 && connected1) {
            contract1.text()
              .then(text => {
                setSavedText1(text);
              })
          }
        }}>Show shares</button>

        <h3>{savedText1 + ' shares'}</h3>
      </div>
        {/* Second part  */}
      <div className="startup">
        <h1>Eco-Friendly Homes</h1>
        <h2>Eco-Friendly Homes is a startup that helps homeowners reduce their carbon footprint by making their homes more 
        energy-efficient and environmentally friendly. We offer a range of services including energy audits, insulation 
        installation, solar panel installation, and more. Our goal is to help homeowners save money on their energy bills while 
        also doing their part to protect the planet.</h2>
        </div>
        <button onClick={() => {
          if (contract2 && !connected2) {
            ethereum.request({ method: 'eth_requestAccounts' })
              .then(accounts => {
                setConnected2(true);
              })
          }
        }}>{!connected2 ? 'Connect wallet' : 'Connected' }</button>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (contract2 && connected2) {
            contract2.changeText(text)
              .then(() => {
                setText("");
              });
          }
        }}>
          <input type="number" min="0"  oninput="this.value = Math.abs(this.value)" placeholder="Enter amount in BNB" onChange={e => setText(e.currentTarget.value)} value={text} />
          <input type="submit" value="Submit!" />
        </form>

        <button onClick={() => {
          if (contract2 && connected2) {
            contract2.text()
              .then(text => {
                setSavedText2(text);
              })
          }
        }}>Show shares</button>
          <h3>{savedText2 + ' shares'}</h3>
        <h2 className="account">Total Amount of Shares</h2>
      {connected1 && <p>MetaInvest: {savedText1} shares</p>}
      {connected2 && <p>Eco-Friendly Homes: {savedText2} shares</p>}
        </div>
        
        )};

        export default App;
