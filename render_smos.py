"""Generate forms for human evaluation."""

from jinja2 import FileSystemLoader, Environment
from utils import QuestionGenerator_SMOS as QuestionGenerator


def main():
    """Main function."""
    loader = FileSystemLoader(searchpath="./templates")
    env = Environment(loader=loader)
    template = env.get_template("smos.html.jinja2")

    html = template.render(
        page_title="SMOS Experiment Form 1", 
        form_id=1,
        form_url="https://script.google.com/macros/s/AKfycbwxqky0Y2Dd9C2yf4ZrYTYKH7kCW-CM3YBv6RG-AGkFzEsuo_2vbgBTou2zoLTjIVW0/exec",  # Replace with your Google Apps Script Web App URL
        questions = QuestionGenerator("filelist/SMOS.csv").questions
    )

    with open("docs/smos.html", "w") as f:
        f.write(html)
        print("Done!")


if __name__ == "__main__":
    main()