#!/usr/bin/env python3
"""Generate forms for human evaluation."""

from jinja2 import FileSystemLoader, Environment
from utils import QuestionGenerator_MOS as QuestionGenerator


def main():
    """Main function."""
    loader = FileSystemLoader(searchpath="./templates")
    env = Environment(loader=loader)
    template = env.get_template("mos.html.jinja2")
    


    html = template.render(
        page_title="MOS Experiment Form 1",
        form_id=1,
        form_url="https://script.google.com/macros/s/AKfycbz88pG3Usw7jdtNWh9pUWnfPR855SESSYZFGyaYbPv006CSZplhdrc2v2wwhjakF8mkjg/exec",  # Replace with your Google Apps Script Web App URL
        questions = QuestionGenerator("filelist/MOS.csv").questions
    )
    # write html into file
    with open("mos.html", "w") as f:
        f.write(html)
        print("Done!")


if __name__ == "__main__":
    main()