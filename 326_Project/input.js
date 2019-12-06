function selection() {
    alert("ss")
    var form = document.getElementById("myWorkContent"),
    inputs = form.getElementsByTagName("theme"),
    arr = [];

    for (var i = 0, max = inputs.length; i < max; i += 1) {
        if (inputs[i].type === "checkbox" && inputs[i].checked) {
            arr.push(inputs[i].value);
        }
    }
    alert(arr);
}