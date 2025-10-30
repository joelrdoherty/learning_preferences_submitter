/**
 * Google Apps Script for Aptly Able Learning Preferences Assessment
 * This script receives form submissions and sends them via Gmail
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Deploy as Web App (Deploy > New deployment > Web app)
 * 5. Set "Execute as" to "Me"
 * 6. Set "Who has access" to "Anyone"
 * 7. Copy the deployment URL and update script.js
 */

function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Email configuration
    var recipient = "info@aptlyable.com";
    var subject = "Learning Preferences Assessment - " + new Date().toLocaleDateString();
    
    // Format the email body
    var body = formatEmailBody(data);
    
    // Send the email via Gmail
    GmailApp.sendEmail(recipient, subject, body);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true,
      message: "Assessment submitted successfully" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    // Log the error
    Logger.log("Error: " + err.message);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: err.message 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatEmailBody(data) {
  var body = "APTLY ABLE LEARNING PREFERENCES ASSESSMENT\n";
  body += "==========================================\n\n";
  body += "Submission Time: " + new Date().toLocaleString() + "\n\n";
  
  // Archetype Results
  if (data.archetypes) {
    body += "LEARNING STYLE PROFILE\n";
    body += "----------------------\n";
    body += "Primary Archetype: " + data.archetypes.primary + " (" + data.archetypes.scores[data.archetypes.primary] + "/15 points)\n";
    
    if (data.archetypes.secondary) {
      body += "Secondary Archetype: " + data.archetypes.secondary + " (" + data.archetypes.scores[data.archetypes.secondary] + "/15 points)\n";
    }
    
    body += "\nScore Breakdown:\n";
    body += "  🧠 Analyst: " + data.archetypes.scores.Analyst + "/15 (" + data.archetypes.percentages.Analyst + "%)\n";
    body += "  ⚡ Doer: " + data.archetypes.scores.Doer + "/15 (" + data.archetypes.percentages.Doer + "%)\n";
    body += "  💬 Connector: " + data.archetypes.scores.Connector + "/15 (" + data.archetypes.percentages.Connector + "%)\n";
    body += "  🌍 Explorer: " + data.archetypes.scores.Explorer + "/15 (" + data.archetypes.percentages.Explorer + "%)\n";
    body += "\n\n";
  }
  
  // Questions and Answers
  body += "LEARNING PREFERENCES\n";
  body += "====================\n\n";
  
  var questions = [
    "When I'm learning something new, I prefer...",
    "When someone gives me feedback, I prefer...",
    "I understand best when information is...",
    "When I make a mistake, I usually...",
    "I feel most motivated when...",
    "If a trainer were helping me, I'd want them to...",
    "In group training sessions, I usually...",
    "When someone corrects me, I appreciate...",
    "When I read instructions, I prefer...",
    "I like feedback that...",
    "I tend to...",
    "My best learning happens when...",
    "When I'm learning something challenging, I prefer to...",
    "I stay motivated when...",
    "My ideal coaching style would be..."
  ];
  
  for (var i = 1; i <= 15; i++) {
    var questionKey = "q" + i;
    if (data.answers && data.answers[questionKey]) {
      body += (i) + ". " + questions[i-1] + "\n";
      body += "   Answer: " + data.answers[questionKey].answer + ". " + data.answers[questionKey].text + "\n";
      body += "   Archetype: " + data.answers[questionKey].archetype + "\n\n";
    }
  }
  
  // Reflection Questions
  body += "\nREFLECTION RESPONSES\n";
  body += "====================\n\n";
  
  if (data.reflections) {
    body += "1. What's one thing a coach should definitely do to help you thrive?\n";
    body += "   " + data.reflections.reflection1 + "\n\n";
    
    body += "2. What's one thing that doesn't work well for you when learning or receiving feedback?\n";
    body += "   " + data.reflections.reflection2 + "\n\n";
    
    body += "3. How do you prefer to receive feedback? (In writing, verbally, or both)\n";
    body += "   " + data.reflections.reflection3 + "\n\n";
  }
  
  return body;
}

// Test function (optional - you can run this to test the email formatting)
function testEmail() {
  var testData = {
    archetypes: {
      primary: "Analyst",
      secondary: "Doer",
      scores: { Analyst: 6, Doer: 5, Connector: 2, Explorer: 2 },
      percentages: { Analyst: 40, Doer: 33, Connector: 13, Explorer: 13 }
    },
    answers: {
      q1: { answer: "A", text: "Trying it myself right away", archetype: "Doer" }
    },
    reflections: {
      reflection1: "Test response 1",
      reflection2: "Test response 2",
      reflection3: "Test response 3"
    }
  };
  
  var body = formatEmailBody(testData);
  Logger.log(body);
  
  // Uncomment to actually send a test email
  // GmailApp.sendEmail("info@aptlyable.com", "Test Assessment", body);
}

