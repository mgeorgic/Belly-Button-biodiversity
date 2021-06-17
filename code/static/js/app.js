// Initiate the function for the metadata panel
// d3.json to grab the metadata for a sample
// d3 to select the id '#selDataset' in the index.html
var data;
function init() {
    d3.json("data/samples.json").then(dataInitial =>{
        data = starterData;
        var uservalues = starterData.names;
        var userSelect = d3.select('#selDataset');
        valueReturn.forEach(value => {
            userSelect
                .append("option")
                .text(value)
                .attr("value", function(){
                    return value;
                });
            });
        });
}
// initate the function to fill values for user's selection
init()

// Use d3 to grab the dataset selected and change it upon user's selection
d3.selectAll("#selDataset").on("change",plotFunctions)