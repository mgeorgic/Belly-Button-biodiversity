// Build the function for the metadata panel
// d3.json to grab the metadata for a sample
// d3 to select the id '#sample-metadata' in the index.html and .html("") to clear it initially
// Create a url for hosting the metdata sample 
function init() {
    d3.json("data/samples.json")
    data = starterData;
    var values = starterData.names;
    var userSelect = d3.select('#selDataset');
}
