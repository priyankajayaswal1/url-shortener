
function check(event) {
    event.preventDefault();

    var other_params = {
        'method': 'POST',
        'url': 'localhost:3000/url/',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"longUrl":document.getElementById('long-url').value}),
    };

    fetch("http://localhost:3000/url/", other_params)
        .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Could not reach the API: " + response.statusText);
        }
    }).then(function(data) {
        console.log(data);
        let linkStr = "http://localhost:3000/url/"+data.body
        let labelItem = document.getElementById("result-label");
        labelItem.innerHTML = "Shortened version: " + linkStr;
        labelItem.setAttribute("href", linkStr);
    }).catch(function(error) {
        document.getElementById("result-label").innerHTML = error.message;
    });
  return true;
}