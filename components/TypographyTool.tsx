'use client'

import { useState } from 'react'

interface TypographyConfig {
  fontSize: number
  fontWeight: string
  lineHeight: number
  letterSpacing: number
  fontFamily: string
  textAlign: string
  textTransform: string
  textDecoration: string
  color: string
}

export function TypographyTool() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [typoConfig, setTypoConfig] = useState<TypographyConfig>({
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    textTransform: 'none',
    textDecoration: 'none',
    color: '#FFFFFF'
  })

  const updateTypoConfig = (key: keyof TypographyConfig, value: string | number) => {
    setTypoConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetTypoConfig = () => {
    setTypoConfig({
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontFamily: 'Arial, sans-serif',
      textAlign: 'left',
      textTransform: 'none',
      textDecoration: 'none',
      color: '#FFFFFF'
    })
  }

  const getTypographyStyle = () => {
    return {
      fontSize: `${typoConfig.fontSize}px`,
      fontWeight: typoConfig.fontWeight,
      lineHeight: typoConfig.lineHeight,
      letterSpacing: `${typoConfig.letterSpacing}px`,
      fontFamily: typoConfig.fontFamily,
      textAlign: typoConfig.textAlign as 'left' | 'center' | 'right' | 'justify',
      textTransform: typoConfig.textTransform as 'none' | 'uppercase' | 'lowercase' | 'capitalize',
      textDecoration: typoConfig.textDecoration as 'none' | 'underline' | 'line-through',
      color: typoConfig.color
    }
  }

  const getCSSCode = () => {
    return `font-size: ${typoConfig.fontSize}px;
font-weight: ${typoConfig.fontWeight};
line-height: ${typoConfig.lineHeight};
letter-spacing: ${typoConfig.letterSpacing}px;
font-family: ${typoConfig.fontFamily};
text-align: ${typoConfig.textAlign};
text-transform: ${typoConfig.textTransform};
text-decoration: ${typoConfig.textDecoration};
color: ${typoConfig.color};`
  }

  const getTailwindCode = () => {
    return `style={{
  fontSize: '${typoConfig.fontSize}px',
  fontWeight: '${typoConfig.fontWeight}',
  lineHeight: ${typoConfig.lineHeight},
  letterSpacing: '${typoConfig.letterSpacing}px',
  fontFamily: '${typoConfig.fontFamily}',
  textAlign: '${typoConfig.textAlign}',
  textTransform: '${typoConfig.textTransform}',
  textDecoration: '${typoConfig.textDecoration}',
  color: '${typoConfig.color}'
}}`
  }

  const copyCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCSS(true)
    setTimeout(() => setCopiedCSS(false), 2000)
  }

  const copyTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTailwind(true)
    setTimeout(() => setCopiedTailwind(false), 2000)
  }

  const copyModalCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalCSS(true)
    setTimeout(() => setCopiedModalCSS(false), 2000)
  }

  const copyModalTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalTailwind(true)
    setTimeout(() => setCopiedModalTailwind(false), 2000)
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Typography Tool
        </h2>

        {/* 설명 섹션 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">타이포그래피 설정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">텍스트 크기 및 간격</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Font Size</span>, <span className="text-yellow-400">Line Height</span>,
                  <span className="text-yellow-400">Letter Spacing</span>으로 텍스트의 가독성을 조절합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">텍스트 스타일</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Font Weight</span>, <span className="text-yellow-400">Text Transform</span>,
                  <span className="text-yellow-400">Text Decoration</span>으로 텍스트의 스타일을 설정합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 기본 설정 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">기본 설정</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Font Size (px)</label>
                  <input
                    type="number"
                    min="8"
                    max="72"
                    value={typoConfig.fontSize}
                    onChange={(e) => updateTypoConfig('fontSize', parseInt(e.target.value) || 16)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Font Weight</label>
                  <select
                    value={typoConfig.fontWeight}
                    onChange={(e) => updateTypoConfig('fontWeight', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="100">100 (Thin)</option>
                    <option value="300">300 (Light)</option>
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi Bold)</option>
                    <option value="700">700 (Bold)</option>
                    <option value="800">800 (Extra Bold)</option>
                    <option value="900">900 (Black)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Line Height</label>
                  <input
                    type="number"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={typoConfig.lineHeight}
                    onChange={(e) => updateTypoConfig('lineHeight', parseFloat(e.target.value) || 1.5)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Letter Spacing (px)</label>
                  <input
                    type="number"
                    min="-5"
                    max="10"
                    step="0.5"
                    value={typoConfig.letterSpacing}
                    onChange={(e) => updateTypoConfig('letterSpacing', parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 폰트 및 정렬 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">폰트 및 정렬</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Font Family</label>
                  <select
                    value={typoConfig.fontFamily}
                    onChange={(e) => updateTypoConfig('fontFamily', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Helvetica Neue', sans-serif">Helvetica Neue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Text Align</label>
                  <select
                    value={typoConfig.textAlign}
                    onChange={(e) => updateTypoConfig('textAlign', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Text Transform</label>
                  <select
                    value={typoConfig.textTransform}
                    onChange={(e) => updateTypoConfig('textTransform', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Text Decoration</label>
                  <select
                    value={typoConfig.textDecoration}
                    onChange={(e) => updateTypoConfig('textDecoration', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="line-through">Line Through</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={typoConfig.color}
                      onChange={(e) => updateTypoConfig('color', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={typoConfig.color}
                      onChange={(e) => updateTypoConfig('color', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 리셋 버튼 */}
            <button
              onClick={resetTypoConfig}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              초기화
            </button>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">실시간 미리보기</h4>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center">
                <div
                  className="w-full max-w-md transition-all"
                  style={getTypographyStyle()}
                >
                  <h1 className="mb-4">The quick brown fox jumps over the lazy dog</h1>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.
                  </p>
                </div>
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setTypoConfig({
                        fontSize: 18,
                        fontWeight: '400',
                        lineHeight: 1.6,
                        letterSpacing: 0,
                        fontFamily: 'Georgia, serif',
                        textAlign: 'left',
                        textTransform: 'none',
                        textDecoration: 'none',
                        color: '#FFFFFF'
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">본문 스타일</p>
                        <p className="text-sm text-indigo-200">읽기 좋은 본문 텍스트</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setTypoConfig({
                        fontSize: 32,
                        fontWeight: '700',
                        lineHeight: 1.2,
                        letterSpacing: -0.5,
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: '#FFFFFF'
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">제목 스타일</p>
                        <p className="text-sm text-indigo-200">강조되는 제목 텍스트</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 */}
        <div className="max-w-7xl mx-auto px-5 mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">CSS 코드</h4>
                <button
                  onClick={() => copyCSSToClipboard(getCSSCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedCSS ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getCSSCode()}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">Tailwind CSS (인라인 스타일)</h4>
                <button
                  onClick={() => copyTailwindToClipboard(getTailwindCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedTailwind ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getTailwindCode()}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="max-w-4xl mx-auto mb-24 flex justify-center">
          <button
            onClick={() => { 
              setShowCode(true)
              setCopiedModalCSS(false)
              setCopiedModalTailwind(false)
            }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            완료 및 코드 확인
          </button>
        </div>

        {/* Final Code Modal */}
        {showCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-white text-xl font-semibold">생성된 코드</h3>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">CSS 코드</h4>
                    <button
                      onClick={() => copyModalCSSToClipboard(getCSSCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalCSS ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getCSSCode()}</code>
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Tailwind CSS (인라인 스타일)</h4>
                    <button
                      onClick={() => copyModalTailwindToClipboard(getTailwindCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalTailwind ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getTailwindCode()}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

