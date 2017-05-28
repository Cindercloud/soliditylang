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
    }
    });

    $("#donationButton").click(function(e){
        var amount = Number($("#amount").val().toString());

        if (typeof web3 !== 'undefined') {
            web3.eth.sendTransaction({
                to: donationAddress,
                value: web3.toWei(Number($("#amount").val()))
            }, function(error, address){
                console.log(error);
                console.log(address);
            });
            e.preventDefault();
        }
    });
})(jQuery);