// Clear contact form
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    this.reset();
    alert("We have received your message and will get back to you shortly.");
});
