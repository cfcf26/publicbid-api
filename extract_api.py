import re
from html.parser import HTMLParser
import html

class APIDocParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.in_cell = False
        self.current_text = []
        self.all_text = []
        
    def handle_starttag(self, tag, attrs):
        if tag == 'table':
            self.in_table = True
        elif tag in ['td', 'th', 'p'] and self.in_table:
            self.in_cell = True
            
    def handle_endtag(self, tag):
        if tag == 'table':
            self.in_table = False
        elif tag in ['td', 'th', 'p'] and self.in_cell:
            self.in_cell = False
            if self.current_text:
                text = ' '.join(self.current_text).strip()
                if text:
                    self.all_text.append(text)
                self.current_text = []
                
    def handle_data(self, data):
        if self.in_cell:
            cleaned = html.unescape(data.strip())
            if cleaned:
                self.current_text.append(cleaned)

# Read file
with open('조달청_OpenAPI참고자료_나라장터_입찰공고정보서비스_1.0.htm_', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse
parser = APIDocParser()
parser.feed(content)

# Look for API-specific content
api_info = []
for i, text in enumerate(parser.all_text):
    lower_text = text.lower()
    # Check for API-related keywords
    if any(k in lower_text for k in ['http', 'api', 'servicekey', 'url', 'request', 'response', 'xml', 'json', 'parameter', '서비스', '요청', '응답', '파라미터']):
        api_info.append(f"{i}: {text}")

# Print first 50 API-related entries
for info in api_info[:50]:
    print(info)
    print("-" * 80)