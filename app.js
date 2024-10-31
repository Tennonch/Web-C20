async function load() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log("Метамаск не знайдено");
    }

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];
    const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address
    );

    // Викликаємо функції контракту
    const setButton = document.getElementById("setData");
    setButton.onclick = async () => {
        const value = document.getElementById("inputData").value;
        await contract.methods.set(value).send({ from: account });
    };

    const getButton = document.getElementById("getData");
    getButton.onclick = async () => {
        const result = await contract.methods.get().call();
        document.getElementById("displayData").innerText = result;
    };
}
