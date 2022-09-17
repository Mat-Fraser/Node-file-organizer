
function helpFn() {
    console.log(`
    List of All comands:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help "directoryPath"
    `);
}
module.exports = {
    helpKey:helpFn
}