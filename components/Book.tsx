'use client'

import { useState } from 'react'

interface SubSubChapter {
  id: string
  title: string
  content: string
}

interface SubChapter {
  id: string
  title: string
  content?: string
  subSubChapters?: SubSubChapter[]
}

interface Chapter {
  id: number
  title: string
  subChapters: SubChapter[]
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: '코딩의 시작',
    subChapters: [
      {
        id: '1-1',
        title: '바이브코딩이란?',
        content: '바이브 코딩(Vibe Coding)은 전통적인 프로그래밍 방식과 달리, **복잡한 문법이나 언어를 배우지 않고도 AI와 대화만으로 코드를 작성하고 실행할 수 있는 새로운 개발 방식**을 의미합니다.\n\n기존의 코딩은 개발자가 일일이 문법을 이해하고 코드를 작성해야 했습니다. 따라서 진입장벽이 높고, 배우는 데 많은 시간과 노력이 필요했습니다. 반면, 바이브 코딩은 "내가 원하는 결과를 자연어로 설명하면 AI가 알아서 코드를 작성해주는 구조"를 가지고 있어, 코딩 경험이 없는 사람도 얼마든지 결과물을 만들어낼 수 있습니다.\n\n### 1. 왜 \'바이브\' 코딩일까?\n\n\'바이브(Vibe)\'라는 단어는 분위기, 흐름, 감각을 뜻합니다.\n\n바이브 코딩은 이름 그대로, **흐름에 맞춰 AI와 주고받으며 자연스럽게 결과물을 만들어가는 과정**을 강조합니다.\n\n- 내가 아이디어를 말하면 → AI가 코드와 실행 결과를 제시\n- 마음에 들지 않으면 → "이 부분을 더 단순하게 바꿔줘"라고 요청\n- 반복되는 대화를 통해 원하는 결과물을 점점 완성\n\n마치 디자이너와 협업하듯, AI와 대화하면서 작업이 이뤄집니다.\n\n---\n\n### 2. 주요 특징\n\n1. **대화형 개발**: 명령어 대신 대화형 지시로 코드 생성 및 수정\n\n2. **빠른 프로토타입 제작**: 아이디어를 즉시 화면이나 기능으로 구현\n\n3. **낮은 진입장벽**: 프로그래밍 지식 없이도 누구나 시작 가능\n\n4. **AI의 보조**: 오류 수정, 코드 최적화, 새로운 기능 추가 자동 지원\n\n---\n\n### 3. 비개발자에게 주는 가치\n\n바이브 코딩은 특히 **비개발자에게 실질적인 기회**를 제공합니다.\n\n- **부업 수익화**: 홈페이지 제작, 랜딩페이지 제작, 간단한 자동화 프로그램을 만들어 판매 가능\n\n- **시간 절약**: 학습보다 실행에 집중 → 아이디어를 빠르게 실현\n\n- **창업 기회**: 최소 기능 제품(MVP)을 제작하여 시장 반응 검증 가능\n\n- **자기 표현**: 취미, 블로그, 개인 프로젝트 등에도 손쉽게 적용'
      },
      {
        id: '1-2',
        title: '코딩을 위한 준비',
        subSubChapters: [
          {
            id: '1-2-(1)',
            title: '(1) 필수 개념 이해하기',
            content: '1. PRD (Product Requirement Document)\n\n제품 기획 단계에서 "무엇을 만들 것인가"를 정리하는 문서. 초보자라도 실행 전에 방향을 잡는 데 큰 도움이 됩니다.\n\n👉 만들기 전에 방향을 정리하는 지도\n\n2. MCP (Model Context Protocol)\n\nAI가 외부 도구와 연결될 수 있도록 해주는 다리 같은 개념. Cursor 같은 AI 개발 툴에서 활용됩니다.\n\n👉 AI를 더 똑똑하게 만드는 연결 장치\n\n3. LLM (Large Language Model)\n\nChatGPT, Claude, Gemini 같은 AI 기술. 사람의 언어를 코드나 결과물로 바꿔주는 핵심 엔진.\n\n👉 사람의 언어를 이해하는 AI 두뇌\n\n4. 노코드 / 로우코드 (No-code / Low-code)\n\n코드 없이 또는 최소한의 코드로 결과물을 만드는 방식. 러버블(Lovable), 아임웹 같은 서비스가 대표적.\n\n👉 코딩을 몰라도 결과물을 만드는 방법\n\n5. MVP (Minimum Viable Product)\n\n최소 기능만 담은 시제품. 빠른 실행과 시장 검증의 핵심 전략.\n\n👉 작게 시작해서 빠르게 검증\n\n6. API (Application Programming Interface)\n\n결제, 지도, 로그인 같은 기능을 직접 개발하지 않고 가져다 쓰는 연결 통로.\n\n👉 필요한 기능을 쉽게 붙이는 방법\n\n7. 배포 (Deployment)\n\n내 컴퓨터 안에서 만든 것을 세상에 공개하는 과정. Netlify, Vercel, 부스터AI 같은 도구를 통해 간단히 가능.\n\n👉 만든 것을 공개하는 마지막 단계'
          },
          {
            id: '1-2-(2)',
            title: '(2) 필수 사이트 바로가기',
            content: '1. **ChatGPT** — [chat.openai.com](https://chat.openai.com/)\n\n대화형 AI 서비스로, 글쓰기·아이디어 발상·코드 작성 보조까지 가능.\n\n비개발자는 **코드를 직접 작성하기보다 AI에게 설명하고 결과를 얻는 방식**으로 활용할 수 있음.\n\n2. **Claude** — anthropic.com/claude\n\n자연어 이해력이 강하고, 긴 문서를 요약하거나 기획서를 다루는 데 유리함.\n\n비개발자는 **기획 문서 정리, PRD 작성, 아이디어 검증**에 활용하기 좋음.\n\n3. **Gemini** — gemini.google.com\n\n구글의 LLM. 검색·데이터 분석과 연동이 강점.\n\n비개발자는 **시장조사, 최신 자료 검색, 데이터 분석**에 쉽게 활용 가능.\n\n4. **Cursor AI** — [cursor.com](https://cursor.com/?utm_source=chatgpt.com)\n\n개발 친화적인 AI IDE. 코드 작성, 디버깅, 테스트 자동화를 지원.\n\n비개발자는 **"이런 기능 만들어줘"라는 지시만으로 코드 자동 생성** 가능.\n\n5. **Lovable (러버블)** — [lovable.dev](https://lovable.dev/?utm_source=chatgpt.com)\n\n노코드 기반 웹 제작 도구. 드래그 앤 드롭으로 홈페이지 제작 가능.\n\n비개발자는 **홈페이지·랜딩페이지를 직접 제작**할 수 있음.\n\n6. **V0 (by Vercel)** — [v0.app](https://v0.app/)\n\n텍스트 프롬프트로 UI 컴포넌트를 자동 생성하는 AI 빌더.\n\n비개발자는 **간단한 설명만으로 웹 디자인 시안을 바로 뽑아낼 수 있음.**\n\n7. **Supabase** — [supabase.com](https://supabase.com/?utm_source=chatgpt.com)\n\n오픈소스 백엔드 서비스. 로그인, 데이터 저장, 인증 기능 제공.\n\n비개발자는 **회원가입/로그인 기능을 손쉽게 붙이는 용도**로 활용 가능.\n\n8. **Firebase** — firebase.google.com\n\n구글에서 제공하는 백엔드 서비스. 앱 데이터 관리와 푸시 알림에 강점.\n\n비개발자는 **앱이나 프로그램에 데이터 저장, 로그인, 알림 기능 추가**할 때 활용.\n\n9. **부스터AI (Booster AI)** — (예: booster.ai)\n\n간단한 배포와 운영을 돕는 플랫폼.\n\n비개발자는 **자신이 만든 프로젝트를 빠르게 세상에 공개**할 수 있음.\n\n10. **GitHub** — [github.com](https://github.com/)\n\n코드 저장소이자 협업 플랫폼. 버전 관리와 협업에 필수.\n\n비개발자는 **AI가 작성한 코드 저장·공유·배포** 용도로 최소한만 이해해도 충분.'
          },
          {
            id: '1-2-(3)',
            title: '(3) 디자인 참고 사이트',
            content: '- https://21st.dev/home 컴포넌트 벤치마킹\n\n- https://uiverse.io/ 무료로 코드 가져올 수 있음\n\n- https://www.cta.gallery/ 콜투액션 벤츠마킹\n\n- https://www.supahero.io/ 섹션디자인 벤츠마킹\n\n- https://www.footer.design/ 푸터 벤츠마킹\n\n- https://www.navbar.gallery/ 상담네이게이션 디자인 벤치마킹\n\n- https://www.landing.love/ 랜딩페이지 애니메이션 벤치마킹\n\n- https://bentogrids.com/ 레이아웃 벤츠마킹\n\n- https://vibedesignlab.net/ 디자인 패턴 벤츠마킹\n\n- https://mobbin.com/ 종합사례\n\n- https://godly.website/ 종합사례\n\n- https://saaspo.com/ 종합사례'
          }
        ]
      },
      {
        id: '1-3',
        title: '커서 AI',
        subSubChapters: [
          {
            id: '1-3-(1)',
            title: '(1) 커서 AI란?',
            content: '**커서(Cursor)**는 AI 기반 코드 에디터로, 개발자가 코드를 더 빠르고 효율적으로 작성할 수 있도록 도와주는 혁신적인 도구입니다.\n\n### 주요 특징\n\n1. **AI 기반 코드 생성**: 자연어로 설명하면 AI가 코드를 자동으로 작성\n\n2. **실시간 코드 제안**: 타이핑하는 동안 AI가 코드를 제안하고 완성\n\n3. **코드 리뷰 및 개선**: 작성한 코드를 분석하고 더 나은 방법을 제안\n\n4. **버그 수정**: 에러를 자동으로 찾아내고 수정 방법 제시\n\n5. **다국어 지원**: Python, JavaScript, TypeScript, Java, C++ 등 다양한 언어 지원\n\n---\n\n### 왜 커서 AI인가?\n\n기존의 코드 에디터는 단순히 텍스트를 편집하는 도구였지만, 커서 AI는 **AI와 함께 코딩하는 경험**을 제공합니다. 마치 시니어 개발자와 페어 프로그래밍을 하는 것처럼, AI가 실시간으로 도움을 주고 코드를 개선해줍니다.\n\n비개발자도 자연어로 "로그인 기능을 만들어줘"라고 요청하면, AI가 필요한 코드를 모두 작성해주고 설명까지 해줍니다.'
          },
          {
            id: '1-3-(2)',
            title: '(2) 설치 및 설정',
            content: '### 1. 커서 AI 다운로드\n\n1. **공식 웹사이트 방문**: [cursor.com](https://cursor.com/)\n\n2. **다운로드**: 운영체제에 맞는 버전 선택 (Windows, macOS, Linux)\n\n3. **설치**: 다운로드한 파일 실행하여 설치 진행\n\n### 2. 초기 설정\n\n1. **계정 생성**: 이메일 또는 GitHub 계정으로 가입\n\n2. **AI 모델 선택**: GPT-4, Claude 등 원하는 AI 모델 선택 (유료 플랜 필요할 수 있음)\n\n3. **API 키 설정**: OpenAI API 키 또는 Anthropic API 키 연결 (선택사항)\n\n### 3. 기본 설정 확인\n\n- **테마 설정**: 다크 모드/라이트 모드 선택\n- **폰트 크기**: 편한 크기로 조정\n- **확장 프로그램**: 필요한 언어 지원 확장 설치\n\n---\n\n### 4. 첫 프로젝트 열기\n\n1. **폴더 열기**: File > Open Folder로 작업할 프로젝트 폴더 선택\n\n2. **새 파일 생성**: 원하는 언어로 새 파일 생성 (예: index.html, app.js)\n\n3. **AI 기능 테스트**: 간단한 코드를 작성하거나 AI에게 요청해보기'
          },
          {
            id: '1-3-(3)',
            title: '(3) 주요 기능',
            content: '### 1. Chat 기능\n\n**Ctrl + K** (또는 Cmd + K)를 누르면 AI와 대화할 수 있는 채팅 창이 열립니다.\n\n- 코드 작성 요청: "로그인 폼을 만들어줘"\n- 코드 설명 요청: "이 코드가 뭘 하는지 설명해줘"\n- 버그 수정 요청: "이 에러를 고쳐줘"\n- 코드 개선 요청: "이 코드를 더 효율적으로 바꿔줘"\n\n### 2. Composer 기능\n\n**Ctrl + Shift + I** (또는 Cmd + Shift + I)로 여러 파일을 동시에 수정할 수 있습니다.\n\n- 전체 프로젝트 구조 변경\n- 여러 파일에 걸친 리팩토링\n- 새로운 기능 추가\n\n### 3. Tab 자동완성\n\n코드를 타이핑하면 AI가 자동으로 다음 코드를 제안합니다.\n\n- **Tab 키**: 제안된 코드 수락\n- **Esc 키**: 제안 거부\n- **Ctrl + →**: 제안의 일부만 수락\n\n### 4. 인라인 편집\n\n코드 블록을 선택하고 **Ctrl + K**를 누르면 해당 부분만 수정할 수 있습니다.\n\n- 특정 함수만 개선\n- 변수명 변경\n- 주석 추가\n\n### 5. 코드 리뷰\n\n전체 파일이나 선택한 코드를 AI에게 리뷰 요청할 수 있습니다.\n\n- 보안 취약점 검사\n- 성능 최적화 제안\n- 코드 스타일 개선\n\n---\n\n### 6. 파일 생성 및 수정\n\nAI에게 "새로운 컴포넌트를 만들어줘"라고 요청하면, 파일을 자동으로 생성하고 필요한 코드를 모두 작성해줍니다.'
          },
          {
            id: '1-3-(4)',
            title: '(4) 프롬프트 작성 팁',
            content: '### 1. 구체적으로 요청하기\n\n❌ 나쁜 예: "웹사이트 만들어줘"\n\n✅ 좋은 예: "반응형 랜딩 페이지를 만들어줘. 헤더에는 로고와 네비게이션 메뉴, 메인 섹션에는 제목과 CTA 버튼, 푸터에는 연락처 정보를 넣어줘. Tailwind CSS를 사용하고 모던한 디자인으로 만들어줘."\n\n### 2. 맥락 제공하기\n\n- 사용하는 프레임워크나 라이브러리 명시\n- 기존 코드 스타일 유지 요청\n- 특정 요구사항이나 제약사항 언급\n\n### 3. 단계별로 요청하기\n\n복잡한 기능은 여러 단계로 나눠서 요청하는 것이 좋습니다.\n\n1. "사용자 인증 기능의 기본 구조를 만들어줘"\n2. "로그인 폼 UI를 추가해줘"\n3. "비밀번호 재설정 기능을 추가해줘"\n\n### 4. 예시 제공하기\n\n원하는 결과물의 예시나 참고할 코드를 제공하면 더 정확한 결과를 얻을 수 있습니다.\n\n"이 코드를 참고해서 비슷한 스타일로 만들어줘"\n\n### 5. 피드백 주고받기\n\nAI가 작성한 코드가 마음에 들지 않으면:\n\n- "이 부분을 더 간단하게 바꿔줘"\n- "성능을 개선해줘"\n- "다른 방법으로 다시 작성해줘"\n\n---\n\n### 6. 에러 메시지 활용하기\n\n에러가 발생하면 에러 메시지를 그대로 AI에게 보여주면 해결 방법을 제시해줍니다.'
          },
          {
            id: '1-3-(5)',
            title: '(5) 실전 활용 예제',
            content: '### 예제 1: 간단한 할 일 목록 만들기\n\n**프롬프트**:\n\n"React를 사용해서 할 일 목록 앱을 만들어줘. 추가, 삭제, 완료 체크 기능이 있어야 해."\n\n**결과**:\n\n- TodoList 컴포넌트 자동 생성\n- 상태 관리 코드 작성\n- UI 스타일링 완료\n\n### 예제 2: API 연동하기\n\n**프롬프트**:\n\n"이 컴포넌트에 사용자 정보를 가져오는 API를 연동해줘. https://api.example.com/users 엔드포인트를 사용하고, 로딩 상태와 에러 처리를 포함해줘."\n\n**결과**:\n\n- fetch 또는 axios 코드 작성\n- useState로 로딩/에러 상태 관리\n- try-catch 에러 처리 추가\n\n### 예제 3: 버그 수정\n\n**에러 메시지**:\n\n"TypeError: Cannot read property \'map\' of undefined"\n\n**프롬프트**:\n\n"이 에러를 고쳐줘. users 배열이 undefined일 수 있어."\n\n**결과**:\n\n- 옵셔널 체이닝(?.) 추가\n- 기본값 설정\n- 방어 코드 작성\n\n### 예제 4: 코드 리팩토링\n\n**프롬프트**:\n\n"이 코드를 더 깔끔하게 리팩토링해줘. 함수를 작은 단위로 나누고, 변수명을 더 명확하게 바꿔줘."\n\n**결과**:\n\n- 함수 분리\n- 의미 있는 변수명으로 변경\n- 주석 추가\n- 코드 구조 개선\n\n---\n\n### 예제 5: 테스트 코드 작성\n\n**프롬프트**:\n\n"이 함수에 대한 Jest 테스트 코드를 작성해줘. 모든 엣지 케이스를 포함해줘."\n\n**결과**:\n\n- 테스트 파일 생성\n- 다양한 케이스 테스트 작성\n- Mock 데이터 설정'
          },
          {
            id: '1-3-(6)',
            title: '(6) 고급 기능 및 팁',
            content: '### 1. 커스텀 규칙 설정\n\n`.cursorrules` 파일을 프로젝트 루트에 만들어서 AI가 따라야 할 규칙을 설정할 수 있습니다.\n\n예시:\n- "항상 TypeScript를 사용해"\n- "함수명은 camelCase로 작성해"\n- "주석은 한국어로 작성해"\n\n### 2. 컨텍스트 활용\n\nAI에게 더 정확한 답변을 받으려면:\n\n- 관련 파일들을 함께 선택\n- 프로젝트 구조 설명\n- 사용 중인 라이브러리 정보 제공\n\n### 3. 코드베이스 학습\n\n커서 AI는 열려있는 파일들을 학습해서 프로젝트의 스타일과 패턴을 이해합니다.\n\n- 여러 파일을 열어두면 더 일관된 코드 생성\n- 기존 코드 스타일을 따라 작성\n\n### 4. 단축키 활용\n\n- **Ctrl + K**: 인라인 편집 / Chat 열기\n- **Ctrl + L**: Chat 창 열기\n- **Ctrl + Shift + I**: Composer 열기\n- **Tab**: AI 제안 수락\n- **Esc**: AI 제안 거부\n\n### 5. 멀티 파일 편집\n\nComposer를 사용하면 여러 파일을 동시에 수정할 수 있습니다.\n\n"로그인 기능을 추가해줘. auth.js 파일에 함수를 만들고, login.jsx 파일에 UI를 추가해줘."\n\n### 6. 코드 검색 및 분석\n\n**Ctrl + Shift + F**로 코드베이스 전체를 검색하고, AI에게 "이 함수가 어디서 사용되는지 찾아줘"라고 요청할 수 있습니다.\n\n---\n\n### 7. 성능 최적화\n\n- 큰 파일은 여러 작은 파일로 분리\n- 불필요한 AI 제안은 Esc로 거부하여 리소스 절약\n- 특정 파일만 열어서 컨텍스트 제한'
          }
        ]
      }
    ]
  }
]

export function Book() {
  // 초기 선택: 첫 번째 subChapter에 content가 있으면 그것을, 없으면 첫 번째 subSubChapter를 선택
  const getInitialSelection = () => {
    const firstSubChapter = chapters[0].subChapters[0]
    if (firstSubChapter.content) {
      return firstSubChapter.id
    }
    if (firstSubChapter.subSubChapters && firstSubChapter.subSubChapters.length > 0) {
      return firstSubChapter.subSubChapters[0].id
    }
    return firstSubChapter.id
  }

  const [selectedSubChapter, setSelectedSubChapter] = useState<string>(getInitialSelection())
  const [expandedSubChapters, setExpandedSubChapters] = useState<Set<string>>(() => {
    const initialExpanded = new Set<string>()
    // If the initially selected sub-chapter has sub-sub-chapters, expand it
    const defaultSubChapter = chapters[0].subChapters[0]
    if (defaultSubChapter.subSubChapters && defaultSubChapter.subSubChapters.length > 0) {
      initialExpanded.add(defaultSubChapter.id)
    }
    return initialExpanded
  })

  // 현재 선택된 항목 찾기 (subChapter 또는 subSubChapter)
  const findCurrentContent = () => {
    for (const chapter of chapters) {
      for (const subChapter of chapter.subChapters) {
        if (subChapter.id === selectedSubChapter) {
          if (subChapter.content) {
            return { title: subChapter.title, content: subChapter.content }
          }
          // If a sub-chapter with sub-sub-chapters is selected, but it has no direct content,
          // return the first sub-sub-chapter's content if available.
          if (subChapter.subSubChapters && subChapter.subSubChapters.length > 0) {
            return { title: subChapter.subSubChapters[0].title, content: subChapter.subSubChapters[0].content || '' }
          }
        }
        if (subChapter.subSubChapters) {
          for (const subSubChapter of subChapter.subSubChapters) {
            if (subSubChapter.id === selectedSubChapter) {
              return { title: subSubChapter.title, content: subSubChapter.content }
            }
          }
        }
      }
    }
    // Fallback to the very first content if nothing is selected or found
    const defaultSubChapter = chapters[0].subChapters[0];
    if (defaultSubChapter.subSubChapters && defaultSubChapter.subSubChapters.length > 0) {
      return { title: defaultSubChapter.subSubChapters[0].title, content: defaultSubChapter.subSubChapters[0].content || '' };
    }
    return { title: defaultSubChapter.title, content: defaultSubChapter.content || '' };
  }

  const currentContent = findCurrentContent()

  const toggleSubChapter = (subChapterId: string) => {
    setExpandedSubChapters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(subChapterId)) {
        newSet.delete(subChapterId)
      } else {
        newSet.add(subChapterId)
      }
      return newSet
    })
  }

  // 링크 파싱 헬퍼 함수 (마크다운 링크 + 일반 URL 모두 처리)
  const parseLinks = (text: string) => {
    if (!text) return [text]
    
    const parts: (string | JSX.Element)[] = []
    let key = 0
    let lastIndex = 0
    
    // 모든 매치 수집 (마크다운 링크와 일반 URL)
    const matches: Array<{start: number, end: number, type: 'markdown' | 'url', text?: string, url: string}> = []
    
    // 마크다운 링크 [text](url)
    const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let markdownMatch: RegExpExecArray | null
    while ((markdownMatch = markdownRegex.exec(text)) !== null) {
      if (markdownMatch.index !== undefined) {
        matches.push({
          start: markdownMatch.index,
          end: markdownMatch.index + markdownMatch[0].length,
          type: 'markdown',
          text: markdownMatch[1],
          url: markdownMatch[2]
        })
      }
    }
    
    // 일반 URL 패턴 (http://, https://, 또는 도메인.확장자 형식)
    const urlRegex = /(https?:\/\/[^\s\)]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?:\/[^\s\)]*)?)/g
    let urlMatch: RegExpExecArray | null
    while ((urlMatch = urlRegex.exec(text)) !== null) {
      if (urlMatch.index !== undefined) {
        const urlMatchIndex = urlMatch.index
        // 마크다운 링크 안에 있는 URL은 건너뛰기
        const isInsideMarkdown = matches.some(m => 
          m.type === 'markdown' && urlMatchIndex >= m.start && urlMatchIndex < m.end
        )
        if (!isInsideMarkdown) {
          matches.push({
            start: urlMatchIndex,
            end: urlMatchIndex + urlMatch[0].length,
            type: 'url',
            url: urlMatch[0]
          })
        }
      }
    }
    
    // 시작 위치로 정렬
    matches.sort((a, b) => a.start - b.start)
    
    // 중복 제거 (겹치는 부분 제거)
    const filteredMatches: typeof matches = []
    matches.forEach(m => {
      const overlaps = filteredMatches.some(fm => 
        (m.start >= fm.start && m.start < fm.end) || 
        (m.end > fm.start && m.end <= fm.end)
      )
      if (!overlaps) {
        filteredMatches.push(m)
      }
    })
    
    // 텍스트를 파싱하여 링크 생성
    filteredMatches.forEach(m => {
      if (m.start > lastIndex) {
        parts.push(text.substring(lastIndex, m.start))
      }
      
      if (m.type === 'markdown') {
        parts.push(
          <a 
            key={key++} 
            href={m.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            {m.text}
          </a>
        )
      } else {
        const url = m.url.startsWith('http') ? m.url : `https://${m.url}`
        parts.push(
          <a 
            key={key++} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            {m.url}
          </a>
        )
      }
      lastIndex = m.end
    })
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    
    return parts.length > 0 ? parts : [text]
  }

  return (
    <section id="ebook" className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          전자책
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 왼쪽 목차 */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-900">목차</h3>
              <nav className="space-y-1">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="mb-2">
                    <div className="text-sm font-semibold text-gray-500 mb-1 px-2">
                      {chapter.id}. {chapter.title}
                    </div>
                    <div className="space-y-1 ml-2">
                      {chapter.subChapters.map((subChapter) => {
                        const hasSubSubChapters = subChapter.subSubChapters && subChapter.subSubChapters.length > 0
                        const isExpanded = expandedSubChapters.has(subChapter.id)
                        
                        return (
                          <div key={subChapter.id}>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (hasSubSubChapters) {
                                  const newExpanded = !isExpanded
                                  toggleSubChapter(subChapter.id)
                                  if (newExpanded && subChapter.subSubChapters && subChapter.subSubChapters.length > 0) {
                                    setSelectedSubChapter(subChapter.subSubChapters[0].id)
                                  }
                                } else {
                                  setSelectedSubChapter(subChapter.id)
                                }
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                                selectedSubChapter === subChapter.id && !hasSubSubChapters
                                  ? 'bg-indigo-600 text-white font-semibold'
                                  : hasSubSubChapters
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {subChapter.id} {subChapter.title}
                            </button>
                            {hasSubSubChapters && isExpanded && subChapter.subSubChapters && (
                              <div className="ml-4 mt-1 space-y-1">
                                {subChapter.subSubChapters.map((subSubChapter) => (
                                  <button
                                    key={subSubChapter.id}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setSelectedSubChapter(subSubChapter.id)
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-all text-xs ${
                                      selectedSubChapter === subSubChapter.id
                                        ? 'bg-indigo-600 text-white font-semibold'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-200'
                                    }`}
                                  >
                                    {subSubChapter.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* 오른쪽 내용 */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 min-h-[600px]">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {currentContent.title}
              </h3>
              <div className="prose prose-lg max-w-none">
                <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4">
                  {(() => {
                    const paragraphs = currentContent.content.split('\n\n')
                    const elements: JSX.Element[] = []
                    let i = 0
                    let elementIndex = 0
                    
                    while (i < paragraphs.length) {
                      const paragraph = paragraphs[i]
                      
                      // 구분선 처리
                      if (paragraph.trim() === '---') {
                        elements.push(<hr key={elementIndex++} className="my-6 border-gray-300" />)
                        i++
                        continue
                      }
                      
                      // 제목 처리 (###) - 최우선 처리
                      const trimmedPara = paragraph.trim()
                      if (trimmedPara.startsWith('### ')) {
                        const title = trimmedPara.replace(/^###\s+/, '')
                        elements.push(
                          <h3 key={elementIndex++} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
                            {title.split('**').map((text, idx) => {
                              const content = idx % 2 === 1 ? (
                                <strong key={idx}>{text}</strong>
                              ) : (
                                parseLinks(text)
                              )
                              return <span key={idx}>{content}</span>
                            })}
                          </h3>
                        )
                        i++
                        continue
                      }
                      
                      // 리스트 처리 (-)
                      if (paragraph.trim().startsWith('- ')) {
                        const listItems = paragraph.split('\n').filter(line => line.trim().startsWith('- '))
                        elements.push(
                          <ul key={elementIndex++} className="list-disc list-inside space-y-2 ml-4">
                            {listItems.map((item, itemIndex) => {
                              const cleanItem = item.replace(/^-\s*/, '')
                              return (
                                <li key={itemIndex} className="leading-relaxed">
                                  {cleanItem.split('**').map((text, idx) => {
                                    const content = idx % 2 === 1 ? (
                                      <strong key={idx} className="font-bold text-gray-900">{text}</strong>
                                    ) : (
                                      parseLinks(text)
                                    )
                                    return <span key={idx}>{content}</span>
                                  })}
                                </li>
                              )
                            })}
                          </ul>
                        )
                        i++
                        continue
                      }
                      
                      // 번호 리스트 처리 (1. 2. 등) - 연속된 번호 리스트를 하나로 묶기
                      if (/^\d+\.\s/.test(paragraph.trim())) {
                        const listItems: { number: string, content: string }[] = []
                        let currentIndex = i
                        
                        // 연속된 번호 리스트 아이템들을 수집
                        while (currentIndex < paragraphs.length) {
                          const currentPara = paragraphs[currentIndex]
                          
                          // 제목이 나오면 리스트 중단
                          if (currentPara.startsWith('### ')) {
                            break
                          }
                          
                          const lines = currentPara.split('\n')
                          const numberedLines = lines.filter(line => /^\d+\.\s/.test(line.trim()))
                          
                          if (numberedLines.length > 0) {
                            // 첫 번째 번호 라인 찾기
                            const firstNumberedLine = numberedLines[0]
                            const match = firstNumberedLine.trim().match(/^(\d+)\.\s(.+)$/)
                            if (match) {
                              const number = match[1]
                              const restOfLine = match[2]
                              
                              // 이 번호 라인 이후의 모든 내용 수집 (다음 번호 라인 전까지)
                              let content = restOfLine
                              let lineIndex = lines.indexOf(firstNumberedLine) + 1
                              
                              // 같은 문단 내에서 다음 번호 라인 전까지의 내용 수집
                              while (lineIndex < lines.length && !/^\d+\.\s/.test(lines[lineIndex].trim())) {
                                content += '\n' + lines[lineIndex]
                                lineIndex++
                              }
                              
                              // 다음 문단들도 확인 (다음 번호 라인 또는 제목이 나올 때까지)
                              let nextParaIndex = currentIndex + 1
                              while (nextParaIndex < paragraphs.length) {
                                const nextPara = paragraphs[nextParaIndex]
                                // 제목이 나오면 중단
                                if (nextPara.startsWith('### ')) {
                                  break
                                }
                                if (/^\d+\.\s/.test(nextPara.trim())) {
                                  break
                                }
                                content += '\n\n' + nextPara
                                nextParaIndex++
                              }
                              
                              listItems.push({ number, content: content.trim() })
                              currentIndex = nextParaIndex
                            } else {
                              currentIndex++
                            }
                          } else {
                            break
                          }
                        }
                        
                        if (listItems.length > 0) {
                          elements.push(
                            <ol key={elementIndex++} className="list-decimal list-outside space-y-2 ml-6 pl-2">
                              {listItems.map((item, itemIndex) => {
                                // 첫 줄에서 제목 추출 (첫 줄이 제목, 나머지는 본문)
                                const contentLines = item.content.split('\n')
                                const firstLine = contentLines[0] || ''
                                const bodyLines = contentLines.slice(1)
                                
                                return (
                                  <li key={itemIndex} className="leading-relaxed">
                                    {/* 제목 부분 - 번호 옆에 인라인으로 표시 */}
                                    <span className="font-semibold text-gray-900">
                                      {firstLine.split('**').map((text, idx) => {
                                        const content = idx % 2 === 1 ? (
                                          <strong key={idx} className="font-bold">{text}</strong>
                                        ) : (
                                          parseLinks(text)
                                        )
                                        return <span key={idx}>{content}</span>
                                      })}
                                    </span>
                                    {/* 본문 부분 */}
                                    {bodyLines.length > 0 && (
                                      <div className="mt-2">
                                        {bodyLines.join('\n').split('\n\n').map((para, paraIdx) => (
                                          <div key={paraIdx} className={paraIdx > 0 ? 'mt-2' : ''}>
                                            {para.split('**').map((text, idx) => {
                                              const content = idx % 2 === 1 ? (
                                                <strong key={idx} className="font-bold text-gray-900">{text}</strong>
                                              ) : (
                                                parseLinks(text)
                                              )
                                              return <span key={idx}>{content}</span>
                                            })}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </li>
                                )
                              })}
                            </ol>
                          )
                          i = currentIndex
                          continue
                        }
                      }
                      
                      // 일반 문단
                      elements.push(
                        <p key={elementIndex++} className="whitespace-pre-line leading-relaxed">
                          {paragraph.split('**').map((text, idx) => {
                            const content = idx % 2 === 1 ? (
                              <strong key={idx} className="font-bold text-gray-900">{text}</strong>
                            ) : (
                              parseLinks(text)
                            )
                            return <span key={idx}>{content}</span>
                          })}
                        </p>
                      )
                      i++
                    }
                    
                    return elements
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}