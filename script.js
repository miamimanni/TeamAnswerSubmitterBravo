document.getElementById('apiForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const responseMessage = document.getElementById('responseMessage');
    const textInput = document.getElementById('textInput');
    const googleApiURL = 'https://script.google.com/macros/s/AKfycbwJfBza6jdoK9bPrsALQpyUs45l0EAxZ2via_K-ZEJM20VYl1fwzngj8UzVa0H0z1Gr_g/exec';

    // Update status message to "Submitting"
    responseMessage.textContent = 'Submitting';
    responseMessage.style.color = 'blue';

    // JSON body
    const requestBody = {
        action: 'set',
        player: 'Bravo',
        valueToSet: textInput.value
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
                    if (xhr.status === 200) {
                        responseMessage.textContent = 'Answer submitted successfully!';
                        responseMessage.style.color = 'green';

                        // Reset page after 10 seconds
                        setTimeout(() => {
                            textInput.value = '';
                            // responseMessage.textContent = '';
                        }, 10000);
                    } else {
                        responseMessage.textContent = 'Answer submission failed!';
                        responseMessage.style.color = 'red';
                    }
                };

                xhr.onerror = function () {
                    // const responseMessage = document.getElementById('responseMessage');
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
