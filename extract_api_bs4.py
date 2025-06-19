from bs4 import BeautifulSoup
import re

# Read the HTML file
with open('조달청_OpenAPI참고자료_나라장터_입찰공고정보서비스_1.0.htm_', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Parse HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Extract all text from the body
body = soup.find('body')
if body:
    # Get all text content
    text = body.get_text(separator='\n', strip=True)
    
    # Save to file
    with open('body_content.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    
    # Look for API-specific patterns
    lines = text.split('\n')
    api_lines = []
    
    for i, line in enumerate(lines):
        if any(keyword in line.lower() for keyword in ['http://', 'https://', 'api', 'url', 'endpoint', 'request', 'response', 'servicekey', '요청', '응답', '서비스']):
            api_lines.append((i, line))
    
    # Save API-related lines
    with open('api_extract_output.txt', 'w', encoding='utf-8') as f:
        f.write("=== API Documentation Extract ===\n\n")
        for idx, line in api_lines[:200]:  # First 200 API-related lines
            f.write(f"Line {idx}: {line}\n")
            f.write("-" * 80 + "\n")
    
    print(f"Found {len(api_lines)} API-related lines")
    print("Results saved to api_extract_output.txt and body_content.txt")
else:
    print("Could not find body tag in HTML")