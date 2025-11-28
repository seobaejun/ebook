'use client'

import { useState } from 'react'

interface ButtonConfig {
  backgroundColor: string
  textColor: string
  paddingX: number
  paddingY: number
  borderRadius: number
  fontSize: number
  fontWeight: string
  borderWidth: number
  borderColor: string
  hoverBackgroundColor: string
  hoverTextColor: string
  shadowX: number
  shadowY: number
  shadowBlur: number
  shadowColor: string
  shadowOpacity: number
}

export function ButtonGenerator() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>({
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    paddingX: 24,
    paddingY: 12,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '500',
    borderWidth: 0,
    borderColor: '#3B82F6',
    hoverBackgroundColor: '#2563EB',
    hoverTextColor: '#FFFFFF',
    shadowX: 0,
    shadowY: 4,
    shadowBlur: 6,
    shadowColor: '#000000',
    shadowOpacity: 10
  })

  const updateButtonConfig = (key: keyof ButtonConfig, value: string | number) => {
    setButtonConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetButtonConfig = () => {
    setButtonConfig({
      backgroundColor: '#3B82F6',
      textColor: '#FFFFFF',
      paddingX: 24,
      paddingY: 12,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: '500',
      borderWidth: 0,
      borderColor: '#3B82F6',
      hoverBackgroundColor: '#2563EB',
      hoverTextColor: '#FFFFFF',
      shadowX: 0,
      shadowY: 4,
      shadowBlur: 6,
      shadowColor: '#000000',
      shadowOpacity: 10
    })
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  }

  const getButtonStyle = () => {
    return {
      backgroundColor: buttonConfig.backgroundColor,
      color: buttonConfig.textColor,
      padding: `${buttonConfig.paddingY}px ${buttonConfig.paddingX}px`,
      borderRadius: `${buttonConfig.borderRadius}px`,
      fontSize: `${buttonConfig.fontSize}px`,
      fontWeight: buttonConfig.fontWeight,
      border: `${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor}`,
      boxShadow: `${buttonConfig.shadowX}px ${buttonConfig.shadowY}px ${buttonConfig.shadowBlur}px ${hexToRgba(buttonConfig.shadowColor, buttonConfig.shadowOpacity)}`,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  }

  const getCSSCode = () => {
    return `.button {
  background-color: ${buttonConfig.backgroundColor};
  color: ${buttonConfig.textColor};
  padding: ${buttonConfig.paddingY}px ${buttonConfig.paddingX}px;
  border-radius: ${buttonConfig.borderRadius}px;
  font-size: ${buttonConfig.fontSize}px;
  font-weight: ${buttonConfig.fontWeight};
  border: ${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor};
  box-shadow: ${buttonConfig.shadowX}px ${buttonConfig.shadowY}px ${buttonConfig.shadowBlur}px ${hexToRgba(buttonConfig.shadowColor, buttonConfig.shadowOpacity)};
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: ${buttonConfig.hoverBackgroundColor};
  color: ${buttonConfig.hoverTextColor};
}`
  }

  const getTailwindCode = () => {
    return `<button
  className="..."
  style={{
    backgroundColor: '${buttonConfig.backgroundColor}',
    color: '${buttonConfig.textColor}',
    padding: '${buttonConfig.paddingY}px ${buttonConfig.paddingX}px',
    borderRadius: '${buttonConfig.borderRadius}px',
    fontSize: '${buttonConfig.fontSize}px',
    fontWeight: '${buttonConfig.fontWeight}',
    border: '${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor}',
    boxShadow: '${buttonConfig.shadowX}px ${buttonConfig.shadowY}px ${buttonConfig.shadowBlur}px ${hexToRgba(buttonConfig.shadowColor, buttonConfig.shadowOpacity)}'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '${buttonConfig.hoverBackgroundColor}';
    e.currentTarget.style.color = '${buttonConfig.hoverTextColor}';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '${buttonConfig.backgroundColor}';
    e.currentTarget.style.color = '${buttonConfig.textColor}';
  }}
>
  Button
</button>`
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
          Button Generator
        </h2>

        {/* 설명 섹션 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">버튼 생성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">버튼 스타일</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">배경색</span>, <span className="text-yellow-400">텍스트 색상</span>,
                  <span className="text-yellow-400">패딩</span>, <span className="text-yellow-400">테두리</span>를 설정합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">호버 효과</h4>
                <p className="text-xs leading-relaxed">
                  마우스를 올렸을 때의 <span className="text-yellow-400">배경색</span>과
                  <span className="text-yellow-400">텍스트 색상</span>을 설정합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 기본 스타일 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">기본 스타일</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={buttonConfig.backgroundColor}
                      onChange={(e) => updateButtonConfig('backgroundColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={buttonConfig.backgroundColor}
                      onChange={(e) => updateButtonConfig('backgroundColor', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={buttonConfig.textColor}
                      onChange={(e) => updateButtonConfig('textColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={buttonConfig.textColor}
                      onChange={(e) => updateButtonConfig('textColor', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Padding X (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={buttonConfig.paddingX}
                    onChange={(e) => updateButtonConfig('paddingX', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Padding Y (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={buttonConfig.paddingY}
                    onChange={(e) => updateButtonConfig('paddingY', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Border Radius (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={buttonConfig.borderRadius}
                    onChange={(e) => updateButtonConfig('borderRadius', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Font Size (px)</label>
                  <input
                    type="number"
                    min="8"
                    max="32"
                    value={buttonConfig.fontSize}
                    onChange={(e) => updateButtonConfig('fontSize', parseInt(e.target.value) || 16)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Font Weight</label>
                  <select
                    value={buttonConfig.fontWeight}
                    onChange={(e) => updateButtonConfig('fontWeight', e.target.value)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  >
                    <option value="400">400 (Normal)</option>
                    <option value="500">500 (Medium)</option>
                    <option value="600">600 (Semi Bold)</option>
                    <option value="700">700 (Bold)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Border Width (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={buttonConfig.borderWidth}
                    onChange={(e) => updateButtonConfig('borderWidth', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                {buttonConfig.borderWidth > 0 && (
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Border Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={buttonConfig.borderColor}
                        onChange={(e) => updateButtonConfig('borderColor', e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={buttonConfig.borderColor}
                        onChange={(e) => updateButtonConfig('borderColor', e.target.value)}
                        className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 호버 효과 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">호버 효과</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Hover Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={buttonConfig.hoverBackgroundColor}
                      onChange={(e) => updateButtonConfig('hoverBackgroundColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={buttonConfig.hoverBackgroundColor}
                      onChange={(e) => updateButtonConfig('hoverBackgroundColor', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Hover Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={buttonConfig.hoverTextColor}
                      onChange={(e) => updateButtonConfig('hoverTextColor', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={buttonConfig.hoverTextColor}
                      onChange={(e) => updateButtonConfig('hoverTextColor', e.target.value)}
                      className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 그림자 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">그림자</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Shadow X (px)</label>
                  <input
                    type="number"
                    value={buttonConfig.shadowX}
                    onChange={(e) => updateButtonConfig('shadowX', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Shadow Y (px)</label>
                  <input
                    type="number"
                    value={buttonConfig.shadowY}
                    onChange={(e) => updateButtonConfig('shadowY', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Shadow Blur (px)</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={buttonConfig.shadowBlur}
                    onChange={(e) => updateButtonConfig('shadowBlur', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Shadow Opacity (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={buttonConfig.shadowOpacity}
                    onChange={(e) => updateButtonConfig('shadowOpacity', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 리셋 버튼 */}
            <button
              onClick={resetButtonConfig}
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
                <button
                  style={getButtonStyle()}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = buttonConfig.hoverBackgroundColor
                    e.currentTarget.style.color = buttonConfig.hoverTextColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = buttonConfig.backgroundColor
                    e.currentTarget.style.color = buttonConfig.textColor
                  }}
                >
                  Button
                </button>
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setButtonConfig({
                        backgroundColor: '#3B82F6',
                        textColor: '#FFFFFF',
                        paddingX: 24,
                        paddingY: 12,
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: '500',
                        borderWidth: 0,
                        borderColor: '#3B82F6',
                        hoverBackgroundColor: '#2563EB',
                        hoverTextColor: '#FFFFFF',
                        shadowX: 0,
                        shadowY: 4,
                        shadowBlur: 6,
                        shadowColor: '#000000',
                        shadowOpacity: 10
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">기본 버튼</p>
                        <p className="text-sm text-indigo-200">클래식한 파란색 버튼</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setButtonConfig({
                        backgroundColor: '#10B981',
                        textColor: '#FFFFFF',
                        paddingX: 32,
                        paddingY: 16,
                        borderRadius: 12,
                        fontSize: 18,
                        fontWeight: '600',
                        borderWidth: 0,
                        borderColor: '#10B981',
                        hoverBackgroundColor: '#059669',
                        hoverTextColor: '#FFFFFF',
                        shadowX: 0,
                        shadowY: 8,
                        shadowBlur: 12,
                        shadowColor: '#000000',
                        shadowOpacity: 15
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">강조 버튼</p>
                        <p className="text-sm text-indigo-200">큰 그림자가 있는 초록색 버튼</p>
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
                <h4 className="text-white text-sm font-semibold">React/JSX 코드</h4>
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
                    <h4 className="text-white font-semibold">React/JSX 코드</h4>
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

