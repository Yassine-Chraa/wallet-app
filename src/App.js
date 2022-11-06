import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Info from "./components/Info";


function App() {
  function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="body">
        <Info />
      </div>
    </Web3ReactProvider>
  );
}
export default App;
