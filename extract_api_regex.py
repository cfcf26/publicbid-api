import re
import html

# Read the HTML file
with open('조달청_OpenAPI참고자료_나라장터_입찰공고정보서비스_1.0.htm_', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Remove HTML tags and decode entities
text = re.sub(r'<[^>]+>', '\n', html_content)
text = html.unescape(text)

# Clean up excessive whitespace
text = re.sub(r'\n+', '\n', text)
text = re.sub(r'[ \t]+', ' ', text)

# Find lines containing API-related information
lines = text.split('\n')
api_info = []

# Keywords to search for
keywords = [
    'http://apis.data.go.kr',
    'https://apis.data.go.kr',
    'BidPublicInfoService',
    'getBidPblanc',
    'serviceKey',
    '서비스URL',
    '요청변수',
    '응답메시지',
    'API',
    'endpoint',
    '입찰공고',
    '나라장터',
    '조달청'
]

for i, line in enumerate(lines):
    line = line.strip()
    if line and any(keyword in line for keyword in keywords):
        api_info.append((i, line))
        # Also capture the next few lines for context
        for j in range(1, 5):
            if i + j < len(lines) and lines[i + j].strip():
                api_info.append((i + j, lines[i + j].strip()))

# Remove duplicates while preserving order
seen = set()
unique_api_info = []
for item in api_info:
    if item not in seen:
        seen.add(item)
        unique_api_info.append(item)

# Save results
with open('api_extract_output.txt', 'w', encoding='utf-8') as f:
    f.write("=== 조달청 OpenAPI 나라장터 입찰공고정보서비스 ===\n\n")
    
    # Look for base URL
    for idx, line in unique_api_info:
        if 'apis.data.go.kr' in line:
            f.write(f"API Base URL found at line {idx}: {line}\n\n")
            break
    
    # Look for service endpoints
    f.write("=== Service Endpoints ===\n")
    endpoints = []
    for idx, line in unique_api_info:
        if 'getBidPblanc' in line or 'BidPublicInfoService' in line:
            endpoints.append(line)
            f.write(f"Line {idx}: {line}\n")
    
    f.write("\n=== All API-related content ===\n")
    for idx, line in unique_api_info[:200]:  # First 200 matches
        f.write(f"Line {idx}: {line}\n")
        f.write("-" * 80 + "\n")

print(f"Found {len(unique_api_info)} unique API-related lines")
print("Results saved to api_extract_output.txt")

# Also try to extract tables
table_pattern = r'<table[^>]*>(.*?)</table>'
tables = re.findall(table_pattern, html_content, re.DOTALL | re.IGNORECASE)

print(f"\nFound {len(tables)} tables in the document")

# Save first few tables that might contain API info
with open('tables_extract.txt', 'w', encoding='utf-8') as f:
    for i, table in enumerate(tables[:10]):
        # Clean the table content
        table_text = re.sub(r'<[^>]+>', ' ', table)
        table_text = html.unescape(table_text)
        table_text = re.sub(r'\s+', ' ', table_text).strip()
        
        if any(keyword in table_text for keyword in ['API', 'http', 'serviceKey', '요청', '응답']):
            f.write(f"\n=== Table {i+1} ===\n")
            f.write(table_text)
            f.write("\n" + "=" * 80 + "\n")