import re
from html.parser import HTMLParser
import html

class SimpleTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_content = []
        self.skip_tags = {'script', 'style', 'meta', 'link'}
        self.current_tag = None
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        
    def handle_endtag(self, tag):
        self.current_tag = None
        
    def handle_data(self, data):
        if self.current_tag not in self.skip_tags and data.strip():
            cleaned = html.unescape(data.strip())
            if cleaned and len(cleaned) > 3:
                self.text_content.append(cleaned)

# Read file
with open('조달청_OpenAPI참고자료_나라장터_입찰공고정보서비스_1.0.htm_', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove comments
content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

# Parse
parser = SimpleTextExtractor()
parser.feed(content)

# Print all text content to see what we have
for i, text in enumerate(parser.text_content):
    if i > 500:  # Limit output
        break
    print(f"{i}: {text}")