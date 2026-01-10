function doGet(e) {
	try {
		var params = e.parameter;

		// Replace "YOUR_SPREADSHEET_ID" with your actual Google Spreadsheet ID
		// You can find it in the URL: https://docs.google.com/spreadsheets/d/{YOUR_SPREADSHEET_ID}/edit
		var SpreadsheetID = "YOUR_SPREADSHEET_ID"; // IMPORTANT: Replace this with your actual Spreadsheet ID
		
		if (SpreadsheetID === "YOUR_SPREADSHEET_ID") {
			// Return error page if Spreadsheet ID is not set
			return ContentService.createTextOutput(
				"<!DOCTYPE html><html><head><meta charset='utf-8'><title>Configuration Error</title>" +
				"<style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;background:#f8f9fa;}" +
				"h1{color:#dc3545;} .container{max-width:600px;margin:0 auto;background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}" +
				"code{background:#f4f4f4;padding:2px 6px;border-radius:3px;}</style></head><body>" +
				"<div class='container'><h1>⚠ Configuration Error</h1>" +
				"<p>The Spreadsheet ID has not been configured in app.gs</p>" +
				"<p>Please open the Google Apps Script editor and replace <code>YOUR_SPREADSHEET_ID</code> with your actual Spreadsheet ID.</p>" +
				"<p><small>You can find the Spreadsheet ID in your Google Spreadsheet URL.</small></p></div></body></html>"
			).setMimeType(ContentService.MimeType.HTML);
		}
		
		var SpreadSheet = SpreadsheetApp.openById(SpreadsheetID);
		var Sheet = SpreadSheet.getSheets()[0];
		var LastRow = Sheet.getLastRow();
		
		// Count how many question columns exist (q1, q2, q3, etc.)
		var numQuestions = 0;
		for (var i = 1; i <= 100; i++) { // Support up to 100 questions
			if (params["q" + i.toString()]) {
				numQuestions = i;
			} else {
				// Check if we've found all questions (stop when we find a gap)
				// But continue checking a few more to be sure
				if (i > numQuestions + 2 && numQuestions > 0) {
					break;
				}
			}
		}

		// Write basic information
		var newRow = LastRow + 1;
		Sheet.getRange(newRow, 1).setValue(params.name || "");
		Sheet.getRange(newRow, 2).setValue(params.mail || "");
		Sheet.getRange(newRow, 3).setValue(params.formid || "");
		Sheet.getRange(newRow, 4).setValue(params.type || "");
		
		// Write all question answers dynamically
		for (var i = 1; i <= numQuestions; i++) {
			var qValue = params["q" + i.toString()];
			Sheet.getRange(newRow, 4 + i).setValue(qValue || "");
		}

		// Return HTML response for better user experience
		var thankMessage = params.thank || "Thank you for your participation!";
		return ContentService.createTextOutput(
			"<!DOCTYPE html><html><head><meta charset='utf-8'><meta http-equiv='refresh' content='5;url=https://github.com'>" +
			"<title>Thank You</title>" +
			"<style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;background:#f8f9fa;}" +
			"h1{color:#28a745;} .container{max-width:600px;margin:0 auto;background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}" +
			".success-icon{font-size:60px;color:#28a745;margin-bottom:20px;}" +
			"</style></head><body>" +
			"<div class='container'>" +
			"<div class='success-icon'>✓</div>" +
			"<h1>Submission Successful!</h1>" +
			"<p>" + thankMessage + "</p>" +
			"<p><small>This page will redirect in 5 seconds. You can close this window now.</small></p>" +
			"</div></body></html>"
		).setMimeType(ContentService.MimeType.HTML);
		
	} catch (error) {
		// Return error page if something goes wrong
		return ContentService.createTextOutput(
			"<!DOCTYPE html><html><head><meta charset='utf-8'><title>Error</title>" +
			"<style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;background:#f8f9fa;}" +
			"h1{color:#dc3545;} .container{max-width:600px;margin:0 auto;background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);}" +
			"</style></head><body>" +
			"<div class='container'><h1>⚠ Error Occurred</h1>" +
			"<p>An error occurred while processing your submission.</p>" +
			"<p><small>Error: " + error.toString() + "</small></p>" +
			"<p>Please try again or contact the administrator.</p></div></body></html>"
		).setMimeType(ContentService.MimeType.HTML);
	}
}