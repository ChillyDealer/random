document.getElementById('stickerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // så den ikke genlæser

    // form
    var itemName = document.getElementById('itemName').value;
    var price = document.getElementById('price').value;
    var date = document.getElementById('date').value;
    var quantity = document.getElementById('quantity').value;

    // sticker create
    generateStickers(itemName, price, date, quantity);
});

function generateStickers(itemName, price, date, quantity) {
    var output = document.getElementById('output');
    output.innerHTML = ''; // Tømmer output-elementet

    // lav og sæt sticker
    for (var i = 0; i < quantity; i++) {
        var sticker = document.createElement('div');
        sticker.className = 'sticker';
        sticker.innerHTML = '<div><strong>' + itemName + '</strong></div>' +
            '<div>Pris: ' + price + ' kr</div>' +
            '<div>Dato: ' + date + '</div>';
        output.appendChild(sticker);
    }

    // se om print eksister 
    var printButton = document.getElementById('easyPrintButton');
    if (!printButton) {
        printButton = document.createElement('button');
        printButton.id = 'easyPrintButton';
        printButton.innerHTML = 'Easy Print';
        printButton.addEventListener('click', function () {
            printGeneratedStickers();
        });
        document.body.appendChild(printButton);
    }
}

// åbner i _blank
function printGeneratedStickers() {
    var printWindow = window.open('', '_blank');
    // html og css
    printWindow.document.write('<html><head><title>Print Stickers</title>');
    printWindow.document.write('<style>.sticker { font-family: Roboto, Arial, sans-serif; text-align: center; border: 1px solid #ddd; padding: 10px; margin: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); transition: 0.3s; width: 200px; display: inline-block; position: relative; overflow: hidden; } .sticker:before { content: ""; position: absolute; background: #4caf50; width: 100%; height: 100%; left: 0; top: 0; transform: scale(0); transition: all 0.3s ease-in-out; z-index: -1; }</style>');
    printWindow.document.write('</head><body>');
    // skriv til den nye side
    printWindow.document.write('<div id="stickers">' + document.getElementById('output').innerHTML + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
