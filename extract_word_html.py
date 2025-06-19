import re
from bs4 import BeautifulSoup
import html

# Read the file
with open('조달청_OpenAPI참고자료_나라장터_입찰공고정보서비스_1.0.htm_', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse with BeautifulSoup
soup = BeautifulSoup(content, 'html.parser')

# Find all text content
all_text = []

# Extract text from paragraphs and table cells
for element in soup.find_all(['p', 'td', 'th', 'span']):
    text = element.get_text(strip=True)
    if text and len(text) > 3:
        all_text.append(text)

# Look for API-related content
api_keywords = ['http', 'api', 'servicekey', 'url', 'request', 'response', 'xml', 'json', 
                'parameter', '서비스', '요청', '응답', '파라미터', 'data.go.kr', 'numofrows', 
                'pageno', 'endpoint', '조달청', '입찰', '공고']

api_content = []
for text in all_text:
    if any(keyword in text.lower() for keyword in api_keywords):
        api_content.append(text)

# Print API-related content
for i, content in enumerate(api_content[:100]):
    print(f"\n{i+1}. {content}")
    print("-" * 80)