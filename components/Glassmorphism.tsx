'use client'

import { useState } from 'react'

interface GlassConfig {
  backgroundColor: string
  backgroundOpacity: number
  blur: number
  borderWidth: number
  borderColor: string
  borderOpacity: number
  borderRadius: number
  shadowX: number
  shadowY: number
  shadowBlur: number
  shadowSpread: number
  shadowColor: string
  shadowOpacity: number
}

export function Glassmorphism() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [glassConfig, setGlassConfig] = useState<GlassConfig>({
    backgroundColor: '#FFFFFF',
    backgroundOpacity: 10,
    blur: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderOpacity: 20,
    borderRadius: 16,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 32,
    shadowSpread: 0,
    shadowColor: '#000000',
    shadowOpacity: 10
  })

  const updateGlassConfig = (key: keyof GlassConfig, value: number | string) => {
    setGlassConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetGlassConfig = () => {
    setGlassConfig({
      backgroundColor: '#FFFFFF',
      backgroundOpacity: 10,
      blur: 10,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      borderOpacity: 20,
      borderRadius: 16,
      shadowX: 0,
      shadowY: 8,
      shadowBlur: 32,
      shadowSpread: 0,
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

  const getGlassStyle = () => {
    return {
      background: hexToRgba(glassConfig.backgroundColor, glassConfig.backgroundOpacity),
      backdropFilter: `blur(${glassConfig.blur}px)`,
      WebkitBackdropFilter: `blur(${glassConfig.blur}px)`,
      border: `${glassConfig.borderWidth}px solid ${hexToRgba(glassConfig.borderColor, glassConfig.borderOpacity)}`,
      borderRadius: `${glassConfig.borderRadius}px`,
      boxShadow: `${glassConfig.shadowX}px ${glassConfig.shadowY}px ${glassConfig.shadowBlur}px ${glassConfig.shadowSpread}px ${hexToRgba(glassConfig.shadowColor, glassConfig.shadowOpacity)}`
    }
  }

  const getCSSCode = () => {
    return `background: ${hexToRgba(glassConfig.backgroundColor, glassConfig.backgroundOpacity)};
backdrop-filter: blur(${glassConfig.blur}px);
-webkit-backdrop-filter: blur(${glassConfig.blur}px);
border: ${glassConfig.borderWidth}px solid ${hexToRgba(glassConfig.borderColor, glassConfig.borderOpacity)};
border-radius: ${glassConfig.borderRadius}px;
box-shadow: ${glassConfig.shadowX}px ${glassConfig.shadowY}px ${glassConfig.shadowBlur}px ${glassConfig.shadowSpread}px ${hexToRgba(glassConfig.shadowColor, glassConfig.shadowOpacity)};`
  }

  const getTailwindCode = () => {
    return `style={{
  background: '${hexToRgba(glassConfig.backgroundColor, glassConfig.backgroundOpacity)}',
  backdropFilter: 'blur(${glassConfig.blur}px)',
  WebkitBackdropFilter: 'blur(${glassConfig.blur}px)',
  border: '${glassConfig.borderWidth}px solid ${hexToRgba(glassConfig.borderColor, glassConfig.borderOpacity)}',
  borderRadius: '${glassConfig.borderRadius}px',
  boxShadow: '${glassConfig.shadowX}px ${glassConfig.shadowY}px ${glassConfig.shadowBlur}px ${glassConfig.shadowSpread}px ${hexToRgba(glassConfig.shadowColor, glassConfig.shadowOpacity)}'
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

  const PropertyPanel = ({
    title,
    properties
  }: {
    title: string
    properties: Array<{
      label: string
      key: keyof GlassConfig
      type: 'number' | 'text' | 'color'
      min?: number
      max?: number
    }>
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop) => (
            <div key={prop.key}>
              <label className="block text-xs text-gray-400 mb-1">{prop.label}</label>
              {prop.type === 'number' && (
                <input
                  type="number"
                  min={prop.min}
                  max={prop.max}
                  value={glassConfig[prop.key] as number}
                  onChange={(e) => updateGlassConfig(prop.key, parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'text' && (
                <input
                  type="text"
                  value={glassConfig[prop.key] as string}
                  onChange={(e) => updateGlassConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'color' && (
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={glassConfig[prop.key] as string}
                    onChange={(e) => updateGlassConfig(prop.key, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={glassConfig[prop.key] as string}
                    onChange={(e) => updateGlassConfig(prop.key, e.target.value)}
                    className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Glassmorphism
        </h2>

        {/* 설명 섹션 - 항상 표시 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-white text-lg font-semibold mb-4">글래스모피즘 효과 구현</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/30 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">반투명 배경</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Background</span>와 <span className="text-yellow-400">Opacity</span>로
                  반투명한 배경을 설정하고, <span className="text-yellow-400">Backdrop Filter</span>로 배경 블러 효과를 적용합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/30 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">테두리 및 그림자</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Border</span>로 미묘한 테두리를 추가하고,
                  <span className="text-yellow-400">Box Shadow</span>로 깊이감을 표현합니다.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-xs text-gray-400">
                <strong className="text-white">핵심 원리:</strong> 반투명한 배경과 backdrop-filter를 활용하여 배경이 비치는 유리 같은 효과를 구현합니다. 현대적이고 세련된 UI 디자인에 적합합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 배경 섹션 */}
            <PropertyPanel
              title="배경 (Background)"
              properties={[
                { label: 'Background Color', key: 'backgroundColor', type: 'color' },
                { label: 'Background Opacity (%)', key: 'backgroundOpacity', type: 'number', min: 0, max: 100 },
                { label: 'Blur (px)', key: 'blur', type: 'number', min: 0, max: 50 }
              ]}
            />

            {/* 테두리 섹션 */}
            <PropertyPanel
              title="테두리 (Border)"
              properties={[
                { label: 'Border Width (px)', key: 'borderWidth', type: 'number', min: 0, max: 10 },
                { label: 'Border Color', key: 'borderColor', type: 'color' },
                { label: 'Border Opacity (%)', key: 'borderOpacity', type: 'number', min: 0, max: 100 },
                { label: 'Border Radius (px)', key: 'borderRadius', type: 'number', min: 0, max: 50 }
              ]}
            />

            {/* 그림자 섹션 */}
            <PropertyPanel
              title="그림자 (Shadow)"
              properties={[
                { label: 'Shadow X (px)', key: 'shadowX', type: 'number' },
                { label: 'Shadow Y (px)', key: 'shadowY', type: 'number' },
                { label: 'Shadow Blur (px)', key: 'shadowBlur', type: 'number', min: 0, max: 100 },
                { label: 'Shadow Spread (px)', key: 'shadowSpread', type: 'number' },
                { label: 'Shadow Color', key: 'shadowColor', type: 'color' },
                { label: 'Shadow Opacity (%)', key: 'shadowOpacity', type: 'number', min: 0, max: 100 }
              ]}
            />

            {/* 리셋 버튼 */}
            <button
              onClick={resetGlassConfig}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              초기화
            </button>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-4 border border-gray-700/50">
                <h4 className="text-white text-lg font-semibold mb-2">실시간 미리보기</h4>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center">
                <div
                  className="transition-all p-8 w-full max-w-sm"
                  style={getGlassStyle()}
                >
                  <div className="text-center text-white">
                    <p className="text-lg font-semibold mb-2">Glassmorphism Preview</p>
                    <p className="text-sm text-white/80">글래스모피즘 효과를 확인하세요</p>
                  </div>
                </div>
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 min-h-[200px] flex flex-col border border-gray-700/50">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setGlassConfig({
                        backgroundColor: '#FFFFFF',
                        backgroundOpacity: 10,
                        blur: 10,
                        borderWidth: 1,
                        borderColor: '#FFFFFF',
                        borderOpacity: 20,
                        borderRadius: 16,
                        shadowX: 0,
                        shadowY: 8,
                        shadowBlur: 32,
                        shadowSpread: 0,
                        shadowColor: '#000000',
                        shadowOpacity: 10
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">클래식 글래스</p>
                        <p className="text-sm text-indigo-200">부드러운 블러와 미묘한 테두리</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setGlassConfig({
                        backgroundColor: '#FFFFFF',
                        backgroundOpacity: 20,
                        blur: 20,
                        borderWidth: 2,
                        borderColor: '#FFFFFF',
                        borderOpacity: 30,
                        borderRadius: 24,
                        shadowX: 0,
                        shadowY: 12,
                        shadowBlur: 48,
                        shadowSpread: 0,
                        shadowColor: '#000000',
                        shadowOpacity: 15
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">강한 글래스</p>
                        <p className="text-sm text-indigo-200">높은 블러와 두꺼운 테두리</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 - 버튼 바로 위 */}
        <div className="max-w-7xl mx-auto px-5 mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
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

