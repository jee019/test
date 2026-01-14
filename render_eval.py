#!/usr/bin/env python3
"""Generate combined NMOS & SMOS forms for human evaluation."""

from jinja2 import FileSystemLoader, Environment
from utils import QuestionGenerator_MOS, QuestionGenerator_SMOS


def main():
    """Main function."""
    loader = FileSystemLoader(searchpath="./templates")
    env = Environment(loader=loader)
    template = env.get_template("eval.html.jinja2")
    
    # Load MOS questions
    mos_questions = QuestionGenerator_MOS("filelist/NMOS.csv").questions
    
    # Load SMOS questions
    smos_questions = QuestionGenerator_SMOS("filelist/SMOS.csv").questions

    html = template.render(
        page_title="NMOS & SMOS Experiment Form",
        form_url="https://script.google.com/macros/s/AKfycbz88pG3Usw7jdtNWh9pUWnfPR855SESSYZFGyaYbPv006CSZplhdrc2v2wwhjakF8mkjg/exec",  # NMOS용 Google Apps Script URL
        mos_questions=mos_questions,
        smos_questions=smos_questions
    )
    
    # Write html into file
    with open("eval.html", "w", encoding="utf-8") as f:
        f.write(html)
        print("Done! Generated eval.html")


if __name__ == "__main__":
    main()
