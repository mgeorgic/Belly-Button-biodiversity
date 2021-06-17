// Build the function for the metadata panel
// d3.json to grab the metadata for a sample
// d3 to select the id '#sample-metadata' in the index.html and .html("") to clear it initially
// Create a url for hosting the metdata sample 
function buildMetadata(sample) {
    var sample_meta_panel = d3.select("#sample-metadata").html("");
    var metadata_url = `/metadata/${sample}`;




}