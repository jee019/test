function doGet(e) {
	var params = e.parameter;

	// Replace "YOUR_SPREADSHEET_ID" with your actual Google Spreadsheet ID
	// You can find it in the URL: https://docs.google.com/spreadsheets/d/{YOUR_SPREADSHEET_ID}/edit
	var SpreadSheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
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
			if (i > numQuestions + 1 && numQuestions > 0) {
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
		"<!DOCTYPE html><html><head><meta charset='utf-8'><title>Thank You</title>" +
		"<style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;}" +
		"h1{color:#28a745;}</style></head><body>" +
		"<h1>✓ Submission Successful</h1><p>" + thankMessage + "</p>" +
		"<p><small>You can close this window now.</small></p></body></html>"
	).setMimeType(ContentService.MimeType.HTML);
}