// JavaScript for interactivity will go here
document.addEventListener('DOMContentLoaded', function () {
    var linkedinLink = document.getElementById('linkedin-link');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', function (event) {
            // Send event to Google Analytics
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': 'LinkedIn Profile',
                'event_action': 'click',
                'event_callback': function () {
                    // Optional: Navigate to the link after event is sent
                    window.open(linkedinLink.href, '_blank');
                }
            });
        });
    }
});
