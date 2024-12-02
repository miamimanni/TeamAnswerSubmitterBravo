document.getElementById('apiForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const textInput = document.getElementById('textInput').value;
    const googleApiURL = 'https://script.google.com/macros/s/AKfycbwJfBza6jdoK9bPrsALQpyUs45l0EAxZ2via_K-ZEJM20VYl1fwzngj8UzVa0H0z1Gr_g/exec';

    // JSON body
    const requestBody = {
        action: 'set',
        player: 'Bravo',
        valueToSet: textInput
    };

    // Convert to Base64
    const encodedData = btoa(JSON.stringify(requestBody));

    // Prepare x-www-form-urlencoded body
    const urlEncodedData = `data=${encodedData}`;
    
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', googleApiURL, true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {


                const xhr = new XMLHttpRequest();
                xhr.open('POST', googleApiURL, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.onload = function () {
                    const responseMessage = document.getElementById('responseMessage');
                    if (xhr.status === 200) {
                        responseMessage.textContent = 'Request successful!';
                        responseMessage.style.color = 'green';
                    } else {
                        responseMessage.textContent = 'Request failed!';
                        responseMessage.style.color = 'red';
                    }
                };

                xhr.onerror = function () {
                    const responseMessage = document.getElementById('responseMessage');
                    responseMessage.textContent = 'Network error occurred!';
                    responseMessage.style.color = 'red';
                };

                xhr.send(urlEncodedData);
            }
        }
    }

    // Send XMLHttpRequest
    xhr2.send();
});
