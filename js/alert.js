// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from being shown
    event.preventDefault();
  
    // Create the alert
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.backgroundColor = '#ffffff';
    alertBox.style.borderRadius = '5px';
    alertBox.style.padding = '20px';
    alertBox.style.boxShadow = '0px 0px 10px #000000';
    alertBox.style.zIndex = '9999';
  
    // Add a message to the alert
    const message = document.createElement('p');
    message.innerText = 'To use this app, please add it to your home screen.';
    alertBox.appendChild(message);
  
    // Add a button to the alert
    const button = document.createElement('button');
    button.innerText = 'Add to Home Screen';
    button.addEventListener('click', () => {
      // Show the native "add to home screen" prompt
      event.prompt();
  
      // Remove the alert from the page
      alertBox.remove();
    });
    alertBox.appendChild(button);
  
    // Add the alert to the page
    document.body.appendChild(alertBox);
  });
  