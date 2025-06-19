# 조달청 OpenAPI Proxy Server

조달청 나라장터 입찰공고정보서비스 OpenAPI를 프록시하는 서버입니다. API Key를 서버에서 내부적으로 처리하여 클라이언트에서 직접 API Key를 노출하지 않고 사용할 수 있습니다.

## 기능

- 조달청 OpenAPI와 100% 동일한 엔드포인트 제공
- API Key 내부 처리로 보안 강화
- CORS 설정으로 웹 애플리케이션에서 직접 호출 가능
- JSON/XML 응답 형식 지원

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가:

```
SERVICE_KEY=your_actual_service_key_here
API_BASE_URL=http://apis.data.go.kr/1230000/BidPublicInfoService04
```

### 3. 로컬 개발 서버 실행

```bash
npm run dev
```

### 4. Vercel 배포

```bash
npm run deploy
```

## API 엔드포인트

### 1. `/getBidPblancListInfoServc`

입찰공고목록 정보를 조회합니다.

**필수 파라미터:**
- `numOfRows`: 한 페이지 결과 수
- `pageNo`: 페이지 번호
- `inqryDiv`: 조회구분 (1: 등록일시, 2: 입찰공고번호)
- `type`: 응답 데이터 형식 (json/xml)

**선택 파라미터:**
- `inqryBgnDt`: 조회시작일시 (조회구분 1일 경우 필수, 형식: YYYYMMDDHHMM)
- `inqryEndDt`: 조회종료일시 (조회구분 1일 경우 필수, 형식: YYYYMMDDHHMM)
- `bidNtceNo`: 입찰공고번호 (조회구분 2일 경우 필수)
- 기타 다양한 필터링 옵션

**예시:**
```
GET /getBidPblancListInfoServc?numOfRows=10&pageNo=1&inqryDiv=1&inqryBgnDt=202401010000&inqryEndDt=202401312359&type=json
```

### 2. `/getBidPblancListInfoServcPPSSrch`

조달청 검색조건에 의한 입찰공고목록 정보를 조회합니다.

**필수 파라미터:**
- `numOfRows`: 한 페이지 결과 수
- `pageNo`: 페이지 번호
- `inqryDiv`: 조회구분 (1: 등록일시, 2: 입찰공고번호)
- `type`: 응답 데이터 형식 (json/xml)

**선택 파라미터:**
- `inqryBgnDt`: 조회시작일시 (조회구분 1일 경우 필수, 형식: YYYYMMDDHHMM)
- `inqryEndDt`: 조회종료일시 (조회구분 1일 경우 필수, 형식: YYYYMMDDHHMM)
- `bidNtceNo`: 입찰공고번호 (조회구분 2일 경우 필수)
- 기타 검색 조건

## 사용 예시

### JavaScript (Fetch API)

```javascript
// JSON 형식으로 데이터 조회
const response = await fetch('https://your-vercel-app.vercel.app/getBidPblancListInfoServc?numOfRows=10&pageNo=1&inqryDiv=1&inqryBgnDt=202401010000&inqryEndDt=202401312359&type=json');
const data = await response.json();
console.log(data);
```

### Python

```python
import requests

url = "https://your-vercel-app.vercel.app/getBidPblancListInfoServc"
params = {
    "numOfRows": 10,
    "pageNo": 1,
    "inqryDiv": 1,
    "inqryBgnDt": "202401010000",
    "inqryEndDt": "202401312359",
    "type": "json"
}

response = requests.get(url, params=params)
data = response.json()
print(data)
```

## 주의사항

1. 날짜 형식은 반드시 `YYYYMMDDHHMM` 형식을 사용해야 합니다.
2. `inqryDiv`가 1인 경우 `inqryBgnDt`와 `inqryEndDt`는 필수입니다.
3. `inqryDiv`가 2인 경우 `bidNtceNo`는 필수입니다.
4. API 호출 제한이 있을 수 있으므로 적절한 간격으로 호출하세요.

## 보안

- API Key는 환경 변수로 서버에서만 관리됩니다.
- 클라이언트에서는 API Key 없이 엔드포인트를 호출할 수 있습니다.
- CORS 설정으로 모든 도메인에서 접근 가능하도록 설정되어 있습니다. 필요시 특정 도메인만 허용하도록 수정하세요.

## 라이선스

이 프로젝트는 조달청 OpenAPI를 기반으로 하며, 해당 API의 이용약관을 준수합니다.