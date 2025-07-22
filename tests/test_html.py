from pathlib import Path
import re
from bs4 import BeautifulSoup

HTML_FILE = Path(__file__).resolve().parents[1] / "index.html"


def test_html_parse():
    content = HTML_FILE.read_text(encoding="utf-8")
    soup = BeautifulSoup(content, "html.parser")
    assert soup is not None


def test_no_unmatched_tags():
    content = HTML_FILE.read_text(encoding="utf-8")
    tags_to_check = ["a", "p", "div", "span"]
    for tag in tags_to_check:
        open_tag_pattern = rf"<{tag}(\s|>)"
        close_tag_pattern = rf"</{tag}>"
        opens = len(re.findall(open_tag_pattern, content))
        closes = len(re.findall(close_tag_pattern, content))
        assert opens == closes, f"Mismatched <{tag}> tags: {opens} open vs {closes} close"
